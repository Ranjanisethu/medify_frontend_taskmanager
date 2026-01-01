import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from '../store/taskSlice';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TaskForm = ({ onClose, initialData = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        status: 'Todo',
        dueDate: null,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                status: initialData.status,
                dueDate: initialData.dueDate ? new Date(initialData.dueDate) : null,
            });
        }
    }, [initialData]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onDateChange = (date) => {
        setFormData({ ...formData, dueDate: date });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Serialize Data
            // Use local date string instead of ISO (UTC) to prevent "yesterday" bug
            const localDate = formData.dueDate ? new Date(formData.dueDate.getTime() - (formData.dueDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : null;

            const taskPayload = {
                ...formData,
                dueDate: localDate
            };

            if (initialData) {
                await dispatch(updateTask({ id: initialData.id, taskData: taskPayload })).unwrap();
                toast.success('Task updated successfully');
            } else {
                await dispatch(createTask(taskPayload)).unwrap();
                toast.success('Task created successfully');
            }
            onClose();
        } catch (error) {
            toast.error('Failed to save task');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl w-full max-w-md border border-gray-200 shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        {initialData ? 'Edit Task' : 'New Task'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={onChange}
                            required
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            placeholder="Task title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                        <DatePicker
                            selected={formData.dueDate}
                            onChange={onDateChange}
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            placeholderText="Select due date"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={onChange}
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        >
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
                        >
                            {initialData ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;

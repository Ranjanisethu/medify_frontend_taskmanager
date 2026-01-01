import { useDispatch } from 'react-redux';
import { deleteTask } from '../store/taskSlice';
import { Pencil, Trash2, CheckCircle2, Clock, Circle } from 'lucide-react';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const TaskItem = ({ task, onEdit }) => {
    const dispatch = useDispatch();

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed':
                return <CheckCircle2 className="text-green-600" />;
            case 'In Progress':
                return <Clock className="text-blue-600" />;
            default:
                return <Circle className="text-gray-400" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'In Progress':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    const handleDelete = () => {
        toast((t) => (
            <div className="flex flex-col gap-2">
                <span className="font-medium text-gray-800">Delete this task?</span>
                <div className="flex gap-2 mt-1">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await dispatch(deleteTask(task.id)).unwrap();
                                toast.success('Task deleted');
                            } catch (error) {
                                toast.error('Failed to delete');
                            }
                        }}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 4000,
            position: 'top-center'
        });
    };

    return (
        <div className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/5">
            <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                    <div className="mt-1">{getStatusIcon(task.status)}</div>
                    <div>
                        <h3 className={clsx(
                            "font-medium text-lg text-gray-900",
                            task.status === 'Completed' && "line-through text-gray-400"
                        )}>
                            {task.title}
                        </h3>
                        <span className={clsx(
                            "inline-block mt-2 px-2.5 py-0.5 text-xs font-medium rounded-full border",
                            getStatusColor(task.status)
                        )}>
                            {task.status}
                        </span>
                        {task.dueDate && (
                            <span className="block mt-1 text-xs text-gray-500">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react';
import TaskItem from './TaskItem';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isSameMonth, isSameDay, parseISO } from 'date-fns';

const CalendarView = ({ tasks, onEdit }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in-up">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <CalIcon size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {format(currentMonth, "MMMM yyyy")}
                    </h2>
                </div>
                <div className="flex space-x-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-4">
                {weekDays.map(day => (
                    <div key={day} className="text-center font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4">
                {days.map((day, dayIdx) => {
                    // Filter tasks for this day
                    const dayTasks = tasks.filter(task => {
                        if (!task.dueDate) return false;
                        // Robust comparison using formatted strings to ignore time/timezone
                        // task.dueDate is YYYY-MM-DD string from backend
                        // day is a Date object
                        return task.dueDate === format(day, "yyyy-MM-dd");
                    });

                    return (
                        <div
                            key={day.toString()}
                            className={`min-h-[120px] rounded-lg border p-2 transition-colors relative group
                                ${!isSameMonth(day, monthStart)
                                    ? "bg-gray-50 dark:bg-gray-900/50 text-gray-400 border-gray-100 dark:border-gray-800"
                                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 hover:border-primary/50"
                                }
                                ${isSameDay(day, new Date()) ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900" : ""}
                            `}
                        >
                            <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-2
                                ${isSameDay(day, new Date()) ? "bg-primary text-white" : ""}
                            `}>
                                {format(day, dateFormat)}
                            </span>

                            <div className="space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar">
                                {dayTasks.map(task => (
                                    <div
                                        key={task.id}
                                        onClick={() => onEdit(task)}
                                        className={`text-xs p-1.5 rounded cursor-pointer truncate border-l-2 transition-all hover:scale-[1.02]
                                            ${task.status === 'Completed' ? 'bg-green-50 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300' :
                                                task.status === 'In Progress' ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300' :
                                                    'bg-gray-100 dark:bg-gray-700 border-gray-400 text-gray-700 dark:text-gray-300'}
                                        `}
                                        title={task.title}
                                    >
                                        {task.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;

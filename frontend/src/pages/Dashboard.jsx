import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTasks, updateTask, reset, deleteTask, updateTaskStatus } from '../store/taskSlice';
import { logout, reset as authReset } from '../store/authSlice';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import TaskChart from '../components/TaskChart';
import KanbanBoard from '../components/KanbanBoard';
import CalendarView from '../components/CalendarView';
import { Plus, LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { tasks, isLoading, error } = useSelector((state) => state.tasks);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Theme State
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            dispatch(getTasks());
        }

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, dispatch]);

    const onLogout = () => {
        dispatch(logout());
        dispatch(authReset());
        navigate('/login');
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('board'); // 'list' or 'board'

    const filteredTasks = tasks.filter(task => {
        const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const task = tasks.find(t => t.id.toString() === taskId);
            if (task) {
                // 1. Optimistic Update (Update Redux status instantly)
                dispatch(updateTaskStatus({ id: taskId, status: newStatus }));

                // 2. Persist to Backend
                await dispatch(updateTask({
                    id: task.id,
                    taskData: { ...task, status: newStatus }
                })).unwrap();

                toast.success(`Moved to ${newStatus}`);
            }
        } catch (error) {
            // Revert if failed (optional, but good practice). For now letting user reload manually or error message suffice.
            // To revert specific task would require knowing previous status or reloading all tasks.
            dispatch(getTasks()); // Re-fetch to ensure sync
            toast.error('Failed to move task');
        }
    };

    return (
        <div className="min-h-screen bg-background text-text transition-colors duration-300">
            {/* Header */}
            <header className="bg-surface border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <LayoutDashboard className="text-primary h-6 w-6" />
                        </div>
                        <h1 className="text-xl font-bold text-text">
                            Task Manager
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            title="Toggle Theme"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline-block">
                            Hello, <span className="text-text font-medium">{user && user.username}</span>
                        </span>
                        <button
                            onClick={onLogout}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">

                    {/* Stats Section (Horizontal on top) */}
                    <div className="bg-surface p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="w-full sm:w-1/3">
                            <h2 className="text-lg font-semibold text-text mb-2">Overview</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Track your project progress</p>
                        </div>
                        <div className="flex-1 w-full grid grid-cols-3 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-gray-700 dark:text-gray-200">{tasks.length}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">Total</div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-green-600 dark:text-green-400">{tasks.filter(t => t.status === 'Completed').length}</div>
                                <div className="text-xs text-green-600 dark:text-green-400 uppercase">Done</div>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{tasks.filter(t => t.status === 'In Progress').length}</div>
                                <div className="text-xs text-blue-600 dark:text-blue-400 uppercase">Active</div>
                            </div>
                        </div>
                        <div className="w-48 h-48 hidden sm:block">
                            <TaskChart tasks={tasks} />
                        </div>
                    </div>

                    {/* Task Area */}
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center space-x-4">
                                <h2 className="text-2xl font-bold text-text">Your Board</h2>
                                <div className="flex bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`px-3 py-1 text-sm rounded-md transition-all ${viewMode === 'list' ? 'bg-surface shadow text-text' : 'text-gray-500 dark:text-gray-400'}`}
                                    >
                                        List
                                    </button>
                                    <button
                                        onClick={() => setViewMode('board')}
                                        className={`px-3 py-1 text-sm rounded-md transition-all ${viewMode === 'board' ? 'bg-surface shadow text-text' : 'text-gray-500 dark:text-gray-400'}`}
                                    >
                                        Board
                                    </button>
                                    <button
                                        onClick={() => setViewMode('calendar')}
                                        className={`px-3 py-1 text-sm rounded-md transition-all ${viewMode === 'calendar' ? 'bg-surface shadow text-text' : 'text-gray-500 dark:text-gray-400'}`}
                                    >
                                        Calendar
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-surface border border-gray-300 dark:border-gray-600 text-text text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none w-full sm:w-48 placeholder-gray-400 dark:placeholder-gray-500"
                                />

                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-indigo-700 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                                >
                                    <Plus size={20} />
                                    <span>New Task</span>
                                </button>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
                        ) : tasks.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                                <p className="text-gray-500 dark:text-gray-400 mb-4">No tasks found. Create one to get started!</p>
                                <button
                                    onClick={() => {
                                        setEditingTask(null);
                                        setIsModalOpen(true);
                                    }}
                                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    <Plus size={20} className="mr-2" />
                                    New Task
                                </button>
                            </div>
                        ) : (
                            <>
                                {viewMode === 'list' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                                        {filteredTasks.map((task) => (
                                            <TaskItem key={task.id} task={task} onEdit={handleEdit} />
                                        ))}
                                    </div>
                                )}
                                {viewMode === 'board' && (
                                    <KanbanBoard
                                        tasks={filteredTasks}
                                        onEdit={handleEdit}
                                        onStatusChange={handleStatusChange}
                                    />
                                )}
                                {viewMode === 'calendar' && (
                                    <CalendarView
                                        tasks={filteredTasks}
                                        onEdit={handleEdit}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            {/* Task Modal */}
            {isModalOpen && (
                <TaskForm
                    onClose={handleCloseModal}
                    initialData={editingTask}
                />
            )}
        </div>
    );
};

export default Dashboard;

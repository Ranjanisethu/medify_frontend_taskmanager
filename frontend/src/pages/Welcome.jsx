import { useNavigate } from 'react-router-dom';
import { CheckCircle2, BarChart, Layout, Move } from 'lucide-react';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden pt-14">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-center">
                        <div className="max-w-xl lg:max-w-lg">
                            <div className="mt-10 sm:mt-0">
                                <a href="#" className="inline-flex space-x-6">
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/10">
                                        New Release v2.0
                                    </span>
                                    <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                                        <span>Powering Next-Gen Teams</span>
                                    </span>
                                </a>
                            </div>
                            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Orchestrate your life, <span className="text-primary">effortlessly.</span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Stop constantly switching contexts. With our fluid <b>Kanban Board</b> and real-time insights, you'll flow through tasks like never before. It's not just a todo list; it's your command center.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all hover:scale-105 active:scale-95"
                                >
                                    Launch Dashboard
                                </button>
                                <a href="#features" className="text-sm font-semibold leading-6 text-gray-900 group">
                                    See features <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                                </a>
                            </div>
                        </div>
                        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
                            <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 transform hover:scale-[1.01] transition-transform duration-500">
                                <img
                                    src="/hero.png"
                                    alt="App screenshot"
                                    className="w-full rounded-md shadow-2xl ring-1 ring-gray-900/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div id="features" className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 bg-gray-50 rounded-3xl mb-12">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary">Deploy faster</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Everything you need to master your workflow
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Streamline your projects with our intuitive interface. From effortless drag-and-drop boards to real-time analytics, we provide the toolkit you need to succeed.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                        <div className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                <Layout className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                Kanban & List Views
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                <p className="flex-auto">Switch between board and list views to handle your tasks the way you like.</p>
                            </dd>
                        </div>
                        <div className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                <Move className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                Drag & Drop
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                <p className="flex-auto">Effortlessly move tasks between statuses with our smooth drag and drop interface.</p>
                            </dd>
                        </div>
                        <div className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                <BarChart className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                Real-time Analytics
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                <p className="flex-auto">Visualize your productivity with instant charts and stats updating in real-time.</p>
                            </dd>
                        </div>
                        <div className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                <CheckCircle2 className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                Task Tracking
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                <p className="flex-auto">Never miss a deadline. Create, edit, and complete tasks with ease.</p>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Welcome;

import { ProjectList } from '../projects/ProjectList';

export const Sidebar = () => {
    return (
        <aside className="w-80 bg-slate-800 text-white p-6 flex flex-col h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-blue-400">ProjectHub</h1>
                <p className="text-xs text-gray-400 mt-1">MERN Stack Project Manager</p>
            </div>

            {/* Project List */}
            <div className="flex-1 overflow-hidden">
                <ProjectList />
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-700">
                <p className="text-xs text-gray-400 text-center">
                    Built with React + Express + MongoDB
                </p>
            </div>
        </aside>
    );
};

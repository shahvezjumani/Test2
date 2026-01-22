import { useApp } from '../../context/ProjectContext';

export const ProjectCard = ({ project, onDelete }) => {
    const { currentProject, setCurrentProject } = useApp();
    const isActive = currentProject?._id === project._id;

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm(`Delete project "${project.name}"? This will also delete all tasks.`)) {
            onDelete(project._id);
        }
    };

    return (
        <div
            onClick={() => setCurrentProject(project)}
            className={`p-3 cursor-pointer rounded-lg transition-all mb-2 ${isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-700 text-gray-200 hover:bg-slate-600'
                }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold text-sm">{project.name}</h3>
                    {project.description && (
                        <p className={`text-xs mt-1 ${isActive ? 'text-blue-100' : 'text-gray-400'}`}>
                            {project.description.substring(0, 50)}
                            {project.description.length > 50 ? '...' : ''}
                        </p>
                    )}
                </div>
                <button
                    onClick={handleDelete}
                    className={`ml-2 px-2 py-1 rounded text-xs hover:bg-red-600 ${isActive ? 'text-white' : 'text-gray-400'
                        }`}
                    title="Delete project"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};

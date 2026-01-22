import { useApp } from '../../context/ProjectContext';

export const TaskCard = ({ task, onClick }) => {
    const { updateTask, getUserName, users } = useApp();

    const statusColors = {
        todo: 'bg-gray-100 text-gray-800 border-gray-300',
        in_progress: 'bg-blue-100 text-blue-800 border-blue-300',
        done: 'bg-green-100 text-green-800 border-green-300',
    };

    const statusLabels = {
        todo: 'To Do',
        in_progress: 'In Progress',
        done: 'Done',
    };

    const handleStatusChange = (e) => {
        e.stopPropagation();
        updateTask(task._id, { status: e.target.value });
    };

    const assignedUserName = users.length > 0 ? getUserName(task.assignedTo) : task.assignedTo;

    return (
        <div
            onClick={onClick}
            className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                    {task.description && (
                        <p className="text-sm text-gray-600 mb-2">
                            {task.description.substring(0, 100)}
                            {task.description.length > 100 ? '...' : ''}
                        </p>
                    )}
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center">
                            👤 {assignedUserName}
                        </span>
                        {task.comments && task.comments.length > 0 && (
                            <span className="flex items-center">
                                💬 {task.comments.length}
                            </span>
                        )}
                    </div>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                    <select
                        value={task.status}
                        onChange={handleStatusChange}
                        className={`px-2 py-1 text-xs rounded-full border font-medium ${statusColors[task.status]}`}
                    >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

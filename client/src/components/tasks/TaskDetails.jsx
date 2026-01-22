import { useApp } from '../../context/ProjectContext';
import { CommentSection } from './CommentSection';
import { Button } from '../common/Button';

export const TaskDetails = ({ task, onClose, onEdit, onDelete }) => {
    const { getUserName, users } = useApp();

    const statusColors = {
        todo: 'bg-gray-100 text-gray-800',
        in_progress: 'bg-blue-100 text-blue-800',
        done: 'bg-green-100 text-green-800',
    };

    const statusLabels = {
        todo: 'To Do',
        in_progress: 'In Progress',
        done: 'Done',
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleDelete = () => {
        if (window.confirm(`Delete task "${task.title}"?`)) {
            onDelete(task._id);
            onClose();
        }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div>
                <div className="flex items-start justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}>
                        {statusLabels[task.status]}
                    </span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>
                        👤 Assigned to: <strong>{users.length > 0 ? getUserName(task.assignedTo) : task.assignedTo}</strong>
                    </span>
                    <span>📅 Created: {formatDate(task.createdAt)}</span>
                </div>
            </div>

            {/* Description */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                {task.description ? (
                    <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
                ) : (
                    <p className="text-gray-500 italic">No description provided</p>
                )}
            </div>

            {/* Comments */}
            <CommentSection task={task} />

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="danger" size="sm" onClick={handleDelete}>
                    Delete Task
                </Button>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => onEdit(task)}>
                        Edit Task
                    </Button>
                </div>
            </div>
        </div>
    );
};

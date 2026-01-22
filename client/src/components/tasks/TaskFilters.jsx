export const TaskFilters = ({ statusFilter, onStatusChange }) => {
    return (
        <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Filter by status:</label>
            <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Tasks</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
            </select>
        </div>
    );
};

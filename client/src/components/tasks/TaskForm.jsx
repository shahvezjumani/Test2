import { useState, useEffect } from 'react';
import { useApp } from '../../context/ProjectContext';
import { Button } from '../common/Button';

export const TaskForm = ({ task, onSubmit, onCancel }) => {
    const { users } = useApp();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignedTo: '',
        status: 'todo',
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                assignedTo: task.assignedTo || '',
                status: task.status || 'todo',
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task title"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    maxLength={2000}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task description (optional)"
                />
            </div>

            <div>
                <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To *
                </label>
                <select
                    id="assignedTo"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                </label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary">
                    {task ? 'Update Task' : 'Create Task'}
                </Button>
            </div>
        </form>
    );
};

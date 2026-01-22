import { useEffect, useState } from 'react';
import { useApp } from '../../context/ProjectContext';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { TaskDetails } from './TaskDetails';
import { TaskFilters } from './TaskFilters';
import { Modal } from '../common/Modal';
import { Loading } from '../common/Loading';
import { Button } from '../common/Button';

export const TaskList = ({ projectId }) => {
    const { tasks, fetchTasks, createTask, updateTask, deleteTask, loading, fetchUsers } = useApp();
    const [statusFilter, setStatusFilter] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        if (projectId) {
            fetchTasks(projectId, statusFilter);
            fetchUsers();
        }
    }, [projectId, statusFilter, fetchTasks, fetchUsers]);

    const handleCreateTask = async (taskData) => {
        try {
            await createTask(projectId, taskData);
            setShowCreateModal(false);
        } catch (err) {
            console.error('Failed to create task', err);
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            await updateTask(selectedTask._id, taskData);
            setShowEditModal(false);
            setSelectedTask(null);
        } catch (err) {
            console.error('Failed to update task', err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
        } catch (err) {
            console.error('Failed to delete task', err);
        }
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowDetailsModal(true);
    };

    const handleEditFromDetails = (task) => {
        setShowDetailsModal(false);
        setSelectedTask(task);
        setShowEditModal(true);
    };

    const groupedTasks = {
        todo: tasks.filter((t) => t.status === 'todo'),
        in_progress: tasks.filter((t) => t.status === 'in_progress'),
        done: tasks.filter((t) => t.status === 'done'),
    };

    return (
        <div>
            {/* Header with Filters */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
                    <TaskFilters statusFilter={statusFilter} onStatusChange={setStatusFilter} />
                </div>
                <Button onClick={() => setShowCreateModal(true)}>+ New Task</Button>
            </div>

            {/* Loading State */}
            {loading && tasks.length === 0 ? (
                <Loading text="Loading tasks..." />
            ) : tasks.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No tasks yet. Create your first task!</p>
                    <Button onClick={() => setShowCreateModal(true)}>Create Task</Button>
                </div>
            ) : statusFilter ? (
                /* Filtered List View */
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <TaskCard key={task._id} task={task} onClick={() => handleTaskClick(task)} />
                    ))}
                </div>
            ) : (
                /* Kanban Board View */
                <div className="grid grid-cols-3 gap-4">
                    {['todo', 'in_progress', 'done'].map((status) => (
                        <div key={status} className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-3 flex items-center justify-between">
                                <span>
                                    {status === 'todo' && '📋 To Do'}
                                    {status === 'in_progress' && '🔄 In Progress'}
                                    {status === 'done' && '✅ Done'}
                                </span>
                                <span className="bg-white px-2 py-1 rounded text-xs">
                                    {groupedTasks[status].length}
                                </span>
                            </h3>
                            <div className="space-y-2">
                                {groupedTasks[status].map((task) => (
                                    <TaskCard key={task._id} task={task} onClick={() => handleTaskClick(task)} />
                                ))}
                                {groupedTasks[status].length === 0 && (
                                    <p className="text-sm text-gray-400 italic text-center py-4">No tasks</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Task Modal */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Create New Task"
                size="md"
            >
                <TaskForm
                    onSubmit={handleCreateTask}
                    onCancel={() => setShowCreateModal(false)}
                    projectId={projectId}
                />
            </Modal>

            {/* Edit Task Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedTask(null);
                }}
                title="Edit Task"
                size="md"
            >
                {selectedTask && (
                    <TaskForm
                        initialData={selectedTask}
                        onSubmit={handleUpdateTask}
                        onCancel={() => {
                            setShowEditModal(false);
                            setSelectedTask(null);
                        }}
                        projectId={projectId}
                    />
                )}
            </Modal>

            {/* Task Details Modal */}
            <Modal
                isOpen={showDetailsModal}
                onClose={() => {
                    setShowDetailsModal(false);
                    setSelectedTask(null);
                }}
                title="Task Details"
                size="lg"
            >
                {selectedTask && (
                    <TaskDetails
                        task={selectedTask}
                        onClose={() => {
                            setShowDetailsModal(false);
                            setSelectedTask(null);
                        }}
                        onEdit={handleEditFromDetails}
                        onDelete={handleDeleteTask}
                    />
                )}
            </Modal>
        </div>
    );
};

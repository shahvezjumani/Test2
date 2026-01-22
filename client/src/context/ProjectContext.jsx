import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { apiService } from '../api/apiService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ===== PROJECTS =====

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await apiService.getProjects();
            setProjects(res.data);
            // Auto-select first project if none selected
            if (!currentProject && res.data.length > 0) {
                setCurrentProject(res.data[0]);
            }
        } catch (err) {
            setError('Failed to fetch projects');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [currentProject]);

    const createProject = useCallback(async (projectData) => {
        try {
            setError(null);
            const res = await apiService.createProject(projectData);
            setProjects(prev => [...prev, res.data]);
            return res.data;
        } catch (err) {
            setError('Failed to create project');
            console.error(err);
            throw err;
        }
    }, []);

    const updateProject = useCallback(async (projectId, updateData) => {
        try {
            setError(null);
            const res = await apiService.updateProject(projectId, updateData);
            setProjects(prev => prev.map((p) => (p._id === projectId ? res.data : p)));
            setCurrentProject(prev => prev?._id === projectId ? res.data : prev);
            return res.data;
        } catch (err) {
            setError('Failed to update project');
            console.error(err);
            throw err;
        }
    }, []);

    const deleteProject = useCallback(async (projectId) => {
        try {
            setError(null);
            await apiService.deleteProject(projectId);
            setProjects(prev => {
                const filtered = prev.filter((p) => p._id !== projectId);
                return filtered;
            });
            setCurrentProject(prev => {
                if (prev?._id === projectId) {
                    return null;
                }
                return prev;
            });
        } catch (err) {
            setError('Failed to delete project');
            console.error(err);
            throw err;
        }
    }, []);

    // ===== TASKS =====

    const fetchTasks = useCallback(async (projectId, statusFilter = '') => {
        try {
            setLoading(true);
            setError(null);
            const res = await apiService.getTasks(projectId, statusFilter);
            setTasks(res.data);
        } catch (err) {
            setError('Failed to fetch tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createTask = useCallback(async (projectId, taskData) => {
        try {
            setError(null);
            const res = await apiService.createTask(projectId, taskData);
            setTasks(prev => [...prev, res.data]);
            return res.data;
        } catch (err) {
            setError('Failed to create task');
            console.error(err);
            throw err;
        }
    }, []);

    const updateTask = useCallback(async (taskId, updateData) => {
        // Optimistic update
        let previousTasks;
        setTasks(prev => {
            previousTasks = [...prev];
            return prev.map((t) => (t._id === taskId ? { ...t, ...updateData } : t));
        });

        try {
            setError(null);
            const res = await apiService.updateTask(taskId, updateData);
            setTasks(prev => prev.map((t) => (t._id === taskId ? res.data : t)));
            setSelectedTask(prev => prev?._id === taskId ? res.data : prev);
            return res.data;
        } catch (err) {
            // Rollback on error
            setTasks(previousTasks);
            setError('Failed to update task');
            console.error(err);
            throw err;
        }
    }, []);

    const deleteTask = useCallback(async (taskId) => {
        try {
            setError(null);
            await apiService.deleteTask(taskId);
            setTasks(prev => prev.filter((t) => t._id !== taskId));
            setSelectedTask(prev => prev?._id === taskId ? null : prev);
        } catch (err) {
            setError('Failed to delete task');
            console.error(err);
            throw err;
        }
    }, []);

    const addComment = useCallback(async (taskId, text) => {
        try {
            setError(null);
            const res = await apiService.addComment(taskId, text);
            // Update task with new comment
            setTasks(prev =>
                prev.map((t) =>
                    t._id === taskId ? { ...t, comments: [...t.comments, res.data] } : t
                )
            );
            setSelectedTask(prev => {
                if (prev?._id === taskId) {
                    return {
                        ...prev,
                        comments: [...prev.comments, res.data],
                    };
                }
                return prev;
            });
            return res.data;
        } catch (err) {
            setError('Failed to add comment');
            console.error(err);
            throw err;
        }
    }, []);

    // ===== USERS =====

    const fetchUsers = useCallback(async () => {
        try {
            const res = await apiService.getUsers();
            setUsers(res.data);
        } catch (err) {
            console.error('Failed to fetch users', err);
        }
    }, []);

    const getUserName = (userId) => {
        const user = users.find((u) => u._id === userId);
        return user ? user.name : 'Unknown User';
    };

    const value = useMemo(() => ({
        // State
        projects,
        currentProject,
        tasks,
        users,
        selectedTask,
        loading,
        error,

        // Project actions
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        setCurrentProject,

        // Task actions
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        setSelectedTask,

        // Comment actions
        addComment,

        // User actions
        fetchUsers,
        getUserName,

        // Utility
        clearError: () => setError(null),
    }), [
        projects,
        currentProject,
        tasks,
        users,
        selectedTask,
        loading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        addComment,
        fetchUsers,
    ]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

// Backward compatibility
export const ProjectProvider = AppProvider;
export const useProjects = useApp;
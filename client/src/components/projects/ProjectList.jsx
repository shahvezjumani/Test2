import { useEffect, useState } from 'react';
import { useApp } from '../../context/ProjectContext';
import { ProjectCard } from './ProjectCard';
import { ProjectForm } from './ProjectForm';
import { Modal } from '../common/Modal';
import { Loading } from '../common/Loading';
import { Button } from '../common/Button';

export const ProjectList = () => {
    const { projects, fetchProjects, createProject, deleteProject, loading } = useApp();
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async (projectData) => {
        try {
            await createProject(projectData);
            setShowCreateModal(false);
        } catch (err) {
            console.error('Failed to create project', err);
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await deleteProject(projectId);
        } catch (err) {
            console.error('Failed to delete project', err);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Projects</h2>
                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setShowCreateModal(true)}
                    className="text-xs"
                >
                    + New
                </Button>
            </div>

            {loading && projects.length === 0 ? (
                <div className="text-gray-400 text-sm">Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className="text-gray-400 text-sm">
                    No projects yet. Create your first project!
                </div>
            ) : (
                <div className="space-y-2 overflow-y-auto flex-1">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            onDelete={handleDeleteProject}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Create New Project"
                size="md"
            >
                <ProjectForm
                    onSubmit={handleCreateProject}
                    onCancel={() => setShowCreateModal(false)}
                />
            </Modal>
        </div>
    );
};

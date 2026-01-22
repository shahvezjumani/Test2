import { useApp } from '../../context/ProjectContext';

export const Header = () => {
    const { currentProject } = useApp();

    return (
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    {currentProject ? (
                        <>
                            <h1 className="text-3xl font-bold text-gray-900">{currentProject.name}</h1>
                            {currentProject.description && (
                                <p className="text-gray-600 mt-1">{currentProject.description}</p>
                            )}
                        </>
                    ) : (
                        <h1 className="text-2xl font-semibold text-gray-500">Select a project to get started</h1>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Current User</p>
                        <p className="font-medium text-gray-900">John Doe</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
};

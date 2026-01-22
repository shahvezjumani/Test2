import { AppProvider, useApp } from './context/ProjectContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { TaskList } from './components/tasks/TaskList';
import { ErrorMessage } from './components/common/ErrorMessage';
import './App.css';

const Dashboard = () => {
  const { currentProject, error, clearError } = useApp();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Error Display */}
          {error && <ErrorMessage message={error} onClose={clearError} />}

          {/* Task List or Empty State */}
          {currentProject ? (
            <TaskList projectId={currentProject._id} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">📋</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">
                  Welcome to ProjectHub
                </h2>
                <p className="text-gray-500 mb-6">
                  Select a project from the sidebar or create a new one to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}

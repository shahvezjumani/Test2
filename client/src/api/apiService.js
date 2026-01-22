import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";
const MOCK_MODE = false; // ⚠️ TOGGLE THIS TO FALSE WHEN BACKEND IS READY

// ========== MOCK DATA ==========
const mockUsers = [
  { _id: "user1", name: "John Doe" },
  { _id: "user2", name: "Jane Smith" },
  { _id: "user3", name: "Bob Johnson" },
  { _id: "user4", name: "Alice Williams" },
];

let mockProjects = [
  {
    _id: "proj1",
    name: "E-Commerce Platform",
    description: "Building a scalable online store with MERN stack",
    createdAt: new Date("2026-01-10"),
    updatedAt: new Date("2026-01-20"),
  },
  {
    _id: "proj2",
    name: "Mobile App Backend",
    description: "REST API for mobile application",
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-22"),
  },
  {
    _id: "proj3",
    name: "Portfolio Website",
    description: "Personal portfolio with blog functionality",
    createdAt: new Date("2026-01-18"),
    updatedAt: new Date("2026-01-21"),
  },
];

let mockTasks = [
  {
    _id: "task1",
    projectId: "proj1",
    title: "Setup Database Schema",
    description:
      "Design and implement MongoDB schema for products, users, and orders",
    assignedTo: "user1",
    status: "done",
    comments: [
      {
        userId: "user2",
        text: "Great work on the schema design!",
        createdAt: new Date("2026-01-12"),
      },
      {
        userId: "user1",
        text: "Thanks! Added indexes for better performance.",
        createdAt: new Date("2026-01-12"),
      },
    ],
    createdAt: new Date("2026-01-10"),
    updatedAt: new Date("2026-01-12"),
  },
  {
    _id: "task2",
    projectId: "proj1",
    title: "Implement Payment Gateway",
    description: "Integrate Stripe for payment processing",
    assignedTo: "user2",
    status: "in_progress",
    comments: [
      {
        userId: "user2",
        text: "Working on Stripe webhook integration",
        createdAt: new Date("2026-01-20"),
      },
    ],
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-20"),
  },
  {
    _id: "task3",
    projectId: "proj1",
    title: "Create Product Catalog UI",
    description: "Build responsive product listing and detail pages",
    assignedTo: "user3",
    status: "todo",
    comments: [],
    createdAt: new Date("2026-01-18"),
    updatedAt: new Date("2026-01-18"),
  },
  {
    _id: "task4",
    projectId: "proj2",
    title: "Setup Authentication",
    description: "JWT-based auth with refresh tokens",
    assignedTo: "user1",
    status: "done",
    comments: [
      {
        userId: "user1",
        text: "Auth implemented with bcrypt and JWT",
        createdAt: new Date("2026-01-17"),
      },
    ],
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-17"),
  },
  {
    _id: "task5",
    projectId: "proj2",
    title: "Build RESTful Endpoints",
    description: "Create CRUD operations for all resources",
    assignedTo: "user4",
    status: "in_progress",
    comments: [],
    createdAt: new Date("2026-01-19"),
    updatedAt: new Date("2026-01-21"),
  },
  {
    _id: "task6",
    projectId: "proj3",
    title: "Design Homepage Layout",
    description: "Create responsive hero section and portfolio grid",
    assignedTo: "user2",
    status: "todo",
    comments: [],
    createdAt: new Date("2026-01-20"),
    updatedAt: new Date("2026-01-20"),
  },
];

// ========== AXIOS INSTANCE ==========
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========== API SERVICE ==========
export const apiService = {
  // ===== PROJECTS =====

  /**
   * Fetch all projects
   * @returns {Promise} Array of projects
   */
  getProjects: async () => {
    if (MOCK_MODE) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: mockProjects }), 300);
      });
    }
    const response = await api.get("/projects");
    return { data: response.data.data };
  },

  /**
   * Create a new project
   * @param {Object} projectData - { name, description }
   * @returns {Promise} Created project
   */
  createProject: async (projectData) => {
    if (MOCK_MODE) {
      const newProject = {
        _id: `proj${Date.now()}`,
        ...projectData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockProjects = [...mockProjects, newProject];
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: newProject }), 300);
      });
    }
    const response = await api.post("/projects", projectData);
    return { data: response.data.data };
  },

  /**
   * Update a project
   * @param {string} projectId
   * @param {Object} updateData - { name, description }
   * @returns {Promise} Updated project
   */
  updateProject: async (projectId, updateData) => {
    if (MOCK_MODE) {
      mockProjects = mockProjects.map((p) =>
        p._id === projectId
          ? { ...p, ...updateData, updatedAt: new Date() }
          : p,
      );
      const updated = mockProjects.find((p) => p._id === projectId);
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: updated }), 300);
      });
    }
    const response = await api.patch(`/projects/${projectId}`, updateData);
    return { data: response.data.data };
  },

  /**
   * Delete a project
   * @param {string} projectId
   * @returns {Promise}
   */
  deleteProject: async (projectId) => {
    if (MOCK_MODE) {
      mockProjects = mockProjects.filter((p) => p._id !== projectId);
      mockTasks = mockTasks.filter((t) => t.projectId !== projectId);
      return new Promise((resolve) => {
        setTimeout(
          () => resolve({ data: { message: "Project deleted" } }),
          300,
        );
      });
    }
    const response = await api.delete(`/projects/${projectId}`);
    return { data: response.data.data };
  },

  // ===== TASKS =====

  /**
   * Fetch tasks for a specific project
   * @param {string} projectId
   * @param {string} status - Optional filter: 'todo', 'in_progress', 'done'
   * @returns {Promise} Array of tasks
   */
  getTasks: async (projectId, status = "") => {
    if (MOCK_MODE) {
      let filtered = mockTasks.filter((t) => t.projectId === projectId);
      if (status) {
        filtered = filtered.filter((t) => t.status === status);
      }
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: filtered }), 300);
      });
    }
    const response = await api.get(`/projects/${projectId}/tasks`, {
      params: { status },
    });
    return { data: response.data.data };
  },

  /**
   * Create a new task in a project
   * @param {string} projectId
   * @param {Object} taskData - { title, description, assignedTo, status }
   * @returns {Promise} Created task
   */
  createTask: async (projectId, taskData) => {
    if (MOCK_MODE) {
      const newTask = {
        _id: `task${Date.now()}`,
        projectId,
        ...taskData,
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTasks = [...mockTasks, newTask];
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: newTask }), 300);
      });
    }
    const response = await api.post(`/projects/${projectId}/tasks`, taskData);
    return { data: response.data.data };
  },

  /**
   * Update task details
   * @param {string} taskId
   * @param {Object} updateData - { title, description, assignedTo, status }
   * @returns {Promise} Updated task
   */
  updateTask: async (taskId, updateData) => {
    if (MOCK_MODE) {
      mockTasks = mockTasks.map((t) =>
        t._id === taskId ? { ...t, ...updateData, updatedAt: new Date() } : t,
      );
      const updated = mockTasks.find((t) => t._id === taskId);
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: updated }), 300);
      });
    }
    const response = await api.patch(`/tasks/${taskId}`, updateData);
    return { data: response.data.data };
  },

  /**
   * Delete a task
   * @param {string} taskId
   * @returns {Promise}
   */
  deleteTask: async (taskId) => {
    if (MOCK_MODE) {
      mockTasks = mockTasks.filter((t) => t._id !== taskId);
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: { message: "Task deleted" } }), 300);
      });
    }
    const response = await api.delete(`/tasks/${taskId}`);
    return { data: response.data.data };
  },

  /**
   * Add a comment to a task
   * @param {string} taskId
   * @param {string} text - Comment text
   * @returns {Promise} Created comment
   */
  addComment: async (taskId, text) => {
    if (MOCK_MODE) {
      const newComment = {
        userId: "user1", // Mock current user
        text,
        createdAt: new Date(),
      };
      mockTasks = mockTasks.map((t) =>
        t._id === taskId
          ? {
              ...t,
              comments: [...t.comments, newComment],
              updatedAt: new Date(),
            }
          : t,
      );
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: newComment }), 300);
      });
    }
    const response = await api.post(`/tasks/${taskId}/comments`, {
      text,
      userId: "user1",
    });
    return { data: response.data.data };
  },

  // ===== USERS (MOCKED) =====

  /**
   * Get all users for assignment dropdown
   * @returns {Promise} Array of users
   */
  getUsers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: mockUsers }), 100);
    });
  },
};

export default apiService;

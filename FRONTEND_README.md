# ProjectHub - MERN Stack Project Management Application

A full-featured project management web application built with the MERN stack (MongoDB, Express, React, Node.js).

## 🎯 Features

- ✅ Create and manage multiple projects
- ✅ Create, update, and delete tasks within projects
- ✅ Assign tasks to team members
- ✅ Track task status (To Do, In Progress, Done)
- ✅ Add comments to tasks
- ✅ Filter tasks by status
- ✅ Kanban board view for tasks
- ✅ Optimistic UI updates
- ✅ Responsive design with Tailwind CSS

## 📁 Frontend Folder Structure

```
client/src/
├── api/
│   └── apiService.js          # Central API service with demo data and axios calls
├── components/
│   ├── common/                # Reusable UI components
│   │   ├── Button.jsx         # Customizable button component
│   │   ├── ErrorMessage.jsx   # Error display component
│   │   ├── Loading.jsx        # Loading spinner component
│   │   └── Modal.jsx          # Modal dialog component
│   ├── layout/                # Layout components
│   │   ├── Header.jsx         # Top header bar
│   │   └── Sidebar.jsx        # Left sidebar with projects
│   ├── projects/              # Project-related components
│   │   ├── ProjectCard.jsx    # Individual project card
│   │   ├── ProjectForm.jsx    # Create/Edit project form
│   │   └── ProjectList.jsx    # List of all projects
│   └── tasks/                 # Task-related components
│       ├── CommentSection.jsx # Task comments display & form
│       ├── TaskCard.jsx       # Individual task card
│       ├── TaskDetails.jsx    # Full task details modal
│       ├── TaskFilters.jsx    # Task filtering controls
│       ├── TaskForm.jsx       # Create/Edit task form
│       └── TaskList.jsx       # Task list/kanban board
├── context/
│   └── ProjectContext.jsx     # Global state management (AppContext)
├── App.jsx                    # Main application component
├── App.css                    # Application styles
├── index.css                  # Global styles with Tailwind
└── main.jsx                   # React entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the client directory:**

   ```bash
   cd client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🔧 How to Connect to Backend

The application is currently running with **MOCK DATA** for easy frontend development. When your backend is ready:

### Step 1: Locate the API Service

Open `client/src/api/apiService.js`

### Step 2: Toggle Mock Mode

Find this line at the top of the file:

```javascript
const MOCK_MODE = true; // ⚠️ TOGGLE THIS TO FALSE WHEN BACKEND IS READY
```

Change it to:

```javascript
const MOCK_MODE = false;
```

### Step 3: Update API Base URL (if needed)

If your backend runs on a different port/host, update:

```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

### Step 4: Uncomment Axios Calls

Throughout `apiService.js`, you'll see commented lines like:

```javascript
// 🔌 UNCOMMENT WHEN BACKEND IS READY:
// return await api.get('/projects');
```

Simply uncomment these lines (they're already properly formatted for your backend).

### Step 5: Remove Mock Mode Logic

For each function, remove the `if (MOCK_MODE)` block and keep only the axios call.

**Example - Before:**

```javascript
getProjects: async () => {
  if (MOCK_MODE) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: mockProjects }), 300);
    });
  }
  // 🔌 UNCOMMENT WHEN BACKEND IS READY:
  // return await api.get('/projects');
},
```

**Example - After:**

```javascript
getProjects: async () => {
  return await api.get('/projects');
},
```

## 📋 API Endpoints Expected

The frontend expects these backend endpoints:

| Method | Endpoint                      | Description                                   |
| ------ | ----------------------------- | --------------------------------------------- |
| GET    | `/projects`                   | Fetch all projects                            |
| POST   | `/projects`                   | Create a project                              |
| PATCH  | `/projects/:id`               | Update a project                              |
| DELETE | `/projects/:id`               | Delete a project                              |
| GET    | `/projects/:id/tasks?status=` | Fetch tasks (optional status filter)          |
| POST   | `/projects/:id/tasks`         | Create a task                                 |
| PATCH  | `/tasks/:id`                  | Update task (status, title, assignedTo, etc.) |
| DELETE | `/tasks/:id`                  | Delete a task                                 |
| POST   | `/tasks/:id/comments`         | Add a comment to a task                       |

## 📦 Component Usage Guide

### Creating a New Project

1. Click "+ New" button in sidebar
2. Fill in project name (required) and description
3. Submit form
4. Project appears in sidebar immediately (optimistic update)

### Creating a New Task

1. Select a project from sidebar
2. Click "+ New Task" button
3. Fill in:
   - Task title (required)
   - Description (optional)
   - Assign to user (required)
   - Status (default: To Do)
4. Task appears immediately in the appropriate column

### Updating Task Status

- **Quick update:** Click status dropdown on task card
- **Full update:** Click task → Edit Task button

### Adding Comments

1. Click on a task card to open details
2. Scroll to comments section
3. Type comment and click "Add Comment"

### Filtering Tasks

Use the status dropdown in the task list header to filter by:

- All Tasks (Kanban view)
- To Do
- In Progress
- Done

## 🎨 Customization

### Changing Colors

Edit `client/tailwind.config.js` to customize the theme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    },
  },
},
```

### Adding More Status Options

1. Update status arrays in components
2. Add corresponding colors in `statusColors` objects
3. Update backend enum if necessary

## 🧪 Demo Data

The application comes with pre-populated demo data including:

- 3 sample projects
- 6 sample tasks across projects
- 4 sample users
- Sample comments

This data is perfect for testing the UI before connecting to the backend.

## 🔄 State Management

The app uses **React Context API** (`AppContext`) for global state management:

- `projects` - All projects
- `currentProject` - Selected project
- `tasks` - Tasks for current project
- `users` - Available users for assignment
- `loading` - Loading state
- `error` - Error messages

### Key Functions Available in Context:

- `fetchProjects()` - Load all projects
- `createProject(data)` - Create new project
- `updateProject(id, data)` - Update project
- `deleteProject(id)` - Delete project
- `fetchTasks(projectId, status)` - Load tasks
- `createTask(projectId, data)` - Create task
- `updateTask(id, data)` - Update task (with optimistic updates)
- `deleteTask(id)` - Delete task
- `addComment(taskId, text)` - Add comment
- `fetchUsers()` - Load users
- `getUserName(userId)` - Get user name by ID

## 🎯 Optimistic UI Updates

Task status changes are updated **immediately** in the UI for better UX. If the backend call fails, the change is rolled back and an error is displayed.

## 📝 Code Quality Features

- ✅ Modular component architecture
- ✅ Reusable common components
- ✅ Centralized API service
- ✅ Form validation
- ✅ Error handling with user-friendly messages
- ✅ Loading states
- ✅ Responsive design
- ✅ Clean separation of concerns
- ✅ Commented code for clarity

## 🚦 Next Steps

1. **Run the frontend** - See it working with demo data
2. **Build your backend** - Implement the API endpoints listed above
3. **Toggle MOCK_MODE** - Switch from demo data to real API calls
4. **Test integration** - Verify all CRUD operations work
5. **Deploy** - Deploy both frontend and backend

## 🤝 Contributing

When adding new features:

1. Create components in appropriate folders
2. Add API calls to `apiService.js`
3. Update context if new global state is needed
4. Follow existing naming conventions
5. Add proper error handling

## 📄 License

MIT

## 👨‍💻 Author

Built as a senior MERN stack developer take-home assignment.

---

**Happy Coding! 🚀**

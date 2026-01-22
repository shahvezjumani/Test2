"# Project Management App

A full-stack MERN (MongoDB, Express, React, Node.js) project management application with task tracking, comments, and real-time updates.

---

## 🚀 Quick Start - Run Locally

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community) OR use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud database)
- **Git** - [Download](https://git-scm.com/)

---

## 📥 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/project-management-app.git
cd project-management-app
```

### 2. Setup Backend (Server)

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Configure environment variables
# Edit the .env file and update MongoDB connection string if needed
# Default: mongodb://localhost:27017/project-management
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/project_management

# Start MongoDB (if using local installation)
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Run the server
npm run dev
```

Server will start at: **http://localhost:5000**

### 3. Setup Frontend (Client)

Open a **new terminal** window:

```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Run the development server
npm run dev
```

Frontend will start at: **http://localhost:5173**

---

## ✅ Verify Everything is Running

1. **Backend:** Open http://localhost:5000/api/projects - Should return JSON with projects
2. **Frontend:** Open http://localhost:5173 - Should show the application UI
3. **MongoDB:** Check connection in server terminal - Should show "✅ MongoDB Connected"

---

## 🎯 Usage

1. **Create a Project** - Click "New Project" in the sidebar
2. **Add Tasks** - Select a project and click "Add Task"
3. **Update Task Status** - Drag tasks or use the status dropdown (To Do → In Progress → Done)
4. **Add Comments** - Click on a task to view details and add comments
5. **Filter Tasks** - Use the filter buttons to view tasks by status

---

## 📁 Project Structure

```
project-management-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Global state management
│   │   ├── api/           # API service layer
│   │   └── App.jsx        # Main app component
│   └── package.json
│
├── server/                # Express backend
│   ├── models/           # MongoDB schemas
│   ├── controllers/      # Business logic
│   ├── routes/           # API endpoints
│   ├── app.js           # Express config
│   ├── server.js        # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

**Frontend:**

- React 19.2
- Vite 7.3
- Tailwind CSS v4
- Axios
- Context API

**Backend:**

- Node.js with ES Modules
- Express 4.18
- MongoDB with Mongoose 8.0
- CORS enabled
- dotenv for configuration

---

## 🔧 Development Commands

### Backend (server/)

```bash
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start in production mode
```

### Frontend (client/)

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🌐 API Endpoints

**Base URL:** `http://localhost:5000/api`

### Projects

- `GET /projects` - Get all projects
- `POST /projects` - Create project
- `GET /projects/:id` - Get single project
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Tasks

- `GET /projects/:projectId/tasks` - Get tasks by project
- `POST /projects/:projectId/tasks` - Create task
- `GET /tasks/:id` - Get single task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `POST /tasks/:id/comments` - Add comment

---

## 🐛 Troubleshooting

### Backend won't start

- Check if MongoDB is running: `mongosh`
- Check if port 5000 is available
- Verify `.env` file exists in `server/` folder

### Frontend won't start

- Check if port 5173 is available
- Delete `node_modules` and run `npm install` again
- Clear browser cache

### Can't connect to backend

- Verify backend is running on http://localhost:5000
- Check CORS settings in `server/app.js`
- Verify `API_BASE_URL` in `client/src/api/apiService.js`

### MongoDB connection failed

- Ensure MongoDB service is running
- Check connection string in `server/.env`
- For MongoDB Atlas: Verify IP whitelist and credentials

---

## 📄 License

MIT

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Happy Coding! 🚀**"

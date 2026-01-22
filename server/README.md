# Project Management API - Backend

RESTful API for the Project Management application built with Node.js, Express, and MongoDB.

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher) - Running locally or MongoDB Atlas

### Installation

1. **Navigate to server directory:**

   ```bash
   cd server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the server directory (already exists with defaults):

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/project-management
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB:**

   If using local MongoDB:

   ```bash
   # Windows
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongod
   ```

5. **Run the server:**

   Development mode (with auto-restart):

   ```bash
   npm run dev
   ```

   Production mode:

   ```bash
   npm start
   ```

6. **Server will be running at:**
   ```
   http://localhost:5000
   ```

---

## 📁 Project Structure

```
server/
├── controllers/
│   ├── projectController.js    # Project CRUD operations
│   └── taskController.js        # Task CRUD operations & comments
├── models/
│   ├── Project.js               # Project schema & model
│   └── Task.js                  # Task schema & model with comments
├── routes/
│   ├── projectRoutes.js         # Project endpoints
│   └── taskRoutes.js            # Task & comment endpoints
├── app.js                       # Express app configuration
├── server.js                    # Server entry point & DB connection
├── package.json                 # Dependencies & scripts
├── .env                         # Environment variables
└── .gitignore                   # Git ignore file
```

---

## 🗄️ Data Models

### Project Model

```javascript
{
  _id: ObjectId,
  name: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Task Model

```javascript
{
  _id: ObjectId,
  projectId: ObjectId (required, ref: Project),
  title: String (required, max 200 chars),
  description: String (optional, max 2000 chars),
  assignedTo: String (required, user ID),
  status: Enum ['todo', 'in_progress', 'done'] (default: 'todo'),
  comments: [
    {
      userId: String (required),
      text: String (required, max 1000 chars),
      createdAt: Date (auto)
    }
  ],
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 📡 API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Projects

#### Get All Projects

```http
GET /api/projects
```

**Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [...]
}
```

#### Get Single Project

```http
GET /api/projects/:id
```

**Response:**

```json
{
  "success": true,
  "data": { ... }
}
```

#### Create Project

```http
POST /api/projects
Content-Type: application/json

{
  "name": "Project Name",
  "description": "Optional description"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Project created successfully",
  "data": { ... }
}
```

#### Update Project

```http
PATCH /api/projects/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": { ... }
}
```

#### Delete Project

```http
DELETE /api/projects/:id
```

**Response:**

```json
{
  "success": true,
  "message": "Project and all associated tasks deleted successfully",
  "data": { "id": "..." }
}
```

**Note:** Deleting a project also deletes all its tasks (cascade delete).

---

### Tasks

#### Get Tasks by Project

```http
GET /api/projects/:projectId/tasks
GET /api/projects/:projectId/tasks?status=todo
GET /api/projects/:projectId/tasks?status=in_progress
GET /api/projects/:projectId/tasks?status=done
```

**Query Parameters:**

- `status` (optional): Filter by status ('todo', 'in_progress', 'done')

**Response:**

```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

#### Create Task

```http
POST /api/projects/:projectId/tasks
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Optional description",
  "assignedTo": "user1",
  "status": "todo"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": { ... }
}
```

#### Get Single Task

```http
GET /api/tasks/:id
```

**Response:**

```json
{
  "success": true,
  "data": { ... }
}
```

#### Update Task

```http
PATCH /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "assignedTo": "user2",
  "status": "in_progress"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": { ... }
}
```

#### Delete Task

```http
DELETE /api/tasks/:id
```

**Response:**

```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": { "id": "..." }
}
```

---

### Comments

#### Add Comment to Task

```http
POST /api/tasks/:id/comments
Content-Type: application/json

{
  "text": "This is a comment",
  "userId": "user1"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Comment added successfully",
  "data": {
    "userId": "user1",
    "text": "This is a comment",
    "createdAt": "2026-01-22T..."
  }
}
```

---

## 🔒 Error Handling

All endpoints return consistent error responses:

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error, invalid ID)
- `404` - Not Found
- `500` - Server Error

### Example Error Responses

**Validation Error:**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Project name is required"]
}
```

**Not Found:**

```json
{
  "success": false,
  "message": "Project not found"
}
```

**Invalid ID:**

```json
{
  "success": false,
  "message": "Invalid project ID format"
}
```

---

## 🧪 Testing the API

### Using cURL

**Create a project:**

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Project","description":"Test description"}'
```

**Get all projects:**

```bash
curl http://localhost:5000/api/projects
```

**Create a task:**

```bash
curl -X POST http://localhost:5000/api/projects/PROJECT_ID/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","assignedTo":"user1","status":"todo"}'
```

### Using Thunder Client / Postman

1. Import the endpoints listed above
2. Set base URL: `http://localhost:5000/api`
3. Set Content-Type header: `application/json`
4. Test each endpoint

---

## 🔧 Environment Variables

| Variable      | Description                          | Default                                      |
| ------------- | ------------------------------------ | -------------------------------------------- |
| `PORT`        | Server port                          | 5000                                         |
| `MONGODB_URI` | MongoDB connection string            | mongodb://localhost:27017/project-management |
| `NODE_ENV`    | Environment (development/production) | development                                  |
| `CLIENT_URL`  | Frontend URL for CORS                | http://localhost:5173                        |

---

## 🗃️ Database Setup

### Local MongoDB

1. **Install MongoDB:**
   - Download from https://www.mongodb.com/try/download/community

2. **Start MongoDB:**

   ```bash
   # Windows
   net start MongoDB

   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

3. **Verify connection:**
   ```bash
   mongosh
   ```

### MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-management
   ```

---

## 📊 Database Indexes

Optimized indexes for better query performance:

**Project:**

- `createdAt` (descending) - For sorting

**Task:**

- `projectId` - For project-based queries
- `status` - For status filtering
- `{projectId, status}` - Compound index for filtered queries
- `{projectId, createdAt}` - For sorted project tasks

---

## 🚦 Validation Rules

### Project

- `name`: Required, max 100 characters
- `description`: Optional, max 500 characters

### Task

- `title`: Required, max 200 characters
- `description`: Optional, max 2000 characters
- `assignedTo`: Required
- `status`: Must be 'todo', 'in_progress', or 'done'
- `projectId`: Must be valid project ID

### Comment

- `text`: Required, max 1000 characters
- `userId`: Required

---

## 🔄 Cascade Operations

**Delete Project:**

- Automatically deletes all associated tasks
- Implemented in `projectController.deleteProject()`

---

## 📝 Development Notes

### Middleware Order

1. CORS
2. Body parsers (JSON, URL-encoded)
3. Request logging (development only)
4. Routes
5. 404 handler
6. Error handler

### Controller Pattern

All controllers follow this pattern:

- Try-catch error handling
- Input validation
- Database operations
- Consistent response format
- Specific error messages

### Response Format

All successful responses include:

```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

---

## 🐛 Troubleshooting

### MongoDB Connection Failed

```bash
# Check if MongoDB is running
mongosh

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/project-management
```

### Port Already in Use

```bash
# Change port in .env
PORT=5001

# Or kill process using port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Errors

```bash
# Verify CLIENT_URL in .env matches frontend URL
CLIENT_URL=http://localhost:5173
```

---

## 📦 Dependencies

### Production

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables
- `cors` - Cross-origin resource sharing
- `express-validator` - Input validation

### Development

- `nodemon` - Auto-restart server on changes

---

## 🚀 Deployment

### Environment Setup

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
CLIENT_URL=https://your-frontend-domain.com
PORT=5000
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas or production database
- [ ] Update `CLIENT_URL` to production frontend URL
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Add authentication (if needed)
- [ ] Set up logging service
- [ ] Configure monitoring

---

## 📄 License

MIT

---

**Server is ready! Start it with `npm run dev` and connect your frontend! 🚀**

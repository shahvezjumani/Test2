import express from "express";
import {
  getTasksByProject,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  addComment,
} from "../controllers/taskController.js";

const router = express.Router();

/**
 * @route   GET /api/projects/:projectId/tasks
 * @desc    Get all tasks for a specific project (with optional status filter)
 * @access  Public
 */
router.get("/projects/:projectId/tasks", getTasksByProject);

/**
 * @route   POST /api/projects/:projectId/tasks
 * @desc    Create a new task in a project
 * @access  Public
 */
router.post("/projects/:projectId/tasks", createTask);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get single task by ID
 * @access  Public
 */
router.get("/tasks/:id", getTaskById);

/**
 * @route   PATCH /api/tasks/:id
 * @desc    Update a task (title, description, assignedTo, status)
 * @access  Public
 */
router.patch("/tasks/:id", updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Public
 */
router.delete("/tasks/:id", deleteTask);

/**
 * @route   POST /api/tasks/:id/comments
 * @desc    Add a comment to a task
 * @access  Public
 */
router.post("/tasks/:id/comments", addComment);

export default router;

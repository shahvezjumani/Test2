import express from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Public
 */
router.get("/", getAllProjects);

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project by ID
 * @access  Public
 */
router.get("/:id", getProjectById);

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Public
 */
router.post("/", createProject);

/**
 * @route   PATCH /api/projects/:id
 * @desc    Update a project
 * @access  Public
 */
router.patch("/:id", updateProject);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project and all its tasks
 * @access  Public
 */
router.delete("/:id", deleteProject);

export default router;

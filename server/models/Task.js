import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID is required for comments"],
  },
  text: {
    type: String,
    required: [true, "Comment text is required"],
    trim: true,
    maxlength: [1000, "Comment cannot exceed 1000 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project ID is required"],
      index: true, // Index for faster queries by project
    },
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [200, "Task title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    assignedTo: {
      type: String,
      required: [true, "Task must be assigned to a user"],
    },
    status: {
      type: String,
      enum: {
        values: ["todo", "in_progress", "done"],
        message: "Status must be one of: todo, in_progress, done",
      },
      default: "todo",
      index: true, // Index for faster filtering by status
    },
    comments: [commentSchema],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

// Compound index for filtering tasks by project and status
taskSchema.index({ projectId: 1, status: 1 });
taskSchema.index({ projectId: 1, createdAt: -1 });

// Method to add a comment
taskSchema.methods.addComment = function (userId, text) {
  this.comments.push({ userId, text });
  return this.save();
};

const Task = mongoose.model("Task", taskSchema);

export default Task;

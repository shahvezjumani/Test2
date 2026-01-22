import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

// Load environment variables
dotenv.config();

// ========== CONFIGURATION ==========

const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/project-management";

// ========== DATABASE CONNECTION ==========

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      // Mongoose 6+ no longer needs these options, but included for clarity
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// ========== SERVER STARTUP ==========

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running in ${process.env.NODE_ENV || "development"} mode`,
      );
      console.log(`🌐 Server URL: http://localhost:${PORT}`);
      console.log(`📡 API Base: http://localhost:${PORT}/api`);
      console.log(`\n📋 Available Endpoints:`);
      console.log(`   - GET    /api/projects`);
      console.log(`   - POST   /api/projects`);
      console.log(`   - GET    /api/projects/:id`);
      console.log(`   - PATCH  /api/projects/:id`);
      console.log(`   - DELETE /api/projects/:id`);
      console.log(`   - GET    /api/projects/:projectId/tasks?status=`);
      console.log(`   - POST   /api/projects/:projectId/tasks`);
      console.log(`   - GET    /api/tasks/:id`);
      console.log(`   - PATCH  /api/tasks/:id`);
      console.log(`   - DELETE /api/tasks/:id`);
      console.log(`   - POST   /api/tasks/:id/comments`);
      console.log(`\n⚡ Ready to accept requests!\n`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

// ========== GRACEFUL SHUTDOWN ==========

process.on("SIGINT", async () => {
  console.log("\n⚠️  SIGINT signal received: closing server gracefully");
  try {
    await mongoose.connection.close();
    console.log("✅ MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error.message);
    process.exit(1);
  }
});

process.on("SIGTERM", async () => {
  console.log("\n⚠️  SIGTERM signal received: closing server gracefully");
  try {
    await mongoose.connection.close();
    console.log("✅ MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error.message);
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  mongoose.connection.close(() => {
    process.exit(1);
  });
});

// ========== START THE SERVER ==========

startServer();

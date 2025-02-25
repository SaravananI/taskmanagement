const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Create a new task

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; // Extract user ID from authMiddleware

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newTask = new Task({
      title,
      description,
      userId
    });

    await newTask.save();

    // ✅ Ensure you return a response
    res.status(201).json({ message: "Task created successfully", task: newTask });

  } catch (error) {
    console.error("Task creation error:", error);
    
    // ✅ Make sure errors are handled correctly
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// ✅ Get all tasks for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get a single task by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update a task by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params; // Get task ID from URL
    const { title, description, completed } = req.body; // Get update data from request body

    const updatedTask = await Task.findByIdAndUpdate(
      id, // Find task by ID
      { title, description, completed }, // Update fields
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });

  } catch (error) {
    console.error("Task update error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


// ✅ Delete a task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, // Default to false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets current date
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;

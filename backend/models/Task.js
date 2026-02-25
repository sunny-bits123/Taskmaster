const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    category: {
  type: String,
  enum: ["Work", "Study", "Personal"],
  default: "Work"
    },
    dueDate: {
  type: Date
},
priority: {
  type: String,
  enum: ["Low", "Medium", "High"],
  default: "Low"
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);

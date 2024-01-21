const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  instructor: String,
  description: String,
  enrollmentStatus: {
    type: String,
    enum: ["Open", "Closed", "In Progress"],
  },
  thumbnail: String,
  duration: String,
  schedule: String,
  location: String,
  prerequisites: [String],
  syllabus: [
    {
      week: Number,
      topic: String,
      content: String,
    },
  ],
  students: [
    {
      id: Number,
      name: String,
      email: String,
    },
  ],
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Course", courseSchema);

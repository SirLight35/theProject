import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
    lastSeenLesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);

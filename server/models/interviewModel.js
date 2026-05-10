import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    techStack: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
      trim: true,
    },

    totalQuestion: {
      type: Number,
      default: 10,
    },

    currentQuestion: {
      type: Number,
      default: 1,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    score: {
      type: Number,
      default: 0,
    },

    feedback: {
      strength: [
        {
          type: String,
          trim: true,
        },
      ],

      weakness: [
        {
          type: String,
          trim: true,
        },
      ],

      summary: {
        type: String,
        default: "",
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Interview", interviewSchema);

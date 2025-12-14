import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    trainer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    athlete_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

feedbackSchema.index({ athlete_id: 1, createdAt: -1 });
feedbackSchema.index({ trainer_id: 1, createdAt: -1 });

export const Feedback = mongoose.model("Feedback", feedbackSchema);

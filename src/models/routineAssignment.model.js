// models/routineAssignment.model.js
import mongoose from "mongoose";

const routineAssignmentSchema = new mongoose.Schema(
  {
    routine_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routine",
      required: true,
    },
    athlete_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assigned_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assigned_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    scheduled_dates: {
      type: [Date],
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "Debe especificar al menos una fecha",
      },
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

routineAssignmentSchema.index({ athlete_id: 1, scheduled_dates: 1 });

export const RoutineAssignment = mongoose.model(
  "RoutineAssignment",
  routineAssignmentSchema
);

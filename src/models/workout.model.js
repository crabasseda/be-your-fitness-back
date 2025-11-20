import mongoose from "mongoose";

const setInWorkoutSchema = new mongoose.Schema(
  {
    set_number: { type: Number, required: true },
    weight: { type: Number, required: true },
    repetitions: { type: Number, required: true },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const exerciseInWorkoutSchema = new mongoose.Schema(
  {
    exercise_id: {
      type: String,
      required: true,
    },
    exercise_name: {
      type: String,
      required: true,
    },
    exercise_image: {
      type: String,
      default: "",
    },
    order_number: { type: Number, required: true },
    note: { type: String, default: "" },
    sets: {
      type: [setInWorkoutSchema],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "Cada ejercicio debe tener al menos un set",
      },
    },
  },
  { _id: false }
);

const workoutSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    routine_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routine",
      required: false,
    },
    routine_name: {
      type: String,
      required: true,
    },
    routine_type: {
      type: String,
      required: true,
      enum: [
        "fuerza",
        "resistencia",
        "mixto",
        "hipertrofia",
        "movilidad",
        "cardio",
      ],
    },
    duration_seconds: {
      type: Number,
      required: true,
      min: 0,
    },
    exercises: {
      type: [exerciseInWorkoutSchema],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "El workout debe tener al menos un ejercicio",
      },
    },
    notes: {
      type: String,
      default: "",
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

workoutSchema.index({ user_id: 1, started_at: -1 });

export const Workout = mongoose.model("Workout", workoutSchema);

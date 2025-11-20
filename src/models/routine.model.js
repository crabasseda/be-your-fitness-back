import mongoose from "mongoose";

const setSchema = new mongoose.Schema(
  {
    set_number: { type: Number, required: true },
    weight: { type: Number, required: true },
    repetitions: { type: Number, required: true },
  },
  { _id: false }
);

const exerciseInRoutineSchema = new mongoose.Schema(
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
      type: [setSchema],
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

const recurrenceSchema = new mongoose.Schema(
  {
    frequency: {
      type: String,
      required: true,
      enum: ["daily", "weekly", "monthly"],
    },
    daysOfWeek: {
      type: [Number],
      validate: {
        validator: function (v) {
          if (!v) return true;
          return v.every((day) => day >= 0 && day <= 6);
        },
        message:
          "Los días de la semana deben estar entre 0 (domingo) y 6 (sábado)",
      },
    },
    dayOfMonth: {
      type: Number,
      min: 1,
      max: 31,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { _id: false }
);

const scheduleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["one-time", "recurring"],
    },
    specificDate: {
      type: Date,
      validate: {
        validator: function (v) {
          if (this.type === "one-time") {
            return !!v;
          }
          return true;
        },
        message: "specificDate es requerido cuando el tipo es 'one-time'",
      },
    },
    recurrence: {
      type: recurrenceSchema,
      validate: {
        validator: function (v) {
          if (this.type === "recurring") {
            return !!v;
          }
          return true;
        },
        message: "recurrence es requerido cuando el tipo es 'recurring'",
      },
    },
  },
  { _id: false }
);

const routineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: {
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
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exercises: {
      type: [exerciseInRoutineSchema],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "La rutina debe tener al menos un ejercicio",
      },
    },
    schedule: {
      type: scheduleSchema,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Routine = mongoose.model("Routine", routineSchema);

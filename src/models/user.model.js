import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["athlete", "trainer"], default: "athlete" },
    trainer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      validate: {
        validator: async function (value) {
          if (!value) return true;
          if (this.role !== "athlete") return false;
          const trainer = await this.model("User").findById(value);
          return trainer && trainer.role === "trainer";
        },
        message:
          "trainer_id debe ser un entrenador válido si el rol es athlete",
      },
    },
  },
  {
    versionKey: false,
  }
);

export const User = mongoose.model("User", userSchema);

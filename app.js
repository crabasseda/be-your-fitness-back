import cors from "cors";
import express from "express";
import authRoutes from "./src/routes/auth.routes.js";
import routineRoutes from "./src/routes/routine.routes.js";
import assignmentRoutes from "./src/routes/routineAssignment.routes.js";
import workoutRoutes from "./src/routes/workout.routes.js";

const app = express();
app.use(cors());

app.use(express.json());

// app.use("/api/users", userRouter);
app.use("/api/routines", routineRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  if (error.message === "notfound") {
    res.status(404).json({ error: "Item not found" });
  } else {
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

export default app;

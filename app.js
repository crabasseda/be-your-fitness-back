import cors from "cors";
import express from "express";
import authRoutes from "./src/routes/auth.routes.js";
import feedbackRoutes from "./src/routes/feedback.routes.js";
import routineRoutes from "./src/routes/routine.routes.js";
import usersRoutes from "./src/routes/users.routes.js";
import workoutRoutes from "./src/routes/workout.routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:4200", "https://beyourfitness.netlify.app"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/routines", routineRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/feedback", feedbackRoutes);

app.use((error, req, res, next) => {
  if (error.message === "notfound") {
    res.status(404).json({ error: "Item not found" });
  } else {
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

export default app;

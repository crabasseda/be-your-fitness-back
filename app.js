import express from "express";
import routineRouter from "./src/routes/routineRouter.js";
import userRouter from "./src/routes/userRouter.js";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/routines", routineRouter);

app.use((error, req, res, next) => {
  console.error(error);
  if (error.message === "notfound") {
    res.status(404).json({ error: "Item not found" });
  } else {
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

export default app;

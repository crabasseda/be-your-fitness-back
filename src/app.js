import express from "express";

import userRouter from "./routes/userRouter.js";

const app = express();

app.use(express.json());
app.use("/users", userRouter);

app.use((error, req, res, next) => {
  console.error(error);
  if (error.message === "notfound") {
    res.status(404).json({ error: "Item not found" });
  } else {
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

export default app;

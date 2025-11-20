import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import app from "./app.js";
import { connectDB } from "./connection.js";

dotenv.config();

app.use(cors());
app.use(express.json());

await connectDB();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

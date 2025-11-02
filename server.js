import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import app from "./app.js";

dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./connection.js";

dotenv.config();

await connectDB();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto:${port}`);
});

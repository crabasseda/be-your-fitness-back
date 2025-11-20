import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export async function registerUser(username, password) {
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error("Usuario ya existe");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  return { message: "Usuario registrado correctamente" };
}

export async function loginUser(username, password) {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Usuario no encontrado");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Contraseña incorrecta");

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      role: user.role,
      trainer_id: user.trainer_id,
    },
  };
}

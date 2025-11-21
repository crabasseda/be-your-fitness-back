import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export async function registerUser(userData) {
  const { name, surname, email, username, password, role, trainer_id } =
    userData;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error("El usuario o email ya existen");
  }

  if (role === "athlete") {
    if (!trainer_id) {
      throw new Error("Un atleta debe tener un entrenador (trainer_id)");
    }

    const trainer = await User.findById(trainer_id);
    if (!trainer || trainer.role !== "trainer") {
      throw new Error("trainer_id no corresponde a un entrenador válido");
    }
  }

  const finalTrainerId = role === "athlete" ? trainer_id : null;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    surname,
    email,
    username,
    password: hashedPassword,
    role,
    trainer_id: finalTrainerId,
  });

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
    { expiresIn: "24h" }
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

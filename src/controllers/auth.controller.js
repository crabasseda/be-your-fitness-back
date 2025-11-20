import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { loginUser } from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const { name, surname, email, username, password, role, trainer_id } =
      req.body;

    // Verificar si ya existe el usuario
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario o email ya existen" });
    }

    if (role === "athlete") {
      if (!trainer_id) {
        return res
          .status(400)
          .json({ message: "Un atleta debe tener un entrenador (trainer_id)" });
      }

      // Verificar que trainer_id corresponde a un usuario con role trainer
      const trainer = await User.findById(trainer_id);
      if (!trainer || trainer.role !== "trainer") {
        return res.status(400).json({
          message: "trainer_id no corresponde a un entrenador válido",
        });
      }
    }
    const finalTrainerId = role === "athlete" ? trainer_id : null;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
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
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function logout(req, res) {
  res.json({
    message:
      "Logout exitoso. El token debe eliminarse en el cliente (no hay sesión en servidor).",
  });
}

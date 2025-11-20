import { loginUser } from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (
      error.message.includes("ya existen") ||
      error.message.includes("debe tener") ||
      error.message.includes("no corresponde")
    ) {
      return res.status(400).json({ message: error.message });
    }

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

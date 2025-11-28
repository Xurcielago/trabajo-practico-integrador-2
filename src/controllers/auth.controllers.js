import { UserModel } from "../models/user.js";
import { HashPassword, ComparePassword } from "../helpers/encrypt.js";
import { generateToken } from "../helpers/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "El usuario o correo electrónico ya están registrados",
      });
    }

    const hashedPassword = await HashPassword(password);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      profile,
    });

    await newUser.save();

    res.status(201).json({
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; 

    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await ComparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        profile: user.profile
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Cierre de sesión exitoso" });
};

export const profile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, biography, avatarUrl, birthDate } = req.body;
    const user = req.user;

    if (firstName) user.profile.firstName = firstName;
    if (lastName) user.profile.lastName = lastName;
    if (biography) user.profile.biography = biography;
    if (avatarUrl) user.profile.avatarUrl = avatarUrl;
    if (birthDate) user.profile.birthDate = birthDate;

    await user.save();

    res.status(200).json({
      message: "Perfil actualizado correctamente",
      profile: user.profile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
import { UserModel } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
      .select("-password") 
      .populate({
        path: "articles",
        select: "title createdAt" 
      });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id)
      .select("-password")
      .populate("articles", "title status createdAt")
      .populate("comments", "content createdAt");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado físicamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
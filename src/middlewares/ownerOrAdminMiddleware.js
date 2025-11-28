import { ArticleModel } from "../models/article.js";
import { CommentModel } from "../models/comment.js";

export const articleOwnerOrAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await ArticleModel.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    if (req.user.role !== "admin" && article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error al verificar permisos" });
  }
};

export const commentOwnerOrAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await CommentModel.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    if (req.user.role !== "admin" && comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error al verificar permisos" });
  }
};
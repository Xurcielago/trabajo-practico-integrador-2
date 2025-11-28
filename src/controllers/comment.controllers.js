import { CommentModel } from "../models/comment.js";
import { ArticleModel } from "../models/article.js";

export const createComment = async (req, res) => {
  try {
    const { content, article } = req.body;
    const author = req.user._id;

    const articleExists = await ArticleModel.findById(article);
    if (!articleExists) {
      return res.status(404).json({ message: "El artículo no existe" });
    }

    const newComment = new CommentModel({
      content,
      article,
      author,
    });

    await newComment.save();

    res.status(201).json({ message: "Comentario creado", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Error al crear comentario" });
  }
};

export const getCommentsByArticle = async (req, res) => {
  try {
    const { articleId } = req.params;

    const comments = await CommentModel.find({ article: articleId })
      .populate("author", "username profile.avatarUrl")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
};

export const getMyComments = async (req, res) => {
  try {
    const comments = await CommentModel.find({ author: req.user._id })
      .populate("article", "title")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tus comentarios" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    res.json({ message: "Comentario actualizado", comment: updatedComment });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar comentario" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    
    await CommentModel.findByIdAndDelete(id);

    res.json({ message: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar comentario" });
  }
};
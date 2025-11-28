import { ArticleModel } from "../models/article.js";
import { TagModel } from "../models/tag.js";

export const createArticle = async (req, res) => {
  try {
    const { title, content, excerpt, status, tags } = req.body;
    const author = req.user._id;

    if (tags && tags.length > 0) {
      const existingTags = await TagModel.find({ _id: { $in: tags } });
      if (existingTags.length !== tags.length) {
        return res.status(400).json({ message: "Una o más etiquetas no son válidas" });
      }
    }

    const newArticle = new ArticleModel({
      title,
      content,
      excerpt,
      status,
      tags,
      author,
    });

    await newArticle.save();

    res.status(201).json({ message: "Artículo creado exitosamente", article: newArticle });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el artículo" });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find({ status: "published" })
      .populate("author", "username profile.avatarUrl")
      .populate("tags", "name")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los artículos" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await ArticleModel.findById(id)
      .populate("author", "username profile")
      .populate("tags", "name description");

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el artículo" });
  }
};

export const getMyArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find({ author: req.user._id })
      .populate("tags", "name")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tus artículos" });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, status, tags } = req.body;

    if (tags && tags.length > 0) {
      const existingTags = await TagModel.find({ _id: { $in: tags } });
      if (existingTags.length !== tags.length) {
        return res.status(400).json({ message: "Una o más etiquetas no son válidas" });
      }
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      { title, content, excerpt, status, tags },
      { new: true }
    );

    res.json({ message: "Artículo actualizado", article: updatedArticle });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el artículo" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    
    await ArticleModel.findOneAndDelete({ _id: id });

    res.json({ message: "Artículo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el artículo" });
  }
};

export const addTagToArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.params;

    const tag = await TagModel.findById(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    const article = await ArticleModel.findById(articleId);
    if (!article.tags.includes(tagId)) {
      article.tags.push(tagId);
      await article.save();
    }

    res.json({ message: "Etiqueta agregada al artículo", article });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar etiqueta" });
  }
};

export const removeTagFromArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.params;

    await ArticleModel.findByIdAndUpdate(
      articleId,
      { $pull: { tags: tagId } }
    );

    res.json({ message: "Etiqueta removida del artículo" });
  } catch (error) {
    res.status(500).json({ message: "Error al remover etiqueta" });
  }
};
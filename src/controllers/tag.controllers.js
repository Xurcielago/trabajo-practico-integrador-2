import { TagModel } from "../models/tag.js";
import { ArticleModel } from "../models/article.js";

export const createTag = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingTag = await TagModel.findOne({ name });
    if (existingTag) {
      return res.status(400).json({ message: "Ya existe una etiqueta con ese nombre" });
    }

    const newTag = new TagModel({ name, description });
    await newTag.save();

    res.status(201).json({ message: "Etiqueta creada exitosamente", tag: newTag });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la etiqueta" });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener etiquetas" });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await TagModel.findById(id);

    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    const articles = await ArticleModel.find({ tags: id })
      .select("title createdAt author")
      .populate("author", "username");

    res.json({
      tag,
      articles 
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la etiqueta" });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (name) {
      const existingTag = await TagModel.findOne({ name });
      if (existingTag && existingTag._id.toString() !== id) {
        return res.status(400).json({ message: "Ya existe otra etiqueta con ese nombre" });
      }
    }

    const updatedTag = await TagModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedTag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    res.json({ message: "Etiqueta actualizada", tag: updatedTag });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la etiqueta" });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedTag = await TagModel.findOneAndDelete({ _id: id });

    if (!deletedTag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    res.json({ message: "Etiqueta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la etiqueta" });
  }
};
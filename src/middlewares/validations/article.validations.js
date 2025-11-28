import { body } from "express-validator";

export const articleValidations = [
  body("title")
    .trim()
    .notEmpty().withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 }).withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .trim()
    .notEmpty().withMessage("El contenido es obligatorio")
    .isLength({ min: 50 }).withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("El extracto no puede exceder los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"]).withMessage("El estado debe ser 'published' o 'archived'"),

  body("tags")
    .optional()
    .isArray().withMessage("Las etiquetas deben ser un array de IDs")
];
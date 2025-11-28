import { body } from "express-validator";

export const commentValidations = [
  body("content")
    .trim()
    .notEmpty().withMessage("El contenido es obligatorio")
    .isLength({ min: 5, max: 500 }).withMessage("El comentario debe tener entre 5 y 500 caracteres"),

  body("article")
    .notEmpty().withMessage("El ID del artículo es obligatorio")
    .isMongoId().withMessage("El ID del artículo no es válido")
];
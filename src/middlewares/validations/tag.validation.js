import { body } from "express-validator";

export const tagValidations = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 30 }).withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .matches(/^[^\s]+$/).withMessage("El nombre no puede contener espacios")
    .toLowerCase(), //Estandariza a minúsculas
    
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage("La descripción no puede exceder los 200 caracteres"),
];
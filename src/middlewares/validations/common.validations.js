import { param } from "express-validator";

export const mongoIdValidation = [
  param("id").isMongoId().withMessage("El ID proporcionado no es válido"),
];
import { body } from "express-validator";

export const createUserValidations = [
  body("username")
    .trim()
    .notEmpty().withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 20 }).withMessage("El usuario debe tener entre 3 y 20 caracteres")
    .isAlphanumeric().withMessage("El usuario solo puede contener letras y números"),

  body("email")
    .trim()
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debe proporcionar un email válido"),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/).withMessage("Debe contener al menos una letra mayúscula")
    .matches(/[a-z]/).withMessage("Debe contener al menos una letra minúscula")
    .matches(/[0-9]/).withMessage("Debe contener al menos un número"),

  body("profile.firstName")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 }).withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " }).withMessage("El nombre solo puede contener letras"),

  body("profile.lastName")
    .trim()
    .notEmpty().withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 50 }).withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " }).withMessage("El apellido solo puede contener letras"),
];

export const updateProfileValidations = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " }).withMessage("El nombre solo puede contener letras"),

  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " }).withMessage("El apellido solo puede contener letras"),

  body("biography")
    .optional()
    .isLength({ max: 500 }).withMessage("La biografía no puede exceder los 500 caracteres"),

  body("avatarUrl")
    .optional()
    .isURL().withMessage("Debe ser una URL válida"),
];
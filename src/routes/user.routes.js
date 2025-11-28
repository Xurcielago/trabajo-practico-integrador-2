import { Router } from "express";
import { 
  getAllUsers, 
  getUserById, 
  deleteUser 
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { validator } from "../middlewares/validator.js";
import { mongoIdValidation } from "../middlewares/validations/common.validations.js"; // Sugerencia abajo

const userRoutes = Router();

userRoutes.get("/", authMiddleware, isAdmin, getAllUsers);

userRoutes.get(
  "/:id", 
  authMiddleware, 
  isAdmin, 
  mongoIdValidation, 
  validator, 
  getUserById
);

userRoutes.delete(
  "/:id", 
  authMiddleware, 
  isAdmin, 
  mongoIdValidation, 
  validator, 
  deleteUser
);

export default userRoutes;
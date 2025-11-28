import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  updateProfile,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validator } from "../middlewares/validator.js";
import {
  createUserValidations,
  updateProfileValidations,
} from "../middlewares/validations/userValidations.js";

const authRoutes = Router();

authRoutes.post("/register", createUserValidations, validator, register);

authRoutes.post("/login", login);

authRoutes.post("/logout", authMiddleware, logout);

authRoutes.get("/profile", authMiddleware, profile);

authRoutes.put(
  "/profile",
  authMiddleware,
  updateProfileValidations,
  validator,
  updateProfile
);

export default authRoutes;
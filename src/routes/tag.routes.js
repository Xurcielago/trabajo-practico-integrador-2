import { Router } from "express";
import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { validator } from "../middlewares/validator.js";
import { tagValidations } from "../middlewares/validations/tag.validations.js";
import { mongoIdValidation } from "../middlewares/validations/common.validations.js";

const tagRoutes = Router();

tagRoutes.get("/", authMiddleware, getAllTags);

tagRoutes.get(
  "/:id",
  authMiddleware,
  mongoIdValidation,
  validator,
  getTagById
);

tagRoutes.post(
  "/",
  authMiddleware,
  isAdmin,
  tagValidations,
  validator,
  createTag
);

tagRoutes.put(
  "/:id",
  authMiddleware,
  isAdmin,
  mongoIdValidation,
  tagValidations,
  validator,
  updateTag
);

tagRoutes.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  mongoIdValidation,
  validator,
  deleteTag
);

export default tagRoutes;
import { Router } from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  getMyArticles,
  updateArticle,
  deleteArticle,
  addTagToArticle,
  removeTagFromArticle
} from "../controllers/article.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { articleOwnerOrAdmin } from "../middlewares/ownerOrAdminMiddleware.js";
import { validator } from "../middlewares/validator.js";
import { articleValidations } from "../middlewares/validations/article.validations.js";
import { mongoIdValidation } from "../middlewares/validations/common.validations.js";

const articleRoutes = Router();

articleRoutes.get("/", authMiddleware, getAllArticles);

articleRoutes.get("/my", authMiddleware, getMyArticles);

articleRoutes.get(
  "/:id",
  authMiddleware,
  mongoIdValidation,
  validator,
  getArticleById
);

articleRoutes.post(
  "/",
  authMiddleware,
  articleValidations,
  validator,
  createArticle
);

articleRoutes.put(
  "/:id",
  authMiddleware,
  mongoIdValidation,
  articleOwnerOrAdmin,
  articleValidations,
  validator,
  updateArticle
);

articleRoutes.delete(
  "/:id",
  authMiddleware,
  mongoIdValidation,
  articleOwnerOrAdmin,
  validator,
  deleteArticle
);

articleRoutes.post(
  "/:articleId/tags/:tagId",
  authMiddleware,
  articleOwnerOrAdmin,
  addTagToArticle
);

articleRoutes.delete(
  "/:articleId/tags/:tagId",
  authMiddleware,
  articleOwnerOrAdmin,
  removeTagFromArticle
);

export default articleRoutes;
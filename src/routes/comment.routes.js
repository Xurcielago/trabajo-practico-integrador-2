import { Router } from "express";
import {
  createComment,
  getCommentsByArticle,
  getMyComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { commentOwnerOrAdmin } from "../middlewares/ownerOrAdminMiddleware.js";
import { validator } from "../middlewares/validator.js";
import { commentValidations } from "../middlewares/validations/comment.validations.js";
import { mongoIdValidation } from "../middlewares/validations/common.validations.js";

const commentRoutes = Router();

commentRoutes.post(
  "/",
  authMiddleware,
  commentValidations,
  validator,
  createComment
);

commentRoutes.get(
  "/article/:articleId",
  authMiddleware,
  getCommentsByArticle
);

commentRoutes.get("/my", authMiddleware, getMyComments);

commentRoutes.put(
  "/:id",
  authMiddleware,
  mongoIdValidation,
  commentOwnerOrAdmin,
  commentValidations,
  validator,
  updateComment
);

commentRoutes.delete(
  "/:id",
  authMiddleware,
  mongoIdValidation,
  commentOwnerOrAdmin,
  validator,
  deleteComment
);

export default commentRoutes;
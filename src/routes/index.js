import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { userRoutes } from "./user.routes.js";
import { tagRoutes } from "./tag.routes.js";
import { articleRoutes } from "./article.routes.js";

export const routes = Router();
routes.use(tagRoutes);
routes.use(authRoutes);
routes.use(userRoutes);
routes.use(articleRoutes);
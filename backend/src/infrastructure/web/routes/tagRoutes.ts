import { Router } from "express";
import { db } from "@infrastructure/database/database";
import { TagRepository } from "@infrastructure/database/repositories/TagReposiotryImpl";
import { TagUseCases } from "@application/use_cases/tagUseCases";
import { TagService } from "@application/services/tagService";
import { TagController } from "../controllers/tagController";
import authMiddleware from "../middleware/authMiddleware";

export const tagRoutes = Router();

const tagRepository = new TagRepository(db);

const tagUseCases = new TagUseCases(tagRepository);

const tagService = new TagService(tagUseCases);

const tagController = new TagController(tagService);

tagRoutes.get("/", (req, res, next) => tagController.getAllTags(req, res, next));
import { NextFunction, Request, Response } from "express";
import { TagService } from "@application/services/tagService";
import { HTTP_STATUS } from "@domain/erros/HTTP_StatusEnum";

export class TagController {
  constructor(private readonly tagService: TagService) {}

  async getAllTags(req: Request, res: Response, next: NextFunction): Promise<void> {
    const tags = await this.tagService.getAllTags();
    res.status(HTTP_STATUS.OK).json(tags);
  }
}
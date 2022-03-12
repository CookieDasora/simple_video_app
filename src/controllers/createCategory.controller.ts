import { Request, Response } from 'express';
import createCategoryService from '../services/CreateCategory.service';

class createCategoryController {
  async handle(req: Request, res: Response) {
    const { category_name, category_description } = req.body;

    const service = new createCategoryService();
    const result = await service.execute({ category_name, category_description });

    if (result instanceof Error) {
      return res.status(400).json({
        error: result.message,
      });
    }

    return res.json(result);
  }
}

export default createCategoryController;

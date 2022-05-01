import { Request, Response } from 'express';
import updateCategoryService from '../services/UpdateCategory.service';

class updateCategoryController {
  async handle(req: Request, res: Response) {
    const { category_name, category_description, category_id } = req.body;
    const author_id: string = req.user.id;

    const service = new updateCategoryService();
    const result = await service.execute({
      author_id, category_name, category_description, category_id,
    });

    if (result instanceof Error) {
      return res.status(400).json({
        error: result.message,
      });
    }

    return res.json(result);
  }
}

export default updateCategoryController;

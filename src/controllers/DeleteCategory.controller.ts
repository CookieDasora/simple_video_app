import { Request, Response } from 'express';
import deleteCategoryService from '../services/DeleteCategory.service';

class deleteCategoryController {
  async handle(req: Request, res: Response) {
    const service = new deleteCategoryService();

    const author_id = req.user.id;
    const { category_id } = req.body;

    const result = await service.execute({ category_id, author_id });

    if (result instanceof Error) {
      return res.status(400).json({
        error: result.message,
      });
    }

    return res.json({ message: result });
  }
}

export default deleteCategoryController;

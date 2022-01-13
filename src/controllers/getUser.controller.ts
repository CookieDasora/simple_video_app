import { Request, Response } from 'express';
import getUserService from '../services/getUser.service';

class getUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new getUserService();

    const result = await service.execute(id);

    if (result instanceof Error) {
      return res.status(400).json({
        error: result.message,
      });
    }

    return res.json(result);
  }
}

export default getUserController;

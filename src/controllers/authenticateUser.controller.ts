import { Request, Response } from 'express';
import authenticateUserService from '../services/AuthenticateUser.service';

class authenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const service = new authenticateUserService();

    const result = await service.execute({ email, password });

    if (result instanceof Error) {
      return res.status(400).json({
        error: result.message,
      });
    }

    return res.json(result);
  }
}

export default authenticateUserController;

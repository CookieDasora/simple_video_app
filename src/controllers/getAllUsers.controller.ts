import { Request, Response } from 'express';
import getAllUsersService from '../services/getAllUsers.service';

class getAllUsersController {
  async handle(req: Request, res: Response) {
    const service = new getAllUsersService();
    const users = await service.execute();
    return res.json(users);
  }
}

export default getAllUsersController;

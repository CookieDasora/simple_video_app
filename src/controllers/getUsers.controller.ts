import { Request, Response } from 'express';
import getUsersService from '../services/getUsers.service';

class getUsersController {
  async handle(req: Request, res: Response) {
    const service = new getUsersService();
    const users = await service.execute();
    return res.json(users);
  }
}

export default getUsersController;

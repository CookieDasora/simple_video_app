/* eslint-disable prefer-destructuring */
import { Request, Response } from 'express';
import updateUserInfoService from '../services/UpdateUserInfo.service';

class updateUserInfoController {
  async handle(req: Request, res: Response) {
    const username = req.body.newUsername;
    const password = req.body.password; // 👀
    const id: string = req.user.id;

    const service = new updateUserInfoService();
    const result = await service.execute({ id, username, password });

    if (result instanceof Error) {
      return res.status(400).json({
        error: result.message,
      });
    }

    return res.json(result);
  }
}

export default updateUserInfoController;

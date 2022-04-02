import { Request, Response } from 'express';
import deleteVideoService from '../services/DeleteVideo.service';

class deleteVideoController {
  async handle(req: Request, res: Response) {
    const service = new deleteVideoService();

    const authorId = req.user.id;
    const { video_id } = req.body;

    const result = await service.execute({ video_id, authorId });

    if (result instanceof Error) {
      return res.status(400).json({
        error: result.message,
      });
    }

    return res.json({ message: result });
  }
}

export default deleteVideoController;

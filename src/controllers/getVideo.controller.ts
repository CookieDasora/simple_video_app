import { Request, Response } from 'express';
import getVideoService from '../services/getVideo.service';

class getVideoController {
  async handle(req: Request, res: Response) {
    const video_id = req.query.v as string;

    if (video_id === undefined) {
      return res.status(400).json({
        error: 'Empty video id',
      });
    }

    const service = new getVideoService();

    const result = await service.execute({ video_id });

    if (result instanceof Error) {
      return res.status(400).json({
        error: result.message,
      });
    }

    return res.json(result);
  }
}

export default getVideoController;

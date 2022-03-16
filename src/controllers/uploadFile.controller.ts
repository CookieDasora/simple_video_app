import { Request, Response } from 'express';

import uploadFileService from '../services/UploadFile.service';

class uploadFileController {
  async handle(req: Request, res: Response) {
    const { title, description, categoryId } = req.body;

    if (req.file === undefined) {
      return res.status(400).json({
        error: 'No file',
      });
    }

    const authorId: string = req.user.id;

    // @ts-ignore
    const url = req.file.location;

    const service = new uploadFileService();

    const result = await service.execute({
      title, description, authorId, categoryId, url,
    });

    if (result instanceof Error) {
      return res.status(400).json({
        error: result.message,
      });
    }

    return res.send(result);
  }
}

export default uploadFileController;

import { Request, Response } from 'express';

import uploadFileService from '../services/uploadFile.service';

class uploadFileController {
  async handle(req: Request, res: Response) {
    const { title, description } = req.body;

    if (req.file === undefined) {
      return res.status(400).json({
        error: 'No file',
      });
    }

    const { originalname, size } = req.file;

    const author_id: string = req.user.id;

    // @ts-ignore
    const filename = req.file.key;
    // @ts-ignore
    const url = req.file.location;

    const service = new uploadFileService();

    const result = await service.execute({
      title, description, originalname, filename, size, author_id, url,
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

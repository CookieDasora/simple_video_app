import { Request, Response } from 'express';
import uploadFileService from '../services/uploadFile.service';

class uploadFileController {
  async handle(req: Request, res: Response) {
    console.log(req.file);

    const service = new uploadFileService();
    const result = await service.execute();

    res.send(result);
  }
}

export default uploadFileController;

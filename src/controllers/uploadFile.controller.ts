import { Request, Response } from 'express';
import multer from 'multer';
import uploadFileService from '../services/uploadFile.service';
import multerConfig from '../config/multer';

const upload = multer(multerConfig).single('file');

class uploadFileController {
  async handle(req: Request, res: Response) {
    upload(req, res, async (cb: multer.MulterError | Error | any) => {
      if (cb instanceof multer.MulterError) {
        return res.status(400).json({ error: cb.message });
      }

      if (cb instanceof Error) {
        return res.status(400).json({ error: cb.message });
      }

      const service = new uploadFileService();
      const result = await service.execute();

      res.send(result);
    });
  }
}

export default uploadFileController;

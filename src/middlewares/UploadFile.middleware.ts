import { NextFunction, Response, Request } from 'express';
import multer from 'multer';
import multerConfig from '../config/Multer.config';
import deleteFileFunction from '../functions/DeleteFile.function';

function uploadFile(req: Request, res: Response, next: NextFunction) {
  const upload = multer(multerConfig).single('file');

  upload(req, res, async (cb: multer.MulterError | Error | any) => {
    // @ts-ignore
    const { key } = req.file;

    const fileDelete = new deleteFileFunction();

    if (!req.body.title) {
      const result = await fileDelete.execute(key);

      if (result instanceof Error) {
        return res.status(500).json({
          error: result.message,
        });
      }

      return res.status(400).json({ error: 'Empty field' });
    }

    if (cb instanceof multer.MulterError) {
      return res.status(400).json({ error: cb.message });
    } if (cb instanceof Error) {
      return res.status(400).json({ error: cb.message });
    }

    next();
  });
}

export default uploadFile;

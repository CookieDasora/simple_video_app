import multer from 'multer';
import { Express, Request } from 'express';
import path from 'path';
import { randomBytes } from 'crypto';

const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),

  storage: multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'));
    },

    filename: (req: Request, file: Express.Multer.File, cb) => {
      randomBytes(16, (err, hash) => {
        if (err) cb(err, null);

        const fileName: string = `${hash.toString('hex')}-${file.originalname.trim()}`;

        cb(null, fileName);
      });
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = [
      'video/mp4',
      'video/webm',
      'video/x-matroska',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file'));
    }
  },
};

export default multerConfig;

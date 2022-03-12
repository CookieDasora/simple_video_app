import multer from 'multer';
import { Express, Request } from 'express';
import path from 'path';
import { randomBytes } from 'crypto';

import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

const storageTypes = {
  local: multer.diskStorage({
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

  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      randomBytes(16, (err, hash) => {
        if (err) cb(err, null);

        const fileName: string = `${hash.toString('hex')}-${file.originalname.trim()}`;

        cb(null, fileName);
      });
    },
  }),
};

const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
  storage: storageTypes.s3,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = [
      'video/mp4',
      'video/webm',
      'video/x-matroska',
      'video/x-msvideo',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file'));
    }
  },
};

export default multerConfig;

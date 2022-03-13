import 'dotenv/config';

import express, { Application, Request, Response } from 'express';

import { router } from './routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
  });
});

export { app };

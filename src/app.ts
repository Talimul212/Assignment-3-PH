/* eslint-disable prettier/prettier */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
import { errorHandler } from './app/utils/errorHandler';
const app: Application = express();

//parsers
app.use(express.json());
app.use(express.text());
app.use(cors());

//route call
app.use('/api', router);

//server call
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  });
});
// Global Error Handler
app.use(errorHandler);

export default app;

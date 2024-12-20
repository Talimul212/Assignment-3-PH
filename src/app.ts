import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
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

export default app;

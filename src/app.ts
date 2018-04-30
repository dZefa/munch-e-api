import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import './util/secrets';

import { router } from './routes';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('short'));
}

app.use('/api', router);

export default app;

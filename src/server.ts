import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import logger from './util/logger';

const app: express.Application = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('short'));

app.listen(port, () => {
  logger(`Listening at http://localhost:${port}/`);
});

import app from './app';
import { syncDB } from './util/syncDB';
import logger from './util/logger';

const port = process.env.PORT!;

const force = process.env.NODE_ENV !== 'production' ? true : false;

app.listen(port, () => {
  logger(`Listening at http://localhost:${port}/`);
  syncDB(force);
});

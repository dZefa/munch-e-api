import app from './app';

import logger from './util/logger';

const port = process.env.PORT!;

app.listen(port, () => {
  logger(`Listening at http://localhost:${port}/`);
});

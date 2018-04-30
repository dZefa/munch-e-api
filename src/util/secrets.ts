import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../../config/.env') });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: path.resolve(__dirname, '../../config/test.env') });
} else {
  dotenv.config({ path: path.resolve(__dirname, '../../config/dev.env') });
}

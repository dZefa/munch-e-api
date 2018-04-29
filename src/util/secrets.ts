import { default as dotenv } from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../../config/.env') });
} else {
  dotenv.config({ path: path.resolve(__dirname, '../../config/dev.env') });
}

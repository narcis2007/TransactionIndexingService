import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
dotenv.config({ path: path.resolve(dirname, './.env') });

if (process.env.PROCESS_NAME === 'listener') {
  import('./src/listener.js');
} else {
  import('./src/app.js');
}

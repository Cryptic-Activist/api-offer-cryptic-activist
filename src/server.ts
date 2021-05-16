import { success, warning } from '@utils/logger/logger';
import chalk from 'chalk';
import app from './app';

if (!process.env.NODE_ENV) {
  warning('NODE_ENV environment variable is missing');
}

const port = process.env.PORT || 5001;

app.listen(port, () => {
  success(`${process.env.APP_NAME} is listening on port: ${chalk.green(port)}`);
});

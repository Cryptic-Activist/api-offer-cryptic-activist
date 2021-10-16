import { checkEnvironmentVariable, success } from 'cryptic-utils';
import chalk from 'chalk';
import requiredEnv from '@/envs.json';

import app from './app';

checkEnvironmentVariable(requiredEnv);

const port = process.env.PORT;

app.listen(port, () => {
  success(`${process.env.APP_NAME} is listening on port: ${chalk.green(port)}`);
});

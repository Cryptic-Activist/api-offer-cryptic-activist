import { Application } from 'express';

import offer from './offer';

export default (app: Application): void => {
  app.use('/offer', offer);
};

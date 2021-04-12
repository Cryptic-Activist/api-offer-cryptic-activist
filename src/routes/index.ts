import { Application } from 'express';

import offers from './offers';
import paymentMethods from './paymentMethods';
import paymentMethodCategories from './paymentMethods/categories';

export default (app: Application): void => {
  app.use('/offers', offers);
  app.use('/payment-methods', paymentMethods);
  app.use('/payment-method/categories', paymentMethodCategories);
};

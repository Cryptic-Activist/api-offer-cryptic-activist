import { Application } from 'express';

import offer from './offer';
import offers from './offers';
import paymentMethod from './paymentMethod';
import paymentMethods from './paymentMethods';
import paymentMethodCategories from './paymentMethods/categories';
import feedback from './feedback';
import feedbacks from './feedbacks';

export default (app: Application): void => {
  app.use('/offer', offer);
  app.use('/offers', offers);
  app.use('/payment-method', paymentMethod);
  app.use('/payment-methods', paymentMethods);
  app.use('/payment-method/categories', paymentMethodCategories);
  app.use('/feedback', feedback);
  app.use('/feedbacks', feedbacks);
};

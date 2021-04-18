import { Router } from 'express';

import {
  index,
  createPaymentMethod,
  getPaymentMethodsByCategory,
} from '@controllers/paymentMethods';

import { authenticateUser } from '@middlewares/authorization';
import {
  validateInputCreatePaymentMethod,
  validateInputGetPaymentMethodsByCategory,
} from '@middlewares/validators/request/paymentMethods';

const router = Router();

router.get('', index);

router.post(
  '/create',
  authenticateUser,
  validateInputCreatePaymentMethod,
  createPaymentMethod,
);

router.get(
  '/:categoryId/all',
  authenticateUser,
  validateInputGetPaymentMethodsByCategory,
  getPaymentMethodsByCategory,
);

export default router;

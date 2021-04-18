import { Router } from 'express';

import {
  index,
  createPaymentMethodCategory,
} from '@controllers/paymentMethods/categories';

import { authenticateUser } from '@middlewares/authorization';
import { validateInputCreatePaymentMethodCategory } from '@middlewares/validators/request';

const router = Router();

router.get('', index);

router.post(
  '/create',
  authenticateUser,
  validateInputCreatePaymentMethodCategory,
  createPaymentMethodCategory,
);

export default router;

import { Router } from 'express';

import {
  index,
  createPaymentMethod,
  getPaymentMethodsByCategory,
} from '@controllers/paymentMethods';
import { authenticateUser } from '@middlewares/authorization';

const router = Router();

router.get('', index);

router.post('/create', authenticateUser, createPaymentMethod);

router.get('/:categoryId/all', authenticateUser, getPaymentMethodsByCategory);

export default router;

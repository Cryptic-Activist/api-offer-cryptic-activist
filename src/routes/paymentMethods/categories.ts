import { Router } from 'express';

import {
  index,
  createPaymentMethodCategory,
} from '@controllers/paymentMethods/categories';
import { authenticateUser } from '@middlewares/authorization';

const router = Router();

router.get('', index);

router.post('/create', authenticateUser, createPaymentMethodCategory);

router.get('/:id', authenticateUser);

export default router;

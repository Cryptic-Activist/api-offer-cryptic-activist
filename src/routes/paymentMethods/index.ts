import { Router } from 'express';

import {
  createPaymentMethodController,
  getPaymentMethodsByCategoryController,
  index,
} from '../../controllers/paymentMethods';

// import { authenticateUser } from '../../middlewares/authorization';
import {
  validateInputCreatePaymentMethod,
  validateInputGetPaymentMethodsByCategory,
} from '../../middlewares/validators/request/paymentMethods';

const router = Router();

router.get('', index);

// router.post(
//   '/create',
//   authenticateUser,
//   validateInputCreatePaymentMethod,
//   createPaymentMethodController,
// );
router.post(
  '/create',
  validateInputCreatePaymentMethod,
  createPaymentMethodController,
);

router.get(
  '/:categoryId/all',
  // authenticateUser,
  validateInputGetPaymentMethodsByCategory,
  getPaymentMethodsByCategoryController,
);

export default router;

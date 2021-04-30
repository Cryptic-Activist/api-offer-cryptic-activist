import { Router } from 'express';

import { createFeedback } from '@controllers/feedback';

import { authenticateUser } from '@middlewares/authorization';
import { validateInputCreateFeedback } from '@middlewares/validators/request/feedback';

const router = Router();

router.post(
  '/create',
  authenticateUser,
  validateInputCreateFeedback,
  createFeedback,
);

export default router;

import { Router } from 'express';

import {
  indexFeedbacks,
  countFeedbacksController,
  indexFeedbacksPagination,
} from '@controllers/feedbacks';

import { validateInputCountFeedbacks } from '@middlewares/validators/request/feedbacks';

const router = Router();

router.post('', indexFeedbacks);

router.post('/count', validateInputCountFeedbacks, countFeedbacksController);

router.post(
  '/pagination',
  validateInputCountFeedbacks,
  indexFeedbacksPagination,
);

export default router;

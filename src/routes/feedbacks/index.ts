import { Router } from 'express';

import {
  indexFeedbacks,
  countFeedbacks,
  indexFeedbacksPagination,
} from '@controllers/feedbacks';

import { validateInputCountFeedbacks } from '@middlewares/validators/request/feedbacks';

const router = Router();

router.post('', indexFeedbacks);

router.post('/count', validateInputCountFeedbacks, countFeedbacks);

router.post(
  '/pagination',
  validateInputCountFeedbacks,
  indexFeedbacksPagination,
);

export default router;

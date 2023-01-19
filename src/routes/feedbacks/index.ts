import { Router } from 'express';

import {
  indexFeedbacks,
  countFeedbacksController,
  indexFeedbacksPagination,
  getFeedbacksByUser,
} from '@controllers/feedbacks';

import { validateInputCountFeedbacks } from '@middlewares/validators/request/feedbacks';

const router = Router();

router.post('', indexFeedbacks);

router.get('/user/:userId', getFeedbacksByUser);

router.post('/count', validateInputCountFeedbacks, countFeedbacksController);

router.post(
  '/pagination',
  validateInputCountFeedbacks,
  indexFeedbacksPagination,
);

export default router;

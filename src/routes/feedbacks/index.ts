import { Router } from 'express';

import { countFeedbacks } from '@controllers/feedbacks';

import { validateInputCountFeedbacks } from '@middlewares/validators/request/feedbacks';

const router = Router();

router.post('/count', validateInputCountFeedbacks, countFeedbacks);

export default router;

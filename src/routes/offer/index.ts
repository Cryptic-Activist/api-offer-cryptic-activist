import { Router } from 'express';

import { createOffer, getOffer } from '@controllers/offer';

import { authenticateUser } from '@middlewares/authorization';
import {
  validateInputCreateOffer,
  validateInputGetOffer,
} from '@middlewares/validators/request/offers';

const router = Router();

router.post('', validateInputGetOffer, getOffer);

router.post('/create', authenticateUser, validateInputCreateOffer, createOffer);

export default router;

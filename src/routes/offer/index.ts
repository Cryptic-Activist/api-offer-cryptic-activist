import { Router } from 'express';

import { createOfferController, getOfferController } from '@controllers/offer';

import { authenticateUser } from '@middlewares/authorization';
import {
  validateInputCreateOffer,
  validateInputGetOffer,
} from '@middlewares/validators/request/offers';

const router = Router();

router.post('', validateInputGetOffer, getOfferController);

router.post(
  '/create',
  authenticateUser,
  validateInputCreateOffer,
  createOfferController,
);

export default router;

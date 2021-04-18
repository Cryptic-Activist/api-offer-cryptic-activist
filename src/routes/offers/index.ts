import { Router } from 'express';

import { index, createOffer, getOffersByVendor } from '@controllers/offers';

import { authenticateUser } from '@middlewares/authorization';
import {
  validateInputIndex,
  validateInputCreateOffer,
  validateGetOfferByVendorRequest,
} from '@middlewares/validators/request/offers';

const router = Router();

router.get('', validateInputIndex, index);

router.post('/create', authenticateUser, validateInputCreateOffer, createOffer);

router.get(
  '/get/:vendor_id',
  validateGetOfferByVendorRequest,
  getOffersByVendor,
);

export default router;

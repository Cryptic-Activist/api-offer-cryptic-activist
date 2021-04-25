import { Router } from 'express';

import {
  index,
  indexPagination,
  createOffer,
  getOffersByVendor,
  getOfferById,
} from '@controllers/offers';

import { authenticateUser } from '@middlewares/authorization';
import {
  validateInputIndexPagination,
  validateInputCreateOffer,
  validateGetOfferByVendorRequest,
  validateInputGetOfferById,
} from '@middlewares/validators/request/offers';

const router = Router();

router.get('', index);

router.get('/pagination', validateInputIndexPagination, indexPagination);

router.post('/create', authenticateUser, validateInputCreateOffer, createOffer);

router.get(
  '/:offer_id',
  authenticateUser,
  validateInputGetOfferById,
  getOfferById,
);

router.get(
  '/get/:vendor_id',
  validateGetOfferByVendorRequest,
  getOffersByVendor,
);

export default router;

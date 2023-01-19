import { Router } from 'express';

import {
  index,
  indexPagination,
  getOffersController,
  getOffersByUser,
} from '@controllers/offers';

import {
  validateInputIndexPagination,
  validateGetOffer,
} from '@middlewares/validators/request/offers';

const router = Router();

router.get('/list', index);

router.get('', validateGetOffer, getOffersController);

router.get('/:userId', getOffersByUser);

router.get('/pagination', validateInputIndexPagination, indexPagination);

export default router;

import { Router } from 'express';

import {
  index,
  indexPagination,
  getOffersController,
} from '@controllers/offers';

import { validateInputIndexPagination } from '@middlewares/validators/request/offers';

const router = Router();

router.get('', index);

router.post('', getOffersController);

router.get('/pagination', validateInputIndexPagination, indexPagination);

export default router;

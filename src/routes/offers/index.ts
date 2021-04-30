import { Router } from 'express';

import { index, indexPagination, getOffers } from '@controllers/offers';

import { validateInputIndexPagination } from '@middlewares/validators/request/offers';

const router = Router();

router.get('', index);

router.post('', getOffers);

router.get('/pagination', validateInputIndexPagination, indexPagination);

export default router;

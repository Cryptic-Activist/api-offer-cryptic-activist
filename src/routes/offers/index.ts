import { Router } from 'express';

import { index, createOffer } from '@controllers/offers';
import { authenticateUser } from '@middlewares/authorization';

const router = Router();

router.get('', index);

router.post('/create', authenticateUser, createOffer);

export default router;

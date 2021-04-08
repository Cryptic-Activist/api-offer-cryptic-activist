import { Router } from 'express';

import { index, createOffer } from '@controllers/offer';
import { authenticateUser } from '@middlewares/authorization';

const router = Router();

router.get('/index', index);

router.post('/create', authenticateUser, createOffer);

export default router;

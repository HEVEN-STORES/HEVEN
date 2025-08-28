
import express from 'express';
import { createReview, getReviewsByProduct } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/reviews', createReview);
router.get('/reviews/:productId', getReviewsByProduct);

export default router;

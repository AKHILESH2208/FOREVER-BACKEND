import express from 'express';
import { addReview, getProductReviews, deleteReview } from '../controllers/reviewController.js';
import authUser from '../middleware/auth.js';

const reviewRouter = express.Router();

reviewRouter.post('/add', authUser, addReview);
reviewRouter.post('/list', getProductReviews);
reviewRouter.post('/delete', authUser, deleteReview);

export default reviewRouter;

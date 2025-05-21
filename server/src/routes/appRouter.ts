import express from 'express';
import productController from '../controller/productController';
import reviewController from '../controller/reviewController';

const appRouter = express.Router();
appRouter.get('/', productController.getAllProducts);
appRouter.get('/search', productController.searchProducts);
appRouter.get('/:id', productController.getProduct);
appRouter.get('/:id/reviews', reviewController.getAllReviews);
appRouter.post('/:id/reviews', reviewController.saveReview );
appRouter.put('/:id/reviews/:rid', reviewController.updateReview);
appRouter.delete('/:id/reviews/:rid', reviewController.deleteReview);

export default appRouter;
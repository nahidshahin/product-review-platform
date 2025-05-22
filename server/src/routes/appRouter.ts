import express from 'express';
import productController from '../controller/productController';
import reviewController from '../controller/reviewController';

const appRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products with pagination
 */
appRouter.get('/', productController.getAllProducts);

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products by name
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products matches the name
 */
appRouter.get('/search', productController.searchProducts);

/**
 * @swagger
 * /products/:id:
 *   get:
 *     summary: Get product by id
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Get product by it's ID
 */
appRouter.get('/:id', productController.getProduct);

/**
 * @swagger
 * /products/:id/reviews:
 *   get:
 *     summary: Get all reviews of a particular product
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Get all reviews of a particular product
 */
appRouter.get('/:id/reviews', reviewController.getAllReviews);

/**
 * @swagger
 * /products/:id/reviews:
 *   post:
 *     summary: Create a reviews of a particular product
 *     tags: [Reviews]
 *     responses:
 *       201:
 *         description: Successfully create a review of a particular product
 */
appRouter.post('/:id/reviews', reviewController.saveReview );

/**
 * @swagger
 * /products/:id/reviews/:rid:
 *   put:
 *     summary: Update a reviews of a particular product
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Successfully updated a review of a particular product
 */
appRouter.put('/:id/reviews/:rid', reviewController.updateReview);

/**
 * @swagger
 * /products/:id/reviews/:rid:
 *   delete:
 *     summary: Delete a reviews of a particular product
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Successfully deleted a review of a particular product
 */
appRouter.delete('/:id/reviews/:rid', reviewController.deleteReview);

export default appRouter;
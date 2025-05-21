import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../models/product'
import { Review } from '../models/review'

import { readProducts, writeProducts } from '../service/productService'
import { readReviews, writeReviews } from '../service/reviewService'

const updateProductAverageRating = (productId: string) => {
  const productsData = readProducts();
  const reviewsData = readReviews();

  const productReviews = reviewsData.reviews.filter((review: Review) => review.productId === productId);
  const averageRating = productReviews.reduce((sum: number, review: Review) => sum + review.rating, 0) / productReviews.length || 0;

  const productIndex = productsData.products.findIndex((p: Product) => p.id === productId);
  if (productIndex !== -1) {
    productsData.products[productIndex].averageRating = parseFloat(averageRating.toFixed(1));
    writeProducts(productsData);
  }
};

const reviewController = {

  seedData: (req: Request, res: Response) => {

    try {
      // Sample products
      let sampleProducts: Product[] = [
        {
          id: uuidv4(),
          name: 'Dell Laptop',
          description: 'High-quality wireless headphones with noise cancellation',
          category: 'Electronics',
          price: 999.99,
          dateAdded: new Date().toISOString(),
          averageRating: 0
        },
        {
          id: uuidv4(),
          name: 'Smartphone',
          description: 'Latest model smartphone with advanced camera',
          category: 'Electronics',
          price: 899.99,
          dateAdded: new Date(Date.now() - 86400000).toISOString(),
          averageRating: 0
        },
        {
          id: uuidv4(),
          name: 'Coffee Maker',
          description: 'Programmable coffee maker with thermal carafe',
          category: 'Home',
          price: 129.99,
          dateAdded: new Date(Date.now() - 172800000).toISOString(),
          averageRating: 0
        }
      ];
      sampleProducts = [...sampleProducts, ...sampleProducts, ...sampleProducts, ...sampleProducts, ...sampleProducts, ...sampleProducts].map(o => ({ ...o, id: uuidv4() }));

      // Sample reviews
      const sampleReviews: Review[] = [
        {
          id: uuidv4(),
          productId: sampleProducts[0].id,
          author: 'John Doe',
          rating: 5,
          comment: 'Great sound quality!',
          date: new Date().toISOString()
        },
        {
          id: uuidv4(),
          productId: sampleProducts[0].id,
          author: 'Jane Smith',
          rating: 4,
          comment: 'Very comfortable but battery could last longer',
          date: new Date(Date.now() - 43200000).toISOString()
        },
        {
          id: uuidv4(),
          productId: sampleProducts[1].id,
          author: 'Mike Johnson',
          rating: 5,
          comment: 'Amazing camera and performance',
          date: new Date(Date.now() - 86400000).toISOString()
        }
      ];

      writeProducts({ products: sampleProducts });
      writeReviews({ reviews: sampleReviews });

      // Update average ratings
      sampleProducts.forEach(product => updateProductAverageRating(product.id));

      res.json({ message: 'Database seeded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to seed database' });
    }
  },

  getAllReviews: (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const reviewsData = readReviews();
      const productReviews = reviewsData.reviews.filter((review: Review) => review.productId === id);
      res.json(productReviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  },

  saveReview: (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { author, rating, comment } = req.body;

      // Validation
      if (!author || !rating || !comment) {
        return res.status(400).json({ error: 'Author, rating, and comment are required' });
      }

      const numericRating = Number(rating);
      if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
        return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
      }

      // Check if product exists
      const productsData = readProducts();
      const productExists = productsData.products.some((product: Product) => product.id === id);
      if (!productExists) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Create new review
      const reviewsData = readReviews();
      const newReview: Review = {
        id: uuidv4(),
        productId: id,
        author,
        rating: numericRating,
        comment,
        date: new Date().toISOString()
      };

      reviewsData.reviews.push(newReview);
      writeReviews(reviewsData);

      // Update product's average rating
      updateProductAverageRating(id);

      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add review' });
    }
  },

  updateReview: (req: Request, res: Response) => {
    try {
        const { id:productId, rid:id } = req.params;
      const { author, rating, comment } = req.body;

      // Validation
      if (!author || !rating || !comment) {
        return res.status(400).json({ error: 'Author, rating, and comment are required' });
      }

      const numericRating = Number(rating);
      if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
        return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
      }

      const reviewsData = readReviews();
      const reviewIndex = reviewsData.reviews.findIndex(
        (review: Review) => review.id === id && review.productId === productId
      );

      if (reviewIndex === -1) {
        return res.status(404).json({ error: 'Review not found' });
      }

      // Update review
      const updatedReview = {
        ...reviewsData.reviews[reviewIndex],
        author,
        rating: numericRating,
        comment,
        date: new Date().toISOString()
      };

      reviewsData.reviews[reviewIndex] = updatedReview;
      writeReviews(reviewsData);

      // Update product's average rating
      updateProductAverageRating(productId);

      res.json(updatedReview);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update review' });
    }
  },

  deleteReview: (req: Request, res: Response) => {
    try {
      const { id:productId, rid } = req.params;

      const reviewsData = readReviews();
      const reviewIndex = reviewsData.reviews.findIndex(
        (review: Review) => review.id === rid && review.productId === productId
      );

      if (reviewIndex === -1) {
        return res.status(404).json({ error: 'Review not found' });
      }

      // Remove review
      reviewsData.reviews.splice(reviewIndex, 1);
      writeReviews(reviewsData);

      // Update product's average rating
      updateProductAverageRating(productId);

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete review' });
    }
  }
}

export default reviewController;
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Product, Review, ReviewFormData } from '../types';
import Rating from './Rating';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import { toast } from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const backend = 'http://localhost:5000/products'

  const fetchProductAndReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [productResponse, reviewsResponse] = await Promise.all([
        axios.get<Product>(`${backend}/${id}`),
        axios.get<Review[]>(`${backend}/${id}/reviews`)
      ]);
      
      setProduct(productResponse.data);
      setReviews(reviewsResponse.data);
    } catch (err) {
      setError('Failed to fetch product details');
      toast.error('Failed to fetch product details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (formData: ReviewFormData) => {
    try {
      const response = await axios.post<Review>(`${backend}/${id}/reviews`, formData);
      setReviews([...reviews, response.data]);
      if (product) {
        setProduct({
          ...product,
          averageRating: parseFloat(
            ((product.averageRating * reviews.length + formData.rating) / 
            (reviews.length + 1)
          ).toFixed(1))
        });
      }
      toast.success('Review added successfully');
    } catch (err) {
      toast.error('Failed to add review');
      console.error(err);
    }
  };

  const handleUpdateReview = async (reviewId: string, formData: ReviewFormData) => {
    try {
      const response = await axios.put<Review>(
        `${backend}/${id}/reviews/${reviewId}`,
        formData
      );
      
      const updatedReviews = reviews.map(review => 
        review.id === reviewId ? response.data : review
      );
      
      setReviews(updatedReviews);
      setEditingReviewId(null);
      
      if (product) {
        const newAverage = updatedReviews.reduce((sum, review) => sum + review.rating, 0) / updatedReviews.length;
        setProduct({
          ...product,
          averageRating: parseFloat(newAverage.toFixed(1))
        });
      }
      
      toast.success('Review updated successfully');
    } catch (err) {
      toast.error('Failed to update review');
      console.error(err);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await axios.delete(`${backend}/${id}/reviews/${reviewId}`);
      
      const updatedReviews = reviews.filter(review => review.id !== reviewId);
      setReviews(updatedReviews);
      
      if (product) {
        const newAverage = updatedReviews.length > 0 
          ? updatedReviews.reduce((sum, review) => sum + review.rating, 0) / updatedReviews.length
          : 0;
        setProduct({
          ...product,
          averageRating: parseFloat(newAverage.toFixed(1))
        });
      }
      
      toast.success('Review deleted successfully');
    } catch (err) {
      toast.error('Failed to delete review');
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductAndReviews();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <img src="/laptop.jpg" alt="Product Image" className="img-fluid rounded"/>
        </div>

        <div className="col-md-6">
          <h2 className="mb-3">{product.name}</h2>
          <p className="text-muted">Category: {product.category}</p>
          <h4 className="text-success">${product.price.toFixed(2)}</h4>
          <p className="mt-4">{product.description}</p>

          <div className="mb-3">
            <Rating rating={product.averageRating} />
            <small className="text-muted">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</small>
          </div>

          <div className="d-grid gap-2 d-md-block">
            <button className="btn btn-primary me-2">Add to Cart</button>
            <button className="btn btn-success">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <h4>Product Specifications</h4>
          <ul>
            <li>Added on {new Date(product.dateAdded).toLocaleDateString()}</li>
            <li>Average Rating {product.averageRating}</li>
          </ul>
        </div>
      </div>

      <div className="row grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          ) : (
            <ReviewList 
              reviews={reviews}
              onEdit={setEditingReviewId}
              onDelete={handleDeleteReview}
            />
          )}
        </div>
        <div className="col">
          <h2 className="text-xl font-semibold mb-4">
            {editingReviewId ? 'Edit Review' : 'Write a Review'}
          </h2>
          <ReviewForm 
            onSubmit={editingReviewId ? 
              (data) => handleUpdateReview(editingReviewId, data) : 
              handleAddReview
            }
            onCancel={() => setEditingReviewId(null)}
            initialData={editingReviewId ? 
              reviews.find(r => r.id === editingReviewId) : 
              undefined
            }
          />
        </div>
      </div>

      <div className="mt-6">
        <Link to="/" className="text-indigo-600 hover:underline">
          &larr; Back to products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
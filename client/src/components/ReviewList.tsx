import { Review } from '../types';
import Rating from './Rating';

interface ReviewListProps {
  reviews: Review[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ReviewList = ({ reviews, onEdit, onDelete }: ReviewListProps) => {
  return (
    <div className="container space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="card bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{review.author}</h3>
              <div className="mb-3"><Rating rating={review.rating} /></div>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </div>
          </div>
          <p className="mt-2 text-gray-700">{review.comment}</p>
          <div className="row ">
            <div className="col">
              <button onClick={() => onEdit(review.id)}
                className="btn btn-primary me-2">Edit</button>
            </div>
            <div className="col">
              <button onClick={() => onDelete(review.id)}
                className="btn btn-primary me-2">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
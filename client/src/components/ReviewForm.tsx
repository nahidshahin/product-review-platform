import { useState } from 'react';
import { ReviewFormData } from '../types';

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => void;
  onCancel?: () => void;
  initialData?: {
    author: string;
    rating: number;
    comment: string;
  };
}

const ReviewForm = ({ onSubmit, onCancel, initialData }: ReviewFormProps) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    author: initialData?.author || '',
    rating: initialData?.rating || 0,
    comment: initialData?.comment || ''
  });
  const [errors, setErrors] = useState<Partial<ReviewFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      rating: Number(value)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Partial<ReviewFormData> = {};
    if (!formData.author.trim()) newErrors.author = 'Name is required';
    if (!formData.comment.trim()) newErrors.comment = 'Comment is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
    setFormData({
      author: '',
      rating: 0,
      comment: ''
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      <div className="container">
        <div className="input-group mb-3">
          <span className="input-group-text">Author's Name</span>
          <input type="text" id="author" name="author"
            value={formData.author} onChange={handleChange} className="form-control"/>
          {errors.author && <p className="text-danger">{errors.author}</p>}
        </div>        

        <div className="input-group mb-3">
          <span className="input-group-text">Rating</span>
          <input type="text" id="rating" name="rating"
            value={formData.rating} onChange={handleRatingChange} className="form-control"/>
          {errors.rating && <p className="text-danger">{errors.rating}</p>}
        </div>        

        <div className="input-group mb-3">
          <span className="input-group-text">Review</span>
          <textarea id="comment" name="comment" value={formData.comment}
            onChange={handleChange} 
            className={`w-full px-3 py-2 border rounded-md ${errors.comment ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.comment && <p className="text-danger">{errors.comment}</p>}
        </div>        

        <div className="row">
          {onCancel && (
            <div className="col">
              <button type="button" onClick={onCancel}
                className="btn btn-success">Cancel</button>
            </div>
          )}
          <div className="col">
            <button type="submit" className="btn btn-success">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// DiceBear cartoon avatar generator
const getCartoonAvatar = (seed) => {
  return `https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}`;
};

const ReviewSection = ({ productId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false); // 👈 toggle state

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!productId) return;
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/reviews/${productId}`);
      if (Array.isArray(res.data)) {
        setReviews(res.data);
      } else {
        setReviews([]);
        console.warn('Unexpected review response format:', res.data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      toast.error('Failed to load reviews');
      setReviews([]);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!comment || !rating) return toast.error('All fields are required');

    const reviewData = { productId, userId, rating, comment };

    try {
      setLoading(true);
      await axios.post(`${backendUrl}/api/reviews`, reviewData);
      toast.success('Review submitted successfully!');
      setComment('');
      setRating(5);
      fetchReviews();
    } catch (err) {
      console.error('Submit error:', err);
      const msg =
        err.response?.data?.message ||
        'Failed to submit review. You may have already reviewed this product.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!productId) {
    return (
      <div className="text-gray-500 text-sm p-4">
        Unable to load reviews. Missing product or user information.
      </div>
    );
  }

  // Show only 3 reviews unless "Show All" is active
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="review-section mt-12">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>

      {reviews.length === 0 && (
        <p className="text-sm text-gray-500">No reviews yet.</p>
      )}

      {visibleReviews.map((rev, idx) => (
        <div
          key={idx}
          className="mb-4 border-b pb-3 flex items-start gap-3"
        >
          {/* Avatar */}
          <img
            src={getCartoonAvatar(rev.userId || `random-${idx}`)}
            alt="avatar"
            className="w-10 h-10 rounded-full shadow-md bg-gray-100"
          />

          <div>
            {/* User name */}
            <p className="text-xs text-gray-600 font-semibold">
              {rev.user?.name || 'Anonymous'}
            </p>
            {/* Rating */}
            <p className="font-medium text-yellow-600">
              {'⭐️'.repeat(rev.rating)}{' '}
              <span className="text-sm text-gray-600">({rev.rating}/5)</span>
            </p>
            {/* Comment */}
            <p className="text-gray-700">{rev.comment}</p>
            {/* Date */}
            <p className="text-xs text-gray-400">
              {new Date(rev.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}

      {/* Toggle button */}
      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-600 hover:underline mt-2"
        >
          {showAll ? 'Show Less' : `Show All Reviews (${reviews.length})`}
        </button>
      )}

      <hr className="my-6" />
      <h4 className="text-md font-medium mb-2">Write a Review</h4>

      <form onSubmit={submitReview} className="space-y-3">
        {/* Star Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-2xl focus:outline-none"
            >
              {star <= (hoverRating || rating) ? '⭐' : '☆'}
            </button>
          ))}
        </div>

        {/* Comment Box */}
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your thoughts here..."
          className="block w-full mt-1 p-2 border rounded"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;

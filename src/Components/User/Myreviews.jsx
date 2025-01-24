import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authprovider/Authprovider';
import EditReviewModal from './EditReviewModal';

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null); // For modal editing
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const userEmail = user?.email;

  // Fetch user's reviews
  useEffect(() => {
    if (userEmail) {
      axios
        .get(`http://localhost:5000/reviews-by-email?email=${userEmail}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error(err));
    }
  }, [userEmail]);

  // Handle review deletion
  const handleDelete = (reviewId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/reviews/${reviewId}`)
          .then(() => {
            setReviews(reviews.filter((review) => review._id !== reviewId));
            Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
          })
          .catch(() => {
            Swal.fire('Error', 'Failed to delete review.', 'error');
          });
      }
    });
  };

  // Handle review edit
  const handleEdit = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  // Handle review update
  const handleReviewUpdated = () => {
    axios
      .get(`http://localhost:5000/reviews?email=${userEmail}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">My Reviews</h1>
      {reviews.length > 0 ? (
        <div className='overflow-x-auto'>

          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">University Name</th>
                <th className="border border-gray-300 px-4 py-2">Scholarship Name</th>
                <th className="border border-gray-300 px-4 py-2">Rating</th>
                <th className="border border-gray-300 px-4 py-2">Comment</th>
                <th className="border border-gray-300 px-4 py-2">Review Date</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{review.universityName}</td>
                  <td className="border border-gray-300 px-4 py-2">{review.scholarshipCategory}</td>
                  <td className="border border-gray-300 px-4 py-2">{review.rating}</td>
                  <td className="border border-gray-300 px-4 py-2">{review.reviewComment}</td>
                  <td className="border border-gray-300 px-4 py-2">{review.reviewDate}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="btn btn-success mr-2"
                      onClick={() => handleEdit(review)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      ) : (
        <p className="text-gray-500 text-center">You haven't added any reviews yet.</p>
      )}

      {isModalOpen && selectedReview && (
        <EditReviewModal
          review={selectedReview}
          onClose={handleCloseModal}
          onReviewUpdated={handleReviewUpdated}
        ></EditReviewModal>
      )}
    </div>
  );
};

export default MyReviews;

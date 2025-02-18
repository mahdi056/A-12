import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../Authprovider/Authprovider';

const AddReviewModal = ({ isOpen, onClose, application, onReviewAdded }) => {

    const {user} = useContext(AuthContext);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [reviewDate, setReviewDate] = useState(new Date().toISOString().slice(0, 10));

  if (!isOpen || !application) return null; 

  const { universityName, scholarshipCategory, _id:universityId, subCategory } = application;
//   console.log(application._id);
 

  const handleSubmit = () => {
    if (!rating || !comment) {
      Swal.fire('Error', 'Rating and comment are required!', 'error');
      return;
    }

    const reviewData = {
      rating,
      reviewComment: comment,
      reviewDate,
      universityName,
      scholarshipCategory,
      universityId,
      subCategory,
      userName: user.displayName, 
      userEmail: user.email, 
    };

    // console.log(reviewData);
   
    

    axios
      .post('http://localhost:5000/reviews', reviewData)
      .then(() => {
        Swal.fire('Success', 'Review added successfully!', 'success');
        onReviewAdded();
        onClose();
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to add review.', 'error');
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Review</h2>
      
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="input input-bordered w-full mb-3"
        />
        <textarea
          placeholder="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="textarea textarea-bordered w-full mb-3"
        ></textarea>
        <input
          type="date"
          value={reviewDate}
          onChange={(e) => setReviewDate(e.target.value)}
          className="input input-bordered w-full mb-3"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={handleSubmit} className="btn btn-success">
            Submit
          </button>
          <button onClick={onClose} className="btn btn-error">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;

import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditReviewModal = ({ review, onClose, onReviewUpdated }) => {
  const [formData, setFormData] = useState({
    universityName: review.universityName || '',
    scholarshipCategory: review.scholarshipCategory || '',
    rating: review.rating || '',
    reviewComment: review.reviewComment || '',
    reviewDate: review.reviewDate || '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://a-12-server-side-gold.vercel.app/reviews/${review._id}`, formData)
      .then(() => {
        Swal.fire('Success', 'Review updated successfully!', 'success');
        onReviewUpdated(); // Notify parent to refresh reviews
        onClose(); // Close the modal
      })
      .catch((err) => {
        console.error(err);
        Swal.fire('Error', 'Failed to update review.', 'error');
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Edit Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="universityName">
              University Name
            </label>
            <input
              type="text"
              id="universityName"
              name="universityName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.universityName}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="scholarshipCategory">
              Scholarship Name
            </label>
            <input
              type="text"
              id="scholarshipCategory"
              name="scholarshipCategory"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.scholarshipCategory}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="rating">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="reviewComment">
              Comment
            </label>
            <textarea
              id="reviewComment"
              name="reviewComment"
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.reviewComment}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="reviewDate">
              Review Date
            </label>
            <input
              type="date"
              id="reviewDate"
              name="reviewDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.reviewDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-error mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReviewModal;

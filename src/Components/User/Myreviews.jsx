import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Authprovider/Authprovider';

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const userEmail = user.email;

  // Fetch user's reviews
  useEffect(() => {
    axios
      .get(`http://localhost:5000/reviews?email=${userEmail}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, [userEmail]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">My Reviews</h1>
      {reviews.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">University Name</th>
              <th className="border border-gray-300 px-4 py-2">Scholarship Name</th>
              <th className="border border-gray-300 px-4 py-2">Rating</th>
              <th className="border border-gray-300 px-4 py-2">Comment</th>
              <th className="border border-gray-300 px-4 py-2">Review Date</th>
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

                    <button className='btn btn-success'>Edit</button>    
                    <button className='btn btn-error'>Delete</button>



                </td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">You haven't added any reviews yet.</p>
      )}
    </div>
  );
};

export default MyReviews;

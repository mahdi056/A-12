import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import axios from "axios";
import Swal from "sweetalert2";


const Managereviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
  
    // Fetch all reviews
    useEffect(() => {
      axios
        .get("https://a-12-server-side-gold.vercel.app/reviews") 
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    }, []);
  
    // Handle delete
    const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "This review will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`https://a-12-server-side-gold.vercel.app/reviews/${id}`)
            .then(() => {
              setReviews(reviews.filter((review) => review._id !== id));
              Swal.fire("Deleted!", "The review has been deleted.", "success");
            })
            .catch((error) => {
              console.error("Error deleting review:", error);
              Swal.fire("Error!", "Failed to delete the review.", "error");
            });
        }
      });
    };
    return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">All Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border rounded-lg shadow-md p-4 flex flex-col gap-3"
              >
               
                <h3 className="text-lg font-semibold">
                  University: {review.universityName}
                </h3>
                <p>Subject Category: {review.subCategory}</p>
                <div className="flex items-center gap-3">
                  <img
                    src={user?.photourl}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user?.displayName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p>Rating: {review.ratingPoint} / 5</p>
                <p className="text-gray-700">{review.comments}</p>
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(review._id)}
                  className="mt-2 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      );
};

export default Managereviews;
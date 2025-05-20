import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Adminmngappscho = () => {
    const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false); 
  const [feedback, setFeedback] = useState(""); 

  // Fetch all applied scholarships
  useEffect(() => {
    axios
      .get("https://a-12-server-side-gold.vercel.app/apply-scholarship")
      .then((response) => {
        setScholarships(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scholarships:", error);
        Swal.fire("Error", "Failed to load scholarships.", "error");
      });
  }, []);

  // Handle cancel application
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://a-12-server-side-gold.vercel.app/apply-scholarship/${id}`)
          .then(() => {
            setScholarships((prev) => prev.filter((sch) => sch._id !== id));
            Swal.fire("Cancelled!", "The application has been cancelled.", "success");
          })
          .catch((error) => {
            console.error("Error cancelling application:", error);
            Swal.fire("Error", "Failed to cancel the application.", "error");
          });
      }
    });
  };

   // Handle feedback submission
   const handleFeedbackSubmit = () => {
    const feedbackData = {
      scholarshipId: selectedScholarship._id,
      feedback,
    };

    axios
      .post("https://a-12-server-side-gold.vercel.app/feedback", feedbackData)
      .then(() => {
        Swal.fire("Success", "Feedback submitted successfully.", "success");
        setFeedback(""); // Clear feedback input
        setIsFeedbackModalOpen(false); // Close modal
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        Swal.fire("Error", "Failed to submit feedback.", "error");
      });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">All Applied Scholarships</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">University Name</th>
            <th className="border border-gray-300 px-4 py-2">Degree</th>
            <th className="border border-gray-300 px-4 py-2">Scholarship Category</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((scholarship) => (
            <tr key={scholarship._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{scholarship.universityName}</td>
              <td className="border border-gray-300 px-4 py-2">{scholarship.degree}</td>
              <td className="border border-gray-300 px-4 py-2">{scholarship.scholarshipCategory}</td>
              <td className="border border-gray-300 px-4 py-2">{scholarship.status || 'pending'}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 mr-2 rounded"
                  onClick={() => {
                    setSelectedScholarship(scholarship);
                    setIsModalOpen(true);
                  }}
                >
                  Details
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                  onClick={() => {
                    setSelectedScholarship(scholarship);
                    setIsFeedbackModalOpen(true);
                  }}
                >
                  Feedback
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleCancel(scholarship._id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && selectedScholarship && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-3">Application Details</h2>
            <p>
              <strong>University Name:</strong> {selectedScholarship.universityName}
            </p>
            <p>
              <strong>Degree:</strong> {selectedScholarship.degree}
            </p>
            <p>
              <strong>Scholarship Category:</strong> {selectedScholarship.scholarshipCategory}
            </p>
            <p>
              <strong>Scholarship Category:</strong> {selectedScholarship.subCategory}
            </p>
            <p>
              <strong>Scholarship Category:</strong> {selectedScholarship.appFees}
            </p>
            <p>
              <strong>Scholarship Category:</strong> {selectedScholarship.serviceCrg}
            </p>
            <p>
              <strong>Scholarship Category:</strong> {selectedScholarship.gender}
            </p>
            <p>
              <strong>Scholarship Category:</strong> {selectedScholarship.degree}
            </p>

          
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

          {/* Feedback Modal */}
          {isFeedbackModalOpen && selectedScholarship && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-3">Provide Feedback</h2>
            <textarea
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsFeedbackModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleFeedbackSubmit}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminmngappscho;
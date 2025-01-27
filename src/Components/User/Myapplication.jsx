import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authprovider/Authprovider';
import { Link } from 'react-router-dom';
import AddReviewModal from './AddReviewModal'; // Import the modal component

const MyApplication = () => {
  const { user } = useContext(AuthContext);
  const [appliedScholarships, setAppliedScholarships] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const userEmail = user.email;

  // Fetch applied scholarships
  useEffect(() => {
    axios
      .get(`https://a-12-server-side-gold.vercel.app/apply-scholarship-by-email?email=${userEmail}`)
      .then((res) => 
        
        setAppliedScholarships(res.data)
    )

      .catch((err) => console.error(err));
  }, [userEmail]);

  // Feedback 
  useEffect(()=> {
    axios.get('https://a-12-server-side-gold.vercel.app/feedback')
    .then(res => setFeedback(res.data))
    .catch(error => console.error(error))
  },[]);



 

  // Handle cancel application
  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://a-12-server-side-gold.vercel.app/apply-scholarship/${id}`)
          .then(() => {
            setAppliedScholarships(appliedScholarships.filter((app) => app._id !== id));
            Swal.fire('Canceled!', 'Your application has been canceled.', 'success');
          })
          .catch((err) => {
            Swal.fire('Error!', 'Could not cancel the application.', 'error');
            console.error(err);
          });
      }
    });
  };

  const handleAddReview = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleReviewAdded = () => {

    Swal.fire('Success!', 'Your review has been added.', 'success');
  };

   // Open the details modal
   const handleDetails = (application) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };

  // Close the details modal
  const closeDetailsModal = () => {
    setSelectedApplication(null);
    setIsDetailsModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">My Applied Scholarships</h1>
      <div className='overflow-x-auto'>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">University Name</th>
            <th className="border border-gray-300 px-4 py-2">University Address</th>
            <th className="border border-gray-300 px-4 py-2">Subject Category</th>
            <th className="border border-gray-300 px-4 py-2">Applied Degree</th>
            <th className="border border-gray-300 px-4 py-2">Application Fees</th>
            <th className="border border-gray-300 px-4 py-2">Service Charge</th>
            <th className="border border-gray-300 px-4 py-2">Application Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appliedScholarships.map((app) => (
            <tr key={app._id} className="text-center">
              <td className="border border-gray-300 px-2 py-1">{app.universityName}</td>
              <td className="border border-gray-300 px-2 py-1">{app.address.village},{app.address.district},{app.address.country}</td>
              <td className="border border-gray-300 px-2 py-1">{app.subCategory}</td>
              <td className="border border-gray-300 px-2 py-1">{app.degree}</td>
              <td className="border border-gray-300 px-2 py-1">{app.appFees}</td>
              <td className="border border-gray-300 px-2 py-1">{app.serviceCrg}</td>
              <td className="border border-gray-300 px-2 py-1">{app.status || 'Pending'}</td>
              <td className="border border-gray-300">

                <div className="grid grid-cols-2 gap-2">

                <button
                      className="btn btn-outline btn-success"
                      onClick={() => handleDetails(app)}
                    >
                      Details
                    </button>
                  
                  <Link to={`/dashboard/edit-application/${app._id}`}>
                    <button className="btn btn-success text-white rounded">Edit</button>
                  </Link>
                  <button
                    className="btn btn-error text-white rounded"
                    onClick={() => handleCancel(app._id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-info text-white rounded"
                    onClick={() => handleAddReview(app)}
                  >
                    Add Review
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Feedback Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Feedback</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {feedback.map((feedback) => (
          <div
            key={feedback._id}
            className="bg-white shadow-lg rounded-lg p-5 border border-gray-200"
          >
            
            <p className="text-gray-700">
              <strong>Feedback:</strong> {feedback.feedback}
            </p>
           
          </div>
        ))}
      </div>
        
      </div>

       {/* Details Modal */}
       {isDetailsModalOpen && selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Application Details</h2>
            <p><strong>Phone:</strong> {selectedApplication.phone}</p>
            <p><strong>Photo:</strong> <img src={selectedApplication.photo} alt="" className="w-20 h-20 rounded-full" /></p>
            <p><strong>Address:</strong> {selectedApplication.address.village}, {selectedApplication.address.district}, {selectedApplication.address.country}</p>
            <p><strong>Gender:</strong> {selectedApplication.gender}</p>
            <p><strong>Degree:</strong> {selectedApplication.degree}</p>
            <p><strong>SSC Result:</strong> {selectedApplication.sscResult}</p>
            <p><strong>HSC Result:</strong> {selectedApplication.hscResult}</p>
            <p><strong>Study Gap:</strong> {selectedApplication.studyGap}</p>
            <p><strong>University Name:</strong> {selectedApplication.universityName}</p>
            <p><strong>Scholarship Category:</strong> {selectedApplication.scholarshipCategory}</p>
            <p><strong>Sub Category:</strong> {selectedApplication.subCategory}</p>
            <p><strong>Application Fees:</strong> {selectedApplication.appFees}</p>
            <p><strong>Service Charge:</strong> {selectedApplication.serviceCrg}</p>
            <p><strong>User Name:</strong> {selectedApplication.userName}</p>
            <p><strong>User Email:</strong> {selectedApplication.userEmail}</p>
            <p><strong>Current Date:</strong> {selectedApplication.currentDate}</p>
            <button
              className="btn btn-outline btn-error mt-4"
              onClick={closeDetailsModal}
            >
              Close
            </button>
          </div>
        </div>
      )}


      

      </div>
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        application={selectedApplication}
        onReviewAdded={handleReviewAdded}
        
      ></AddReviewModal>
    </div>
  );
};

export default MyApplication;

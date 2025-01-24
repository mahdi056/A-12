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
  const userEmail = user.email;

  // Fetch applied scholarships
  useEffect(() => {
    axios
      .get(`http://localhost:5000/apply-scholarship-by-email?email=${userEmail}`)
      .then((res) => 
        
        setAppliedScholarships(res.data)
    )

      .catch((err) => console.error(err));
  }, [userEmail]);

 

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
          .delete(`http://localhost:5000/apply-scholarship/${id}`)
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
                  <button className="btn btn-outline btn-success">Details</button>
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

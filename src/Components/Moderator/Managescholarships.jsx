import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [editingScholarship, setEditingScholarship] = useState(null); // Scholarship being edited
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    // Fetch scholarships from the server
    axios
      .get('http://localhost:5000/apply-scholarship')
      .then((response) => {
        setScholarships(response.data);
      })
      .catch((error) => {
        console.error('Error fetching scholarships:', error);
      });
  }, []);

  // Open modal and set the scholarship being edited
  const handleEdit = (scholarship) => {
    setEditingScholarship(scholarship); // Set the scholarship to edit
    setModalOpen(true); // Open the modal
  };

  // Handle form submission to update scholarship
 const handleUpdate = (event) => {
  event.preventDefault();
  console.log('Updating scholarship:', editingScholarship);
  axios
    .put(`http://localhost:5000/apply-scholarship/${editingScholarship._id}`, editingScholarship)
    .then((response) => {
      console.log('Response:', response);
      if (response.data.message === 'Application updated successfully') {
        setScholarships((prev) =>
          prev.map((sch) => (sch._id === editingScholarship._id ? editingScholarship : sch))
        );
        Swal.fire('Updated!', 'The scholarship has been updated.', 'success');
      }
    })
    .catch((error) => {
      console.error('Error updating scholarship:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    });
  setModalOpen(false);
};

  // Handle input changes in the edit form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingScholarship({ ...editingScholarship, [name]: value });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/apply-scholarship/${id}`)
          .then((response) => {
            if (response.data.message === 'Application canceled successfully') {
              setScholarships(scholarships.filter((scholarship) => scholarship._id !== id));
              Swal.fire('Deleted!', 'The scholarship has been deleted.', 'success');
            }
          })
          .catch((error) => {
            console.error('Error deleting scholarship:', error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Scholarships</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Scholarship Name</th>
            <th className="border px-4 py-2">University Name</th>
            <th className="border px-4 py-2">Subject Category</th>
            <th className="border px-4 py-2">Degree</th>
            <th className="border px-4 py-2">Application Fees</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((scholarship) => (
            <tr key={scholarship._id}>
              <td className="border px-4 py-2">{scholarship.scholarshipCategory}</td>
              <td className="border px-4 py-2">{scholarship.universityName}</td>
              <td className="border px-4 py-2">{scholarship.subCategory}</td>
              <td className="border px-4 py-2">{scholarship.degree}</td>
              <td className="border px-4 py-2">{scholarship.appFees}</td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => handleEdit(scholarship)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(scholarship._id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/2">
            <h3 className="text-lg font-bold mb-4">Edit Scholarship</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block mb-2">Scholarship Name</label>
                <input
                  type="text"
                  name="scholarshipCategory"
                  value={editingScholarship.scholarshipCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">University Name</label>
                <input
                  type="text"
                  name="universityName"
                  value={editingScholarship.universityName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Subject Category</label>
                <input
                  type="text"
                  name="subCategory"
                  value={editingScholarship.subCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={editingScholarship.degree}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Application Fees</label>
                <input
                  type="text"
                  name="appFees"
                  value={editingScholarship.appFees}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditScholarship = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch scholarship details by ID
    axios
      .get(`http://localhost:5000/apply-scholarship/${id}`)
      .then((response) => {
        setScholarship(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching scholarship details:', error);
        setLoading(false);
      });
  }, [id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScholarship((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/apply-scholarship/${id}`, scholarship);
      alert('Scholarship updated successfully!');
    } catch (error) {
      console.error('Error updating scholarship:', error);
      alert('Failed to update scholarship. Please try again later.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Scholarship</h2>
      {scholarship && (
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Scholarship Name</label>
            <input
              type="text"
              name="scholarshipCategory"
              value={scholarship.scholarshipCategory}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">University Name</label>
            <input
              type="text"
              name="universityName"
              value={scholarship.universityName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Subject Category</label>
            <input
              type="text"
              name="subCategory"
              value={scholarship.subCategory}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Degree</label>
            <input
              type="text"
              name="degree"
              value={scholarship.degree}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Application Fees</label>
            <input
              type="number"
              name="appFees"
              value={scholarship.appFees}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Scholarship
          </button>
        </form>
      )}
    </div>
  );
};

export default EditScholarship;


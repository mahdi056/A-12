import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddScholarship = () => {
  const [formData, setFormData] = useState({
    scholarship_name: '',
    university_name: '',
    university_location: {
      country: '',
      city: '',
    },
    university_rank: '',
    subject_category: 'Agriculture',  
    scholarship_category: 'Full fund', 
    degree: 'Diploma', 
    tuition_fees: '',
    application_fees: '',
    service_charge: '',
    application_deadline: '',
    scholarship_post_date: new Date().toISOString().split('T')[0],
    posted_user_email: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update nested university_location fields
    if (name === 'university_country' || name === 'university_city') {
      setFormData((prevData) => ({
        ...prevData,
        university_location: {
          ...prevData.university_location,
          [name === 'university_country' ? 'country' : 'city']: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/all-scholarship', formData);
      if (response.status === 201) {
        Swal.fire('Scholarship added successfully!');
        setFormData({
          scholarship_name: '',
          university_name: '',
          university_location: {
            country: '',
            city: '',
          },
          university_rank: '',
          subject_category: 'Agriculture',
          scholarship_category: 'Full fund',
          degree: 'Diploma',
          tuition_fees: '',
          application_fees: '',
          service_charge: '',
          application_deadline: '',
          scholarship_post_date: new Date().toISOString().split('T')[0],
          posted_user_email: '',
        });
      }
    } catch (error) {
      console.error('Error adding scholarship', error);
      Swal.fire('Error adding scholarship.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Scholarship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="scholarship_name" className="block">Scholarship Name</label>
          <input
            type="text"
            id="scholarship_name"
            name="scholarship_name"
            value={formData.scholarship_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="university_name" className="block">University Name</label>
          <input
            type="text"
            id="university_name"
            name="university_name"
            value={formData.university_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="university_country" className="block">University Country</label>
          <input
            type="text"
            id="university_country"
            name="university_country"
            value={formData.university_location.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="university_city" className="block">University City</label>
          <input
            type="text"
            id="university_city"
            name="university_city"
            value={formData.university_location.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="university_rank" className="block">University World Rank</label>
          <input
            type="number"
            id="university_rank"
            name="university_rank"
            value={formData.university_rank}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="subject_category" className="block">Subject Category</label>
          <select
            id="subject_category"
            name="subject_category"
            value={formData.subject_category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Agriculture">Agriculture</option>
            <option value="Engineering">Engineering</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <div>
          <label htmlFor="scholarship_category" className="block">Scholarship Category</label>
          <select
            id="scholarship_category"
            name="scholarship_category"
            value={formData.scholarship_category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
        </div>

        <div>
          <label htmlFor="degree" className="block">Degree</label>
          <select
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        <div>
          <label htmlFor="application_fees" className="block">Application Fees</label>
          <input
            type="number"
            id="application_fees"
            name="application_fees"
            value={formData.application_fees}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="service_charge" className="block">Service Charge</label>
          <input
            type="number"
            id="service_charge"
            name="service_charge"
            value={formData.service_charge}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="application_deadline" className="block">Application Deadline</label>
          <input
            type="date"
            id="application_deadline"
            name="application_deadline"
            value={formData.application_deadline}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="posted_user_email" className="block">Posted User Email</label>
          <input
            type="email"
            id="posted_user_email"
            name="posted_user_email"
            value={formData.posted_user_email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-lg">Add Scholarship</button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;

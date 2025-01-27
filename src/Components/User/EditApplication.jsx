import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditApplication = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        universityName: '',
        address: { village: '', district: '', country: '' },
        subCategory: '',
        degree: '',
        appFees: '',
        serviceCrg: '',
    });

    // Fetch application data
    useEffect(() => {
        axios.get(`https://a-12-server-side-gold.vercel.app/apply-scholarship-by-email/${id}`)
            .then((res) => setFormData(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://a-12-server-side-gold.vercel.app/apply-scholarship/${id}`, formData)
            .then(() => {
                Swal.fire('Success', 'Application updated successfully.', 'success');
                navigate('/dashboard/myapplication');
            })
            .catch((err) => {
                Swal.fire('Error', 'Could not update the application.', 'error');
                console.error(err);
            });
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Edit Application</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>University Name</label>
                    <input
                        type="text"
                        name="universityName"
                        value={formData.universityName}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label>Village</label>
                    <input
                        type="text"
                        name="village"
                        value={formData.address.village}
                        onChange={handleAddressChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label>District</label>
                    <input
                        type="text"
                        name="district"
                        value={formData.address.district}
                        onChange={handleAddressChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.address.country}
                        onChange={handleAddressChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label>Subject Category</label>
                    <input
                        type="text"
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label>Degree</label>
                    <input
                        type="text"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label>Application Fees</label>
                    <input
                        type="number"
                        name="appFees"
                        value={formData.appFees}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                        
                    />
                </div>
                <div>
                    <label>Service Charge</label>
                    <input
                        type="number"
                        name="serviceCrg"
                        value={formData.serviceCrg}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                        
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    Update Application
                </button>
            </form>
        </div>
    );
};

export default EditApplication;

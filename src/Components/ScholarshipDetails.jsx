import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ScholarshipDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [reviews,setReviews] = useState([]);

  // Fetch scholarship details
  useEffect(() => {
    axios.get(`http://localhost:5000/all-scholarship/${id}`)
      .then((res) => {
        setScholarship(res.data);
      })
      .catch((error) => {
        console.error("Error fetching scholarship details:", error);
      });
  }, [id]);


  


 

  if (!scholarship) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const handleApply = () => {
    navigate("/payment", { 
      state: {
        price: scholarship.application_fees, 
        universityName: scholarship.university_name,
        scholarshipCategory: scholarship.scholarship_category,
        subCategory: scholarship.subject_category[0],
        appFees: scholarship.application_fees,
        serviceCrg: scholarship.service_charge,
        
      } 
    });
  };


 




  

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
        <img src={scholarship.university_logo} alt="University Logo" className="w-full h-40 object-contain mb-4" />
        <h2 className="text-3xl font-bold mb-2">{scholarship.university_name}</h2>
        <p className="text-gray-600">{scholarship.university_location.city}, {scholarship.university_location.country}</p>
        <p className="text-green-600 font-bold mt-2">{scholarship.scholarship_category}</p>
        <p className="text-gray-500 mt-1">Deadline: {scholarship.application_deadline}</p>
        <p className="mt-4"><strong>Subject Category:</strong> {scholarship.subject_category[0]}</p>
        <p className="mt-2">{scholarship.scholarship_description}</p>
       

        {scholarship.stipend && (
          <p className="mt-2"><strong>Stipend:</strong> {scholarship.stipend}</p>
        )}

        <p className="mt-2"><strong>Post Date:</strong> {scholarship.post_date}</p>
        <p className="mt-2"><strong>Service Charge:</strong> {scholarship.service_charge}</p>
        <p className="mt-2"><strong>Application Fees:</strong> {scholarship.application_fees} $</p>
        <p className="mt-2"><span className="font-bold">Rating: </span>{scholarship.rating}</p>
        <p className="mt-2">Reviews: {scholarship.reviews}</p>

        <button onClick={handleApply} className="mt-4 btn btn-outline btn-success w-full">
          Apply Scholarship
        </button>
      </div>

        



    </div>
  );
};

export default ScholarshipDetails;

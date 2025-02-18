import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./Authprovider/Authprovider";

const AllScholarships = () => {
  const { user } = useContext(AuthContext);
  const [scholarships, setScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(""); 

  // Fetch all scholarships
  useEffect(() => {
    axios
      .get("http://localhost:5000/all-scholarship")
      .then((res) => {
        setScholarships(res.data);
      })
      .catch((error) => {
        console.error("Error fetching scholarships:", error);
      });
  }, []);

  // Filter scholarships by university name
  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.university_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort scholarships based on application fees
  const sortedScholarships = [...filteredScholarships].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.application_fees - b.application_fees;
    } else if (sortOrder === "desc") {
      return b.application_fees - a.application_fees;
    }
    return 0;
  });

  return (
    <div>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">All Scholarships</h2>

        {/* Search Bar */}
        <div className="flex justify-between mb-6">
          <input
            type="text"
            className="input input-bordered w-full max-w-lg"
            placeholder="Search by university name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Sorting Dropdown */}
          <select
            className="select select-bordered ml-4"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by Application Fees</option>
            <option value="asc">Lowest Order</option>
            <option value="desc">Highest Order</option>
          </select>
        </div>

        {/* Scholarships Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedScholarships.length > 0 ? (
            sortedScholarships.map((scholarship) => (
              <div key={scholarship._id} className="bg-white shadow-lg rounded-lg p-4">
                <img src={scholarship.university_logo} alt="" className="w-full h-32 object-contain mb-4" />
                <h3 className="text-xl font-semibold">{scholarship.university_name}</h3>
                <p className="text-gray-600">
                  {scholarship.university_location.city}, {scholarship.university_location.country}
                </p>
                <p className="text-green-600 font-bold mt-2">{scholarship.scholarship_category}</p>
                <p className="mt-2 mb-2">Application Fees: ${scholarship.application_fees}</p>

                <Link to={`/scholarshipdetails/${scholarship._id}`}>
                  <button className="btn btn-outline btn-info">Details</button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No scholarships found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllScholarships;

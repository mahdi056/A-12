import img1 from '../assets/img1.avif';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from './Authprovider/Authprovider';

const Home = () => {
    const {user} = useContext(AuthContext);

    const [topScholarships, setTopScholarships] = useState([]);

    // Fetch scholarships & filter top ones
    useEffect(() => {
        axios.get("https://a-12-server-side-gold.vercel.app/all-scholarship")
            .then((res) => {
                const scholarships = res.data;


                const sortedByFees = scholarships.sort((a, b) => a.application_fees - b.application_fees);
                const sortedByDate = sortedByFees.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
                setTopScholarships(sortedByDate.slice(0, 6));
            })
            .catch((error) => {
                console.error("Error fetching top scholarships:", error);
            });
    }, []);


    return (
        <div>
            {/* banner */}

            <div className='flex justify-center mt-12'>

                <div className="carousel w-4/5">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img
                            src={img1}
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src={img2}
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src={img3}
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>


                </div>
            </div>

            {/* Top scholarship */}
            <div className='mt-4'>

                <div className="container mx-auto p-6">
                    <h2 className="text-3xl font-bold text-center mb-6">Top Scholarships</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topScholarships.length > 0 ? (
                            topScholarships.map((scholarship) => (
                                <div key={scholarship._id} className="bg-white shadow-lg rounded-lg p-4">
                                    <img src={scholarship.university_logo} alt="University Logo" className="w-full h-32 object-contain mb-4" />
                                    <h3 className="text-xl font-semibold">{scholarship.university_name}</h3>
                                    <p className="text-gray-600">{scholarship.university_location.city}, {scholarship.university_location.country}</p>
                                    <p className="text-green-600 font-bold mt-2">{scholarship.scholarship_category}</p>
                                    <p>{scholarship.subject_category[0]}</p>
                                    <p className="text-gray-500 mt-1">Deadline: {scholarship.application_deadline}</p>
                                    <p className="text-gray-700 mt-1">Posted on: {scholarship.post_date}</p>
                                    <p className="text-blue-500 font-bold"> Application Fee: ${scholarship.application_fees}</p>
                                    <p><span>Rating: </span>{scholarship.rating}</p>

                                    <div className="flex gap-4 mt-4">
                                       

                                        {
                                            user ? (<Link to={`/scholarshipdetails/${scholarship._id}`}>
                                                <button className="btn btn-outline btn-success">Details</button>
                                            </Link>)
                                            :
                                            (<Link to='/login'>
                                                <button className="btn btn-outline btn-info">Details</button>
                                            </Link>)
                                        }
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No top scholarships available.</p>
                        )}
                    </div>
                </div>

            </div>

            <div className='flex justify-center mt-8'>
                <Link to ='/allscholarship'><button className='btn btn-outline btn-success'>All Scholarship</button></Link>
            </div>

            {/* First creative sectino */}
            <div className="container mx-auto px-4 py-10">

                <section className="mb-12 text-center">
                    <h2 className="text-2xl font-bold mb-4">Scholarship Benefits</h2>
                    <p className="text-gray-700 mb-6">
                        Scholarships provide financial support, career opportunities, and access to global education.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white shadow rounded">
                            <h3 className="text-lg font-semibold text-gray-800">Financial Support</h3>
                            <p className="text-gray-600">Covers tuition fees, books, and living expenses.</p>
                        </div>
                        <div className="p-4 bg-white shadow rounded">
                            <h3 className="text-lg font-semibold text-gray-800">Career Opportunities</h3>
                            <p className="text-gray-600">Boost your resume with recognized scholarships.</p>
                        </div>
                        <div className="p-4 bg-white shadow rounded">
                            <h3 className="text-lg font-semibold text-gray-800">Study Abroad</h3>
                            <p className="text-gray-600">Access global education opportunities.</p>
                        </div>
                    </div>
                </section>

                {/* 2nd creative Section */}
                <section className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
                    <p className="text-gray-700 mb-6">
                        Hear from students who achieved their dreams with scholarships.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white shadow rounded">
                            <h3 className="text-lg font-semibold text-gray-800">Karim Rahman</h3>
                            <p className="text-gray-600">Received a full scholarship to study at Harvard.</p>
                        </div>
                        <div className="p-4 bg-white shadow rounded">
                            <h3 className="text-lg font-semibold text-gray-800">Md. Abdur Rahman</h3>
                            <p className="text-gray-600">Got financial aid to complete his engineering degree.</p>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default Home;
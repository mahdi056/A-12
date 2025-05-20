import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from './Authprovider/Authprovider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const Home = () => {
    const { user } = useContext(AuthContext);

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };


    return (
        <div>
            {/* banner */}
            

            <div className='flex justify-center mt-20 w-full'>
                <div className="w-4/5"> 
                    <Slider {...settings} className="w-full">
                        <div className="flex justify-center">
                            <img src={img1} className="w-full max-h-[400px] object-h-contain" alt="Slide 1" />
                        </div>
                        <div className="flex justify-center">
                            <img src={img2} className="w-full max-h-[400px] object-cover" alt="Slide 2" />
                        </div>
                        <div className="flex justify-center">
                            <img src={img3} className="w-full max-h-[400px] object-contain" alt="Slide 3" />
                        </div>
                    </Slider>
                </div>
            </div>

            {/* Top scholarship */}
            <div className='mt-20 w-4/5 mx-auto'>

                <div className="container mx-auto p-6">
                    <h2 className="text-3xl font-bold text-center mb-6">Top Scholarships</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topScholarships.length > 0 ? (
                            topScholarships.map((scholarship) => (
                                <div key={scholarship._id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
                                    <img src={scholarship.university_logo} alt="University Logo" className="w-full h-32 object-contain mb-4" />
                                    <h3 className="text-xl font-semibold">{scholarship.university_name}</h3>
                                    <p className="text-gray-600">{scholarship.university_location.city}, {scholarship.university_location.country}</p>
                                    <p className="text-green-600 font-bold mt-2">{scholarship.scholarship_category}</p>
                                    <p>{scholarship.subject_category[0]}</p>
                                    <p className="text-gray-500 mt-1">Deadline: {scholarship.application_deadline}</p>
                                    <p className="text-gray-700 mt-1">Posted on: {scholarship.post_date}</p>
                                    <p className="text-blue-500 font-bold"> Application Fee: ${scholarship.application_fees}</p>
                                    <p><span>Rating: </span>{scholarship.rating}</p>

                                    <div className="flex gap-4 pt-4">

                                        <Link to={`/scholarshipdetails/${scholarship._id}`}>
                                            <button className="btn btn-outline btn-success">Details</button >
                                        </Link>



                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No top scholarships available.</p>
                        )}
                    </div>
                </div>

            </div>

            <div className='flex justify-center mt-20'>
                <Link to='/allscholarship'><button className='btn btn-outline btn-success'>All Scholarship</button></Link>
            </div>

            {/* First creative sectino */}
            <div className="container w-4/5 mx-auto mt-20">

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
                <section className="text-center mt-20">
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


            {/* Scholarship Eligibility Criteria */}
            <div className="container w-4/5 mx-auto mt-20">
                <h2 className="text-2xl font-bold text-center mb-4">Scholarship Eligibility Criteria</h2>
                <p className="text-gray-700 text-center mb-6">Check the general eligibility criteria for applying to various scholarships.</p>
                <ul className="list-disc list-inside bg-white p-4 rounded shadow-md">
                    <li>Academic excellence and achievements</li>
                    <li>Financial need and background</li>
                    <li>Extracurricular activities and leadership</li>
                    <li>Community service and volunteer work</li>
                </ul>
            </div>

            {/* How to Apply for Scholarships */}
            <div className="container w-4/5 mx-auto mt-20">
                <h2 className="text-2xl font-bold text-center mb-4">How to Apply for Scholarships</h2>
                <p className="text-gray-700 text-center mb-6">Follow these steps to successfully apply for a scholarship.</p>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white shadow-md rounded">
                        <h3 className="text-lg font-semibold">1. Research & Find</h3>
                        <p className="text-gray-600">Explore different scholarship opportunities based on your field of study.</p>
                    </div>
                    <div className="p-4 bg-white shadow-md rounded">
                        <h3 className="text-lg font-semibold">2. Prepare Documents</h3>
                        <p className="text-gray-600">Gather required documents like transcripts, recommendation letters, and essays.</p>
                    </div>
                    <div className="p-4 bg-white shadow-md rounded">
                        <h3 className="text-lg font-semibold">3. Submit Application</h3>
                        <p className="text-gray-600">Ensure you meet the deadline and submit an error-free application.</p>
                    </div>
                </div>
            </div>

            {/* Frequently Asked Questions (FAQs) */}
            <div className="container w-4/5 mx-auto mt-20">
                <h2 className="text-2xl font-bold text-center mb-4">Frequently Asked Questions</h2>
                <div className="bg-white p-6 rounded shadow-md">
                    <details className="mb-4">
                        <summary className="font-semibold cursor-pointer">Who is eligible for scholarships?</summary>
                        <p className="text-gray-600 mt-2">Eligibility depends on the scholarship type, but most require academic excellence or financial need.</p>
                    </details>
                    <details className="mb-4">
                        <summary className="font-semibold cursor-pointer">Do I need to submit an essay?</summary>
                        <p className="text-gray-600 mt-2">Many scholarships require a personal statement or essay highlighting your achievements.</p>
                    </details>
                    <details>
                        <summary className="font-semibold cursor-pointer">How long does it take to receive results?</summary>
                        <p className="text-gray-600 mt-2">It varies, but typically results are announced within 2-6 months of the deadline.</p>
                    </details>
                </div>
            </div>

            {/* Scholarship Application Tips */}
            <div className="container w-4/5 mx-auto mt-20">
                <h2 className="text-2xl font-bold text-center mb-4">Scholarship Application Tips</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white shadow-md rounded">
                        <h3 className="text-lg font-semibold">Start Early</h3>
                        <p className="text-gray-600">Begin researching and preparing your application well in advance.</p>
                    </div>
                    <div className="p-4 bg-white shadow-md rounded">
                        <h3 className="text-lg font-semibold">Write a Strong Essay</h3>
                        <p className="text-gray-600">Highlight your strengths and experiences in a compelling way.</p>
                    </div>
                    <div className="p-4 bg-white shadow-md rounded">
                        <h3 className="text-lg font-semibold">Follow Instructions</h3>
                        <p className="text-gray-600">Carefully read the application guidelines and adhere to them strictly.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
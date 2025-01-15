import img1 from '../assets/img1.avif';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';

const Home = () => {
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
            <div>

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
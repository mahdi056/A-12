import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">

                    
                    <div>
                        <h2 className="text-xl font-semibold text-blue-400">About Us</h2>
                        <p className="text-gray-400 mt-2">
                            We help students find and apply for scholarships easily, ensuring a brighter future.
                        </p>
                    </div>

                   
                    <div>
                        <h2 className="text-xl font-semibold text-blue-400">Quick Links</h2>
                        <ul className="mt-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Scholarships</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Apply Now</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                   
                    <div>
                        <h2 className="text-xl font-semibold text-blue-400">Contact Us</h2>
                        <p className="text-gray-400 mt-2">Email: support@scholarships.com</p>
                        <p className="text-gray-400">Phone: +880 1707226784</p>
                    </div>
                </div>

              
                <div className="border-t border-gray-700 mt-6 pt-4 text-center">
                    <p className="text-gray-500">&copy; 2025 Scholarship Management System. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

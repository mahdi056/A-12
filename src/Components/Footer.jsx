import logo from '../assets/s logo.png'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">

                    
                    <div>
                        <img className='w-20 mx-auto' src={logo} alt="" />
                        <h2 className="text-xl font-semibold mt-2 text-center">Scholarship Management System</h2>
                        
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

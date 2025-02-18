

const Contactus = () => {
    return (
        <div>

<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
  
        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
  
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
  
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full"
              rows="4"
              required
            ></textarea>
  
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
  
        {/* Contact Details */}
        <div className="mt-12">
          
          <p className="text-gray-700">Phone: +880 1707226784</p>
          <p className="text-gray-700">Email: info@scholarship.com</p>
          <p className="text-gray-700">Sylhet,Bangladesh</p>
        </div>
        
      </div>

      
            
        </div>
    );
};

export default Contactus;
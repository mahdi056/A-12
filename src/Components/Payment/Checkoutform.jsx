import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Checkoutform = ({price,universityName,scholarshipCategory,subCategory,appFees,serviceCrg}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError] = useState('');
    const {user} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formData, setFormData] = useState({
        phone: "",
        photo: "",
        address: { village: "", district: "", country: "" },
        gender: "",
        degree: "",
        sscResult: "",
        hscResult: "",
        studyGap: "",
        universityName,
        scholarshipCategory,
        subCategory,
        appFees,
        serviceCrg

      });

    useEffect(() => {
        axios
          .post("http://localhost:5000/create-payment-intent", { price })
          .then((res) => setClientSecret(res.data.clientSecret))
          .catch((err) => console.error(err));
      }, [price]);

    const handlePaymentSubmit = async(e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null){
            return;
        }
        setIsLoading(true);
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error){
            // console.log("Payment Error",error);
            setError(error.message);
        }
        else{
            // console.log("Payment Method",paymentMethod);
            setError('');
        }

        

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card,
              billing_details: {
                name: user?.displayName || "Scholarship Applicant",
                email: user?.email || "No email provided",
              },
            },
          });

          if (confirmError) {
            console.error("Payment Error:", error);
            setError(error.message);
          } else if (paymentIntent?.status === "succeeded") {
            // console.log("Payment Successful:", paymentIntent);
            toast.success("Payment Successful!",{
                position: 'top-center',
                autoClose: 2000,
            });
            setPaymentSuccess(true); 

            setError("");
          }
          setIsLoading(false);
        

    }


    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("address.")) {
          const [_, key] = name.split(".");
          setFormData((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              [key]: value,
            },
          }));
        } else {
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
      };
    
      const handleApplicationSubmit = (e) => {
        e.preventDefault();
    
        const applicationData = {
          ...formData,
          userName: user.displayName, 
          userEmail: user.email, 
          currentDate: new Date().toISOString(),
        };

        
    
        axios
          .post("http://localhost:5000/apply-scholarship", applicationData)
          .then(() => toast.success("Application submitted successfully!"))
          .catch((err) => toast.error("Application submission failed."));
      };

      


    return (
        <div>
            <ToastContainer></ToastContainer>
            

            <div>
    
      {!paymentSuccess ? (
        <form onSubmit={handlePaymentSubmit} className="mx-auto mt-4 w-4/5">
          <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          <button
            className="btn btn-outline btn-success mt-4"
            type="submit"
            disabled={!stripe || !clientSecret || isLoading}
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleApplicationSubmit} className="mx-auto mt-6 w-4/5 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Scholarship Application Form</h2>
          <div className="grid gap-4 grid-cols-1">
            <input name="phone" placeholder="Phone Number" onChange={handleFormChange} className="input input-bordered" />
            <input name="photo" placeholder="Photo URL" onChange={handleFormChange} className="input input-bordered" />
            <input name="address.village" placeholder="Village" onChange={handleFormChange} className="input input-bordered" />
            <input name="address.district" placeholder="District" onChange={handleFormChange} className="input input-bordered" />
            <input name="address.country" placeholder="Country" onChange={handleFormChange} className="input input-bordered" />
            <select name="gender" onChange={handleFormChange} className="select select-bordered">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select name="degree" onChange={handleFormChange} className="select select-bordered">
              <option value="">Select Degree</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
            </select>
            <input name="sscResult" placeholder="SSC Result" onChange={handleFormChange} className="input input-bordered" />
            <input name="hscResult" placeholder="HSC Result" onChange={handleFormChange} className="input input-bordered" />
            <select name="studyGap" onChange={handleFormChange} className="select select-bordered">
              <option value="">Select Study Gap</option>
              <option value="0 year">0 year</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
            </select>
            <input value={formData.universityName} readOnly className="input input-bordered" />
            <input value={formData.scholarshipCategory} readOnly className="input input-bordered" />
            <input value={formData.subCategory} readOnly className="input input-bordered" />
          </div>
          <button className="btn btn-outline btn-success mt-4 w-full" type="submit">
            Submit Application
          </button>
        </form>
      )}
    </div>
          

           
        </div>
    );
};

export default Checkoutform;
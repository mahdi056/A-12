import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkoutform from "./Checkoutform";
import { useLocation } from "react-router-dom";


const Payment = () => {

    const location = useLocation();
    const price = location.state?.price || 0;
    const universityName = location.state?.universityName || '';
    const scholarshipCategory = location.state?.scholarshipCategory || '';
    const subCategory = location.state?.subCategory || '';
    
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    return (
        <div>

            <Elements stripe={stripePromise}>
                <Checkoutform 
                price={price}
                universityName={universityName}
                scholarshipCategory={scholarshipCategory}
                subCategory={subCategory}
                ></Checkoutform>

            </Elements>

        </div>
    );
};

export default Payment;
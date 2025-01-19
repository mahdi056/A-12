import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import Swal from "sweetalert2";



const Checkoutform = ({price}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError] = useState('');
    const {user} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        axios
          .post("http://localhost:5000/create-payment-intent", { price })
          .then((res) => setClientSecret(res.data.clientSecret))
          .catch((err) => console.error(err));
      }, [price]);

    const handlesubmit = async(e) => {
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
            console.log("Payment Error",error);
            setError(error.message);
        }
        else{
            console.log("Payment Method",paymentMethod);
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
            console.log("Payment Successful:", paymentIntent);

            Swal.fire({
                icon: "success",
                title: "Payment Successful!",
                confirmButtonText: "OK",
              });

            setError("");
          }
          setIsLoading(false);
        

    }
    return (
        <div>

          

            <form className="mt-4 mx-auto w-4/5" onSubmit={handlesubmit}>
                <CardElement>
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder':{
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                </CardElement>

                <button className="mt-4 btn btn-outline btn-info" type="submit" disabled={!stripe || !clientSecret}>Pay</button>
                <p className="text-red-600">{error}</p>
            </form>
            
        </div>
    );
};

export default Checkoutform;
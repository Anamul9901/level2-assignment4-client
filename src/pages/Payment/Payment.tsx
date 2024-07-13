import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);
  // console.log(stripePromise);
  return (
    <div className="h-[90vh] max-w-7xl mx-auto w-full">
      <div className="flex justify-center">
        <div className="w-[450px]">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;

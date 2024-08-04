/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);
  // console.log(stripePromise);

  const handleSaveUserInfo = () => {
    const userData = JSON.parse(localStorage.getItem("userData") as any);
    console.log(userData);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Successfull",
      showConfirmButton: false,
      timer: 1500,
    });
    localStorage.removeItem("userData");
    localStorage.removeItem("cartProducts");
    navigate("/");
  };
  return (
    <div className="h-[90vh] max-w-7xl mx-auto w-full">
      <div className="flex justify-center">
        <div className="w-[450px]">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
          <div className="border mt-10 pb-10 md:px-4 px-1 flex justify-center items-center h-[100px] rounded-md bg-slate-100">
            <button
              onClick={handleSaveUserInfo}
              className="btn btn-sm bg-green-500 text-white"
            >
              Cash On Delevary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

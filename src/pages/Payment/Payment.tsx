/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAddBuyInfoMutation } from "../../redux/features/buyInfo/buyInfo";
import { useUpdateProductsQuantityMutation } from "../../redux/features/products/products";

const Payment = () => {
  const navigate = useNavigate();
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);
  // console.log(stripePromise);

  const [addBuyInfo, {}] = useAddBuyInfoMutation();
  const [updateProductsQuantity, {}] = useUpdateProductsQuantityMutation();

  const cartData = JSON.parse(localStorage.getItem("cartProducts") as string);
  const cartQuantitysAndIds = cartData?.map((product: any) => ({
    _id: product?._id,
    quantity: product?.quantity - product?.cartQuantity,
  }));

  // console.log("cart quantity1-", cartQuantitysAndIds);

  const handleSaveUserInfo = async () => {
    await updateProductsQuantity(cartQuantitysAndIds);
    const paymentType = "Cash On";
    const userData = JSON.parse(localStorage.getItem("userData") as any);
    userData.paymentType = paymentType;
    // console.log("userData------>>", userData);
    const res = await addBuyInfo(userData);
    // console.log("res---->>", res);
    if (res?.data) {
      // console.log("res", res);

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
    }
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

/* eslint-disable react-hooks/exhaustive-deps */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useCreatePaymentMutation } from "../../redux/features/payment/payment";
import { useGetAllCartQuery } from "../../redux/features/carts/carts";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

/* eslint-disable @typescript-eslint/no-explicit-any */
const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { data } = useGetAllCartQuery(undefined);
  const cartData = data?.data;
  console.log(cartData);
  const user = useAppSelector(selectCurrentUser);
  // console.log(user?._id);

  const currentUserCart = cartData?.filter(
    (cart: any) => cart.userId == user?._id
  );
  console.log("all cart", currentUserCart);

  let totalPrice = 0;
  for (let i = 0; i < currentUserCart?.length; i++) {
    totalPrice += currentUserCart[i]?.productId?.price;
  }
  console.log(totalPrice); // Output: 80

  const [createPayment, { isError }] = useCreatePaymentMutation();

  console.log('res error', isError);

  useEffect(()=>{
    const res = createPayment(totalPrice);
    console.log('res data===>', res);
    setClientSecret(res as any)
  },[totalPrice])



  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError((error as any).message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
    </form>
  );
};

export default CheckoutForm;

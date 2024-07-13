/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import {
  useCreatePaymentMutation,
  useCreateUserPayDataMutation,
} from "../../redux/features/payment/payment";
import { useGetAllCartQuery } from "../../redux/features/carts/carts";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import Swal from "sweetalert2";

/* eslint-disable @typescript-eslint/no-explicit-any */
const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transctionId, setTransctionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { data } = useGetAllCartQuery(undefined);
  

  const cartData = data?.data;
  // console.log(cartData);
  const user = useAppSelector(selectCurrentUser);
  // console.log(user?._id);

  const currentUserCart = cartData?.filter(
    (cart: any) => cart.userId == user?._id
  );
  const allCartId = currentUserCart?.map((item: any) => item?._id);
  // console.log("all cart", allCartId);

  let totalPrice = 0;
  for (let i = 0; i < currentUserCart?.length; i++) {
    totalPrice += currentUserCart[i]?.productId?.price;
  }
  // console.log(totalPrice); // Output: 80

  const [createPayment, {}] = useCreatePaymentMutation();
  const [createUserPayData, {}] = useCreateUserPayDataMutation();

  // console.log("res error", isError);
  const totalPriceObjet = { amount: totalPrice };

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await createPayment(totalPriceObjet).unwrap();
        // console.log("res data===>", res);
        setClientSecret(res as any);
        setClientSecret(res);
      } catch (error) {
        // console.error("Error creating payment:", error);
      }
    };

    fetchPayment();
  }, [totalPrice]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("payment error", error);
      setError((error as any).message);
      setTransctionId("");
    } else {
      // console.log("payment method", paymentMethod);
      setError("");
      setTransctionId("");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Payment is Success",
        showConfirmButton: false,
        timer: 1500
      });
    }
    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log("confirm error");
    } else {
      // console.log("Pyment intent", paymentIntent);
      setTransctionId("");
      if (paymentIntent?.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransctionId(paymentIntent?.id);

        //now save the payment in the database
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent?.id,
          cartId: allCartId,
          status: "pending",
        };

        const res = await createUserPayData(payment);
        console.log("user save data", res);
      }
    }
  };

  return (
    <div className="border mt-10 pb-10 md:px-4 px-1 rounded-md bg-slate-100">
      <div className="flex justify-center">
        <p className="text-2xl font-bold text-green-500 pt-10 pb-10">Total Amount: {totalPrice}</p>
      </div>
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
     <div className="flex justify-center pt-10">
     <button
        className="btn btn-sm bg-green-500 text-white"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
     </div>
      <p className="text-red-600">{error}</p>
      {transctionId && (
        <p className="text-green-600">Transaction ID: {transctionId}</p>
      )}
    </form>
    </div>
  );
};

export default CheckoutForm;

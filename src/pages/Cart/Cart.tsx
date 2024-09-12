/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Cart = () => {
  const navigate = useNavigate();
  let cartData = JSON.parse(localStorage.getItem("cartProducts") as string);
  // console.log("data", cartData);

  // const cartQuantitysAndIds = cartData?.map((product: any) => ({
  //   _id: product?._id,
  //   quantity: product?.quantity - product?.cartQuantity,
  // }));

  // console.log("cart quantity-", cartQuantitysAndIds);

  // const user = useAppSelector(selectCurrentUser);

  let totalPrice = 0;
  for (let i = 0; i < cartData?.length; i++) {
    totalPrice += cartData[i]?.price;
  }

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      const confirmationMessage =
        "Are you sure you want to refresh? This will delete your cart items.";

      try {
        const userResponse = window.confirm(
          "Do you want to delete the cart data....?"
        );

        localStorage.removeItem("cartProducts");
        if (userResponse) {
          //
        } else {
          event.preventDefault();
          event.returnValue = confirmationMessage;
        }
      } catch (error) {
        console.error("Error handling beforeunload:", error);
      }
    };

    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const handleCartDelete = async (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCartData = cartData.filter((item: any) => item._id !== id);

        // Update localStorage with the new cart data
        localStorage.setItem("cartProducts", JSON.stringify(updatedCartData));
        cartData = updatedCartData;
        navigate("/cart");

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // const handleLoginShowl = () => {
  //   Swal.fire({
  //     title: "You are not Lonin?",
  //     text: "Are you want to login!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Login page",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       navigate("/login");
  //     }
  //   });
  // };

  if (!cartData) {
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center pt-20">
          <div>
            <p className="font-semibold text-4xl">You have no carted data.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full min-h-screen">
      <div className="py-16 mb-10">
        <h2 className="md:text-4xl text-xl pb-10 text-center font-bold">
          Your Carted Product
        </h2>
        <div className="md:flex-row-reverse md:flex justify-around">
          <div className="flex justify-center mb-3 bg-green-200 rounded-md mx-1 max-h-[150px] items-center">
            <div className="flex gap-7 p-2">
              <p className="text-xl font-semibold">
                Total Item: {cartData?.length || 0}
              </p>
              <p className="text-xl font-semibold">Total Price: {totalPrice}</p>
              {/* {user && ( */}
              <Link
                className="btn btn-sm bg-green-600 text-white"
                to="/user-info"
              >
                Buy Now
              </Link>
              {/* )} */}
              {/* {!user && (
                <div
                  onClick={handleLoginShowl}
                  className="btn btn-sm bg-green-600 text-white"
                >
                  Buy Now
                </div>
              )} */}
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="grid  grid-cols-1 px-1 md:px-0 md:grid-cols-1 lg:grid-cols-2 gap-3 ">
              {cartData?.map((cartDat: any) => (
                <div key={cartDat?._id}>
                  <div className=" bg-gray-200  glass shadow-xl h-[150px] flex rounded-md">
                    <div>
                      <figure>
                        <img
                          className="rounded-l-md"
                          width={150}
                          src={cartDat?.image}
                          alt=""
                        />
                      </figure>
                    </div>
                    <div>
                      <div className="flex items-center pb-3 ">
                        <div className="px-3">
                          <h2 className="text-lg font-semibold ">
                            {cartDat?.name}
                          </h2>
                          <h2 className=" ">
                            Quantity: {cartDat?.cartQuantity}
                          </h2>
                          <p>
                            Total Price:{" "}
                            <span className="font-bold text-lg text-[#f76b00]">
                              {cartDat?.price}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center gap-3  pb-2">
                        <button
                          onClick={() => handleCartDelete(cartDat?._id)}
                          className="px-1 bg-red-400 rounded-md text-white font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

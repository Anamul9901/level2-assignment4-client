/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/products/products";
import Swal from "sweetalert2";
import { useState } from "react";

const SingleProduct = () => {
  const { id } = useParams();
  const [cartQuantity, setCartQuantity] = useState(1);

  const { data } = useGetSingleProductQuery(id);
  const cartData = { ...data?.data, cartQuantity };

  const handleAddToCart = async () => {
    const existingCartProducts =
      JSON.parse(localStorage.getItem("cartProducts") as string) || [];

    // if(existingCartProducts?.length > 0){
    const sameData = existingCartProducts?.filter(
      (item: any) => item?._id == data?.data?._id
    );
    const itemIndex = existingCartProducts?.findIndex(
      (item: any) => item?._id == data?.data?._id
    );
    if (sameData?.length > 0) {
      const updateCartQuantity = sameData[0]?.cartQuantity + 1;

      const indexCartQuantity = (existingCartProducts[itemIndex].cartQuantity =
        updateCartQuantity);
      existingCartProducts[itemIndex].price =
        updateCartQuantity * data?.data?.price;
      setCartQuantity(updateCartQuantity);
      localStorage.setItem(
        "cartProducts",
        JSON.stringify(existingCartProducts)
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${indexCartQuantity} same products added in cart`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // }

    const updatedCartProducts = [...existingCartProducts, cartData];
    if (cartData?.quantity > 0) {
      if (sameData?.length == 0) {
        localStorage.setItem(
          "cartProducts",
          JSON.stringify(updatedCartProducts)
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "This Product added in cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "This Product quantity is 0",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="max-w-7xl mx-auto w-full py-10">
      <div className="hero bg-gray-100 shadow-lg min-h-[80vh] rounded-lg p-8">
        <div className="hero-content flex flex-col lg:flex-row justify-around items-center gap-10 w-full">
          {/* Product Image */}
          <div className="lg:w-1/2 w-full flex justify-center">
            <img
              src={cartData?.image}
              alt={cartData?.name}
              className="max-w-sm w-full rounded-lg shadow-xl object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 w-full text-center lg:text-left flex flex-col items-center lg:items-start gap-4">
            <h1 className="text-5xl font-bold text-gray-800">
              {cartData?.name}
            </h1>
            <p className="text-lg text-gray-600">{cartData?.title}</p>
            <p className="text-lg text-gray-600">
              Category: {cartData?.category}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <p className="text-lg font-semibold">Rating: </p>
              <p className="text-lg text-yellow-500 font-bold">
                {cartData?.rating}
              </p>
              <span className="text-sm text-gray-600">/ 5</span>
            </div>

            {/* Price and Quantity */}
            <div className="flex gap-8 text-xl font-semibold text-gray-800">
              <p>Quantity: {cartData?.quantity}</p>
              <p>Price: ${cartData?.price}</p>
            </div>

            {/* Add to Cart Button */}
            <div className="flex">
              <button
                onClick={handleAddToCart}
                className="btn text-md bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

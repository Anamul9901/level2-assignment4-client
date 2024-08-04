/* eslint-disable no-empty-pattern */
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/products/products";
import Swal from "sweetalert2";

const SingleProduct = () => {
  const { id } = useParams();

  const { data } = useGetSingleProductQuery(id);
  const cartData = data?.data;

  console.log(cartData?.quantity);
  const handleAddToCart = async () => {
    const existingCartProducts =
      JSON.parse(localStorage.getItem("cartProducts") as string) || [];

    const updatedCartProducts = [...existingCartProducts, cartData];
    if (cartData?.quantity > 0) {
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "This Product added in cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
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
    <div className="max-w-7xl mx-auto w-full py-10 ">
      <div className="hero bg-base-200 min-h-[80vh] rounded-lg">
        <div className="hero-content flex-col lg:flex-row flex justify-around w-full">
          <div className="">
            <img
              src={cartData?.image}
              className="max-w-sm w-[90%] rounded-lg shadow-2xl"
            />
          </div>
          <div className="flex justify-center flex-col items-center gap-2">
            <h1 className="text-4xl font-bold">{cartData?.name}</h1>
            <p className="">{cartData?.title}</p>
            <p className="">Categiry: {cartData?.category}</p>
            <div className="flex justify-around gap-8">
              <p className="text-xl font-semibold">
                Quantity: {cartData?.quantity}
              </p>
              <p className="text-xl font-semibold">Price: {cartData?.price}</p>
            </div>
            <div className="flex">
              <button
                onClick={handleAddToCart}
                className="btn text-md bg-green-400 text-white font-bold"
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

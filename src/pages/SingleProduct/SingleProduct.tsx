/* eslint-disable no-empty-pattern */
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/products/products";
import { useAddCartMutation } from "../../redux/features/carts/carts";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import Swal from "sweetalert2";

const SingleProduct = () => {
  const { id } = useParams();
  const navigation = useNavigate()
  // console.log(id);
  const user = useAppSelector(selectCurrentUser);
  console.log(user?._id);

  const { data } = useGetSingleProductQuery(id);
  const cartData = data?.data;
  const [addCart, {}] = useAddCartMutation();

  const handleAddToCart = async () => {
    if (!user) {
      Swal.fire({
        title: "You are not Login?",
        text: "Login first. Redirect Login page",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigation('/login')
        }
      });
    }
    console.log(id);
    const data = { productId: id, userId: user?._id };
    const res = await addCart(data);
    console.log("success add cart", res);
  };
  return (
    <div className="max-w-7xl mx-auto w-full py-10 ">
      <div className="hero bg-base-200 min-h-[80vh] rounded-lg">
        <div className="hero-content flex-col lg:flex-row flex justify-around w-full">
          <div className="">
            <img
              src={cartData?.image}
              className="max-w-sm rounded-lg shadow-2xl"
            />
          </div>
          <div className="flex justify-center flex-col items-center gap-2">
            <h1 className="text-4xl font-bold">{cartData?.name}</h1>
            <p className="">{cartData?.title}</p>
            <p className="">Categiry: {cartData?.category}</p>
           <div className="flex justify-around gap-8">
           <p className="text-xl font-semibold">Quantity: {cartData?.quantity}</p>
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

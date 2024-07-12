/* eslint-disable no-empty-pattern */
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/products/products";
import { useAddCartMutation } from "../../redux/features/carts/carts";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const SingleProduct = () => {
  const { id } = useParams();
  // console.log(id);
  const user = useAppSelector(selectCurrentUser);
  console.log(user?._id);

  const { data } = useGetSingleProductQuery(id);
  const cartData = data?.data;
  const [addCart, {}] = useAddCartMutation();

  const handleAddToCart = async () => {
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
          <div className="">
            <h1 className="text-5xl font-bold">{cartData?.name}</h1>
            <p className="py-6">{cartData?.title}</p>
            <div className="flex gap-2">
              <button className="btn btn-primary">Buy Now</button>
              <button onClick={handleAddToCart} className="btn btn-primary">
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

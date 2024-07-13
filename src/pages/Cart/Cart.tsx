/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useDeleteCartMutation,
  useGetAllCartQuery,
} from "../../redux/features/carts/carts";
import { useAppSelector } from "../../redux/hooks";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Cart = () => {
  const { data } = useGetAllCartQuery(undefined);
  const [deleteCart, {}] = useDeleteCartMutation();
  const cartData = data?.data;
  // console.log(cartData);

  const user = useAppSelector(selectCurrentUser);
  // console.log(user?._id);

  const currentUserCart = cartData?.filter(
    (cart: any) => cart.userId == user?._id
  );
  console.log(currentUserCart);

  let totalPrice = 0;
  for (let i = 0; i < currentUserCart?.length; i++) {
    totalPrice += currentUserCart[i]?.productId?.price;
  }
  console.log(totalPrice);

  const handleCartDelete = async (id: any) => {
    // console.log(id);
    await deleteCart(id);
  };
  return (
    <div className="max-w-7xl mx-auto w-full min-h-screen">
      <div className="py-16 mb-10">
        <h2 className="md:text-4xl text-xl pb-10 text-center font-bold">
          Your Carted Product
        </h2>
        <div className="md:flex-row-reverse md:flex justify-around">
        <div className="flex justify-center pb-10 bg-slate-300 rounded-md mx-1 ">
        <div className="">
          <p>Total Item: {currentUserCart?.length}</p>
          <p>Total Price: {totalPrice}</p>
            <Link className="btn btn-sm btn-primary" to={`/payment`}>Buy Now</Link>
          </div>
        </div>
         <div className="md:w-[50%]">
         <div className="grid  grid-cols-1 px-1 md:px-0 md:grid-cols-2 lg:grid-cols-2 gap-3 ">
            {currentUserCart?.map((cartData: any) => (
              <div key={cartData?._id}>
                <div className=" bg-gray-200  glass shadow-xl h-[150px] flex rounded-md">
                  <div>
                  <figure>
                    <img className="rounded-l-md" width={150} src={cartData?.productId?.image} alt="" />
                  </figure>
                  </div>
                  <div>
                  <div className="flex items-center pb-3 ">
                    <div className="px-3">
                      <h2 className="text-xl font-semibold ">
                        {cartData?.productId?.name}
                      </h2>
                      <p>{cartData?.productId?.title}</p>
                      <p>
                        Price:{" "}
                        <span className="font-bold text-lg text-[#f76b00]">
                          {cartData?.productId?.price}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-3  pb-2">
                    <button
                      onClick={() => handleCartDelete(cartData?._id)}
                      className="btn-primary btn-sm bg-red-400 rounded-md text-white font-semibold"
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

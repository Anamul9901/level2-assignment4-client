/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useDeleteCartMutation,
  useGetAllCartQuery,
} from "../../redux/features/carts/carts";
import { useAppSelector } from "../../redux/hooks";
import Swal from "sweetalert2";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Cart = () => {
  const { data, error, isLoading } = useGetAllCartQuery(undefined);
  const [deleteCart, {}] = useDeleteCartMutation();

  let cartData = [];
  if (data && data.data) {
    cartData = data.data;
  }
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
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        deleteCart(id);
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
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
              <p className="text-xl font-semibold">Total Item: {currentUserCart?.length}</p>
              <p className="text-xl font-semibold">Total Price: {totalPrice}</p>
              <Link className="btn btn-sm bg-green-600 text-white" to={`/payment`}>
                Buy Now
              </Link>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div className="grid  grid-cols-1 px-1 md:px-0 md:grid-cols-1 lg:grid-cols-2 gap-3 ">
              {currentUserCart?.map((cartData: any) => (
                <div key={cartData?._id}>
                  <div className=" bg-gray-200  glass shadow-xl h-[150px] flex rounded-md">
                    <div>
                      <figure>
                        <img
                          className="rounded-l-md"
                          width={150}
                          src={cartData?.productId?.image}
                          alt=""
                        />
                      </figure>
                    </div>
                    <div>
                      <div className="flex items-center pb-3 ">
                        <div className="px-3">
                          <h2 className="text-lg font-semibold ">
                            {cartData?.productId?.name}
                          </h2>
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

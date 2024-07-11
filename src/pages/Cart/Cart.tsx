/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useDeleteCartMutation,
  useGetAllCartQuery,
} from "../../redux/features/carts/carts";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Cart = () => {
  const { data } = useGetAllCartQuery(undefined);
  const [deleteCart, {}] = useDeleteCartMutation();
  const cartData = data?.data;
  console.log(cartData);

  const handleCartDelete = async(id: any) => {
    console.log(id);
    await deleteCart(id);
  };
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="py-16 mb-10">
        <h2 className="md:text-4xl text-xl pb-10 text-center font-bold">
          Just For You
          <span className="text-sm text-[#f76b00]">(Sold Products)</span>
        </h2>
        <div className=" ">
          <div className="grid  grid-cols-2 px-1 md:px-0 md:grid-cols-4 lg:grid-cols-5 gap-3  ">
            {cartData?.map((cartData: any) => (
              <div key={cartData?._id}>
                <div className=" bg-base-100 shadow-xl  h-full">
                  <figure>
                    <img src={cartData?.productId.image} alt="" />
                  </figure>
                  <div className="flex items-center pb-3 ">
                    <div className="px-3">
                      <h2 className="text-xl font-semibold ">
                        {cartData?.productId.name}
                      </h2>
                      <p>{cartData?.productId.title}</p>
                      <p>
                        Price:{" "}
                        <span className="font-bold text-lg text-[#f76b00]">
                          {cartData?.productId.price}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleCartDelete(cartData?._id)}
                      className="btn-primary btn-sm bg-red-400 rounded-md text-white font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

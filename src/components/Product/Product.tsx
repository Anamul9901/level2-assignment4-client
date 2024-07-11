/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../redux/features/products/products";

const Product = () => {
  const { data } = useGetAllProductQuery(undefined);
  const products = data?.data;
  // console.log(products);

  const [deleteProduct, { error }] = useDeleteProductMutation();
  console.log("product error=>", error);

  const handleProductDelete = async (id: string) => {
    console.log(id);
    const res = await deleteProduct(id);
    console.log("res delete data", res);
  };

  return (
    <div className="py-16 mb-10">
      <h2 className="md:text-4xl text-xl pb-10 text-center font-bold">
        Just For You
        <span className="text-sm text-[#f76b00]">(Sold Products)</span>
      </h2>
      <div className=" ">
        <div className="grid  grid-cols-2 px-1 md:px-0 md:grid-cols-4 lg:grid-cols-5 gap-3  ">
          {products?.map((product: any) => (
            <div key={product?._id}>
              <div className=" bg-base-100 shadow-xl  h-full">
                <figure>
                  <img src={product.image} alt="" />
                </figure>
                <div className="flex items-center pb-3 ">
                  <div className="px-3">
                    <h2 className="text-xl font-semibold ">{product.name}</h2>
                    <p>{product.title}</p>
                    <p>
                      Price:{" "}
                      <span className="font-bold text-lg text-[#f76b00]">
                        {product.price}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => handleProductDelete(product?._id)}
                    className="btn-primary btn-sm bg-red-400 rounded-md text-white font-semibold"
                  >
                    Delete
                  </button>
                  <button className="btn-primary btn-sm bg-green-400 rounded-md text-white font-semibold">
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

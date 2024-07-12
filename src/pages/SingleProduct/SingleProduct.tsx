import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/products/products";

const SingleProduct = () => {
  const { id } = useParams();
  console.log(id);

  const { data } = useGetSingleProductQuery(id);
  const cartData = data?.data;
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
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/products/products";
import { Link } from "react-router-dom";

const Product = () => {
  const [productId, setProductId] = useState("");
  const { data } = useGetAllProductQuery(undefined);
  const products = data?.data;

  const [deleteProduct, {}] = useDeleteProductMutation();
  const [updateProduct, {}] = useUpdateProductMutation();

  const handleProductDelete = async (id: string) => {
    await deleteProduct(id);
  };

  const handleUpdatePrductId = (id: any) => {
    setProductId(id);
  };

  const handleProductUpdate = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const title = form.title.value;
    const image = form.image.value;
    const category = form.category.value;
    const price = Number(form.price.value);
    const quantity = Number(form.quantity.value);

    const options = {
      id: productId,
      data: {
        name,
        title,
        image,
        category,
        price,
        quantity,
      },
    };
    const res = await updateProduct(options);
    console.log("updted res data =>", res);
  };

  return (
    <div className="py-16 mb-10">
      <div>
        <Link
          to={"/add-product"}
          className="btn-primary p-1 bg-green-400 rounded-md text-white font-bold"
        >
          Add Product
        </Link>
      </div>
      <h2 className="md:text-4xl text-xl pb-10 text-center font-bold">
        Just For You
        <span className="text-sm text-[#f76b00]">(Sold Products)</span>
      </h2>
      <div className=" ">
        <div className="grid  grid-cols-2 px-1 md:px-0 md:grid-cols-4 lg:grid-cols-5 gap-3  ">
          {products?.map((product: any) => (
            <div key={product?._id}>
              <div className=" bg-base-100 shadow-xl  h-full">
                <Link to={`/product/${product?._id}`}>
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
                </Link>
                <div className="flex justify-center gap-3 pb-2">
                  <button
                    onClick={() => handleProductDelete(product?._id)}
                    className="btn-primary btn-sm bg-red-400 rounded-md text-white font-semibold"
                  >
                    Delete
                  </button>

                  {/* --------------product update modal------------- */}
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <div onClick={() => handleUpdatePrductId(product?._id)}>
                    <button
                      className="btn-primary btn-sm bg-green-400 rounded-md text-white font-semibold"
                      onClick={() =>
                        (document as any)
                          .getElementById("my_modal_3")
                          .showModal(product._id)
                      }
                    >
                      Update
                    </button>
                  </div>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-lg">Hello!</h3>
                      <p className="py-4">
                        Press ESC key or click on ✕ button to close
                      </p>
                      <form onSubmit={handleProductUpdate}>
                        <div className="flex gap-1 pb-3">
                          <input
                            type="text"
                            placeholder="Product Name"
                            className="input input-bordered w-full max-w-xs"
                            name="name"
                          />
                          <input
                            type="text"
                            placeholder="Product Title"
                            className="input input-bordered w-full max-w-xs"
                            name="title"
                          />
                        </div>

                        <div className="flex gap-1 pb-3">
                          <input
                            type="img"
                            placeholder="Img URL"
                            className="input input-bordered w-full max-w-xs"
                            name="image"
                          />
                          <input
                            type="text"
                            placeholder="Category"
                            className="input input-bordered w-full max-w-xs"
                            name="category"
                          />
                        </div>

                        <div className="flex gap-1 pb-3">
                          <input
                            type="number"
                            placeholder="Price"
                            className="input input-bordered w-full max-w-xs"
                            name="price"
                            required
                          />
                          <input
                            type="number"
                            placeholder="Quantity"
                            className="input input-bordered w-full max-w-xs"
                            name="quantity"
                            required
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="btn-primary btn-sm bg-green-400 rounded-md text-white font-semibol"
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </dialog>
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

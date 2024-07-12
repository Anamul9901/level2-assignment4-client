/* eslint-disable no-empty-pattern */
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateProductMutation } from "../../redux/features/products/products";
import { useAppSelector } from "../../redux/hooks";

/* eslint-disable @typescript-eslint/no-explicit-any */
const AddProduct = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?._id;
  console.log("current-user", userId);

  const [createProduct, {}] = useCreateProductMutation();
  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const title = form.title.value;
    const image = form.image.value;
    const category = form.category.value;
    const price = Number(form.price.value);
    const quantity = Number(form.quantity.value);

    const productData = {
      name,
      title,
      image,
      category,
      price,
      quantity,
      user: userId,
    };
    console.log(productData);
    // if (!user) {
    //   alert("user not found! Login first");
    // } else {
    const res = await createProduct(productData);
    console.log("add product--->", res);
    // }
  };
  return (
    <div className="max-w-7xl mx-auto w-full h-[90vh]">
      <div className="flex items-center justify-center">
        <div className="bg-gray-400 rounded-md mt-14 p-6">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-semibold pb-8">Add New Product</h1>
          </div>
          <form onSubmit={handleAddProduct}>
            <div className="flex gap-2 pb-3">
              <input
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full max-w-xs"
                name="name"
                required
              />
              <input
                type="text"
                placeholder="Product Title"
                className="input input-bordered w-full max-w-xs"
                name="title"
              />
            </div>

            <div className="flex gap-2 pb-3">
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
                required
              />
            </div>

            <div className="flex gap-2 pb-3">
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

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="btn-primary btn-sm w-full bg-green-400 rounded-md text-white font-semibol uppercase"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

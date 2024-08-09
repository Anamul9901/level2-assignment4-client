/* eslint-disable no-empty-pattern */
import Swal from "sweetalert2";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateProductMutation } from "../../redux/features/products/products";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
const AddProduct = () => {
  const navigation = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const userId = user?._id;
  // console.log("current-user", userId);

  const [createProduct, {}] = useCreateProductMutation();
  const handleAddProduct = async (e: any) => {
    e.preventDefault();
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
          navigation("/login");
        }
      });
    }
    const form = e.target;
    const name = form.name.value;
    const title = form.title.value;
    const image = form.image.value;
    const category = form.category.value;
    const price = Number(form.price.value);
    const quantity = Number(form.quantity.value);
    const rating = Number(form.rating.value);

    const productData = {
      name,
      title,
      image,
      category,
      price,
      quantity,
      user: userId,
      rating,
    };
    console.log(productData);
    // if (!user) {
    //   alert("user not found! Login first");
    // } else {
    const res = await createProduct(productData);
    // console.log("add product--->", res);
    if (res?.data?.success === true) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      navigation("/");
    }
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
                placeholder="Product Title"
                className="input input-bordered w-full max-w-xs"
                name="name"
                required
              />
              <input
                type="number"
                placeholder="Rating"
                className="input input-bordered w-full"
                name="rating"
                required
              />
            </div>

            <div className="flex gap-2 pb-3">
              <input
                type="img"
                placeholder="Img URL"
                className="input input-bordered max-w-xs"
                name="image"
              />
              <select
                className="select select-bordered w-full max-w-xs"
                name="category"
              >
                <option disabled selected>
                  Select catagory
                </option>
                <option>Flower</option>
                <option>Fruit</option>
                <option>Timber</option>
              </select>
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
            <div className="flex gap-2 pb-3">
              <input
                type="text"
                placeholder="Product description"
                className="input input-bordered w-full"
                name="title"
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="btn-primary btn-sm font-bold w-full hover:bg-blue-500 bg-green-400 rounded-md text-white font-semibol uppercase"
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

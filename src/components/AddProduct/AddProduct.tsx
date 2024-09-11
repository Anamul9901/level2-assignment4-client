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
  const userId = user?._id || "668c3250ab762c519377b62f";
  // console.log("current-user", userId);

  const [createProduct, {}] = useCreateProductMutation();
  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    // if (!user) {
    //   Swal.fire({
    //     title: "You are not Login?",
    //     text: "Login first. Redirect Login page",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Ok!",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       navigation("/login");
    //     }
    //   });
    // }
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
    // console.log(productData);
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
    <div className="max-w-4xl mx-auto w-full h-screen flex items-center justify-center">
  <div className="bg-gray-100 shadow-md rounded-lg p-8 w-full sm:w-3/4 lg:w-1/2">
    <h1 className="text-4xl font-bold text-center text-gray-800 pb-6">
      Add New Product
    </h1>
    <form onSubmit={handleAddProduct}>
      {/* Product Title and Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
        <input
          type="text"
          placeholder="Product Title"
          className="input input-bordered w-full p-3 border-gray-300 rounded-md focus:ring focus:ring-green-300"
          name="name"
          required
        />
        <input
          type="number"
          placeholder="Rating"
          className="input input-bordered w-full p-3 border-gray-300 rounded-md focus:ring focus:ring-green-300"
          name="rating"
          required
        />
      </div>

      {/* Image URL and Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
        <input
          type="url"
          placeholder="Img URL"
          className="input input-bordered w-full p-3 border-gray-300 rounded-md focus:ring focus:ring-green-300"
          name="image"
        />
        <select
          className="select select-bordered w-full p-3 border-gray-300 rounded-md focus:ring focus:ring-green-300"
          name="category"
          required
        >
          <option disabled selected>
            Select Category
          </option>
          <option>Flower</option>
          <option>Fruit</option>
          <option>Timber</option>
        </select>
      </div>

      {/* Price and Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
        <input
          type="number"
          placeholder="Price"
          className="input input-bordered w-full p-3 border-gray-300 rounded-md focus:ring focus:ring-green-300"
          name="price"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          className="input input-bordered w-full p-3 border-gray-300 rounded-md focus:ring focus:ring-green-300"
          name="quantity"
          required
        />
      </div>

      {/* Product Description */}
      <div className="pb-4">
        <input
          type="text"
          placeholder="Product Description"
          className="input input-bordered w-full p-3 border-gray-300 rounded-md focus:ring focus:ring-green-300"
          name="title"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full md:w-1/2 py-3 text-lg bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition-colors"
        >
          Add Product
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AddProduct;

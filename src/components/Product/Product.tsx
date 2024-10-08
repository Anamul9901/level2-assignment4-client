/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/products/products";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoSearchSharp } from "react-icons/io5";
import "./Product.css";

const Product = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [finalProducts, setFinalProducts] = useState([]);
  const [selectUpdatedProduct, setSelectUpdatedProduct] = useState();
  const [defaultCategory, setDefaultCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");

  const searchData = { searchTerm, limit, page };
  const { data } = useGetAllProductQuery(searchData);
  // console.log("data", data);
  const products = data?.data?.fieldQuery;
  useEffect(() => {
    setFinalProducts(products);
  }, [products]);

  let productLength = 10;
  if (data?.data?.productsLength) {
    productLength = data?.data?.productsLength;
  }

  useEffect(() => {
    const allProduct = data?.data?.fieldQuery;
    const updatedProduct = allProduct?.find(
      (item: any) => item?._id === productId
    );
    setSelectUpdatedProduct(updatedProduct);
  }, [productId, data?.data?.fieldQuery]);
  const numberOfPages = Math.ceil(productLength / limit);
  const pages = [...Array(numberOfPages).keys()]; // for lup er shortcut

  const [deleteProduct, {}] = useDeleteProductMutation();
  const [updateProduct, {}] = useUpdateProductMutation();

  const handleSearch = (e: any) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearchTerm(searchText);
  };

  const handleProductDelete = async (id: string) => {
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
        deleteProduct(id);
      }
    });
  };

  const handleUpdatePrductId = (id: any) => {
    setProductId(id);
    setDefaultCategory(undefined);
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
    form.reset();
    if (res?.data?.success === true) {
      navigate("/");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < numberOfPages) setPage(page + 1);
  };

  const handleItemsPerPage = (e: any) => {
    const val = parseInt(e.target.value);
    setLimit(val);
    setPage(1);
  };

  const setCurrentPage = (page: number) => {
    setPage(page);
  };

  // catagory button handler
  const handleCatagory = (data: string) => {
    const filterProducts = products.filter(
      (item: any) => item?.category == data
    );
    setFinalProducts(filterProducts);
    setSelectedCategory(data);
  };

  const handleSort = (sortBy: string) => {
    const sortedProducts = [...finalProducts];

    if (sortBy === "price") {
      sortedProducts.sort((a: any, b: any) => a.price - b.price); // Ascending by price
    } else if (sortBy === "name") {
      sortedProducts.sort((a: any, b: any) => a.name.localeCompare(b.name)); // Ascending by name
    } else if (sortBy === "rating") {
      sortedProducts.sort((a: any, b: any) => {
        // Ensure rating is a number and handle missing ratings
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return ratingB - ratingA; // Descending by rating
      });
    }

    setFinalProducts(sortedProducts);
  };

  return (
    <div className="py-16 mb-10">
      <div className="flex justify-end items-center gap-4 mb-6">
        <Link
          to="/add-product"
          className="btn px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-md transition-all"
        >
          Add Product
        </Link>

        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            name="search"
            placeholder="Search Products..."
            className="input input-bordered border-green-400 focus:outline-none rounded-l-md w-full max-w-xs"
          />
          <button
            type="submit"
            className="btn bg-green-500 hover:bg-green-600 text-white px-4 rounded-r-md transition-all"
          >
            <IoSearchSharp size={20} />
          </button>
        </form>
      </div>

      <h2 className="md:text-4xl text-2xl font-bold text-center mb-8 text-gray-800">
        All Products
      </h2>

      <div className="items-center md:px-4 px-1">
        {/* Filtering and Sorting */}
        <div className="flex justify-between items-center mb-4 md:gap-4">
          {/* Sorting */}
          <div className="flex">
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>

          {/* Category Buttons */}
          <div className="flex md:gap-4 gap-1">
            <button
              onClick={() => handleCatagory("Flower")}
              className={`px-4 font-semibold btn-sm rounded-lg transition-all ${
                selectedCategory === "Flower"
                  ? "bg-green-500 text-white"
                  : "bg-green-200 text-green-700"
              }`}
            >
              Flower
            </button>
            <button
              onClick={() => handleCatagory("Fruit")}
              className={`md:px-4  btn-sm font-semibold rounded-lg transition-all ${
                selectedCategory === "Fruit"
                  ? "bg-green-500 text-white"
                  : "bg-green-200 text-green-700"
              }`}
            >
              Fruit
            </button>
            <button
              onClick={() => handleCatagory("Timber")}
              className={`px-4  btn-sm font-semibold rounded-lg transition-all ${
                selectedCategory === "Timber"
                  ? "bg-green-500 text-white"
                  : "bg-green-200 text-green-700"
              }`}
            >
              Timber
            </button>
          </div>
        </div>
      </div>

      <div className=" ">
        <div className="grid grid-cols-2 px-1 md:px-0 md:grid-cols-4 lg:grid-cols-5 gap-3  ">
          {finalProducts?.map((product: any) => (
            <div
              key={product?._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Link to={`/product/${product?._id}`}>
                <figure className="relative w-full h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </figure>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mt-1">{product.title}</p>
                  <p className="text-gray-600 mt-1">
                    Rating: ⭐ {product.rating}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-semibold text-[#f76b00]">
                      Price: ${product.price}
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      Qty: {product.quantity}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex justify-between items-center px-4 py-3 bg-gray-100">
                <button
                  onClick={() => handleProductDelete(product?._id)}
                  className="text-white bg-red-500 hover:bg-red-600 font-semibold px-4 py-2 rounded-md transition-colors"
                >
                  Delete
                </button>

                <div onClick={() => handleUpdatePrductId(product?._id)}>
                  <button
                    className="text-white bg-green-500 hover:bg-green-600 font-semibold px-4 py-2 rounded-md transition-colors"
                    onClick={() =>
                      (document as any)
                        .getElementById("my_modal_3")
                        .showModal(product._id)
                    }
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Update Modal */}
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box rounded-lg p-6">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-xl text-gray-800 mb-4">
                    Update Product
                  </h3>
                  <form onSubmit={handleProductUpdate}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Product Name"
                        className="input input-bordered w-full"
                        name="name"
                        defaultValue={(selectUpdatedProduct as any)?.name}
                      />
                      <input
                        type="text"
                        placeholder="Product Title"
                        className="input input-bordered w-full"
                        name="title"
                        defaultValue={(selectUpdatedProduct as any)?.title}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        type="url"
                        placeholder="Image URL"
                        className="input input-bordered w-full"
                        name="image"
                        defaultValue={(selectUpdatedProduct as any)?.image}
                      />
                      <select
                        className="select select-bordered w-full"
                        name="category"
                        value={
                          defaultCategory ||
                          (selectUpdatedProduct as any)?.category
                        }
                        onChange={(e) =>
                          setDefaultCategory((e as any).target.value)
                        }
                      >
                        <option value="Flower">Flower</option>
                        <option value="Fruit">Fruit</option>
                        <option value="Timber">Timber</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        type="number"
                        placeholder="Price"
                        className="input input-bordered w-full"
                        name="price"
                        defaultValue={(selectUpdatedProduct as any)?.price}
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        className="input input-bordered w-full"
                        name="quantity"
                        defaultValue={(selectUpdatedProduct as any)?.quantity}
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="text-white bg-green-500 hover:bg-green-600 font-semibold px-4 py-2 rounded-md transition-colors"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="mt-8 flex justify-center items-center">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`btn mr-4 ${
              page === 1 ? "opacity-50" : "hover:bg-green-500"
            }`}
          >
            Prev
          </button>
          {pages.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum + 1)}
              className={`btn mx-1 ${
                page === pageNum + 1 ? "bg-green-500" : ""
              }`}
            >
              {pageNum + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={page === numberOfPages}
            className={`btn ml-4 ${
              page === numberOfPages ? "opacity-50" : "hover:bg-green-500"
            }`}
          >
            Next
          </button>
        </div>

        {/* Items Per Page */}
        <div className="mt-4 flex justify-center items-center gap-4">
          <label htmlFor="itemsPerPage">Items per page:</label>
          <select
            id="itemsPerPage"
            onChange={handleItemsPerPage}
            className="input input-bordered w-16"
            defaultValue={10}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Product;

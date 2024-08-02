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
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [finalProducts, setFinalProducts] = useState([]);

  const searchData = { searchTerm, limit, page };
  const { data } = useGetAllProductQuery(searchData);
  const products = data?.data?.fieldQuery;
  useEffect(() => {
    setFinalProducts(products);
  }, [products]);

  let productLength = 10;
  if (data?.data?.productsLength) {
    productLength = data?.data?.productsLength;
  }

  const numberOfPages = Math.ceil(productLength / limit);
  // console.log("number of page", numberOfPages);
  const pages = [...Array(numberOfPages).keys()]; // for lup er shortcut
  // console.log(pages);

  const [deleteProduct, {}] = useDeleteProductMutation();
  const [updateProduct, {}] = useUpdateProductMutation();

  const handleSearch = (e: any) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    // console.log(searchText);
    // refetch();
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
    // console.log("updted res data =>", res);
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
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < numberOfPages) {
      setPage(page + 1);
    }
  };

  const handleItemsPerPage = (e: any) => {
    const val = parseInt(e.target.value);
    // console.log(val);
    setLimit(val);
    setPage(1);
  };

  const setCurrentPage = (page: number) => {
    console.log("current page", page);
    setPage(page + 1);
  };

  // catagory button handler
  const handleCatagory = (data: string) => {
    const filterProducts = products.filter(
      (item: any) => item?.category == data
    );
    setFinalProducts(filterProducts);
  };

  return (
    <div className="py-16 mb-10">
      <div className="flex justify-end items-center gap-3">
        <div>
          <Link
            to={"/add-product"}
            className="btn p-1 bg-green-400 rounded-md text-white font-bold"
          >
            Add Product
          </Link>
        </div>
        <form onSubmit={handleSearch}>
          <div className="flex items-center">
            <input
              type="text"
              name="search"
              placeholder="Type here"
              className="input border border-green-300 rounded-r-none w-full max-w-xs"
            />
            <button
              type="submit"
              className="btn border-green-300 rounded-l-none"
            >
              <IoSearchSharp />
            </button>
          </div>
        </form>
      </div>
      <h2 className="md:text-4xl text-xl pb-10 text-center font-bold">
        All Product
      </h2>

      {/* catagory button  */}
      <div className="pb-1">
      <div className="flex gap-3 bg-green-200 px-2 rounded-md w-44 justify-center font-semibold ">
        <button onClick={() => handleCatagory("Flower")}>Flower</button>
        <button onClick={() => handleCatagory("Fruit")}>Fruit</button>
        <button onClick={() => handleCatagory("Timber")}>Timber</button>
      </div>
      </div>
      <div className=" ">
        <div className="grid  grid-cols-2 px-1 md:px-0 md:grid-cols-4 lg:grid-cols-5 gap-3  ">
          {finalProducts?.map((product: any) => (
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
        {/* pagination button */}
        <div className="flex justify-center items-center pt-10">
          <div className="paginatio">
            <p className="text-center ">Current Page: {page}</p>

            <button
              onClick={handlePrevPage}
              className="btn btn-sm bg-green-300"
            >
              Prev
            </button>
            {pages.map((page) => (
              <button
                // ${page === page ? "selected" : 'btn'}
                className={`btn btn-sm ${
                  page == page ? "bg-green-400" : undefined
                }`}
                onClick={() => setCurrentPage(page)}
                key={page}
              >
                {page + 1}
              </button>
            ))}
            <button
              className="btn btn-sm bg-green-300"
              onClick={handleNextPage}
            >
              Next
            </button>

            {/* value={itemsPerPage} onChange={handleItemsPerPage} */}
            <select
              className="btn btn-sm bg-green-300"
              value={limit}
              onChange={handleItemsPerPage}
              name=""
              id=""
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

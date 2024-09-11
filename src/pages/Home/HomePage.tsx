import HeroSection from "../../components/HeroSection/HeroSection";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import Product from "../../components/Product/Product";
const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <HeroSection />
      <Product />
      <ImageGallery />
    </div>
    // <div className="">
    //   import React from 'react';
    //   <div className="landing-page">
    // {/* Navbar */}

    //     {/* Hero Section */}
    //     <section
    //       id="home"
    //       className="hero-section bg-green-100 py-20 text-center"
    //     >
    //       <h1 className="text-4xl font-bold mb-4">Welcome to Nursery Haven</h1>
    //       <p className="text-lg mb-6">
    //         Your one-stop shop for beautiful plants and garden supplies.
    //       </p>
    //       <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
    //         Shop Now
    //       </button>
    //     </section>
    //     {/* Hero Section */}
    //     <section
    //       id="home"
    //       className="hero-section bg-gradient-to-r from-green-400 to-green-600 py-24 text-center relative"
    //     >
    //       <div className="max-w-screen-lg mx-auto">
    //         <h1 className="text-5xl font-extrabold text-white mb-6">
    //           Welcome to Nursery Haven
    //         </h1>
    //         <p className="text-2xl text-green-200 mb-8">
    //           Discover the best plants and garden supplies for your home.
    //         </p>
    //         <button className="bg-white text-green-600 py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition">
    //           Shop Now
    //         </button>
    //       </div>
    //       <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
    //         <p className="text-sm font-medium text-green-600">
    //           🌟 Special Offer: Get 10% off on your first purchase! 🌟
    //         </p>
    //       </div>
    //     </section>

    //     {/* Product Search, Filter, and Pagination */}
    //     <section className="product-search-filter py-8 bg-white">
    //       <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    //         <input
    //           type="text"
    //           placeholder="Search for products..."
    //           className="border border-gray-300 p-2 rounded w-full md:w-1/2"
    //         />
    //         <div className="flex space-x-4">
    //           <select className="border border-gray-300 p-2 rounded">
    //             <option value="">Category</option>
    //             <option value="indoor">Indoor Plants</option>
    //             <option value="outdoor">Outdoor Plants</option>
    //           </select>
    //           <select className="border border-gray-300 p-2 rounded">
    //             <option value="">Sort By</option>
    //             <option value="price">Price</option>
    //             <option value="rating">Rating</option>
    //           </select>
    //         </div>
    //       </div>
    //       <div className="pagination mt-4 flex justify-center">
    //         <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mx-2">
    //           Previous
    //         </button>
    //         <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mx-2">
    //           Next
    //         </button>
    //       </div>
    //     </section>

    //     {/* Category Section */}
    //     <section id="categories" className="category-section py-12 bg-green-50">
    //       <h2 className="text-2xl font-bold text-center mb-8">
    //         Shop by Category
    //       </h2>
    //       <div className="flex justify-center space-x-4">
    //         <div className="category-card bg-white p-6 rounded shadow hover:shadow-lg transition-shadow">
    //           Indoor Plants
    //         </div>
    //         <div className="category-card bg-white p-6 rounded shadow hover:shadow-lg transition-shadow">
    //           Outdoor Plants
    //         </div>
    //         <div className="category-card bg-white p-6 rounded shadow hover:shadow-lg transition-shadow">
    //           Garden Supplies
    //         </div>
    //       </div>
    //     </section>

    //     {/* Product List */}
    //     <section id="products" className="product-list py-12 bg-white">
    //       <h2 className="text-2xl font-bold text-center mb-8">
    //         Featured Products
    //       </h2>
    //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
    //         <div className="product-card bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
    //           <img
    //             src="https://via.placeholder.com/150"
    //             alt="Product"
    //             className="mb-4 rounded"
    //           />
    //           <h3 className="font-bold mb-2">Product Title</h3>
    //           <p className="text-green-600 font-semibold mb-2">$10.00</p>
    //           <p className="mb-4">Rating: 4.5</p>
    //           <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
    //             Add to Cart
    //           </button>
    //         </div>
    //         <div className="product-card bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
    //           <img
    //             src="https://via.placeholder.com/150"
    //             alt="Product"
    //             className="mb-4 rounded"
    //           />
    //           <h3 className="font-bold mb-2">Product Title</h3>
    //           <p className="text-green-600 font-semibold mb-2">$15.00</p>
    //           <p className="mb-4">Rating: 4.0</p>
    //           <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
    //             Add to Cart
    //           </button>
    //         </div>
    //         {/* Add more products as needed */}
    //       </div>
    //     </section>

    //     {/* Image Gallery */}
    //     <section className="image-gallery py-12 bg-green-50">
    //       <h2 className="text-2xl font-bold text-center mb-8">
    //         Product Gallery
    //       </h2>
    //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-screen-lg mx-auto">
    //         <img
    //           src="https://via.placeholder.com/100"
    //           alt="Gallery 1"
    //           className="rounded"
    //         />
    //         <img
    //           src="https://via.placeholder.com/100"
    //           alt="Gallery 2"
    //           className="rounded"
    //         />
    //         <img
    //           src="https://via.placeholder.com/100"
    //           alt="Gallery 3"
    //           className="rounded"
    //         />
    //         {/* Add more images as needed */}
    //       </div>
    //     </section>

    //     {/* Pagination */}
    //     <div className="pagination mt-6 flex justify-center">
    //       <button className="bg-green-600 text-white py-2 px-4 rounded-l hover:bg-green-700">
    //         Previous
    //       </button>
    //       <button className="bg-green-600 text-white py-2 px-4 hover:bg-green-700">
    //         1
    //       </button>
    //       <button className="bg-green-600 text-white py-2 px-4 hover:bg-green-700">
    //         2
    //       </button>
    //       <button className="bg-green-600 text-white py-2 px-4 hover:bg-green-700">
    //         3
    //       </button>
    //       <button className="bg-green-600 text-white py-2 px-4 rounded-r hover:bg-green-700">
    //         Next
    //       </button>
    //     </div>

    //     {/* Footer */}
    //     <footer className="footer bg-green-600 text-white py-4">
    //       <div className="flex justify-between items-center max-w-screen-lg mx-auto">
    //         <p>© 2024 Nursery Haven. All rights reserved.</p>
    //         <ul className="flex space-x-4">
    //           <li>
    //             <a href="#home" className="hover:text-gray-300">
    //               Home
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#categories" className="hover:text-gray-300">
    //               Categories
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#products" className="hover:text-gray-300">
    //               Products
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#contact" className="hover:text-gray-300">
    //               Contact
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </footer>
    //   </div>
    //   export default LandingPage;
    // </div>
  );
};

export default HomePage;

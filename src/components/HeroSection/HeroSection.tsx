import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="h-[50vh] bg-green-100 flex justify-center items-center rounded-lg mt-2">
        <section id="home" className="hero-section  py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Tree Oasis</h1>
          <p className="text-lg mb-6">
            Your one-stop shop for beautiful plants and garden supplies.
          </p>
          <Link
            to="/products"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Shop Now
          </Link>
        </section>
      </div>
    </>
  );
};

export default HeroSection;

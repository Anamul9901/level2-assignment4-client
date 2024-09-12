import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="h-[60vh] bg-gradient-to-r from-green-900 via-gray-00 to-black flex justify-center items-center rounded-lg mt-6 relative overflow-hidden shadow-2xl">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-[url('https://your-futuristic-background-url.jpg')] bg-cover bg-center opacity-20 blur-lg"></div>

        {/* Floating Light Effects */}
        <div className="absolute top-10 right-10 h-16 w-16 rounded-full bg-green-500 opacity-70 blur-lg animate-pulse"></div>

        <section id="home" className="z-10 text-center text-white">
          <h1 className="text-6xl font-extrabold tracking-wide mb-4 text-neon">
            Tree <span className="text-green-400">Oasis</span>
          </h1>
          <p className="text-lg mb-6 max-w-md mx-auto">
            Experience the future of gardening with our exclusive collection of
            plants and advanced gardening tools.
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-green-400 to-blue-400 text-white py-3 px-8 rounded-full font-bold text-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-400 transition-all duration-300 ease-in-out"
          >
            Explore the Future
          </Link>
        </section>
      </div>
    </>
  );
};

export default HeroSection;

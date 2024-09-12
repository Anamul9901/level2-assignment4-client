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
  );
};

export default HomePage;

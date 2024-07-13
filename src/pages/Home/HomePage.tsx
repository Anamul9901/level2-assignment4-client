import Product from "../../components/Product/Product";
import Slider from "../../components/Slider/Slider";

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <Slider />
      <Product />
    </div>
  );
};

export default HomePage;

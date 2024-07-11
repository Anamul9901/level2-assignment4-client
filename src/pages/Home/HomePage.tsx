import { Footer } from "antd/es/layout/layout";
import Navber from "../../components/Navber/Navber";
import Product from "../../components/Product/Product";

const HomePage = () => {
  return (
    <div>
      <Navber />
      <div className="max-w-7xl mx-auto ">
        <Product />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

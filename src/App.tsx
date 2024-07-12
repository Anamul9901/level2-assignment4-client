import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navber from "./components/Navber/Navber";

function App() {
  return (
    <div>
      <Navber />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

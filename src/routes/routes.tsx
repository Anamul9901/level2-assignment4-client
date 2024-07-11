import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/Home/HomePage";
import Cart from "../pages/Cart/Cart";
import AddProduct from "../components/AddProduct/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;

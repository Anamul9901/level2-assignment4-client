import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/Home/HomePage";
import Cart from "../pages/Cart/Cart";
import AddProduct from "../components/AddProduct/AddProduct";
import SingleProduct from "../pages/SingleProduct/SingleProduct";
import Register from "../pages/Register";
import App from "../App";
import Payment from "../pages/Payment/Payment";
import Product from "../components/Product/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
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
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;

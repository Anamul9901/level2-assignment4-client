import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/Home/HomePage";
import Cart from "../pages/Cart/Cart";
import AddProduct from "../components/AddProduct/AddProduct";
import SingleProduct from "../pages/SingleProduct/SingleProduct";
import Register from "../pages/Register";
import App from "../App";
import Payment from "../pages/Payment/Payment";
import ProductPage from "../pages/ProductPage/ProductPage";

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
        element: <ProductPage />,
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

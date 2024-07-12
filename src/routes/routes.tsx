import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/Home/HomePage";
import Cart from "../pages/Cart/Cart";
import AddProduct from "../components/AddProduct/AddProduct";
import SingleProduct from "../pages/SingleProduct/SingleProduct";
import Register from "../pages/Register";
import App from "../App";

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
        path: "/product/:id",
        element: <SingleProduct />,
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

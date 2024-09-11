import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { BsCartCheck } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

const Navber = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  // console.log(user);

  const handleLogout = () => {
    dispatch(logout());
  };
  const navitem = (
    <>
      {[
        { path: "/", label: "Home" },
        { path: "/products", label: "Products" },
        { path: "/add-product", label: "Add Product" },
        { path: "/pay-history", label: "Ordered" },
      ].map((item, index) => (
        <li key={index} className="mx-2">
          <NavLink
            to={item.path}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-white underline font-bold md:text-lg px-4 py-2 rounded bg-[#097b32] transition duration-300 ease-in-out"
                : "text-white font-medium md:text-lg px-4 py-2 hover:bg-[#09962f] hover:text-white rounded transition duration-300 ease-in-out"
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </>
  );
  
  
  return (
    <div className="bg-[#027b32] text-white">
  <div className="max-w-7xl mx-auto w-full">
    <div className="navbar">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navitem}
          </ul>
        </div>

        {/* Logo and Title */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <img
              className="md:w-12 w-10"
              src="https://i.ibb.co/Mf5C5N2/pngwing-com-1.png"
              alt="Tree Oasis Logo"
            />
            <h2 className="font-bold md:text-xl text-lg">Tree Oasis</h2>
          </div>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navitem}</ul>
      </div>

      {/* Cart and User Profile */}
      <div className="navbar-end flex items-center">
        <div className="pr-4">
          <Link className="text-2xl hover:text-3xl" to="/cart">
            <BsCartCheck />
          </Link>
        </div>

        {/* User Profile / Login */}
        {user ? (
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <div className="flex items-center">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src="https://i.ibb.co/bd741Kc/pngwing-com-46.png"
                    alt="User Avatar"
                  />
                </div>
              </label>
              <span className="text-xs md:text-lg font-bold ml-2">
                {user?.name || "No Name"}
              </span>
            </div>

            {/* Logout Button */}
            <button onClick={handleLogout} className="text-2xl hover:text-3xl">
              <FiLogOut />
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-sm bg-white hover:text-[#080403] text-black font-bold">
              Log In
            </button>
          </Link>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default Navber;

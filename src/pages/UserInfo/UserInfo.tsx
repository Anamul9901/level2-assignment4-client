/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const UserInfo = () => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const handleUserInfo = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const location = form.location.value;
    const email = form.email.value;
    const number = form.number.value;

    const cartData = JSON.parse(localStorage.getItem("cartProducts") as string);

    let totalPrice = 0;
    for (let i = 0; i < cartData?.length; i++) {
      totalPrice += cartData[i]?.price;
    }

    // console.log(totalPrice);

    const userData = { name, location, email, number, totalPrice };
    // console.log(userData);
    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/payment");

    form.reset();
  };

  return (
    <div className="max-w-7xl mx-auto w-full h-[90vh] flex items-center justify-center">
  <div className="bg-gray-300 rounded-md shadow-lg p-6 mt-14 w-full md:max-w-lg">
    <h1 className="text-3xl font-semibold text-center pb-8">User Info</h1>
    <form onSubmit={handleUserInfo}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3">
        <div>
          <label className="block text-sm font-medium mb-1">Name:</label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            name="name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location:</label>
          <input
            type="text"
            placeholder="Division, District, Thana, Village"
            className="input input-bordered w-full"
            name="location"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3">
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            className="input input-bordered w-full"
            name="email"
            defaultValue={user?.email}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Number:</label>
          <input
            type="text"
            placeholder="Number"
            className="input input-bordered w-full"
            name="number"
            required
          />
        </div>
      </div>

      <div className="pt-5 flex items-center justify-center">
        <button
          type="submit"
          className="btn w-full md:w-auto bg-green-500 hover:bg-green-600 text-white rounded-md font-bold uppercase px-8 py-2"
        >
          Next
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default UserInfo;

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

    console.log(totalPrice);

    const userData = { name, location, email, number, totalPrice };
    console.log(userData);
    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/payment");

    form.reset();
  };

  return (
    <div className="max-w-7xl mx-auto w-full h-[90vh]">
      <div className="flex items-center justify-center">
        <div className="bg-gray-400 rounded-md mt-14 p-6">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-semibold pb-8">User Info</h1>
          </div>
          <form onSubmit={handleUserInfo}>
            <div className="flex gap-2 pb-3">
              <div>
                <p>Name:</p>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full max-w-xs"
                  name="name"
                  required
                />
              </div>
              <div>
                <p>Location</p>
                <input
                  type="text"
                  placeholder="Division,District,Thana,Village"
                  className="input input-bordered w-full max-w-xs"
                  name="location"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 pb-3">
              <div>
                <p>Email:</p>
                <input
                  type="email"
                  className="input input-bordered max-w-xs"
                  name="email"
                  defaultValue={user?.email}
                  required
                />
              </div>
              <div>
                <p>Number:</p>
                <input
                  type="text"
                  placeholder="Number"
                  className="input input-bordered max-w-xs"
                  name="number"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 items-center justify-center pt-5">
              <button
                type="submit"
                className="btn-primary btn-sm font-bold w-full hover:bg-blue-500 bg-green-400 rounded-md text-white font-semibol uppercase"
              >
                N e x t
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

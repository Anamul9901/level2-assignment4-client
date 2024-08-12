/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetAllBuyInfoQuery } from "../../redux/features/buyInfo/buyInfo";
import { useAppSelector } from "../../redux/hooks";

const PaymentHistory = () => {
  const user = useAppSelector(selectCurrentUser);
  const getAllBuyInfo = useGetAllBuyInfoQuery(user?.email);
  const paymentInfo = getAllBuyInfo?.data?.data;
  console.log(paymentInfo);
  return (
    <div className="h-[100vh] max-w-7xl mx-auto w-full">
      {/* {user && ( */}
        <div>
          <h1 className="text-3xl font-semibold text-center py-10">
            Your Order Information
          </h1>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Payment Type</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {paymentInfo?.map((item: any, ind: number) => (
                  <tr key={item?._id}>
                    <th>{ind + 1}</th>
                    <td>{item?.name}</td>
                    <td>{item?.location}</td>
                    <td>{item?.totalPrice}</td>
                    <td>{item?.paymentType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default PaymentHistory;

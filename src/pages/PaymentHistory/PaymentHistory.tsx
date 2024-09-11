/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetAllBuyInfoQuery } from "../../redux/features/buyInfo/buyInfo";
import { useAppSelector } from "../../redux/hooks";

const PaymentHistory = () => {
  const user = useAppSelector(selectCurrentUser);
  const getAllBuyInfo = useGetAllBuyInfoQuery(user?.email);
  const paymentInfo = getAllBuyInfo?.data?.data;
  // console.log(paymentInfo);
  return (
    <div className="min-h-[100vh] max-w-7xl mx-auto w-full p-6">
      {user ? (
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Your Order Information
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* head */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* row 1 */}
                {paymentInfo?.map((item: any, ind: number) => (
                  <tr key={item?._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ind + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item?.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item?.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item?.paymentType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-center pt-8">Login for see your orders</h1>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;

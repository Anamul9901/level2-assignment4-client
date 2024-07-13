import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayment: builder.query({
      query: () => {
        return {
          url: "/payment",
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    createPayment: builder.mutation({
      query: (data) => {
        // console.log("amount--->", data);
        return {
          url: "/payment/create-payment-intent",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["product"],
    }),

    createUserPayData: builder.mutation({
      query: (data) => {
        // console.log("amount--->", data);
        return {
          url: "/payment",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllPaymentQuery,
  useCreatePaymentMutation,
  useCreateUserPayDataMutation,
} = paymentApi;

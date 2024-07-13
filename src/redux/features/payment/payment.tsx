import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayment: builder.mutation({
      query: () => {
        return {
          url: "/payment",
          method: "GET",
        };
      },
    }),
    createPayment: builder.mutation({
      query: (data) => {
        console.log("amount--->", data);
        return {
          url: "/payment/create-payment-intent",
          method: "POST",
          body: data,
        };
      },
    }),

    createUserPayData: builder.mutation({
      query: (data) => {
        console.log("amount--->", data);
        return {
          url: "/payment",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreatePaymentMutation, useCreateUserPayDataMutation } =
  paymentApi;

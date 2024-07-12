import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (data) => {
        return {
          url: "/payment/create-payment-intent",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentApi;

import { baseApi } from "../../api/baseApi";

const buyInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBuyInfo: builder.query({
      query: (email) => {
        return {
          url: "/buyinfo",
          method: "GET",
          params: { email },
        };
      },
      providesTags: ["product"],
    }),

    addBuyInfo: builder.mutation({
      query: (data) => {
        return {
          url: "/buyinfo",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const { useGetAllBuyInfoQuery, useAddBuyInfoMutation } = buyInfoApi;

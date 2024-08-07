import { baseApi } from "../../api/baseApi";

const buyInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBuyInfo: builder.query({
      query: () => {
        return {
          url: "/buyinfo",
          method: "GET",
        };
      },
    }),

    addBuyInfo: builder.mutation({
      query: (data) => {
        return {
          url: "/buyinfo",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {useGetAllBuyInfoQuery, useAddBuyInfoMutation} = buyInfoApi

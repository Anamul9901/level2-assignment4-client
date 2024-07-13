import { baseApi } from "../../api/baseApi";

const cartsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCart: builder.query({
      query: () => {
        return {
          url: "/carts",
          method: "GET"
        };
      },
      providesTags: ["product"],
    }),

    addCart: builder.mutation({
      query: (data) => {
        return {
          url: "/carts",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),

    deleteCart: builder.mutation({
      query: (id) => {
        // console.log('deleted cart id', id);
        return {
          url: `/carts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const { useGetAllCartQuery, useAddCartMutation, useDeleteCartMutation } =
  cartsApi;

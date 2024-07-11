import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => {
        return {
          url: "/products",
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const { useGetAllProductQuery, useDeleteProductMutation } = productsApi;

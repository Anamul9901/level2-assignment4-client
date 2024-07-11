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

    createProduct: builder.mutation({
      query: (productData) => {
        console.log("products--->", productData);
        return {
          url: "/products",
          method: "POST",
          body: productData,
          credentials: "include",
        };
      },
      invalidatesTags: ["product"],
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

    updateProduct: builder.mutation({
      query: (options) => {
        console.log("update-----", options.data);
        return {
          url: `/products/${options?.id}`,
          method: "PUT",
          body: options.data
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApi;

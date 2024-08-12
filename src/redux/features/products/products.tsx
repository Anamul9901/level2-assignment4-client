import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (searchData) => {
        // console.log('search data--->', searchData);
        return {
          url: `/products?searchTerm=${searchData?.searchTerm}&limit=${searchData?.limit}&page=${searchData?.page}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),

    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "GET",
        };
      },
    }),

    createProduct: builder.mutation({
      query: (productData) => {
        // console.log("products--->", productData);
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
        // console.log("update-----", options.data);
        return {
          url: `/products/${options?.id}`,
          method: "PUT",
          body: options.data,
        };
      },
      invalidatesTags: ["product"],
    }),

    updateProductsQuantity: builder.mutation({
      query: (data) => {
        return {
          url: "/products/quantity",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useUpdateProductsQuantityMutation,
} = productsApi;

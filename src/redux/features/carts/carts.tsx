import { baseApi } from "../../api/baseApi";

const cartsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCart: builder.query({
      query: () => {
        return {
          url: "/carts",
          method: "GET",
        };
      },
    }),

  }),
});

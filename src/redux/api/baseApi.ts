import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://level2-assignment4-server.vercel.app/api/",
    // baseUrl: "http://localhost:5000/api/",
    credentials: "include",
  }),
  tagTypes: ["product"],
  endpoints: () => ({}),
});

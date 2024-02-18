import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://sports-management-server.vercel.app/api",
    baseUrl: "http://localhost:5000/api",
    credentials: "include",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth?.token;

      if (token) {
        headers.set("authorization", token);
      }

      return headers;
    },
  }),
  tagTypes: ["Products", "Sales", "BranchManager", "Seller"],

  endpoints: () => ({}),
});

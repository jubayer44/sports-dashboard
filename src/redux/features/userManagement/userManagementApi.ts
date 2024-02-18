import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBranchManager: builder.mutation({
      query: (data) => ({
        url: "/create-manager",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BranchManager"],
    }),
    addSeller: builder.mutation({
      query: (data) => ({
        url: "/create-seller",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Seller"],
    }),
    getAllBranchManagers: builder.query({
      query: () => ({
        url: "/branch-managers",
        method: "GET",
      }),
      providesTags: ["BranchManager"],
    }),
    getAllSellers: builder.query({
      query: () => ({
        url: "/sellers",
        method: "GET",
      }),
      providesTags: ["Seller"],
    }),
    deleteBranchManager: builder.mutation({
      query: (id) => ({
        url: `/branch-manager/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BranchManager"],
    }),
    deleteSeller: builder.mutation({
      query: (id) => ({
        url: `/seller/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Seller"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddBranchManagerMutation,
  useAddSellerMutation,
  useGetAllBranchManagersQuery,
  useGetAllSellersQuery,
  useDeleteBranchManagerMutation,
  useDeleteSellerMutation,
  useGetSingleUserQuery,
} = userManagementApi;

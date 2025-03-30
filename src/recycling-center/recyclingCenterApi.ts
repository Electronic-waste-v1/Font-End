import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RecyclingCenterResponse, CreateRecyclingCenterRequest, UpdateRecyclingCenterRequest } from "./types"

export const recyclingCenterApi = createApi({
  reducerPath: "recyclingCenterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9090",
    prepareHeaders: (headers, { getState }) => {
      
      const token = (getState() as any).auth.token

      
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ["RecyclingCenter"],
  endpoints: (builder) => ({
   
    getAllRecyclingCenters: builder.query<RecyclingCenterResponse[], void>({
      query: () => "/api/recycling-centers",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "RecyclingCenter" as const, id })),
              { type: "RecyclingCenter", id: "LIST" },
            ]
          : [{ type: "RecyclingCenter", id: "LIST" }],
    }),


    getRecyclingCenterById: builder.query<RecyclingCenterResponse, number>({
      query: (id) => `/api/recycling-centers/${id}`,
      providesTags: (result, error, id) => [{ type: "RecyclingCenter", id }],
    }),

  
    createRecyclingCenter: builder.mutation<RecyclingCenterResponse, CreateRecyclingCenterRequest>({
      query: (recyclingCenter) => ({
        url: "/api/recycling-centers",
        method: "POST",
        body: recyclingCenter,
      }),
      invalidatesTags: [{ type: "RecyclingCenter", id: "LIST" }],
    }),

   
    updateRecyclingCenter: builder.mutation<
      RecyclingCenterResponse,
      { id: number; recyclingCenter: UpdateRecyclingCenterRequest }
    >({
      query: ({ id, recyclingCenter }) => ({
        url: `/api/recycling-centers/${id}`,
        method: "PUT",
        body: recyclingCenter,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "RecyclingCenter", id },
        { type: "RecyclingCenter", id: "LIST" },
      ],
    }),

  
    deleteRecyclingCenter: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/recycling-centers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "RecyclingCenter", id },
        { type: "RecyclingCenter", id: "LIST" },
      ],
    }),


    searchRecyclingCentersByLocation: builder.query<RecyclingCenterResponse[], string>({
      query: (location) => ({
        url: "/api/recycling-centers/location",
        params: { location },
      }),
      providesTags: [{ type: "RecyclingCenter", id: "LOCATION_SEARCH" }],
    }),

    
    filterRecyclingCentersByDeviceType: builder.query<RecyclingCenterResponse[], string>({
      query: (deviceType) => ({
        url: "/api/recycling-centers/devices",
        params: { deviceType },
      }),
      providesTags: [{ type: "RecyclingCenter", id: "DEVICE_FILTER" }],
    }),
  }),
})

export const {
  useGetAllRecyclingCentersQuery,
  useGetRecyclingCenterByIdQuery,
  useCreateRecyclingCenterMutation,
  useUpdateRecyclingCenterMutation,
  useDeleteRecyclingCenterMutation,
  useSearchRecyclingCentersByLocationQuery,
  useFilterRecyclingCentersByDeviceTypeQuery,
} = recyclingCenterApi


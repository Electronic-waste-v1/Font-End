import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { CollectionPointResponse, CreateCollectionPointRequest, UpdateCollectionPointRequest } from "../types/collectionPointTypes"

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

export const collectionApi = createApi({
  reducerPath: "collectionApi",
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
  tagTypes: ["CollectionPoint"],
  endpoints: (builder) => ({
    
    getAllCollectionPoints: builder.query<PaginatedResponse<CollectionPointResponse>, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => ({
        url: "/api/recycling-centers",
        params: { page, pageSize },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: "CollectionPoint" as const, id })),
              { type: "CollectionPoint", id: "LIST" },
            ]
          : [{ type: "CollectionPoint", id: "LIST" }],
    }),

   
    getCollectionPointById: builder.query<CollectionPointResponse, number>({
      query: (id) => `/api/recycling-centers/${id}`,
      providesTags: (result, error, id) => [{ type: "CollectionPoint", id }],
    }),

    
    createCollectionPoint: builder.mutation<CollectionPointResponse, CreateCollectionPointRequest>({
      query: (collectionPoint) => ({
        url: "/api/recycling-centers",
        method: "POST",
        body: collectionPoint,
      }),
      invalidatesTags: [{ type: "CollectionPoint", id: "LIST" }],
    }),

  
    updateCollectionPoint: builder.mutation<
      CollectionPointResponse,
      { id: number; collectionPoint: UpdateCollectionPointRequest }
    >({
      query: ({ id, collectionPoint }) => ({
        url: `/api/recycling-centers/${id}`,
        method: "PUT",
        body: collectionPoint,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CollectionPoint", id },
        { type: "CollectionPoint", id: "LIST" },
      ],
    }),

   
    deleteCollectionPoint: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/recycling-centers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CollectionPoint", id },
        { type: "CollectionPoint", id: "LIST" },
      ],
    }),

  
    searchCollectionPointsByLocation: builder.query<CollectionPointResponse[], string>({
      query: (location) => ({
        url: "/api/recycling-centers/location",
        params: { location },
      }),
      providesTags: [{ type: "CollectionPoint", id: "LOCATION_SEARCH" }],
    }),

    
    filterCollectionPointsByDeviceType: builder.query<CollectionPointResponse[], string>({
      query: (deviceType) => ({
        url: "/api/recycling-centers/devices",
        params: { deviceType },
      }),
      providesTags: [{ type: "CollectionPoint", id: "DEVICE_FILTER" }],
    }),
  }),
})

export const {
  useGetAllCollectionPointsQuery,
  useGetCollectionPointByIdQuery,
  useCreateCollectionPointMutation,
  useUpdateCollectionPointMutation,
  useDeleteCollectionPointMutation,
  useSearchCollectionPointsByLocationQuery,
  useFilterCollectionPointsByDeviceTypeQuery,
} = collectionApi
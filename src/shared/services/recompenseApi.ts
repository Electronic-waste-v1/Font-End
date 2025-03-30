import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  RecompenseResponse,
  CreateRecompenseRequest,
  UpdateRecompenseRequest,
  AssignRecompenseRequest,
  AssignRecompenseResponse,
} from "../types/recompenseTypes"

export const recompenseApi = createApi({
  reducerPath: "recompenseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9090",
    prepareHeaders: (headers, { getState }) => {
  
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers
    },
  }),
  tagTypes: ["Recompense"],
  endpoints: (builder) => ({
   
    getRecompenses: builder.query<RecompenseResponse[], void>({
      query: () => "/api/recompenses",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Recompense" as const, id })), { type: "Recompense", id: "LIST" }]
          : [{ type: "Recompense", id: "LIST" }],
    }),

   
    getRecompenseById: builder.query<RecompenseResponse, number>({
      query: (id) => `/api/recompenses/${id}`,
      providesTags: (_, __, id) => [{ type: "Recompense", id }],
    }),

    
    createRecompense: builder.mutation<RecompenseResponse, CreateRecompenseRequest>({
      query: (recompense) => ({
        url: "/api/recompenses",
        method: "POST",
        body: recompense,
      }),
      invalidatesTags: [{ type: "Recompense", id: "LIST" }],
    }),

 
    updateRecompense: builder.mutation<RecompenseResponse, { id: number; recompense: UpdateRecompenseRequest }>({
      query: ({ id, recompense }) => ({
        url: `/api/recompenses/${id}`,
        method: "PUT",
        body: recompense,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Recompense", id }],
    }),

    deleteRecompense: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/recompenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "Recompense", id },
        { type: "Recompense", id: "LIST" },
      ],
    }),

   
    assignRecompense: builder.mutation<AssignRecompenseResponse, AssignRecompenseRequest>({
      query: (params) => ({
        url: "/api/recompenses/assign",
        method: "POST",
        params,
      }),
      invalidatesTags: [{ type: "Recompense", id: "LIST" }],
    }),
  }),
})

export const {
  useGetRecompensesQuery,
  useGetRecompenseByIdQuery,
  useCreateRecompenseMutation,
  useUpdateRecompenseMutation,
  useDeleteRecompenseMutation,
  useAssignRecompenseMutation,
} = recompenseApi


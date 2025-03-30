import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { CreateEwasteRequest, EwasteResponse, UpdateEwasteRequest } from "../types/Ewaste/types"

export const ewasteApi = createApi({
  reducerPath: "ewasteApi",
  baseQuery: fetchBaseQuery({
    baseUrl:  "http://localhost:9090",
    prepareHeaders: (headers, { getState }) => {
   
     const token = (getState() as RootState).auth.token;

      
      console.log("token",token);
      
      if (token) {
       
        
        headers.set("authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ["Ewaste"],
  endpoints: (builder) => ({

    getAllEwastes: builder.query<EwasteResponse[], void>({
      query: () => "/api/ewaste",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Ewaste" as const, id })), { type: "Ewaste", id: "LIST" }]
          : [{ type: "Ewaste", id: "LIST" }],
    }),
    getEwasteById: builder.query<EwasteResponse, number>({
      query: (id) => `/api/ewaste/${id}`,
      providesTags: (_, __, id) => [{ type: "Ewaste", id }],
    }),

  
    createEwaste: builder.mutation<EwasteResponse, CreateEwasteRequest>({
      query: (ewasteData) => ({
        url: "/api/ewaste",
        method: "POST",
        body: ewasteData,
      }),
      invalidatesTags: [{ type: "Ewaste", id: "LIST" }],
    }),

    updateEwaste: builder.mutation<EwasteResponse, { id: number; data: UpdateEwasteRequest }>({
      query: ({ id, data }) => ({
        url: `/api/ewaste/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Ewaste", id }],
    }),

 
    deleteEwaste: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/ewaste/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "Ewaste", id },
        { type: "Ewaste", id: "LIST" },
      ],
    }),
  }),
})


export const {
  useGetAllEwastesQuery,
  useGetEwasteByIdQuery,
  useCreateEwasteMutation,
  useUpdateEwasteMutation,
  useDeleteEwasteMutation,
} = ewasteApi


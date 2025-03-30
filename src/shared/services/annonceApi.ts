import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  AnnonceResponse,
  CreateAnnonceRequest,
  UpdateAnnonceRequest,
  PriceRangeParams,
  AnnonceCondition,
  AnnonceCategory,
} from "../types/annonceTypes"



export const annonceApi = createApi({
  reducerPath: "annonceApi",
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
  tagTypes: ["Annonce"],
  endpoints: (builder) => ({
  
    getAllAnnonces: builder.query<AnnonceResponse[], void>({
      query: () => "api/annonces",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Annonce" as const, id })), { type: "Annonce", id: "LIST" }]
          : [{ type: "Annonce", id: "LIST" }],
    }),

   
    getAnnonceById: builder.query<AnnonceResponse, number>({
      query: (id) => `api/annonces/${id}`,
      providesTags: (result, error, id) => [{ type: "Annonce", id }],
    }),


    createAnnonce: builder.mutation<AnnonceResponse, CreateAnnonceRequest>({
      query: (annonce) => ({
        url: "api/annonces",
        method: "POST",
        body: annonce,
      }),
      invalidatesTags: [{ type: "Annonce", id: "LIST" }],
    }),


    updateAnnonce: builder.mutation<AnnonceResponse, { id: number; annonce: UpdateAnnonceRequest }>({
      query: ({ id, annonce }) => ({
        url: `annonces/${id}`,
        method: "PUT",
        body: annonce,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Annonce", id }],
    }),


    deleteAnnonce: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/annonces/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Annonce", id: "LIST" }],
    }),

    getAnnoncesByCategory: builder.query<AnnonceResponse[], AnnonceCategory>({
      query: (category) => `api/annonces/category/${category}`,
      providesTags: [{ type: "Annonce", id: "LIST" }],
    }),

    
    getAnnoncesByPriceRange: builder.query<AnnonceResponse[], PriceRangeParams>({
      query: (params) => ({
        url: "api/annonces/price",
        params,
      }),
      providesTags: [{ type: "Annonce", id: "LIST" }],
    }),

   
    getAnnoncesByCondition: builder.query<AnnonceResponse[], AnnonceCondition>({
      query: (condition) => `api/annonces/condition/${condition}`,
      providesTags: [{ type: "Annonce", id: "LIST" }],
    }),
  }),
})


export const {
  useGetAllAnnoncesQuery,
  useGetAnnonceByIdQuery,
  useCreateAnnonceMutation,
  useUpdateAnnonceMutation,
  useDeleteAnnonceMutation,
  useGetAnnoncesByCategoryQuery,
  useGetAnnoncesByPriceRangeQuery,
  useGetAnnoncesByConditionQuery,
} = annonceApi


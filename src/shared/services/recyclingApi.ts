import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { EnvironmentalImpact, UserStatistics, Leaderboard } from "../types/recyclingTypes"
import type { RootState } from "../../app/store"

export const recyclingApi = createApi({
  reducerPath: "recyclingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9090/api/",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        console.log('Token:', token);
      
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
      
        return headers;
      },
  }),
  endpoints: (builder) => ({
    getUserImpact: builder.query<EnvironmentalImpact, number>({
      query: (userId) => `/impact/user/${userId}`,
    }),
    getTotalImpact: builder.query<EnvironmentalImpact, void>({
      query: () => `/impact/total`,
    }),
    getUserStatistics: builder.query<UserStatistics, number>({
      query: (userId) => `/statistics/user/${userId}`,
    }),
    getLeaderboard: builder.query<Leaderboard, void>({
      query: () => `/statistics/leaderboard`,
    }),
  }),
})

export const {
  useGetUserImpactQuery,
  useGetTotalImpactQuery,
  useGetUserStatisticsQuery,
  useGetLeaderboardQuery,
} = recyclingApi
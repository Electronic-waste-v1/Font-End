import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../../app/store"
import type { User } from "./../slices/authSlice"
import { RecyclingAction } from "@/shared/types/recyclingActionTepes"


export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  role?: string
}

export interface AuthResponse {
  user: User
  token: string
}
export interface UserPoints {
  userId: number
  points: number
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9090/api/auth",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      transformResponse: (response: User) => response,

      transformErrorResponse: (response) => {
    console.log("error res"+response);
    
        localStorage.removeItem("token");
        return response;
      },
    }),getUserPoints: builder.query<UserPoints, number>({
      query: (userId) => `/${userId}/points`,
      providesTags: ["UserPoints"],
    }),
    updateUserPoints: builder.mutation<UserPoints, { userId: number; pointsUtilises: number }>({
      query: ({ userId, pointsUtilises }) => ({
        url: `/${userId}/points`,
        method: "PATCH",
        body: { pointsUtilises },
      }),
      invalidatesTags: ["UserPoints"],
    }),
    getUserActionHistory: builder.query<RecyclingAction[], number>({
      query: (userId) => `/${userId}/actions`,
      providesTags: ["UserActions"],
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useGetUserPointsQuery,
  useUpdateUserPointsMutation,
  useGetUserActionHistoryQuery,
} = authApi
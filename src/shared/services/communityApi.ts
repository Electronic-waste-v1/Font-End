import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  CommunityPost,
  CommunityPostRequest,
  Comment,
  CommentRequest,
  CommunityEvent,
  CommunityEventRequest,
  CommunityChallenge,
  CommunityChallengeRequest,
  LeaderboardUser,
  PagedResponse,
  CommunityPostFilters,
  CommunityEventFilters,
  CommunityChallengeFilters,
} from "../types/communityTypes"
import { Leaderboard } from "../types/recyclingTypes"

export const communityApi = createApi({
  reducerPath: "communityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9090/api",
    prepareHeaders: (headers, { getState }) => {
      
      const token = (getState() as any).auth.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
    
    credentials: "include",
  }),
  tagTypes: ["Posts", "Comments", "Events", "Challenges", "Leaderboard"],
  endpoints: (builder) => ({
   
    getPosts: builder.query<PagedResponse<CommunityPost>, { page?: number; size?: number } & CommunityPostFilters>({
      query: (params) => ({
        url: "/community/posts",
        params,
      }),
      providesTags: (result) =>
        result
          ? [...result.content.map(({ id }) => ({ type: "Posts" as const, id })), { type: "Posts", id: "LIST" }]
          : [{ type: "Posts", id: "LIST" }],
    }),

    getPostById: builder.query<CommunityPost, string>({
      query: (id) => `/community/posts/${id}`,
      providesTags: (_, __, id) => [{ type: "Posts", id }],
    }),

    createPost: builder.mutation<CommunityPost, CommunityPostRequest>({
      query: (post) => ({
        url: "/community/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    updatePost: builder.mutation<CommunityPost, { id: string; post: Partial<CommunityPostRequest> }>({
      query: ({ id, post }) => ({
        url: `/community/posts/${id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Posts", id }],
    }),

    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/community/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    likePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/community/posts/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Posts", id }],
    }),

    unlikePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/community/posts/${id}/unlike`,
        method: "POST",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Posts", id }],
    }),

 
    getCommentsByPostId: builder.query<PagedResponse<Comment>, { postId: string; page?: number; size?: number }>({
      query: ({ postId, ...params }) => ({
        url: `/community/posts/${postId}/comments`,
        params,
      }),
      providesTags: (result, _, { postId }) =>
        result
          ? [...result.content.map(({ id }) => ({ type: "Comments" as const, id })), { type: "Comments", id: postId }]
          : [{ type: "Comments", id: postId }],
    }),

    createComment: builder.mutation<Comment, { postId: string; content: string }>({
      query: ({ postId, content }) => ({
        url: `/community/posts/${postId}/comments`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (_, __, { postId }) => [
        { type: "Comments", id: postId },
        { type: "Posts", id: postId }, 
      ],
    }),

    deleteComment: builder.mutation<void, { id: string; postId: string }>({
      query: ({ id }) => ({
        url: `/community/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { postId }) => [
        { type: "Comments", id: postId },
        { type: "Posts", id: postId }, 
      ],
    }),

  
    getEvents: builder.query<PagedResponse<CommunityEvent>, { page?: number; size?: number } & CommunityEventFilters>({
      query: (params) => ({
        url: "/community/events",
        params,
      }),
      providesTags: (result) =>
        result
          ? [...result.content.map(({ id }) => ({ type: "Events" as const, id })), { type: "Events", id: "LIST" }]
          : [{ type: "Events", id: "LIST" }],
    }),

    getEventById: builder.query<CommunityEvent, string>({
      query: (id) => `/community/events/${id}`,
      providesTags: (_, __, id) => [{ type: "Events", id }],
    }),

    createEvent: builder.mutation<CommunityEvent, CommunityEventRequest>({
      query: (event) => ({
        url: "/community/events",
        method: "POST",
        body: event,
      }),
      invalidatesTags: [{ type: "Events", id: "LIST" }],
    }),

    updateEvent: builder.mutation<CommunityEvent, { id: string; event: Partial<CommunityEventRequest> }>({
      query: ({ id, event }) => ({
        url: `/community/events/${id}`,
        method: "PUT",
        body: event,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Events", id }],
    }),

    deleteEvent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/community/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Events", id: "LIST" }],
    }),

    attendEvent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/community/events/${id}/attend`,
        method: "POST",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Events", id }],
    }),

    unattendEvent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/community/events/${id}/unattend`,
        method: "POST",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Events", id }],
    }),


    getChallenges: builder.query<
      PagedResponse<CommunityChallenge>,
      { page?: number; size?: number } & CommunityChallengeFilters
    >({
      query: (params) => ({
        url: "/community/challenges",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: "Challenges" as const, id })),
              { type: "Challenges", id: "LIST" },
            ]
          : [{ type: "Challenges", id: "LIST" }],
    }),

    getChallengeById: builder.query<CommunityChallenge, string>({
      query: (id) => `/community/challenges/${id}`,
      providesTags: (_, __, id) => [{ type: "Challenges", id }],
    }),

    createChallenge: builder.mutation<CommunityChallenge, CommunityChallengeRequest>({
      query: (challenge) => ({
        url: "/community/challenges",
        method: "POST",
        body: challenge,
      }),
      invalidatesTags: [{ type: "Challenges", id: "LIST" }],
    }),

    updateChallenge: builder.mutation<
      CommunityChallenge,
      { id: string; challenge: Partial<CommunityChallengeRequest> }
    >({
      query: ({ id, challenge }) => ({
        url: `/community/challenges/${id}`,
        method: "PUT",
        body: challenge,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Challenges", id }],
    }),

    deleteChallenge: builder.mutation<void, string>({
      query: (id) => ({
        url: `/community/challenges/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Challenges", id: "LIST" }],
    }),

    joinChallenge: builder.mutation<void, string>({
      query: (id) => ({
        url: `/community/challenges/${id}/join`,
        method: "POST",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Challenges", id }],
    }),

    leaveChallenge: builder.mutation<void, string>({
      query: (id) => ({
        url: `/community/challenges/${id}/leave`,
        method: "POST",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Challenges", id }],
    }),

    getLeaderboard: builder.query<Leaderboard, void>({
         query: () => `/statistics/leaderboard`,
       }),
  }),
})

export const {

  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,


  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,


  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useAttendEventMutation,
  useUnattendEventMutation,

  
  useGetChallengesQuery,
  useGetChallengeByIdQuery,
  useCreateChallengeMutation,
  useUpdateChallengeMutation,
  useDeleteChallengeMutation,
  useJoinChallengeMutation,
  useLeaveChallengeMutation,

  
  useGetLeaderboardQuery,
} = communityApi



export interface UserSummary {
  id: string
  name: string
  avatar: string
  badge: string
}

export interface CommunityPost {
  id: string
  author: UserSummary
  content: string
  image?: string
  tags: string[]
  likes: number
  comments: number
  date: string
  isLikedByCurrentUser: boolean
}

export interface CommunityPostRequest {
  title: string
  content: string
  image?: string
  tags: string[]
}


export interface Comment {
  id: string
  postId: string
  author: UserSummary
  content: string
  date: string
  likes: number
}

export interface CommentRequest {
  postId: string
  content: string
}


export interface CommunityEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image?: string
  attendees: number
  isAttendingByCurrentUser: boolean
}

export interface CommunityEventRequest {
  title: string
  description: string
  date: string
  time: string
  location: string
  image?: string
}


export interface CommunityChallenge {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  participantsCount: number
  progress: number
  reward: string
  image?: string
  isJoinedByCurrentUser: boolean
  userProgress?: {
    current: number
    target: number
  }
}

export interface CommunityChallengeRequest {
  title: string
  description: string
  startDate: string
  endDate: string
  reward: string
  imageUrl?: string
  targetGoal: number
}


export interface LeaderboardUser {
  rank: number
  user: UserSummary
  points: number
  recycled: string
  badge: string
}


export interface PagedResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}


export interface CommunityPostFilters {
  tag?: string
  search?: string
  sortBy?: "recent" | "popular" | "comments"
}

export interface CommunityEventFilters {
  upcoming?: boolean
  search?: string
}

export interface CommunityChallengeFilters {
  active?: boolean
  joined?: boolean
}


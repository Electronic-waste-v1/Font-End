export interface Recompense {
  id?: number
  description: string
  pointsRequis: number
  userId?: number
  createdAt?: string
  updatedAt?: string
  image?: string
  category?: string
  merchant?: string
  expiryDays?: number | null
  status?: string
  code?: string | null
}

export interface RecompenseResponse {
  id: number
  description: string
  pointsRequis: number
  userId: number
  createdAt: string
  updatedAt: string
  image?: string
  category?: string
  merchant?: string
  expiryDays?: number | null
  status?: string
  code?: string | null
}

export interface CreateRecompenseRequest {
  description: string
  pointsRequis: number
  userId?: number
  image?: string
  category?: string
  merchant?: string
  expiryDays?: number | null
}

export interface UpdateRecompenseRequest {
  description?: string
  pointsRequis?: number
  userId?: number
  image?: string
  category?: string
  merchant?: string
  expiryDays?: number | null
  status?: string
  code?: string | null
}

export interface AssignRecompenseRequest {
  userId: number
  recompenseId: number
}

export interface AssignRecompenseResponse {
  success: boolean
  message: string
  recompense?: RecompenseResponse
}


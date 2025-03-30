export interface RecyclingCenter {
  id?: number
  contact: string
  nom: string
  adresse: string
  acceptedTypes: string[]
  latitude?: number
  longitude?: number
  status?: "active" | "inactive"
  openingHours?: string
  createdAt?: string
  updatedAt?: string
}

export interface RecyclingCenterResponse {
  id: number
  contact: string
  nom: string
  adresse: string
  acceptedTypes: string[]
  latitude?: number
  longitude?: number
  status: "active" | "inactive"
  openingHours?: string
  createdAt: string
  updatedAt: string
}

export interface CreateRecyclingCenterRequest {
  contact: string
  nom: string
  adresse: string
  acceptedTypes: string[]
  latitude?: number
  longitude?: number
  status?: "active" | "inactive"
  openingHours?: string
}

export interface UpdateRecyclingCenterRequest {
  contact?: string
  nom?: string
  adresse?: string
  acceptedTypes?: string[]
  latitude?: number
  longitude?: number
  status?: "active" | "inactive"
  openingHours?: string
}

export interface GetRecyclingCenterByLocationRequest {
  location: string
}

export interface GetRecyclingCenterByDeviceTypeRequest {
  deviceType: string
}


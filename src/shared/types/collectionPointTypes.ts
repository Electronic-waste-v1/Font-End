export interface CollectionPoint {
  id?: number
  contact: string
  nom: string
  adresse: string
  acceptedTypes: string[]
  coordinates?: {
    lat: number
    lng: number
  }
  status?: "Open" | "Closed"
  hours?: string
  description?: string
  phone?: string
  email?: string
  image?: string
  distance?: string
  rating?: number
  lastVisited?: string
}

export interface CollectionPointResponse {
  id: number
  contact: string
  nom: string
  adresse: string
  acceptedTypes: string[]
  coordinates: {
    lat: number
    lng: number
  }
  status: "Open" | "Closed"
  hours: string
  description?: string
  phone?: string
  email?: string
  image?: string
  distance?: string
  rating?: number
  lastVisited?: string
  createdAt: string
  updatedAt: string
}

export interface CreateCollectionPointRequest {
  contact: string
  nom: string
  adresse: string
  acceptedTypes: string[]
  coordinates?: {
    lat: number
    lng: number
  }
  status?: "Open" | "Closed"
  hours?: string
  description?: string
  phone?: string
  email?: string
  image?: string
}

export interface UpdateCollectionPointRequest {
  contact?: string
  nom?: string
  adresse?: string
  acceptedTypes?: string[]
  coordinates?: {
    lat: number
    lng: number
  }
  status?: "Open" | "Closed"
  hours?: string
  description?: string
  phone?: string
  email?: string
  image?: string
}

export interface GetCollectionPointsByLocationRequest {
  location: string
}

export interface GetCollectionPointsByDeviceTypeRequest {
  deviceType: string
}


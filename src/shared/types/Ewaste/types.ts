export interface Ewaste {
    id?: number
    nom: string
    description: string
    categorie: string
    etat: string
    user_id: number
  }
  
  export interface EwasteResponse {
    id: number
    nom: string
    description: string
    categorie: string
    etat: string
    user_id: number
    created_at?: string
    updated_at?: string
  }
  
  export interface CreateEwasteRequest {
    nom: string
    description: string
    categorie: string
    etat: string
    user_id: number
  }
  
  export interface UpdateEwasteRequest {
    nom?: string
    description?: string
    categorie?: string
    etat?: string
  }
  
  
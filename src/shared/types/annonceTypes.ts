export interface Annonce {
    id?: number
    title: string
    description: string
    prix: number
    etat: string
    user_id: number
    waste_id?: number
    created_at?: string
    updated_at?: string
  }
  
  export interface AnnonceResponse {
    id: number
    title: string
    description: string
    prix: number
    etat: string
    user_id: number
    waste_id?: number
    created_at: string
    updated_at: string
  }
  
  export interface CreateAnnonceRequest {
    title: string
    description: string
    prix: number
    etat: string
    user_id: number
    waste_id?: number
  }
  
  export interface UpdateAnnonceRequest {
    title?: string
    description?: string
    prix?: number
    etat?: string
    waste_id?: number
  }
  
  export interface PriceRangeParams {
    minPrice?: string
    maxPrice?: string
  }
  
  export type AnnonceCondition =
    | "NEUF"
    | "TRES_BON_ETAT"
    | "BON_ETAT"
    | "USAGE"
    | "A_REPARER"
    | "POUR_PIECES"
    | "Disponible"
  export type AnnonceCategory = "SMARTPHONE" | "ORDINATEUR" | "TABLETTE" | "TELEVISION" | "ELECTROMENAGER" | "AUTRE"
  
  
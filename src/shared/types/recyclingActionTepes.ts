export interface RecyclingAction {
    id: number
    userId: number
    username: string
    actionType: string
    description: string
    pointsGained: number
    actionDate: string
    ewaste: {
      id: number
      nom: string
      description: string
      categorie: string
      etat: string
      user: {
        id: number
        username: string
        email: string
        role: string
        points: number | null
      }
      annonce: any[]
    }
  }
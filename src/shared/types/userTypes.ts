export interface UserPoints {
    id: number
    user: {
      id: number
    }
    pointsTotal: number
    pointsUtilises: number
  }
  
  
  export interface User {
    id: number
    username: string
    email: string
    userPoints?: UserPoints
  }
  
  
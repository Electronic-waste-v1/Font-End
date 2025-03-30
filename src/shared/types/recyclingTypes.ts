export interface EnvironmentalImpact {
    userId?: number | null
    co2Reduction: number
    waterSaved: number
    materialsRecovered: number
    recycledDevicesCount: number
  }
  
  export interface UserStatistics {
    userId: number
    recycledDevicesCount: number
    donatedDevicesCount: number
    repairedDevicesCount: number
    totalPoints: number
    availablePoints: number
    userRanking: number
  }
  
  export interface LeaderboardEntry {
    userId: number
    userName: string
    points: number
    recycledCount: number
  }
  
  export interface Leaderboard {
    entries: LeaderboardEntry[]
    generatedAt: string
  }
  
  
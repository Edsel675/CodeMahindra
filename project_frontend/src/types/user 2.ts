export interface User {
    id: number
    name: string
    avatar: string
    flag: string
    points: number
  }
  
  export interface UserWithRank extends User {
    rank: number
  }
  
  
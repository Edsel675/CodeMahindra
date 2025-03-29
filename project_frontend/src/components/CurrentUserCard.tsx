import type React from "react"
import type { UserWithRank } from "../types/user";

type CurrentUserCardProps = {
    user: UserWithRank
    percentile: number
  }
  
  const CurrentUserCard: React.FC<CurrentUserCardProps> = ({ user, percentile }) => {
    return (
      <div className="bg-gradient-to-r from-orange-300 to-orange-400 rounded-lg p-4 flex items-center gap-4">
        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center text-orange-500 font-bold text-xl">
          #{user.rank}
        </div>
        <div className="text-white">
          <p className="font-medium">You are doing better than</p>
          <p className="text-xl font-bold">{percentile}% of other players!</p>
        </div>
      </div>
    )
  }
  
  export default CurrentUserCard
  
  
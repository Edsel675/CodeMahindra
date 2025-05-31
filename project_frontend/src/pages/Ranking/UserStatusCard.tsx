"use client"
import type React from "react"
import { motion } from "framer-motion"
import type { User } from "../types/user"

type UserStatusCardProps = {
  user: User
  percentile: number
}

const UserStatusCard: React.FC<UserStatusCardProps> = ({ user, percentile }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl p-5 relative overflow-hidden"
      style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 165, 0, 0.2)",
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-4 relative z-10">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0 mt-1">
          <span className="text-orange-500 text-xl font-bold">
            {user.rank ? `#${user.rank}` : "-"}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-lg">You are doing better than</p>
          <p className="text-white text-2xl font-extrabold">{percentile}% of other players</p>
          <div className="mt-2 text-white text-sm">
            <p><strong>Points:</strong> {user.coins.toLocaleString()} QP</p>
            {user.position && <p><strong>Position:</strong> {user.position}</p>}
            {user.team && <p><strong>Team:</strong> {user.team}</p>}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 bg-white bg-opacity-30 h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentile}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </motion.div>
  )
}

export default UserStatusCard
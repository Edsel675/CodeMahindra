"use client"

import type React from "react"
import type { User } from "../types/user"
import { motion } from "framer-motion"
import { Crown } from "lucide-react"

type TopPlayerCardProps = {
  user: User
}

const TopPlayerCard: React.FC<TopPlayerCardProps> = ({ user }) => {
  if (!user) return null

  return (
    <motion.div
      className="bg-[#1e1e1e] backdrop-blur-sm rounded-xl p-5 border border-white/5 relative overflow-hidden"
      style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.05)",
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <motion.div
            className="w-16 h-16 bg-[#d1f0e8] rounded-full flex items-center justify-center p-1 shadow-md"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={user.avatar || "/placeholder.svg?height=64&width=64"}
              alt={`${user.name}'s avatar`}
              className="w-full h-full rounded-full object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute -top-2 -right-2 bg-yellow-400 rounded-md p-1 shadow-lg"
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Crown className="h-4 w-4 text-yellow-900" />
          </motion.div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-xl truncate">{user.name}</p>

          <div className="flex items-center gap-2 mt-1">
            <motion.div
              className="bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span>{user.points.toLocaleString()} points</span>
            </motion.div>

            <motion.div
              className="w-8 h-8 rounded-md overflow-hidden shadow-md border-2 border-gray-800"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={user.flag || "/placeholder.svg?height=32&width=32"}
                alt={`${user.name}'s nationality`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TopPlayerCard




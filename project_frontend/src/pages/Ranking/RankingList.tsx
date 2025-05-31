"use client"

import type React from "react"
import type { User } from "../types/user"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react"

type RankingListProps = {
  users: User[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  
}

const RankingList: React.FC<RankingListProps> = ({ users, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-400" />
        <span>Ranking</span>
      </h2>

      <motion.div
        className="bg-[#1e1e1e]/50 rounded-xl overflow-hidden flex-grow flex flex-col"
        style={{
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-grow">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              className="flex items-center p-4 border-b border-[#2a2a2a]/30 hover:bg-white/5 transition-all duration-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <div className="w-8 h-8 rounded-full bg-[#333]/50 flex items-center justify-center text-white/80 font-medium text-sm">
                {user.rank}
              </div>

              <div className="ml-3 relative">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center p-[2px]">
                  <img
                    src={user.avatar || "/placeholder.svg?height=48&width=48"}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* Flag */}
                {user.flag && (
                  <div className="absolute -right-1 bottom-0 w-6 h-6 rounded-sm overflow-hidden border border-gray-800">
                    <img
                      src={user.flag}
                      alt="Flag"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="ml-3 flex-1 min-w-0">
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-sm text-amber-400">{user.coins.toLocaleString()} QP</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 border-t border-[#2a2a2a]/30">
          <motion.button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${
              currentPage === 1 ? "text-gray-600 cursor-not-allowed" : "text-white hover:bg-[#333] hover:shadow-lg"
            } transition-colors`}
            whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
            whileTap={currentPage !== 1 ? { scale: 0.9 } : {}}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex space-x-1">
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              let page
              if (totalPages > 3) {
                if (currentPage <= 2) {
                  page = i + 1
                } else if (currentPage >= totalPages - 1) {
                  page = totalPages - 2 + i
                } else {
                  page = currentPage - 1 + i
                }
              } else {
                page = i + 1
              }

              return (
                <motion.button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    currentPage === page
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]"
                      : "text-gray-400 hover:bg-[#333] hover:text-white"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {page}
                </motion.button>
              )
            })}
          </div>

          <motion.button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${
              currentPage === totalPages
                ? "text-gray-600 cursor-not-allowed"
                : "text-white hover:bg-[#333] hover:shadow-lg"
            } transition-colors`}
            whileHover={currentPage !== totalPages ? { scale: 1.1 } : {}}
            whileTap={currentPage !== totalPages ? { scale: 0.9 } : {}}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default RankingList
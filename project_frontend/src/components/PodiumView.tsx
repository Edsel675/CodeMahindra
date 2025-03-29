"use client"

import type React from "react"
import type { User } from "../types/user"
import { motion } from "framer-motion"
import { Clock, Crown } from "lucide-react"

type PodiumViewProps = {
  topUsers: User[]
}

const PodiumView: React.FC<PodiumViewProps> = ({ topUsers }) => {
  // Sort users by points (desc) and take the top 3
  const podiumUsers = [...topUsers].sort((a, b) => b.points - a.points).slice(0, 3)

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[600px]">
      {/* Timer */}
      <div className="absolute top-0 right-0 z-50">
        <motion.div
          className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Clock className="h-5 w-5" />
          <span className="font-medium text-lg">06d 23h 00m</span>
        </motion.div>
      </div>

      {/* Background circles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gray-700 opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gray-700 opacity-30"></div>
      </div>

      {/* Podium container */}
      <div className="absolute inset-0 flex items-end justify-center">
        <div className="relative w-full max-w-[600px] h-[400px]">
          {/* Podium blocks - MUST be rendered BEFORE player info to ensure proper z-index */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
            {/* 2nd place podium */}
            <motion.div
              className="relative w-[180px] h-[200px] mx-2"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-b from-red-500 to-red-600 rounded-t-md transform-gpu preserve-3d shadow-xl"
                style={{ transform: "perspective(800px) rotateX(10deg)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-white text-[120px] font-bold">
                  2
                </div>
                <div className="absolute top-0 left-0 right-0 h-[20px] bg-red-400 rounded-t-md transform-gpu -translate-y-[1px]"></div>
              </div>
            </motion.div>

            {/* 1st place podium */}
            <motion.div
              className="relative w-[180px] h-[260px] mx-2 z-10"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-b from-red-400 to-red-500 rounded-t-md transform-gpu preserve-3d shadow-xl"
                style={{ transform: "perspective(800px) rotateX(10deg)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-white text-[120px] font-bold">
                  1
                </div>
                <div className="absolute top-0 left-0 right-0 h-[20px] bg-red-300 rounded-t-md transform-gpu -translate-y-[1px]"></div>
              </div>
            </motion.div>

            {/* 3rd place podium */}
            <motion.div
              className="relative w-[180px] h-[160px] mx-2"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-b from-red-500 to-red-600 rounded-t-md transform-gpu preserve-3d shadow-xl"
                style={{ transform: "perspective(800px) rotateX(10deg)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-white text-[120px] font-bold">
                  3
                </div>
                <div className="absolute top-0 left-0 right-0 h-[20px] bg-red-400 rounded-t-md transform-gpu -translate-y-[1px]"></div>
              </div>
            </motion.div>
          </div>

          {/* Player information - MUST be rendered AFTER podium blocks to ensure proper z-index */}
          <div className="absolute inset-0 z-20">
            {/* 2nd place player - LEFT */}
            <div className="absolute bottom-[200px] left-[calc(50%-190px)] w-[180px] flex flex-col items-center transform -translate-x-1/2">
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-[#ffd6e0] rounded-full flex items-center justify-center p-1 shadow-lg">
                    <img
                      src={podiumUsers[1]?.avatar || "/placeholder.svg?height=80&width=80"}
                      alt={podiumUsers[1]?.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  <div className="absolute -right-2 -bottom-1 w-10 h-10 rounded-md overflow-hidden border-2 border-gray-800 shadow-lg">
                    <img
                      src={podiumUsers[1]?.flag || "/placeholder.svg?height=40&width=40"}
                      alt="Flag"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="mb-4 w-full text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <p className="text-white text-xl font-bold">{podiumUsers[1]?.name}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-2 rounded-full shadow-lg border border-red-400">
                  <p className="text-center font-bold whitespace-nowrap">
                    {podiumUsers[1]?.points.toLocaleString()} QP
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 1st place player - CENTER */}
            <div className="absolute bottom-[260px] left-1/2 w-[180px] flex flex-col items-center transform -translate-x-1/2">
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-400 rounded-md flex items-center justify-center z-30"
                    initial={{ y: -10 }}
                    animate={{ y: [-5, 0, -5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Crown className="h-8 w-8 text-yellow-900" />
                  </motion.div>

                  <div className="w-20 h-20 bg-[#d1f0e8] rounded-full flex items-center justify-center p-1 shadow-lg">
                    <img
                      src={podiumUsers[0]?.avatar || "/placeholder.svg?height=80&width=80"}
                      alt={podiumUsers[0]?.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  <div className="absolute -right-2 -bottom-1 w-10 h-10 rounded-md overflow-hidden border-2 border-gray-800 shadow-lg">
                    <img
                      src={podiumUsers[0]?.flag || "/placeholder.svg?height=40&width=40"}
                      alt="Flag"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="mb-4 w-full text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <p className="text-white text-xl font-bold">{podiumUsers[0]?.name}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-2 rounded-full shadow-lg border border-red-400">
                  <p className="text-center font-bold whitespace-nowrap">
                    {podiumUsers[0]?.points.toLocaleString()} QP
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 3rd place player - RIGHT */}
            <div className="absolute bottom-[160px] left-[calc(50%+190px)] w-[180px] flex flex-col items-center transform -translate-x-1/2">
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-[#d6e5ff] rounded-full flex items-center justify-center p-1 shadow-lg">
                    <img
                      src={podiumUsers[2]?.avatar || "/placeholder.svg?height=80&width=80"}
                      alt={podiumUsers[2]?.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  <div className="absolute -right-2 -bottom-1 w-10 h-10 rounded-md overflow-hidden border-2 border-gray-800 shadow-lg">
                    <img
                      src={podiumUsers[2]?.flag || "/placeholder.svg?height=40&width=40"}
                      alt="Flag"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="mb-4 w-full text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <p className="text-white text-xl font-bold">{podiumUsers[2]?.name}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-2 rounded-full shadow-lg border border-red-400">
                  <p className="text-center font-bold whitespace-nowrap">
                    {podiumUsers[2]?.points.toLocaleString()} QP
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodiumView






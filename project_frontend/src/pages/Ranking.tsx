"use client"

import { useState, useCallback } from "react"
import { users } from "../types/mockUsers";
import PodiumView from "../components/PodiumView";
import RankingList from "../components/RankingList";
import UserStatusCard from "../components/UserStatusCard";
import TopPlayerCard from "../components/TopPlayerCard";
import { motion } from "framer-motion"

export default function Ranking() {
  const currentUserRank = 4
  const percentile = 60

  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 6

  // Extend users with more mock data
  const extendedUsers = [
    ...users,
    {
      id: 6,
      name: "Zain Vaccaro",
      avatar: "/avatars/avatar6.png",
      flag: "/flags/flag6.png",
      points: 448,
    },
    {
      id: 7,
      name: "Skylar Geidt",
      avatar: "/avatars/avatar7.png",
      flag: "/flags/flag7.png",
      points: 448,
    },
    {
      id: 8,
      name: "Justin Bator",
      avatar: "/avatars/avatar8.png",
      flag: "/flags/flag8.png",
      points: 448,
    },
    {
      id: 9,
      name: "Cooper Lipshutz",
      avatar: "/avatars/avatar9.png",
      flag: "/flags/flag9.png",
      points: 448,
    },
    {
      id: 10,
      name: "Alfredo Septimus",
      avatar: "/avatars/avatar10.png",
      flag: "/flags/flag10.png",
      points: 448,
    },
  ]

  const sortedUsers = [...extendedUsers].sort((a, b) => b.points - a.points)
  const podiumUsers = sortedUsers.slice(0, 3)
  const restUsers = sortedUsers.slice(3)

  const totalPages = Math.ceil(restUsers.length / usersPerPage)
  const indexOfFirstUser = (currentPage - 1) * usersPerPage
  const indexOfLastUser = indexOfFirstUser + usersPerPage
  const currentUsers = restUsers.slice(indexOfFirstUser, indexOfLastUser)

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  return (
    <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden py-6">
      {/* Background circles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gray-700 opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gray-700 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gray-700 opacity-40"></div>
      </div>

      {/* Main content */}
      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ranking
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UserStatusCard rank={currentUserRank} percentile={percentile} />
            <TopPlayerCard user={podiumUsers[0]} />
          </motion.div>

          {/* Center column */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PodiumView topUsers={podiumUsers} />
          </motion.div>

          {/* Right column */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <RankingList
              users={currentUsers}
              startRank={indexOfFirstUser + 4}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}





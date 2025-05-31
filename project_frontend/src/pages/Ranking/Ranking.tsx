"use client"
import { useEffect, useState, useCallback } from "react"
import PodiumView from "./PodiumView"
import RankingList from "./RankingList"
import UserStatusCard from "./UserStatusCard"
import TopPlayerCard from "./TopPlayerCard"
import { motion } from "framer-motion"

interface User {
  id: string
  name: string
  avatar?: string
  coins: number
  position?: string
  team?: string
  rank: number
}

export default function Ranking() {
  const [userData, setUserData] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 6

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/ranking/`)
      .then((res) => res.json())
      .then((data) => {
        // Asignamos el rank manualmente basado en posición
        const ranked = data
          .sort((a: User, b: User) => b.coins - a.coins)
          .map((user: User, index: number) => ({
            ...user,
            rank: index + 1
          }))
        setUserData(ranked)
      })
      .catch((err) => console.error("Error loading ranking:", err))
  }, [])

  const podiumUsers = userData.slice(0, 3)
  const restUsers = userData.slice(3)

  const totalPages = Math.ceil(restUsers.length / usersPerPage)
  const indexOfFirstUser = (currentPage - 1) * usersPerPage
  const indexOfLastUser = indexOfFirstUser + usersPerPage
  const currentUsers = restUsers.slice(indexOfFirstUser, indexOfLastUser)

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  // Usamos directamente el usuario en la posición 3 (índice 3 = rank 4)
  const currentUser = userData[3] // simulando que el usuario actual es el #4
  const percentile = 60 // puedes calcularlo si lo deseas

  return (
    <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden py-6">
      {/* 
      Background circles
      <div className="relative w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gray-700 opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gray-700 opacity-30 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gray-700 opacity-40 pointer-events-none"></div>
      </div>
      */}

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
            {currentUser && (
              <UserStatusCard user={currentUser} percentile={percentile} />
            )}
            {podiumUsers[0] && <TopPlayerCard user={podiumUsers[0]} />}
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
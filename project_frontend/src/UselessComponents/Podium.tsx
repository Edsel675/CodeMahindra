import type React from "react"
import { Trophy } from "lucide-react"
import type { User } from "../types/user"

type PodiumProps = {
  topUsers: User[]
}

const Podium: React.FC<PodiumProps> = ({ topUsers }) => {
  const podiumHeights = ["h-[280px]", "h-[220px]", "h-[180px]"]
  const positions = [1, 2, 3]

  return (
    <div className="relative flex justify-center items-end gap-4 h-[350px] w-full">
      {/* Fondo en círculos */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-gray-700 opacity-20 z-0"></div>

      {positions.map((pos, idx) => {
        const userIndex = pos === 1 ? 0 : pos === 2 ? 1 : 2
        const user = topUsers[userIndex]
        const isFirst = pos === 1

        if (!user) return null // Protección si no hay suficientes usuarios

        return (
          <div key={user.id} className="relative z-10 flex flex-col items-center">
            {/* Avatar + bandera */}
            <div className={`absolute ${isFirst ? "bottom-[280px]" : pos === 2 ? "bottom-[220px]" : "bottom-[180px]"}`}>
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
                {isFirst && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Trophy className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </div>
                )}
                {user.flag && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full overflow-hidden border-2 border-white">
                    <img src={user.flag} alt="flag" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Bloque del podio */}
            <div
              className={`${podiumHeights[idx]} w-32 flex flex-col items-center justify-end rounded-t-lg ${
                isFirst ? "bg-red-500" : pos === 2 ? "bg-red-400" : "bg-red-400"
              }`}
            >
              <div className="text-white text-6xl font-bold mb-4">{pos}</div>
              <div className="bg-red-600 w-full py-2 px-2 flex flex-col items-center">
                <span className="text-white text-sm font-medium truncate max-w-[90%]">{user.name}</span>
                <span className="text-white text-xs">{user.coins.toLocaleString()} QP</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Podium
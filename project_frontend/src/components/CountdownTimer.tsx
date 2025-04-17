import type React from "react"

type CountdownTimerProps = {
    days: number
    hours: number
    minutes: number
  }
  
  const CountdownTimer: React.FC<CountdownTimerProps> = ({ days, hours, minutes }) => {
    const timeString = days > 0 ? `${days}d ${hours}h ${minutes}m` : hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  
    return (
      <div
        className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-2 rounded-full mb-6 flex items-center gap-2 transform transition-transform duration-300 hover:scale-105"
        style={{
          boxShadow: "0 8px 20px rgba(229, 62, 62, 0.3)",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span
          className="font-medium"
          style={{
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {timeString}
        </span>
      </div>
    )
  }
  
  export default CountdownTimer
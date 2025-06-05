import { Link } from "react-router-dom";
import { ArrowLeft, Edit, Mail, MapPin, Phone } from "lucide-react";
import { Progress } from "../components/progress";
import { Card } from "../components/card";
import profilePic from "../images/robot_male_1.svg"; // Asegúrate de tener esta imagen
import coinIcon from "../images/coin.svg";
import flag from "../images/robot_male_1.svg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import CountryName from "../pages/Home/CountryName";
import ReactCountryFlag from "react-country-flag";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { parse, format } from 'date-fns';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const formatDate = (date: Date) => date.toISOString().split("T")[0];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("current");
    interface User {
      firstName: string;
      lastName: string;
      email: string;
      nationality: string;
      experience: number;
      coins: number;
      phoneNumber: string;
      profilePicture: string;
    }

    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate()


    useEffect(() => {
      const token = localStorage.getItem("token");
      console.log("Token en localStorage:", token);

      if (!token) {
        console.error("No hay token en localStorage");
        return;
      }
    
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Usuario autenticado:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener el perfil", err.response?.data || err.message);
      });
    }, []);

    const [xpHistory, setXpHistory] = useState<{ date: string; experience: number }[]>([]);

    useEffect(() => {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;

      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/xp-history/employee/${userId}`)
        .then((res) => {
          const formatted = res.data.map((entry: any) => ({
            date: new Date(entry.date).toLocaleDateString(), // e.g., "5/30/2025"
            experience: entry.experience,
          }));
          setXpHistory(formatted);
        })
        .catch((err) => {
          console.error("Error fetching XP history", err);
        });
    }, []);

    const [ratingHistory, setRatingHistory] = useState<string[]>([]);

    useEffect(() => {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;

      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/solutions/employee/${userId}`)
        .then((res) => {
          const sortedSolutions = res.data
            .filter((sol: any) => sol.status === "Accepted")
            .sort((a: any, b: any) => new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime());

            const datesOnly = sortedSolutions.map((sol: any) =>
              new Date(sol.submissionDate).toLocaleDateString()
            );

          setRatingHistory(datesOnly);
        })
        .catch((err) => {
          console.error("Error fetching rating history", err);
        });
    }, []);

    const [difficultyData, setDifficultyData] = useState<{ Easy: number; Medium: number; Hard: number } | null>(null);

    useEffect(() => {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/employees/solved-difficulty/${userId}`)
        .then((res) => {
          setDifficultyData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching difficulty data", err);
        });
    }, []);
    const chartHeightPx = 90;
    console.log("this is the data: ", difficultyData);
    const allZero =
    difficultyData !== null &&
    Object.values(difficultyData).every((v) => v === 0);

    const dateCounts: { [key: string]: number } = {};

    ratingHistory.forEach((dateStr) => {
      const parsedDate = parse(dateStr, 'M/d/yyyy', new Date());
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');
      dateCounts[formattedDate] = (dateCounts[formattedDate] || 0) + 1;
    });

    const currentYear = new Date().getFullYear();
    
    // Extract years
  const years = useMemo(() => {
    const yearSet = new Set(
      ratingHistory.map((dateStr) => new Date(dateStr).getFullYear())
    );
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [ratingHistory]);

  const [selectedYear, setSelectedYear] = useState<number>(
    years[0] ?? new Date().getFullYear()
  );

  // Filter heatmap data for selected year
  const heatmapValues = useMemo(() => {
    const counts: Record<string, number> = {};

    ratingHistory.forEach((dateStr) => {
      const date = new Date(dateStr);
      if (date.getFullYear() === selectedYear) {
        const key = formatDate(date);
        counts[key] = (counts[key] || 0) + 1;
      }
    });

    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }, [ratingHistory, selectedYear]);
  const startDate = `${selectedYear}-01-01`;
  const endDate = `${selectedYear}-12-31`;
    
    return (
      <div className="min-h-screen bg-[#363B41] text-black">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6 flex items-center">
            <Link to="/home" className="mr-4">
              <ArrowLeft className="text-white h-6 w-6" />
            </Link>
            <h1 className="text-white 2xl font-medium">Perfil</h1>
          </div>
  
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6 mt-[120px]">
              <Card className="overflow-hidden bg-[#E6E7E8] p-6">
                  <div className="relative mt-6 w-full max-w-full mx-auto">
                    <div className="flex items-center rounded-full bg-white p-3 shadow-md">
                      <div className="mr-3 h-12 w-12 overflow-hidden rounded-full border-2 border-white">
                      <img src={user?.profilePicture ?? profilePic} alt="Profile" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                        <h2 className="text-lg font-bold text-black">{user ? `${user.firstName} ${user.lastName}` : "Cargando..."}</h2>
                          {user?.nationality ? (
                        <CountryName code={user.nationality} />
                      ) : (
                        <span>No especificado</span>
                      )}
                        </div>
                      </div>
                      <div className="flex items-center text-black">
                        <img src={coinIcon} alt="Coins" className="mr-2 h-6 w-6" />
                        <span>{user?.coins ?? 0}</span>
                      </div>
                    </div>
                </div>
  
                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-medium">Progreso</h3>
                  <Progress value={65} className="h-4 bg-gray-700" indicatorClassName="bg-red-500" />
                  <div className="mt-2 flex justify-between">
                    <span>Nivel 5</span>
                    <span>{user?.experience ?? 0} xp</span>
                  </div>
                </div>
  
                <div className="mt-6 rounded-lg bg-[#FFFF] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <button 
                      className="text-black hover:text-black"
                      onClick={() => navigate('/profile/view')}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="mr-3 h-5 w-5 text-black" />
                      <span>{user?.email ?? "Cargando..."}</span>
                    </div>
                    <div className="flex items-center text-black">
                      <Phone className="mr-3 h-5 w-5" />
                      <span>{user?.phoneNumber ?? "No proporcionado"}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-3 h-5 w-5 text-black" />
                      {user?.nationality ? (
                        <CountryName code={user.nationality} />
                      ) : (
                        <span>No especificado</span>
                      )}
                    </div>
                    </div>
                </div>
              </Card>
            </div>

          {/* Right column - Charts and stats */}
          <div className="space-y-6">
            {/* Line chart */}
            {xpHistory && xpHistory.length > 0 ? (
              <Card className="bg-[#E6E7E8] p-4">
                <div className="mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">Rating Chart</h2>
                  <p className="text-sm text-gray-600">
                    This chart shows the rating progression over time for each dimension.
                  </p>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={xpHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="experience"
                        stroke="#10B981"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            ) : (
              <Card className="bg-[#E6E7E8] p-4">
                <div className="mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">Rating Chart</h2>
                  <p className="text-sm text-gray-600">
                    This chart shows the rating progression over time for each dimension.
                  </p>
                </div>
                <div className="text-center text-gray-600 text-sm">
                  No data available to display the chart.
                </div>
              </Card>
            )}



            {/* Bar chart */}
            <Card className="bg-[#E6E7E8] p-4">
              <div className="mb-2 flex items-center">
                <h3 className="text-sm font-medium">Problem Ratings</h3>
              </div>
              <div className="relative h-[120px] w-full">
                {difficultyData && !allZero ? (
                  <div className="flex h-full w-full items-end justify-between">
                    {["Easy", "Medium", "Hard"].map((level) => {
                      const value = difficultyData[level as keyof typeof difficultyData];
                      const max = Math.max(...Object.values(difficultyData));
                      const height = max === 0 ? 0 : (value / max) * chartHeightPx;

                      const barColor =
                        level === "Easy"
                          ? "bg-green-500"
                          : level === "Medium"
                          ? "bg-yellow-500"
                          : "bg-red-500";

                      return (
                        <div
                          key={level}
                          className="flex flex-col items-center justify-end w-[30%] group relative"
                        >
                          <div
                            className={`w-full rounded-t ${barColor} cursor-default`}
                            style={{ height: `${height}px` }}
                          ></div>
                          {/* Tooltip */}
                          <div className="absolute bottom-[110%] mb-1 hidden group-hover:block px-2 py-1 text-xs text-white bg-black rounded">
                            {value} {value === 1 ? "problem" : "problems"}
                          </div>
                          <span className="mt-2 text-sm text-gray-700">{level}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-gray-600 text-sm">
                    No difficulty data available.
                  </div>
                )}
              </div>
            </Card>


            {/* Activity calendar */}
            <div className="p-4 bg-[#F9FAFB] rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Activity Calendar</h2>
        <select
          className="text-sm px-2 py-1 border border-gray-300 rounded-md"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={heatmapValues}
          classForValue={(value) => {
            if (!value || value.count === 0) return "fill-gray-200";
            if (value.count === 1) return "fill-green-200";
            if (value.count === 2) return "fill-green-400";
            return "fill-green-600";
          }}
          titleForValue={(value) =>
            value ? `${value.date}: ${value.count} submission(s)` : "No submissions"
          }
        />
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  )
}

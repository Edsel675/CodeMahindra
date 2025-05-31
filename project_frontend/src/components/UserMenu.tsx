import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown, User, Settings, LogOut } from "lucide-react"
import axios from "axios"

interface User {
  firstName: string
  lastName: string
  email: string
  nationality: string
  experience?: number
  coins?: number
  phoneNumber: string
  profilePicture?: string
}

const UserMenu = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

useEffect(() => {
      const token = localStorage.getItem("token");
      console.log("Token en localStorage:", token);
      console.log("user id: ", localStorage.getItem("user_id"));

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

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const initials = user
    ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase()
    : "US"
    
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-gray-600">
        {user?.profilePicture ? (
          <img src={user.profilePicture} alt="Foto de perfil" className="h-7 w-7 rounded-full object-cover"/>): 
          (
          <span>{initials}</span>
        )}
        </div>
        <span className="text-sm font-medium">{`${user?.firstName || "Usuario"}`}</span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="py-2 px-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">{`${user?.firstName} ${user?.lastName}`}</p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "Correo no disponible"}
            </p>
          </div>
          <div className="py-1">
            <button
              className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => {
                navigate("/profile/view")
                setOpen(false)
              }}
            >
              <User className="mr-2 h-4 w-4 text-gray-500" />
              Editar Información
            </button>
            <button
              className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => {
                navigate("/settings")
                setOpen(false)
              }}
            >
              <Settings className="mr-2 h-4 w-4 text-gray-500" />
              Ajustes
            </button>
          </div>
          <div className="py-1 border-t border-gray-100">
            <button
              className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4 text-red-500" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu

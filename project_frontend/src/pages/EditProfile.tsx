import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { ArrowLeft, User, Mail, Phone, Flag, Briefcase, Coins, Upload, Loader2, Check, X } from "lucide-react"

interface DecodedToken {
  firstName: string
  lastName: string
  sub: string
  nationality: string
  experience?: number
  coins?: number
  phoneNumber: string
  profilePicture?: string
  isAdmin?: boolean
}

export default function EditProfile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)

  const [user, setUser] = useState<DecodedToken>({
    firstName: "",
    lastName: "",
    sub: "",
    nationality: "",
    experience: 0,
    coins: 0,
    phoneNumber: "",  
    profilePicture: "",
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const decoded = jwtDecode<DecodedToken>(token)
          console.log("Decoded:", decoded);
          setUser(decoded)
        }
      } catch (error) {
        console.error("Error decoding token:", error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchUser()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } catch (error) {
      console.error("Error saving user data:", error)
      setSuccess(false)

      // Reset error message after 3 seconds
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // and get back a URL to the uploaded image
      const reader = new FileReader()
      reader.onload = () => {
        setUser((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 pb-10">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">Editar Perfil</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="h-10 w-10 text-red-500 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Cargando información del usuario...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile picture section */}
              <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1 h-fit">
                <h2 className="text-lg font-bold mb-6">Foto de Perfil</h2>
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200 mb-4">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture || "/placeholder.svg"}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-200">
                          <User className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor="profile-picture"
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                    >
                      <Upload className="h-8 w-8 text-white" />
                    </label>
                    <input
                      type="file"
                      id="profile-picture"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Haz clic en la imagen para cambiar tu foto de perfil
                  </p>
                </div>

                <div className="mt-8">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Coins className="h-5 w-5 text-yellow-500 mr-2" />
                      <h3 className="font-medium">Monedas</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{user.coins}</span>
                      <button type="button" className="text-sm text-red-500 hover:text-red-600 font-medium">
                        Ver tienda
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal information section */}
              <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">Información Personal</h2>
                  {success === true && (
                    <div className="flex items-center text-green-500 bg-green-50 px-3 py-1 rounded-full">
                      <Check className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Guardado</span>
                    </div>
                  )}
                  {success === false && (
                    <div className="flex items-center text-red-500 bg-red-50 px-3 py-1 rounded-full">
                      <X className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Error al guardar</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Apellido
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Tu apellido"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.sub || ""}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50"
                        placeholder="tu@email.com"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">El correo electrónico no se puede cambiar</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>

                  {/* Nationality */}
                  <div>
                    <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                      Nacionalidad
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Flag className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="nationality"
                        name="nationality"
                        value={user.nationality}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                      >
                        <option value="">Selecciona un país</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Chile">Chile</option>
                        <option value="Colombia">Colombia</option>
                        <option value="España">España</option>
                        <option value="Estados Unidos">Estados Unidos</option>
                        <option value="México">México</option>
                        <option value="Perú">Perú</option>
                        <option value="Venezuela">Venezuela</option>
                      </select>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Experiencia (XP)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        value={user.experience}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50"
                        placeholder="0"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">La experiencia se gana completando desafíos</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-colors flex items-center justify-center min-w-[120px]"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      "Guardar Cambios"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Progress section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-lg font-bold mb-6">Progreso</h2>
          <div className="mb-2 flex justify-between items-center">
            <span className="text-sm font-medium">
              Nivel {user.experience ? Math.floor(user.experience / 2000) + 1 : 5}
            </span>
            <span className="text-sm text-gray-500">{user.experience} XP</span>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
              style={{ width: `${user.experience ? (user.experience % 2000) / 20 : 70}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Necesitas {user.experience ? 2000 - (user.experience % 2000) : 600} XP más para subir al siguiente nivel
          </p>
        </div>
      </div>
    </div>
  )
}
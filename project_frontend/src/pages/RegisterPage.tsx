"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import logo from "../images/logo-codemahindra.png"

const countryList = [
  "Afganistán", "Alemania", "Argentina", "Australia", "Brasil", "Canadá", "Chile", "China", "Colombia", "Corea del Sur", "Cuba",
  "Dinamarca", "Ecuador", "Egipto", "El Salvador", "España", "Estados Unidos", "Francia", "Grecia", "Guatemala", "Honduras",
  "India", "Indonesia", "Irlanda", "Italia", "Japón", "México", "Nicaragua", "Noruega", "Panamá", "Paraguay", "Perú", "Polonia",
  "Portugal", "Reino Unido", "República Dominicana", "Rusia", "Suecia", "Suiza", "Tailandia", "Turquía", "Uruguay", "Venezuela", "Vietnam"
]

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [animateForm, setAnimateForm] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nationality, setNationality] = useState("")
  const [phone, setPhone] = useState("")
  const [successMessage, setSuccessMessage] = useState<string | null>(null)


  useEffect(() => {
    setAnimateForm(true)

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!canvas || !ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      canvas: HTMLCanvasElement
      ctx: CanvasRenderingContext2D

      constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas
        this.ctx = ctx
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        const colors = ["rgba(230, 57, 70, 0.2)", "rgba(42, 45, 52, 0.1)", "rgba(255, 255, 255, 0.2)"]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1
      }

      draw() {
        this.ctx.fillStyle = this.color
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        this.ctx.fill()
      }
    }

    const particles: Particle[] = []
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000))
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas, ctx))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  useEffect(() => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/\d/.test(password)) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    setPasswordStrength(password ? strength : 0)
  }, [password])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (passwordStrength < 3) {
      setError("Tu contraseña no es lo suficientemente segura")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employees/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName: name,
          nationality,
          phoneNumber: phone
          // otros opcionales si quieres: experience, team_id, etc.
        }),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        console.error("❌ Error del backend:", errorData)
        throw new Error(
          typeof errorData.detail === "string"
            ? errorData.detail
            : JSON.stringify(errorData.detail)
        )
      }
  
      const data = await response.json()
      console.log(data);
      console.log("Usuario registrado:", JSON.stringify(data, null, 2))
      setSuccessMessage("Usuario registrado exitosamente ✅")
      setTimeout(() => setSuccessMessage(null), 4000) // desaparece después de 4s

  
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al registrarte.")
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthText = () => {
    return ["", "Débil", "Moderada", "Buena", "Fuerte"][passwordStrength] || ""
  }

  const getPasswordStrengthColor = () => {
    return ["bg-gray-200", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"][passwordStrength] || "bg-gray-200"
  }

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#2A2D34] to-[#1a1c21] z-0" />
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] py-8 px-4">
        <div className={`w-full max-w-5xl transition-all duration-700 ease-out ${animateForm ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            
            {/* Left - Message */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-[#E63946] to-[#d32836] p-8 md:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden order-2 md:order-1">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full animate-float1" />
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-white opacity-5 rounded-full animate-float2" />
                <div className="absolute top-1/2 right-0 w-20 h-20 bg-white opacity-10 rounded-full animate-float3" />
              </div>
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">¡Bienvenido!</h2>
                <p className="text-white/80 mb-8 max-w-xs mx-auto">
                  ¿Ya tienes una cuenta con nosotros? Inicia sesión para continuar tu experiencia.
                </p>
                <Link to="/login" className="inline-block border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:text-[#E63946] transition-colors duration-300">
                  Iniciar sesión
                </Link>
              </div>
            </div>

            {/* Right - Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12 order-1 md:order-2">
              <div className="flex justify-center md:justify-start mb-6">
                <img src={logo} alt="CodeMahindra Logo" className="h-12 object-contain" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-[#2A2D34]">Crear cuenta</h2>
              <p className="text-gray-500 mb-6">Completa tus datos para registrarte</p>

              {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm animate-fadeIn">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
               {successMessage && (
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 text-sm animate-fadeIn">
                    {successMessage}
                  </div>
                )}

                <InputField label="Nombre completo" icon={<User />} value={name} onChange={setName} placeholder="Tu nombre" />
                <InputField label="Correo electrónico" icon={<Mail />} value={email} onChange={setEmail} placeholder="tu@correo.com" type="email" />
                <PasswordField label="Contraseña" value={password} onChange={setPassword} show={showPassword} setShow={setShowPassword} placeholder="Crea tu contraseña" />
                <PasswordField label="Confirmar contraseña" value={confirm} onChange={setConfirm} show={showConfirmPassword} setShow={setShowConfirmPassword} placeholder="Repite tu contraseña"/>
                {password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`} style={{ width: `${passwordStrength * 25}%` }} />
                      </div>
                      <span className="text-xs ml-2 min-w-[60px] text-right">{getPasswordStrengthText()}</span>
                    </div>
                  </div>
                )}
                <DropdownField label="Nacionalidad" value={nationality} onChange={setNationality} options={countryList} placeholder="Selecciona tu país"/>
                <InputField label="Teléfono" icon={<CheckCircle />} value={phone} onChange={setPhone} placeholder="+34 612 345 678" type="tel"/>


                <button
                  type="submit"
                  disabled={isLoading || successMessage !== null}
                  className={`w-full bg-[#E63946] text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-md mt-4 ${
                    (isLoading || successMessage !== null) ? "opacity-50 cursor-not-allowed" : "hover:bg-[#d32836]"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0..." />
                      </svg>
                      Registrando...
                    </span>
                  ) : (
                    <>Registrarme <ArrowRight size={18} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const InputField = ({ label, icon, value, onChange, placeholder, type = "text" }: any) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
      <input
        type={type}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] bg-[#FFF5F5]"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  </div>
)

const PasswordField = ({ label, value, onChange, show, setShow, placeholder }: any) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={show ? "text" : "password"}
        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] bg-[#FFF5F5]"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
      <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500" onClick={() => setShow(!show)}>
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  </div>
)
const DropdownField = ({ label, value, onChange, options, placeholder }: any) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] bg-[#FFF5F5]"
      required
    >
      <option value="">{placeholder}</option>
      {options.map((option: string) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
)

export default RegisterPage
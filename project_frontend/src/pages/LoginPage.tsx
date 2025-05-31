import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Eye, EyeOff, ArrowRight, Mail, Lock,} from "lucide-react"
import { Link } from "react-router-dom"
import logo from "../images/logo-codemahindra.png" // ✅ Importamos el logo
import GoogleLoginButton from "@/components/GoogleLoginButton";
import GitHubLoginButton from "@/components/GitHubLoginButton";
import { jwtDecode } from "jwt-decode";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [animateForm, setAnimateForm] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setAnimateForm(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

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
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
  
    try {
      // Realizar la solicitud al backend para autenticar al usuario
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      })
      

      if (!response.ok) {
        throw new Error("Credenciales incorrectas. Por favor, verifica tu correo y contraseña.")
      }
  
      const data = await response.json()
  
      // Guardar el token en el almacenamiento local o en un estado global
      localStorage.setItem("token", data.access_token);
      // Hacer una solicitud para obtener el perfil del usuario
      const userRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });
      console.log("this is token", data.access_token)
      if (!userRes.ok) {
        throw new Error("No se pudo obtener el perfil del usuario.");
      }

      const userData = await userRes.json();
      localStorage.setItem("user_id", userData.id); // Guardar el ID en localStorage

      
      // Redirigir a la página principal o a donde desees
      window.location.href = "/home" // Cambia esto según tu flujo de navegación
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Mi bombo")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);

    try {
      const user = jwtDecode(token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Usuario autenticado desde GitHub:", user);

      if ("github_username" in user) {
      console.log("Nombre de usuario de GitHub:", user.github_username);
      }
    } catch (error) {
      console.error("Error al decodificar token:", error);
    }

    window.location.href = "/home";
    
  }

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#2A2D34] to-[#1a1c21] z-0" />

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] py-8 px-4">
        <div className={`w-full max-w-5xl transition-all duration-700 ease-out ${animateForm ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            
            {/* Lado izquierdo - Formulario */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="flex justify-center md:justify-start mb-8">
                {/* ✅ Logo corregido con import */}
                <img src={logo} alt="CodeMahindra Logo" className="h-12 object-contain" />
              </div>

              <h2 className="text-2xl font-bold mb-2 text-[#2A2D34]">Iniciar Sesión</h2>
              <p className="text-gray-500 mb-8">Bienvenido de nuevo, ingresa tus credenciales</p>

              {/* Botones de redes sociales */}
              <div className="space-y-3">
                <GoogleLoginButton />
                <GitHubLoginButton />
              </div>

              <div className="relative flex items-center mb-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">o utiliza tu correo</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm animate-fadeIn">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] bg-[#FFF5F5]"
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <a href="#" className="text-sm text-[#E63946] hover:underline">¿Olvidaste tu contraseña?</a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] bg-[#FFF5F5]"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#E63946] border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Recordarme</label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#E63946] text-white py-3 px-4 rounded-lg hover:bg-[#d32836] transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-md"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0..." />
                      </svg>
                      Iniciando...
                    </span>
                  ) : (
                    <>Iniciar sesión <ArrowRight size={18} /></>
                  )}
                </button>
              </form>
            </div>

            {/* Lado derecho - Mensaje de bienvenida */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-[#E63946] to-[#d32836] p-8 md:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full animate-float1"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-white opacity-5 rounded-full animate-float2"></div>
                <div className="absolute top-1/2 right-0 w-20 h-20 bg-white opacity-10 rounded-full animate-float3"></div>
              </div>

              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">¡Hola, Amigo!</h2>
                <p className="text-white/80 mb-8 max-w-xs mx-auto">
                  ¿Aún no tienes una cuenta? Regístrate para acceder a todas las funciones.
                </p>
                <Link
                  to="/GoogleReg"
                  className="inline-block border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:text-[#E63946] transition-colors duration-300"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
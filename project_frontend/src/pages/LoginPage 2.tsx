"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Eye, EyeOff, ArrowRight, Mail, Lock, Github, Linkedin, Facebook } from "lucide-react"
import { Link } from "react-router-dom"
import logo from "../images/logo-codemahindra.png" // ✅ Importamos el logo

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
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Iniciando sesión con:", { email, password })
    } catch (error) {
      setError("Credenciales incorrectas. Por favor, verifica tu correo y contraseña.")
    } finally {
      setIsLoading(false)
    }
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
              <div className="grid grid-cols-4 gap-3 mb-6">
                <button className="flex justify-center items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C7.71 7.31 10.14 5.38 12 5.38z" />
                  </svg>
                </button>
                <button className="flex justify-center items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Facebook className="w-5 h-5 text-[#1877F2]" />
                </button>
                <button className="flex justify-center items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Github className="w-5 h-5" />
                </button>
                <button className="flex justify-center items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                </button>
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
                  to="/register"
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
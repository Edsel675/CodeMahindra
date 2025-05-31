import GoogleButton from "@/components/google-button"
import GitHubButton from "@/components/Github-button"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const GoogleReg: React.FC = () => {
  const [animateForm, setAnimateForm] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const navigate = useNavigate()

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
            
        return (
            <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-[-20] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2A2D34] to-[#1a1c21] z-0 pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-64px)]">

                <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] py-8 px-4"> 
                <div className={`w-full max-w-5xl transition-all duration-700 ease-out ${animateForm ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                {/* Left side with red background */}
                <div className="w-full md:w-1/2 bg-red-500 flex flex-col items-center justify-center text-white p-8 relative overflow-hidden">
                    {/* Animated background circles */}
                    <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-red-400 opacity-20 animate-float-slow"></div>
                    <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-red-400 opacity-20 animate-float-medium"></div>
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-red-400 opacity-20 animate-float-fast"></div>

                    <h1 className="text-4xl font-bold mb-6">¡Bienvenido!</h1>
                    <p className="text-center mb-8">
                    ¿Ya tienes una cuenta con nosotros? Inicia sesión para continuar tu experiencia.
                    </p>

                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-md transition-colors w-64 animate-fadeIn animation-delay-400"
                        onClick={() => navigate("/login")}
                    >
                        Iniciar sesión
                    </button>
                </div>

                {/* Right side with form */}
                <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                    <div className="mb-8 flex justify-center">
                        {/* Logo placeholder */}
                        <div className="h-10 w-10">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#E53E3E" />
                            <path d="M2 17L12 22L22 17" stroke="#E53E3E" strokeWidth="2" />
                            <path d="M2 12L12 17L22 12" stroke="#E53E3E" strokeWidth="2" />
                        </svg>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">Crear cuenta</h2>
                    <p className="text-gray-600 mb-6">Completa tus datos para registrarte</p>

                    {/* Form fields would go here */}

                    <div className="mt-6 space-y-4">
                        <button
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                            onClick={() => navigate("/register")}
                        >
                        <span>Registrarme</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            />
                        </svg>
                        </button>

                        <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-600">o</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <GoogleButton />
                        <GitHubButton />
                        </div>
                    </div>
                 </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
export default GoogleReg;


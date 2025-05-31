import type React from "react"

import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

const getImage = (name: string) =>
  new URL(`../../images/${name}`, import.meta.url).href;

// Custom hook for scroll animations
function useElementOnScreen(options: IntersectionObserverInit) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      setIsVisible(entry.isIntersecting)
    }, options)

    const currentRef = containerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [options])

  return [containerRef, isVisible] as const
}

export default function LandingPage() {
  // Refs for scroll animations
  const [sobreRef, sobreVisible] = useElementOnScreen({ threshold: 0.2 })
  const [beneficiosRef, beneficiosVisible] = useElementOnScreen({ threshold: 0.2 })
  const [funcionaRef, funcionaVisible] = useElementOnScreen({ threshold: 0.2 })
  const [caracteristicasRef, caracteristicasVisible] = useElementOnScreen({ threshold: 0.2 })

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle hash links on page load (for direct URLs with hash)
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }
  }, [])

  // Image carousel state and functions
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0)

  // Array of images for the carousel
  const carouselImages = [
      "laptop.png",
      "Laptop2.png",
      "Laptop3.png",
      "fondo.jpg"
  ]

  const goToNextImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)

    // First fade out current image
    setTimeout(() => {
      // After fade out, update the target index
      setCurrentImageIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))

      // Wait a bit before starting fade in
      setTimeout(() => {
        // Update displayed image to match target
        setDisplayedImageIndex(currentImageIndex === carouselImages.length - 1 ? 0 : currentImageIndex + 1)
        // Allow fade in
        setIsTransitioning(false)
      }, 50)
    }, 300) // This should match half the transition duration
  }

  const goToPrevImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)

    // First fade out current image
    setTimeout(() => {
      // After fade out, update the target index
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1))

      // Wait a bit before starting fade in
      setTimeout(() => {
        // Update displayed image to match target
        setDisplayedImageIndex(currentImageIndex === 0 ? carouselImages.length - 1 : currentImageIndex - 1)
        // Allow fade in
        setIsTransitioning(false)
      }, 50)
    }, 300) // This should match half the transition duration
  }

  const goToImage = (index: number) => {
    if (isTransitioning || index === currentImageIndex) return
    setIsTransitioning(true)

    // First fade out current image
    setTimeout(() => {
      // After fade out, update the target index
      setCurrentImageIndex(index)

      // Wait a bit before starting fade in
      setTimeout(() => {
        // Update displayed image to match target
        setDisplayedImageIndex(index)
        // Allow fade in
        setIsTransitioning(false)
      }, 50)
    }, 300) // This should match half the transition duration
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50 backdrop-blur bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo + Texto */}
          <Link to="/" className="flex items-center space-x-2 h-full">
            <img
              src="/logo-codemahindra.png"
              alt="Logo"
              className="h-full w-auto object-contain"
            />
            <span className="text-xl font-bold text-gray-900">
              <span className="text-gray-700">Code</span>
              <span className="text-red-600">Mahindra</span>
            </span>
          </Link>
          {/* Menú de navegación */}
          <nav className="hidden md:flex space-x-6">
            {[
              { href: "#sobre", label: "Sobre" },
              { href: "#beneficios", label: "Beneficios" },
              { href: "#como-funciona", label: "Cómo funciona" },
              { href: "#caracteristicas", label: "Características" }
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                onClick={scrollToSection(href.replace("#", ""))}
                className="text-gray-700 hover:text-red-600 transition relative group font-medium"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Botón Iniciar sesión */}
          <Link
            to="/login"
            className="ml-4 px-4 py-1.5 rounded-full text-sm font-semibold text-red-600 hover:text-white hover:bg-red-600 transition border border-red-600"
          >
            Iniciar Sesión
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* Hero Section */ }
        <section className="relative w-full h-full md:h-[80vh] text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-[url('/fondo.jpg')] bg-cover bg-center bg-fixed"
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 z-0"
            style={{
              background: `radial-gradient(
                circle at 85% center,
                rgba(0, 0, 0, 0.9) 0%,
                rgba(0, 0, 0, 0.8) 30%,
                rgba(30, 30, 30, 0.7) 60%,
                rgba(42, 42, 42, 0.6) 100%
              )`,
            }}
          />

          <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between h-full max-w-6xl mx-auto px-6">
  
            <motion.img
              src={getImage("CodeBox.png")}
              alt="Ilustración de programación"
              initial={{ y: 0 }}
              animate={{ y: -12 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
              className="max-w-xs md:max-w-sm drop-shadow-lg"
            />

            <div className="w-full h-full flex flex-col justify-center items-center text-center px-4 mt-8 md:mt-0">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                Programar nunca fue tan <span className="text-yellow-400">divertido</span>
              </h1>
              <p className="text-gray-300 text-lg mb-6 max-w-md">
                Pon a prueba tus habilidades de programación, desbloquea logros, sube de nivel y deja que la IA te ayude a dominar el código.
              </p>
              <a
                href="/login"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full transition-transform transform hover:scale-105 shadow-md shadow-red-500/60"
              >
                Únete Ahora →
              </a>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 w-full h-3 bg-red-500"
            style={{
              transform: "skewY(8deg)",
              transformOrigin: "top right",
            }}
          />
        </section>

        {/* Fill Section*/}
        <section className="relative w-full bg-white">
          <div
            className="absolute top-0 left-0 w-full h-80 bg-white z-0"
            style={{
              transform: "skewY(8deg)",
              transformOrigin: "bottom right",
            }}
          />
        </section>

        {/* About Section */}
        <div className="md:px-52 overflow-hidden">
          <section id="sobre" className="py-20 bg-white overflow-hidden" ref={sobreRef}>
            <div
              className={`container mx-auto px-4 transition-all duration-1000 transform ${sobreVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <h2 className="text-4xl md:text-2xl font-extrabold text-gray-800 text-center mb-2">
                    Sobre
                  </h2>
                  <div className="w-24 h-1 bg-red-600 mx-auto rounded mb-12" />
                  <p className="text-gray-700 max-w-lg">
                    CodeMahindra es una plataforma de gamificación impulsada por AI que ayuda a desarrolladores a mejorar
                    sus códigos, utilizar buenas prácticas y mantener un formato de código consistente.
                  </p>
                </div>
                <div className="md:w-1/2 flex md:justify-end justify-center">
                  <div className="relative w-[60%] h-auto animate-float animation-delay-300">
                    <img
                      src={getImage("gamification.png")}
                      alt="Programming illustration"
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="beneficios" className="py-20 bg-[#fff5f5] overflow-hidden" ref={beneficiosRef}>
            <div
              className={`container mx-auto px-4 transition-all duration-1000 transform ${beneficiosVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 flex justify-start mb-8 md:mb-0">
                  <div className="relative w-[60%] h-auto animate-float animation-delay-300">
                    <img
                      src={getImage("benefits.png")}
                      alt="Benefits illustration"
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-4xl md:text-2xl font-extrabold text-gray-800 text-center mb-2">
                    Beneficios
                  </h2>
                  <div className="w-24 h-1 bg-red-600 mx-auto rounded mb-12" />
                  <p className="text-gray-700 max-w-lg">
                    Mejora tu código mientras que te diviertes. El sistema de gamificación junto resultar en un beneficio
                    real en la reducción de errores, mejora de la calidad del código y optimización de recursos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How it Works Section */}
          <section id="como-funciona" className="py-20 bg-white overflow-hidden" ref={funcionaRef}>
            <div
              className={`container mx-auto px-4 transition-all duration-1000 transform ${funcionaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h2 className="text-4xl md:text-2xl font-extrabold text-gray-800 text-center mb-2">
                ¿Cómo funciona?
              </h2>
              <div className="w-24 h-1 bg-red-600 mx-auto rounded mb-12" />

              <p className="text-gray-700 max-w-3xl mx-auto text-center">
                Los desarrolladores mejoran sus habilidades resolviendo desafíos, recibiendo mentorías de IA y
                participando en competencias. Cada acción suma XP que puede canjear por recompensas exclusivas en la
                tienda.
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section
            id="caracteristicas"
            className="relative bg-[#fff5f5] overflow-hidden py-20"
            ref={caracteristicasRef}
          >
            <div
              className={`container mx-auto px-6 transition-all duration-1000 transform ${
                caracteristicasVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-4xl md:text-2xl font-extrabold text-gray-800 text-center mb-2">
                Características
              </h2>
              <div className="w-24 h-1 bg-red-600 mx-auto rounded mb-12" />

              {/* Laptop + Carrusel */}
              <div className="flex flex-col md:flex-row items-start gap-12 justify-center">
                <div className="w-full md:w-[60%] relative">
                  {/* Laptop Fija */}
                  <div className="w-full relative">
                    <img
                      src={getImage("laptop.png")}
                      alt="Laptop"
                      className="w-full h-auto z-10 relative pointer-events-none drop-shadow-xl"
                    />

                    {/* Carrusel dentro de la pantalla */}
                    <div className="absolute top-[5.5%] left-[11%] w-[78%] h-[60%] z-0 overflow-hidden rounded-md shadow-inner">
                      <img
                        src={getImage(carouselImages[displayedImageIndex])}
                        alt={`Pantalla ${displayedImageIndex + 1}`}
                        className={`w-full h-full object-cover transition-opacity duration-700 ${
                          isTransitioning ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Controles del carrusel */}
                  <div className="flex items-center justify-center mt-3 gap-2">
                    <button
                      onClick={goToPrevImage}
                      aria-label="Anterior"
                      className="p-1.5 rounded-full border border-gray-400 hover:bg-gray-200 transition hover:scale-105 bg-white"
                    >
                      <ChevronLeft className="h-4 w-4 text-gray-700" />
                    </button>

                    <div className="flex gap-1">
                      {carouselImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            index === currentImageIndex ? "bg-red-600 scale-125" : "bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={goToNextImage}
                      aria-label="Siguiente"
                      className="p-1.5 rounded-full border border-gray-400 hover:bg-gray-200 transition hover:scale-105 bg-white"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Lista de características */}
                <div className="md:w-[40%] w-full md:pl-8 mt-10 md:mt-0">
                  <ul className="space-y-4 text-gray-700 text-lg">
                    {[
                      "Plataforma Gamificada",
                      "Desafíos de Programación",
                      "Rankings y Leaderboard",
                      "Análisis Técnico",
                      "Tienda de Recompensas",
                      "Rangos de Desarrollador",
                      "Perfiles de Usuarios Personalizados",
                      "Colección de Insignias",
                      "Recursos con IA",
                      "Plataforma Multiplataforma",
                    ].map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start transform transition-all duration-300 hover:translate-x-1"
                      >
                        <span className="mt-1 mr-3 w-3 h-3 bg-red-600 rounded-full shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer CTA */}
      <footer className="bg-[#1a1a1a] text-white py-16 relative overflow-hidden">

        <div className="absolute top-0 left-0 w-full h-2 bg-red-500 shadow-[0_4px_0_rgba(255,255,255,0.1)]" />

        <div className="container mx-auto px-6 text-center z-10 relative">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 max-w-2xl mx-auto leading-relaxed">
            ¿Listo para el reto? <span className="text-yellow-400">Únete ahora</span> y empieza a mejorar tu código mientras te diviertes.
          </h3>

          <a
            href="/login"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full transition-transform transform hover:scale-105 shadow-md shadow-red-500/60"
          >
            Únete Ahora →
          </a>
        </div>
      </footer>
    </div>
  )
}
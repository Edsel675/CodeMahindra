"use client"

import type React from "react"

import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const getImage = (name: string) =>
  new URL(`../images/${name}`, import.meta.url).href;

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
      "Laptop.png",
      "Laptop2.png",
      "Laptop3.png",
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
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-red-600 hover:scale-105 transition-transform">
              CodeMahindra
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#sobre"
              onClick={scrollToSection("sobre")}
              className="text-gray-700 hover:text-red-600 cursor-pointer relative group"
            >
              Sobre
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#beneficios"
              onClick={scrollToSection("beneficios")}
              className="text-gray-700 hover:text-red-600 cursor-pointer relative group"
            >
              Beneficios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#como-funciona"
              onClick={scrollToSection("como-funciona")}
              className="text-gray-700 hover:text-red-600 cursor-pointer relative group"
            >
              Cómo Funciona
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#caracteristicas"
              onClick={scrollToSection("caracteristicas")}
              className="text-gray-700 hover:text-red-600 cursor-pointer relative group"
            >
              Características
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Link to="/login" className="text-red-600 font-medium hover:text-red-700 relative group">
              Iniciar Sesión
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#2d2d2d] text-white py-16 overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 animate-fadeIn">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-slideInLeft">
                Programar nunca fue tan divertido
              </h1>
              <p className="text-gray-300 mb-8 max-w-lg animate-slideInLeft animation-delay-200">
                Por lo simple, lo divertido y lo impresionante que puede llegar a ser. Atrévete a aprender el código.
              </p>
              <Link
                to="/login"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-full inline-block transition-all duration-300 hover:scale-105 animate-slideInLeft animation-delay-400"
              >
                SABER MÁS
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center animate-fadeIn animation-delay-500">
              <div className="relative w-64 h-64 animate-float">
                <img
                  src={getImage("CodeBox.png")}
                  alt="Code editor illustration"
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-16 bg-white overflow-hidden" ref={sobreRef}>
          <div
            className={`container mx-auto px-4 transition-all duration-1000 transform ${sobreVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  Sobre
                  <span className="ml-2 inline-block w-16 h-0.5 bg-red-600"></span>
                </h2>
                <p className="text-gray-700 max-w-lg">
                  CodeMahindra es una plataforma de gamificación impulsada por AI que ayuda a desarrolladores a mejorar
                  sus códigos, utilizar buenas prácticas y mantener un formato de código consistente.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-64 h-64 animate-float animation-delay-300">
                  <img
                    src={getImage("robot_male_1.svg")}
                    alt="Programming illustration"
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="py-16 bg-gray-50 overflow-hidden" ref={beneficiosRef}>
          <div
            className={`container mx-auto px-4 transition-all duration-1000 transform ${beneficiosVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                <div className="relative w-64 h-64 animate-float animation-delay-300">
                  <img
                    src={getImage("exito.png")}
                    alt="Benefits illustration"
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  Beneficios
                  <span className="ml-2 inline-block w-16 h-0.5 bg-red-600"></span>
                </h2>
                <p className="text-gray-700 max-w-lg">
                  Mejora tu código mientras que te diviertes. El sistema de gamificación junto resultar en un beneficio
                  real en la reducción de errores, mejora de la calidad del código y optimización de recursos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="como-funciona" className="py-16 bg-white overflow-hidden" ref={funcionaRef}>
          <div
            className={`container mx-auto px-4 transition-all duration-1000 transform ${funcionaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              ¿Cómo Funciona?
              <span className="ml-2 inline-block w-16 h-0.5 bg-red-600"></span>
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-center mb-8">
              Los desarrolladores mejoran sus habilidades resolviendo desafíos, recibiendo mentorías de IA y
              participando en competencias. Cada acción suma XP que puede canjear por recompensas exclusivas en la
              tienda.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="caracteristicas" className="py-16 bg-gray-50 overflow-hidden" ref={caracteristicasRef}>
          <div
            className={`container mx-auto px-4 transition-all duration-1000 transform ${caracteristicasVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              Características
              <span className="ml-2 inline-block w-16 h-0.5 bg-red-600"></span>
            </h2>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={getImage(carouselImages[displayedImageIndex] || "/placeholder.svg")}
                    alt={`Platform screenshot ${displayedImageIndex + 1}`}
                    className={`object-contain w-full h-full transition-opacity duration-600 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
                  />
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  <button
                    className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors hover:scale-110 active:scale-95 transform duration-200"
                    onClick={goToPrevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-500" />
                  </button>
                  <div className="flex space-x-1">
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-red-600 scale-125" : "bg-gray-300"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors hover:scale-110 active:scale-95 transform duration-200"
                    onClick={goToNextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <ul className="space-y-2 text-gray-600">
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
                      className="flex items-center transform transition-all duration-300 hover:translate-x-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer CTA */}
      <footer className="bg-[#2d2d2d] text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-medium mb-6 animate-pulse">
            ¿Listo para el reto? Únete ahora y empieza a mejorar tu código mientras te diviertes.
          </h3>
          <Link
            to="/login"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-full inline-block transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            SABER MÁS
          </Link>
        </div>
      </footer>
    </div>
  )
}
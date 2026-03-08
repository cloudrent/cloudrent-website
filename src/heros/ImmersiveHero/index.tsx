'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Search,
  Bell,
  User,
  Package,
  Calendar,
  Users,
  FileText,
  Truck,
  Wrench,
  BarChart3,
  Settings,
  TrendingUp,
  CheckCircle,
  DollarSign,
  Clock,
  Zap,
  Play,
  Pause,
  MapPin,
  PenTool,
  Smartphone,
  Monitor,
  Globe,
  Home,
  ShoppingCart,
  CreditCard,
  Download,
  ChevronRight,
  RotateCcw,
} from 'lucide-react'

// Animation phases
type Phase = 'particles' | 'morphing' | 'dashboard' | 'features' | 'devices' | 'connections' | 'cta'

// Particle for abstract visualization
interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  shape: 'diamond' | 'hexagon' | 'square'
  rotation: number
  rotationSpeed: number
}

export const ImmersiveHero: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('particles')
  const [featureIndex, setFeatureIndex] = useState(-1)
  const [deviceIndex, setDeviceIndex] = useState(-1)
  const [showCTA, setShowCTA] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [signatureProgress, setSignatureProgress] = useState(0)
  const [connectionProgress, setConnectionProgress] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const [dashboardOpacity, setDashboardOpacity] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // Replay function
  const replayAnimation = () => {
    setPhase('particles')
    setFeatureIndex(-1)
    setDeviceIndex(-1)
    setShowCTA(false)
    setTimerSeconds(0)
    setSignatureProgress(0)
    setConnectionProgress(0)
    setDashboardOpacity(0)
    setAnimationKey(prev => prev + 1)
  }

  // Initialize on client only
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Particle colors matching brand - primarily purple for high-tech look
  const particleColors = [
    'rgba(136, 27, 169, 0.9)',
    'rgba(136, 27, 169, 0.7)',
    'rgba(136, 27, 169, 0.5)',
    'rgba(147, 51, 234, 0.6)',
  ]

  const particleShapes: Array<'diamond' | 'hexagon' | 'square'> = ['diamond', 'hexagon', 'square']

  // Initialize particles with technical shapes
  const initParticles = useCallback(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const particles: Particle[] = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 6 + 3,
        opacity: Math.random() * 0.4 + 0.2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        shape: particleShapes[Math.floor(Math.random() * particleShapes.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }
    particlesRef.current = particles
  }, [])

  // Draw technical shapes
  const drawShape = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation)
    ctx.fillStyle = p.color
    ctx.strokeStyle = p.color.replace(/[\d.]+\)$/, '1)')
    ctx.lineWidth = 0.5

    if (p.shape === 'diamond') {
      ctx.beginPath()
      ctx.moveTo(0, -p.size)
      ctx.lineTo(p.size * 0.7, 0)
      ctx.lineTo(0, p.size)
      ctx.lineTo(-p.size * 0.7, 0)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    } else if (p.shape === 'hexagon') {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const x = Math.cos(angle) * p.size
        const y = Math.sin(angle) * p.size
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    } else {
      // Square
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
      ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size)
    }

    ctx.restore()
  }

  // Animate particles with technical shapes
  const animateParticles = useCallback(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw circuit-like connection lines
    particlesRef.current.forEach((p1, i) => {
      particlesRef.current.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 180) {
          const alpha = 0.2 * (1 - dist / 180)
          ctx.beginPath()
          ctx.strokeStyle = `rgba(136, 27, 169, ${alpha})`
          ctx.lineWidth = 1
          // Draw angular connection (circuit-like)
          const midX = (p1.x + p2.x) / 2
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(midX, p1.y)
          ctx.lineTo(midX, p2.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()

          // Draw small node at connection point
          if (dist < 100) {
            ctx.beginPath()
            ctx.fillStyle = `rgba(136, 27, 169, ${alpha * 2})`
            ctx.arc(midX, (p1.y + p2.y) / 2, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      })
    })

    // Draw and update particles
    particlesRef.current.forEach(p => {
      drawShape(ctx, p)

      // Update position
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.rotationSpeed

      // Bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1
    })

    if (phase === 'particles' || phase === 'morphing') {
      animationFrameRef.current = requestAnimationFrame(animateParticles)
    }
  }, [phase])

  // Handle canvas resize and reinitialize on replay
  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
        initParticles()
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [initParticles, isClient, animationKey])

  // Start particle animation
  useEffect(() => {
    if (!isClient) return

    if (phase === 'particles') {
      animateParticles()
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [phase, animateParticles, isClient, animationKey])

  // Timer animation for driver app
  useEffect(() => {
    if (!isClient) return
    if (phase === 'devices' && deviceIndex >= 1) {
      const interval = setInterval(() => {
        setTimerSeconds(prev => (prev + 1) % 60)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [phase, deviceIndex, isClient])

  // Signature animation
  useEffect(() => {
    if (!isClient) return
    if (phase === 'devices' && deviceIndex >= 2) {
      const interval = setInterval(() => {
        setSignatureProgress(prev => Math.min(prev + 2, 100))
      }, 50)
      return () => clearInterval(interval)
    }
  }, [phase, deviceIndex, isClient])

  // Connection flow animation - slowed down for better effect
  useEffect(() => {
    if (!isClient) return
    if (phase === 'connections') {
      const interval = setInterval(() => {
        setConnectionProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [phase, isClient])

  // Phase progression - depends on animationKey to allow replay
  useEffect(() => {
    if (!isClient) return

    const timers: NodeJS.Timeout[] = []

    // Phase 1 -> 2: Particles to morphing (2.5s)
    timers.push(setTimeout(() => {
      setPhase('morphing')
      setDashboardOpacity(0.3)
    }, 2500))

    // Phase 2 -> 3: Morphing to dashboard (4s)
    timers.push(setTimeout(() => {
      setPhase('dashboard')
      setDashboardOpacity(1)
    }, 4000))

    // Phase 3 -> 4: Dashboard to features (5s)
    timers.push(setTimeout(() => {
      setPhase('features')
      setFeatureIndex(0)
    }, 5000))

    // Feature badge animations - one every 600ms for 8 badges
    const featureDelays = [5600, 6200, 6800, 7400, 8000, 8600, 9200, 9800]
    featureDelays.forEach((delay, idx) => {
      timers.push(setTimeout(() => {
        setFeatureIndex(idx + 1)
      }, delay))
    })

    // Phase 4 -> 5: Features to devices (11s - after all badges shown)
    timers.push(setTimeout(() => {
      setPhase('devices')
      setDeviceIndex(0)
    }, 11000))

    // Device animations
    timers.push(setTimeout(() => setDeviceIndex(1), 12500))  // Mobile Admin
    timers.push(setTimeout(() => setDeviceIndex(2), 14500))  // Driver App
    timers.push(setTimeout(() => setDeviceIndex(3), 16500))  // Customer Portal

    // Phase 5 -> 6: Devices to connections (18s - show circular gauge)
    timers.push(setTimeout(() => {
      setPhase('connections')
      setConnectionProgress(0)
    }, 18000))

    // Phase 6 -> 7: Connections to CTA (26s - after slower animation completes)
    timers.push(setTimeout(() => {
      setPhase('cta')
      setShowCTA(true)
    }, 26000))

    return () => timers.forEach(clearTimeout)
  }, [isClient, animationKey])

  if (!isClient) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a1a] -mt-[100px] pt-[100px]">
        {/* Extended background that goes behind header */}
        <div className="absolute -top-[100px] left-0 right-0 h-[200px] bg-[#0a0a1a] z-0" />
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
      </section>
    )
  }

  return (
    <section key={animationKey} className="relative min-h-screen w-full overflow-hidden bg-transparent -mt-[100px] pt-[100px]">
      {/* Extended background that goes behind header */}
      <div className="absolute -top-[100px] left-0 right-0 h-[200px] bg-transparent z-0" />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />

      {/* Technical background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Hexagon grid - top left */}
        <svg className="absolute top-[10%] left-[5%] w-64 h-64 opacity-20 animate-pulse" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="hexGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#881ba9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#881ba9" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="url(#hexGrad1)" strokeWidth="0.5" />
          <polygon points="50,15 80,30 80,70 50,85 20,70 20,30" fill="none" stroke="#881ba9" strokeWidth="0.3" opacity="0.6" />
          <polygon points="50,25 70,35 70,65 50,75 30,65 30,35" fill="none" stroke="#881ba9" strokeWidth="0.3" opacity="0.4" />
          <circle cx="50" cy="5" r="2" fill="#881ba9" />
          <circle cx="90" cy="25" r="2" fill="#881ba9" />
          <circle cx="90" cy="75" r="2" fill="#881ba9" />
          <circle cx="50" cy="95" r="2" fill="#881ba9" />
          <circle cx="10" cy="75" r="2" fill="#881ba9" />
          <circle cx="10" cy="25" r="2" fill="#881ba9" />
        </svg>

        {/* Circuit pattern - top right */}
        <svg className="absolute top-[15%] right-[10%] w-80 h-80 opacity-15" viewBox="0 0 100 100" style={{ animationDelay: '0.5s' }}>
          <defs>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#881ba9" stopOpacity="1" />
              <stop offset="100%" stopColor="#881ba9" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Horizontal lines */}
          <line x1="0" y1="20" x2="40" y2="20" stroke="#881ba9" strokeWidth="0.5" className="animate-pulse" />
          <line x1="60" y1="20" x2="100" y2="20" stroke="#881ba9" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
          <line x1="0" y1="50" x2="30" y2="50" stroke="#881ba9" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
          <line x1="70" y1="50" x2="100" y2="50" stroke="#881ba9" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
          <line x1="0" y1="80" x2="45" y2="80" stroke="#881ba9" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
          <line x1="55" y1="80" x2="100" y2="80" stroke="#881ba9" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Vertical connectors */}
          <line x1="40" y1="20" x2="40" y2="50" stroke="#881ba9" strokeWidth="0.5" />
          <line x1="60" y1="20" x2="60" y2="80" stroke="#881ba9" strokeWidth="0.5" />
          <line x1="30" y1="50" x2="30" y2="80" stroke="#881ba9" strokeWidth="0.5" />
          {/* Nodes */}
          <circle cx="40" cy="20" r="3" fill="#881ba9" className="animate-pulse" />
          <circle cx="60" cy="20" r="3" fill="#881ba9" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
          <circle cx="30" cy="50" r="3" fill="#881ba9" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
          <circle cx="70" cy="50" r="3" fill="#881ba9" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
          <circle cx="45" cy="80" r="3" fill="#881ba9" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
          <circle cx="55" cy="80" r="3" fill="#881ba9" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          {/* Center diamond */}
          <polygon points="50,35 65,50 50,65 35,50" fill="none" stroke="url(#circuitGrad)" strokeWidth="1" />
          <circle cx="50" cy="50" r="4" fill="#881ba9" opacity="0.8" />
        </svg>

        {/* Angular tech shape - bottom left */}
        <svg className="absolute bottom-[20%] left-[8%] w-72 h-72 opacity-15 animate-pulse" viewBox="0 0 100 100" style={{ animationDelay: '1.5s' }}>
          <defs>
            <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#881ba9" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#881ba9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#881ba9" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Outer angular frame */}
          <path d="M10,30 L30,10 L70,10 L90,30 L90,70 L70,90 L30,90 L10,70 Z" fill="none" stroke="url(#techGrad)" strokeWidth="0.5" />
          <path d="M20,35 L35,20 L65,20 L80,35 L80,65 L65,80 L35,80 L20,65 Z" fill="none" stroke="#881ba9" strokeWidth="0.3" opacity="0.5" />
          {/* Inner cross */}
          <line x1="50" y1="20" x2="50" y2="80" stroke="#881ba9" strokeWidth="0.3" opacity="0.4" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="#881ba9" strokeWidth="0.3" opacity="0.4" />
          {/* Corner accents */}
          <circle cx="30" cy="10" r="2" fill="#881ba9" />
          <circle cx="70" cy="10" r="2" fill="#881ba9" />
          <circle cx="90" cy="30" r="2" fill="#881ba9" />
          <circle cx="90" cy="70" r="2" fill="#881ba9" />
          <circle cx="70" cy="90" r="2" fill="#881ba9" />
          <circle cx="30" cy="90" r="2" fill="#881ba9" />
          <circle cx="10" cy="70" r="2" fill="#881ba9" />
          <circle cx="10" cy="30" r="2" fill="#881ba9" />
        </svg>

        {/* Data flow lines - bottom right */}
        <svg className="absolute bottom-[15%] right-[5%] w-96 h-64 opacity-10" viewBox="0 0 150 100">
          {/* Flowing data paths */}
          <path d="M0,50 Q30,30 60,50 T120,50 T150,40" fill="none" stroke="#881ba9" strokeWidth="1" strokeDasharray="4,4" className="animate-pulse" />
          <path d="M0,60 Q40,80 80,60 T150,70" fill="none" stroke="#881ba9" strokeWidth="0.5" strokeDasharray="2,2" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <path d="M0,40 Q25,20 50,40 T100,35 T150,30" fill="none" stroke="#881ba9" strokeWidth="0.5" strokeDasharray="3,3" className="animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Data nodes */}
          <circle cx="60" cy="50" r="3" fill="#881ba9" className="animate-pulse" />
          <circle cx="120" cy="50" r="2" fill="#881ba9" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
          <circle cx="80" cy="60" r="2" fill="#881ba9" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
          <circle cx="100" cy="35" r="2" fill="#881ba9" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
        </svg>

        {/* Subtle glow behind shapes */}
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#881ba9]/10 blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-[#881ba9]/8 blur-3xl" />
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === 'particles' ? 'opacity-100' :
          phase === 'morphing' ? 'opacity-60' : 'opacity-0'
        }`}
      />

      {/* Main Content Container */}
      <div
        className={`absolute inset-x-0 top-[100px] bottom-0 flex items-center justify-center transition-all duration-1000 ${
          phase === 'particles' ? 'opacity-0 scale-95' : ''
        }`}
        style={{ opacity: dashboardOpacity }}
      >
        {/* Desktop Dashboard - Left/Center */}
        <div className={`absolute transition-all duration-1000 ${
          phase === 'devices' || phase === 'connections' || phase === 'cta' ? 'left-[5%] top-[10%] scale-[0.65]' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        } ${phase === 'connections' || phase === 'cta' ? 'opacity-30' : ''}`}>
          <div className="relative w-[900px] max-w-[90vw]">
            {/* Browser chrome */}
            <div className="bg-gray-900 rounded-t-xl border border-gray-700/50 p-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 bg-gray-800 rounded-md px-4 py-1.5 text-gray-400 text-sm ml-4 flex items-center gap-2">
                <Monitor size={14} />
                app.cloudrent.me/dashboard
              </div>
            </div>

            {/* Dashboard content */}
            <div className="bg-gray-100 rounded-b-xl overflow-hidden shadow-2xl shadow-purple-900/30 border border-gray-700/50 border-t-0">
              <div className="flex">
                {/* Sidebar */}
                <div className="w-14 bg-gray-800 py-4 flex flex-col items-center gap-2">
                  <div className="w-9 h-9 bg-brand-purple rounded-lg flex items-center justify-center mb-3">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  {[Calendar, Users, Package, FileText, Truck, Wrench, BarChart3].map((Icon, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        i === 0 ? 'bg-brand-purple/20 text-brand-purple' : 'text-gray-500'
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="bg-brand-purple h-12 flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 rounded-lg px-3 py-1 flex items-center gap-2 w-40">
                        <Search size={14} className="text-white/50" />
                        <span className="text-white/50 text-xs">Search...</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bell size={16} className="text-white/80" />
                      <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                        <User size={12} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Dashboard grid */}
                  <div className="p-3 space-y-3">
                    {/* Action cards */}
                    <div className="grid grid-cols-6 gap-2">
                      {[
                        { label: 'Overdue', value: '3', color: 'bg-red-600', icon: Clock },
                        { label: 'Service', value: '7', color: 'bg-blue-600', icon: Wrench },
                        { label: 'Billing', value: '12', color: 'bg-brand-purple', icon: DollarSign },
                        { label: 'Pickups', value: '5', color: 'bg-green-600', icon: CheckCircle },
                        { label: 'Deliveries', value: '8', color: 'bg-orange-500', icon: Truck },
                        { label: 'Maintenance', value: '2', color: 'bg-amber-600', icon: Wrench },
                      ].map((card, i) => (
                        <div
                          key={i}
                          className={`${card.color} rounded-lg p-2 text-white transform transition-all duration-500 ${
                            featureIndex >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                          }`}
                          style={{ transitionDelay: `${i * 80}ms` }}
                        >
                          <card.icon size={12} className="mb-1 opacity-80" />
                          <div className="text-lg font-bold">{card.value}</div>
                          <div className="text-[10px] opacity-80">{card.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Stats + Chart row */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2 grid grid-cols-4 gap-2">
                        {[
                          { label: 'Active Rentals', value: '47', color: 'text-brand-purple' },
                          { label: 'Revenue', value: '$124K', color: 'text-green-600' },
                          { label: 'Equipment', value: '234', color: 'text-blue-600' },
                          { label: 'Customers', value: '189', color: 'text-blue-600' },
                        ].map((stat, i) => (
                          <div
                            key={i}
                            className={`bg-white rounded-lg p-2 border border-gray-100 shadow-sm transition-all duration-500 ${
                              featureIndex >= 1 ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{ transitionDelay: `${i * 80 + 200}ms` }}
                          >
                            <div className="text-[9px] text-gray-500">{stat.label}</div>
                            <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
                            <div className="flex items-center gap-0.5 text-[8px] text-green-600">
                              <TrendingUp size={8} />+12%
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Mini chart */}
                      <div
                        className={`bg-white rounded-lg p-2 border border-gray-100 shadow-sm transition-all duration-500 ${
                          featureIndex >= 2 ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <div className="text-[9px] font-medium text-gray-800 mb-1">Revenue</div>
                        <div className="h-12 flex items-end justify-between gap-1">
                          {[65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-brand-purple to-purple-400 rounded-t transition-all duration-500"
                              style={{
                                height: `${height}%`,
                                transitionDelay: `${i * 60}ms`,
                                opacity: featureIndex >= 2 ? 1 : 0,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Recent rentals */}
                    <div
                      className={`bg-white rounded-lg p-2 border border-gray-100 shadow-sm transition-all duration-500 ${
                        featureIndex >= 3 ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="text-[10px] font-semibold text-gray-800 mb-2">Recent Rentals</div>
                      <div className="space-y-1">
                        {[
                          { customer: 'ABC Construction', items: '3 items' },
                          { customer: 'Smith Builders', items: '5 items' },
                        ].map((rental, i) => (
                          <div key={i} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                            <div>
                              <div className="text-[10px] font-medium text-gray-800">{rental.customer}</div>
                              <div className="text-[8px] text-gray-500">{rental.items}</div>
                            </div>
                            <div className="flex gap-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform label */}
            <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-all duration-500 ${
              phase === 'devices' ? 'opacity-100' : 'opacity-0'
            }`}>
              <Monitor size={16} className="text-brand-purple" />
              <span className="text-white text-sm font-medium">Web Dashboard</span>
            </div>

            {/* Feature highlight badges - RIGHT SIDE */}
            <div className={`absolute -right-64 top-12 space-y-3 transition-all duration-500 ${
              phase === 'features' ? 'opacity-100' : phase === 'devices' ? 'opacity-0' : 'opacity-0'
            }`}>
              {[
                { icon: Package, label: 'Real-time Availability', desc: 'Live stock updates', color: '#41AB01' },
                { icon: FileText, label: 'One-click Invoicing', desc: 'Generate in seconds', color: '#165DCF' },
                { icon: DollarSign, label: 'Payment Tracking', desc: 'Stripe & bank transfers', color: '#41AB01' },
                { icon: PenTool, label: 'Digital Signatures', desc: 'Legally compliant', color: '#881BA9' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 bg-gray-900/90 backdrop-blur-sm rounded-xl pl-3 pr-5 py-3 border border-gray-700/50 transform transition-all duration-500 ${
                    featureIndex >= i + 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon size={20} style={{ color: feature.color }} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{feature.label}</div>
                    <div className="text-gray-400 text-xs">{feature.desc}</div>
                  </div>
                  <CheckCircle size={16} className="text-green-500 ml-2" />
                </div>
              ))}
            </div>

            {/* Feature highlight badges - LEFT SIDE */}
            <div className={`absolute -left-64 top-12 space-y-3 transition-all duration-500 ${
              phase === 'features' ? 'opacity-100' : phase === 'devices' ? 'opacity-0' : 'opacity-0'
            }`}>
              {[
                { icon: BarChart3, label: 'Xero Integration', desc: 'Two-way sync', color: '#13B5EA' },
                { icon: Zap, label: 'AI-Powered Support', desc: '24/7 assistance', color: '#881BA9' },
                { icon: Smartphone, label: 'Offline Mobile', desc: 'Works anywhere', color: '#F97316' },
                { icon: Bell, label: 'Smart Notifications', desc: 'Never miss a beat', color: '#B91421' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 bg-gray-900/90 backdrop-blur-sm rounded-xl pl-3 pr-5 py-3 border border-gray-700/50 transform transition-all duration-500 ${
                    featureIndex >= i + 5 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon size={20} style={{ color: feature.color }} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{feature.label}</div>
                    <div className="text-gray-400 text-xs">{feature.desc}</div>
                  </div>
                  <CheckCircle size={16} className="text-green-500 ml-2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Admin App */}
        <div className={`absolute transition-all duration-700 ${
          deviceIndex >= 1 ? 'translate-y-0' : 'translate-y-12'
        } ${phase === 'connections' || phase === 'cta' ? 'opacity-30' : deviceIndex >= 1 ? 'opacity-100' : 'opacity-0'}`} style={{ right: 'calc(15% + 200px)', top: '8%' }}>
          <div className="relative">
            {/* Phone frame */}
            <div className="w-[180px] bg-gray-900 rounded-[28px] p-2 shadow-2xl shadow-purple-900/40 border border-gray-700">
              {/* Screen */}
              <div className="bg-white rounded-[20px] overflow-hidden">
                {/* Status bar */}
                <div className="bg-brand-purple px-3 py-1.5 flex justify-between items-center">
                  <span className="text-white text-[8px]">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-1.5 bg-white/60 rounded-sm" />
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                  </div>
                </div>

                {/* App header */}
                <div className="bg-brand-purple px-3 py-2">
                  <div className="text-white text-[10px] font-medium">Hi Sarah! 👋</div>
                  <div className="text-white/70 text-[8px]">Here&apos;s what&apos;s on today</div>
                </div>

                {/* Stats grid */}
                <div className="p-2 grid grid-cols-2 gap-1.5">
                  {[
                    { value: '3', label: 'Overdue', color: 'bg-red-500' },
                    { value: '7', label: 'Services', color: 'bg-blue-500' },
                    { value: '5', label: 'Pickups', color: 'bg-green-500' },
                    { value: '8', label: 'Deliveries', color: 'bg-orange-500' },
                  ].map((stat, i) => (
                    <div key={i} className={`${stat.color} rounded-lg p-2 text-white text-center`}>
                      <div className="text-lg font-bold">{stat.value}</div>
                      <div className="text-[7px] opacity-80">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Revenue chart */}
                <div className="px-2 pb-2">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-[8px] text-gray-600 mb-1">Today&apos;s Revenue</div>
                    <div className="text-sm font-bold text-brand-purple">$4,280</div>
                    <div className="h-8 flex items-end justify-between gap-0.5 mt-1">
                      {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
                        <div key={i} className="flex-1 bg-brand-purple/60 rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="bg-white border-t border-gray-100 px-2 py-1.5 flex justify-around">
                  {[Home, Calendar, Package, Settings].map((Icon, i) => (
                    <div key={i} className={`p-1.5 rounded-lg ${i === 0 ? 'bg-brand-purple/10' : ''}`}>
                      <Icon size={14} className={i === 0 ? 'text-brand-purple' : 'text-gray-400'} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap">
              <Smartphone size={14} className="text-blue-400" />
              <span className="text-white text-xs font-medium">Mobile Admin</span>
            </div>
          </div>
        </div>

        {/* Driver App */}
        <div className={`absolute transition-all duration-700 ${
          deviceIndex >= 2 ? 'translate-y-0' : 'translate-y-12'
        } ${phase === 'connections' || phase === 'cta' ? 'opacity-30' : deviceIndex >= 2 ? 'opacity-100' : 'opacity-0'}`} style={{ right: '5%', top: '35%' }}>
          <div className="relative">
            {/* Phone frame */}
            <div className="w-[170px] bg-gray-900 rounded-[28px] p-2 shadow-2xl shadow-blue-900/40 border border-gray-700">
              {/* Screen */}
              <div className="bg-white rounded-[20px] overflow-hidden">
                {/* Status bar */}
                <div className="bg-gray-900 px-3 py-1.5 flex justify-between items-center">
                  <span className="text-white text-[8px]">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-1.5 bg-white/60 rounded-sm" />
                  </div>
                </div>

                {/* Service Job Header */}
                <div className="bg-orange-500 px-3 py-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Truck size={10} className="text-white" />
                    <span className="text-white text-[9px] font-medium">DELIVERY IN PROGRESS</span>
                  </div>
                  <div className="text-white text-[11px] font-bold">ABC Construction</div>
                  <div className="text-white/80 text-[8px] flex items-center gap-1">
                    <MapPin size={8} />
                    123 Builder St, Sydney
                  </div>
                </div>

                {/* Timer */}
                <div className="p-3 text-center bg-gray-50">
                  <div className="text-[8px] text-gray-500 mb-1">TIME ON JOB</div>
                  <div className="text-2xl font-bold text-gray-900 font-mono">
                    00:{timerSeconds.toString().padStart(2, '0')}:47
                  </div>
                  <div className="flex justify-center gap-2 mt-2">
                    <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-[8px] flex items-center gap-1">
                      <Pause size={8} /> Pause
                    </button>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-full text-[8px] flex items-center gap-1">
                      <CheckCircle size={8} /> Complete
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="px-3 py-2">
                  <div className="text-[8px] text-gray-500 mb-1">ITEMS TO DELIVER</div>
                  {['Excavator 5T', 'Safety Kit', 'Fuel Can'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 py-1 border-b border-gray-100 last:border-0">
                      <CheckCircle size={10} className="text-green-500" />
                      <span className="text-[9px] text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Signature button */}
                <div className="px-3 pb-3">
                  <button className="w-full bg-brand-purple text-white py-2 rounded-lg text-[9px] font-medium flex items-center justify-center gap-1">
                    <PenTool size={10} />
                    Capture Signature
                  </button>
                </div>
              </div>
            </div>

            {/* Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap">
              <Truck size={14} className="text-orange-400" />
              <span className="text-white text-xs font-medium">Driver App</span>
            </div>
          </div>
        </div>

        {/* Customer Portal (24/7 Hire Shop) - Equipment Catalogue & Cart */}
        <div className={`absolute transition-all duration-700 ${
          deviceIndex >= 3 ? 'translate-y-0' : 'translate-y-12'
        } ${phase === 'connections' || phase === 'cta' ? 'opacity-30' : deviceIndex >= 3 ? 'opacity-100' : 'opacity-0'}`} style={{ right: '20%', bottom: '8%' }}>
          <div className="relative">
            {/* Larger tablet/laptop frame for catalogue view */}
            <div className="w-[280px] bg-gray-900 rounded-[20px] p-2 shadow-2xl shadow-green-900/30 border border-gray-700">
              {/* Screen */}
              <div className="bg-white rounded-[14px] overflow-hidden">
                {/* Browser bar */}
                <div className="bg-gray-100 px-2 py-1 flex items-center gap-2">
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded px-2 py-0.5 text-[7px] text-gray-500 flex items-center gap-1">
                    <Globe size={8} />
                    hire.abcconstruction.com.au
                  </div>
                  {/* Cart icon */}
                  <div className="relative">
                    <ShoppingCart size={10} className="text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full text-[6px] text-white flex items-center justify-center font-bold">2</span>
                  </div>
                </div>

                {/* Portal header with search */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-white text-[10px] font-bold">Equipment Catalogue</div>
                    <div className="text-white/80 text-[7px]">24/7 Online Hire</div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-2 py-1 flex items-center gap-1">
                    <Search size={8} className="text-white/60" />
                    <span className="text-white/60 text-[7px]">Search equipment...</span>
                  </div>
                </div>

                {/* Category tabs */}
                <div className="px-2 pt-2 flex gap-1">
                  {['All', 'Excavators', 'Trucks', 'Tools'].map((cat, i) => (
                    <div key={i} className={`px-2 py-0.5 rounded-full text-[7px] font-medium ${
                      i === 1 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {cat}
                    </div>
                  ))}
                </div>

                {/* Equipment grid */}
                <div className="p-2 grid grid-cols-2 gap-1.5">
                  {[
                    { name: 'Mini Excavator 1.7T', price: '$185', avail: true, img: '🚜' },
                    { name: 'Excavator 5T', price: '$320', avail: true, img: '🏗️' },
                    { name: 'Skid Steer Loader', price: '$275', avail: false, img: '🚧' },
                    { name: 'Plate Compactor', price: '$85', avail: true, img: '⚙️' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-1.5 border border-gray-100">
                      <div className="text-center text-lg mb-0.5">{item.img}</div>
                      <div className="text-[7px] font-medium text-gray-800 truncate">{item.name}</div>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-[8px] font-bold text-green-600">{item.price}<span className="text-[6px] text-gray-400">/day</span></span>
                        <span className={`text-[6px] px-1 py-0.5 rounded ${
                          item.avail ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                        }`}>
                          {item.avail ? '✓ Available' : 'Booked'}
                        </span>
                      </div>
                      {item.avail && (
                        <button className="w-full mt-1 bg-green-500 text-white text-[6px] py-0.5 rounded font-medium flex items-center justify-center gap-0.5">
                          <ShoppingCart size={6} /> Add to Cart
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Cart summary bar */}
                <div className="bg-gray-900 px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={12} className="text-green-400" />
                    <div>
                      <div className="text-white text-[8px] font-medium">2 items in cart</div>
                      <div className="text-gray-400 text-[7px]">5 Mar - 12 Mar 2026</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-green-400 text-[10px] font-bold">$505/day</div>
                      <div className="text-gray-400 text-[6px]">$3,535 total</div>
                    </div>
                    <button className="bg-green-500 text-white px-2 py-1 rounded text-[7px] font-bold">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating availability check card */}
            <div className={`absolute -left-20 top-8 transition-all duration-500 ${
              deviceIndex >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`} style={{ transitionDelay: '400ms' }}>
              <div className="bg-white rounded-lg shadow-xl p-2 w-[90px] border border-gray-200">
                <div className="text-[7px] text-gray-500 mb-1">Check Availability</div>
                <div className="flex gap-1 mb-1">
                  <div className="flex-1 bg-gray-100 rounded px-1 py-0.5 text-[6px] text-gray-600">5 Mar</div>
                  <div className="flex-1 bg-gray-100 rounded px-1 py-0.5 text-[6px] text-gray-600">12 Mar</div>
                </div>
                <div className="bg-green-100 text-green-700 text-[7px] text-center py-0.5 rounded font-medium">
                  ✓ Available
                </div>
              </div>
            </div>

            {/* Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap">
              <Globe size={14} className="text-green-400" />
              <span className="text-white text-xs font-medium">24/7 Customer Portal</span>
            </div>
          </div>
        </div>

        {/* Signature capture overlay - appears during device phase */}
        <div className={`absolute transition-all duration-500 ${
          deviceIndex >= 2 && signatureProgress > 0 && signatureProgress < 100 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`} style={{ right: '15%', top: '55%' }}>
          <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl p-3 border border-gray-700 w-[200px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-[10px] font-medium">Customer Signature</span>
              <PenTool size={12} className="text-brand-purple" />
            </div>
            <div className="bg-white rounded-lg h-16 relative overflow-hidden">
              {/* Animated signature path */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 60">
                <path
                  d="M 20 40 Q 40 20, 60 35 T 100 30 T 140 35 T 180 25"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="200"
                  strokeDashoffset={200 - (signatureProgress * 2)}
                  className="transition-all duration-100"
                />
              </svg>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle size={10} className="text-green-500" />
              <span className="text-green-400 text-[8px]">Signature captured</span>
            </div>
          </div>
        </div>

      </div>

      {/* Connected Ecosystem Circular Gauge */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-1000 ${
        phase === 'connections' ? 'opacity-100' : 'opacity-0'
      }`}>

        {/* Header text above the circle */}
        <div className="relative text-center mb-8 z-10 h-24 w-full max-w-3xl flex flex-col items-center justify-center">
          {/* Loading state - while flow is running */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
            connectionProgress < 100 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              {/* Spinning loader */}
              <svg className="animate-spin h-8 w-8 text-[#881ba9]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <h2 className="text-3xl font-bold text-white">Building Your Ecosystem</h2>
            </div>
            <p className="text-lg text-white/60">Connecting all platforms...</p>
          </div>

          {/* Complete state - pulsing */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
            connectionProgress >= 100 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}>
            <h2 className="text-4xl font-bold text-white mb-2 animate-pulse">Ecosystem Complete</h2>
            <p className="text-lg text-white/70 animate-pulse">All systems connected and synced</p>
          </div>
        </div>

        <div className="relative w-[500px] h-[500px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
            <defs>
              {/* Glow filter */}
              <filter id="gaugeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              {/* Gradient for progress arc */}
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#881ba9" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>

            {/* Background ring */}
            <circle
              cx="250"
              cy="250"
              r="180"
              fill="none"
              stroke="#881ba9"
              strokeWidth="4"
              opacity="0.2"
            />

            {/* Progress arc - starts from bottom (270deg), goes clockwise */}
            <circle
              cx="250"
              cy="250"
              r="180"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#gaugeGlow)"
              strokeDasharray={2 * Math.PI * 180}
              strokeDashoffset={2 * Math.PI * 180 * (1 - connectionProgress / 100)}
              transform="rotate(-90 250 250)"
              className="transition-all duration-100"
            />

            {/* Data particles traveling along the arc */}
            {connectionProgress < 100 && (
              <circle
                cx="250"
                cy="70"
                r="6"
                fill="#881ba9"
                filter="url(#gaugeGlow)"
                transform={`rotate(${(connectionProgress / 100) * 360 - 90} 250 250)`}
              >
                <animate attributeName="opacity" values="1;0.5;1" dur="0.5s" repeatCount="indefinite" />
              </circle>
            )}
          </svg>

          {/* Node: Driver App (bottom - starting point) */}
          <div className={`absolute left-1/2 -translate-x-1/2 bottom-0 transition-all duration-500 ${
            connectionProgress >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <div className={`flex flex-col items-center gap-2 ${connectionProgress >= 0 && connectionProgress < 25 ? 'animate-pulse' : ''}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                connectionProgress >= 25 ? 'bg-[#881ba9] shadow-[0_0_30px_rgba(136,27,169,0.6)]' : 'bg-[#881ba9]/30 border-2 border-[#881ba9]/50'
              }`}>
                <Truck size={28} className="text-white" />
              </div>
              <span className={`text-sm font-medium transition-colors duration-500 ${connectionProgress >= 25 ? 'text-white' : 'text-white/60'}`}>Driver App</span>
              {connectionProgress >= 0 && connectionProgress < 25 && (
                <span className="text-xs text-[#881ba9] animate-pulse">Connecting...</span>
              )}
            </div>
          </div>

          {/* Node: Mobile Admin (right) */}
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-500 ${
            connectionProgress >= 25 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <div className={`flex flex-col items-center gap-2 ${connectionProgress >= 25 && connectionProgress < 50 ? 'animate-pulse' : ''}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                connectionProgress >= 50 ? 'bg-[#881ba9] shadow-[0_0_30px_rgba(136,27,169,0.6)]' : 'bg-[#881ba9]/30 border-2 border-[#881ba9]/50'
              }`}>
                <Smartphone size={28} className="text-white" />
              </div>
              <span className={`text-sm font-medium transition-colors duration-500 ${connectionProgress >= 50 ? 'text-white' : 'text-white/60'}`}>Mobile Admin</span>
              {connectionProgress >= 25 && connectionProgress < 50 && (
                <span className="text-xs text-[#881ba9] animate-pulse">Syncing...</span>
              )}
            </div>
          </div>

          {/* Node: Customer Portal (top) */}
          <div className={`absolute left-1/2 -translate-x-1/2 top-0 transition-all duration-500 ${
            connectionProgress >= 50 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <div className={`flex flex-col items-center gap-2 ${connectionProgress >= 50 && connectionProgress < 75 ? 'animate-pulse' : ''}`}>
              <span className={`text-sm font-medium transition-colors duration-500 ${connectionProgress >= 75 ? 'text-white' : 'text-white/60'}`}>Customer Portal</span>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                connectionProgress >= 75 ? 'bg-[#881ba9] shadow-[0_0_30px_rgba(136,27,169,0.6)]' : 'bg-[#881ba9]/30 border-2 border-[#881ba9]/50'
              }`}>
                <Globe size={28} className="text-white" />
              </div>
              {connectionProgress >= 50 && connectionProgress < 75 && (
                <span className="text-xs text-[#881ba9] animate-pulse">Linking...</span>
              )}
            </div>
          </div>

          {/* Node: Web Dashboard (left) */}
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-500 ${
            connectionProgress >= 75 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <div className={`flex flex-col items-center gap-2 ${connectionProgress >= 75 && connectionProgress < 100 ? 'animate-pulse' : ''}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                connectionProgress >= 100 ? 'bg-[#881ba9] shadow-[0_0_30px_rgba(136,27,169,0.6)]' : 'bg-[#881ba9]/30 border-2 border-[#881ba9]/50'
              }`}>
                <Monitor size={28} className="text-white" />
              </div>
              <span className={`text-sm font-medium transition-colors duration-500 ${connectionProgress >= 100 ? 'text-white' : 'text-white/60'}`}>Web Dashboard</span>
              {connectionProgress >= 75 && connectionProgress < 100 && (
                <span className="text-xs text-[#881ba9] animate-pulse">Completing...</span>
              )}
            </div>
          </div>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Progress percentage - shown while loading */}
            <div className={`text-center transition-all duration-500 ${connectionProgress >= 100 ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
              <div className="text-5xl font-bold text-white mb-1">{Math.round(connectionProgress)}%</div>
              <div className="text-sm text-white/60">Establishing connections</div>
            </div>

            {/* Completion checkmark - centered in circle when done */}
            <div className={`absolute transition-all duration-700 ${
              connectionProgress >= 100 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}>
              <div className={`w-24 h-24 rounded-full bg-[#881ba9] flex items-center justify-center transition-all duration-500 ${
                connectionProgress >= 100 ? 'shadow-[0_0_60px_rgba(136,27,169,0.8)]' : ''
              }`}>
                <CheckCircle size={48} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-transparent transition-all duration-1000 ${
          showCTA ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Glassmorphism card */}
        <div
          className={`text-center transform transition-all duration-700 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl px-12 py-10 shadow-2xl ${
            showCTA ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Platform icons */}
          <div className="flex items-center justify-center gap-6 mb-6">
            {[
              { icon: Monitor, label: 'Web', color: 'text-brand-purple' },
              { icon: Smartphone, label: 'Mobile', color: 'text-blue-400' },
              { icon: Truck, label: 'Driver', color: 'text-orange-400' },
              { icon: Globe, label: 'Portal', color: 'text-green-400' },
            ].map((platform, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center ${platform.color}`}>
                  <platform.icon size={24} />
                </div>
                <span className="text-white/60 text-xs">{platform.label}</span>
              </div>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            One platform.<br />
            <span className="bg-gradient-to-r from-brand-purple via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Every device.
            </span>
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-xl mx-auto">
            Manage your entire hire business from anywhere — office, field, or on the road.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://app.cloudrent.me/register"
              className="group relative bg-gradient-to-r from-brand-purple to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all hover:shadow-[0_0_40px_rgba(136,27,169,0.5)] animate-glow-pulse"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Your Free 30-Day Trial
                <ChevronRight size={20} />
              </span>
            </Link>

            <Link
              href="/demo"
              className="flex items-center gap-2 text-white/70 hover:text-white px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm hover:bg-white/5"
            >
              <Play size={18} />
              Book a Demo
            </Link>
          </div>

          <p className="text-white/40 text-sm mt-6">
            No credit card required • Full access • Cancel anytime
          </p>
        </div>
      </div>

      {/* Skip button */}
      {!showCTA && (
        <button
          onClick={() => {
            setPhase('cta')
            setShowCTA(true)
            setDashboardOpacity(1)
            setFeatureIndex(8)
            setDeviceIndex(3)
            setConnectionProgress(100)
          }}
          className="absolute bottom-8 right-8 text-white/40 hover:text-white/70 text-sm transition-colors flex items-center gap-2 z-20"
        >
          Skip intro
          <ChevronRight size={16} />
        </button>
      )}

      {/* Bottom controls */}
      {showCTA && (
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8">
          {/* Replay button */}
          <button
            onClick={replayAnimation}
            className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors group"
          >
            <RotateCcw size={16} className="group-hover:rotate-[-360deg] transition-transform duration-500" />
            <span className="text-sm">Replay</span>
          </button>

          {/* Scroll indicator */}
          <div className="text-white/40 animate-bounce">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}
    </section>
  )
}

export default ImmersiveHero

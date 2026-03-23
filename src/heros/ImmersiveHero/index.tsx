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
  Shield,
  Phone,
} from 'lucide-react'

type Phase = 'particles' | 'morphing' | 'dashboard' | 'features' | 'devices' | 'connections' | 'cta'

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

// Countdown deadline: March 31 2026 23:59:59 AEST = April 1 2026 13:59:59 UTC
const DEADLINE = new Date('2026-04-01T13:59:59Z')

function useCountdown() {
  const calc = () => {
    const diff = Math.max(0, DEADLINE.getTime() - Date.now())
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      expired: diff <= 0,
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
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
  const [dashboardOpacity, setDashboardOpacity] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const { days, hours, minutes, seconds, expired } = useCountdown()

  const replayAnimation = () => {
    setPhase('particles')
    setFeatureIndex(-1)
    setDeviceIndex(-1)
    setShowCTA(false)
    setTimerSeconds(0)
    setSignatureProgress(0)
    setConnectionProgress(0)
    setDashboardOpacity(0)
    setAnimationKey((prev) => prev + 1)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  const particleColors = [
    'rgba(136, 27, 169, 0.9)',
    'rgba(136, 27, 169, 0.7)',
    'rgba(136, 27, 169, 0.5)',
    'rgba(147, 51, 234, 0.6)',
  ]
  const particleShapes: Array<'diamond' | 'hexagon' | 'square'> = ['diamond', 'hexagon', 'square']

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
        if (i === 0) ctx.moveTo(Math.cos(angle) * p.size, Math.sin(angle) * p.size)
        else ctx.lineTo(Math.cos(angle) * p.size, Math.sin(angle) * p.size)
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
      ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size)
    }
    ctx.restore()
  }

  const animateParticles = useCallback(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particlesRef.current.forEach((p1, i) => {
      particlesRef.current.slice(i + 1).forEach((p2) => {
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          const alpha = 0.2 * (1 - dist / 180)
          const midX = (p1.x + p2.x) / 2
          ctx.beginPath()
          ctx.strokeStyle = `rgba(136, 27, 169, ${alpha})`
          ctx.lineWidth = 1
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(midX, p1.y)
          ctx.lineTo(midX, p2.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
          if (dist < 100) {
            ctx.beginPath()
            ctx.fillStyle = `rgba(136, 27, 169, ${alpha * 2})`
            ctx.arc(midX, (p1.y + p2.y) / 2, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      })
    })
    particlesRef.current.forEach((p) => {
      drawShape(ctx, p)
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.rotationSpeed
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1
    })
    if (phase === 'particles' || phase === 'morphing')
      animationFrameRef.current = requestAnimationFrame(animateParticles)
  }, [phase])

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

  useEffect(() => {
    if (!isClient) return
    if (phase === 'particles') animateParticles()
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [phase, animateParticles, isClient, animationKey])

  useEffect(() => {
    if (!isClient) return
    if (phase === 'devices' && deviceIndex >= 1) {
      const t = setInterval(() => setTimerSeconds((prev) => (prev + 1) % 60), 1000)
      return () => clearInterval(t)
    }
  }, [phase, deviceIndex, isClient])

  useEffect(() => {
    if (!isClient) return
    if (phase === 'devices' && deviceIndex >= 2) {
      const t = setInterval(() => setSignatureProgress((prev) => Math.min(prev + 2, 100)), 50)
      return () => clearInterval(t)
    }
  }, [phase, deviceIndex, isClient])

  useEffect(() => {
    if (!isClient) return
    if (phase === 'connections') {
      const t = setInterval(
        () =>
          setConnectionProgress((prev) => {
            if (prev >= 100) {
              clearInterval(t)
              return 100
            }
            return prev + 1
          }),
        50,
      )
      return () => clearInterval(t)
    }
  }, [phase, isClient])

  // ── COMPRESSED 4-SECOND TIMELINE ─────────────────────────────────────────
  // Animation races through all phases as ambient backdrop.
  // Headline + CTA are always visible from frame zero via the permanent overlay.
  useEffect(() => {
    if (!isClient) return
    const timers: NodeJS.Timeout[] = []

    timers.push(
      setTimeout(() => {
        setPhase('morphing')
        setDashboardOpacity(0.3)
      }, 500),
    )
    timers.push(
      setTimeout(() => {
        setPhase('dashboard')
        setDashboardOpacity(0.7)
      }, 1000),
    )
    timers.push(
      setTimeout(() => {
        setPhase('features')
        setFeatureIndex(0)
      }, 1500),
    )
    ;[1700, 1900, 2100, 2300, 2500, 2700, 2900, 3100].forEach((delay, idx) =>
      timers.push(setTimeout(() => setFeatureIndex(idx + 1), delay)),
    )
    timers.push(
      setTimeout(() => {
        setPhase('devices')
        setDeviceIndex(0)
      }, 3200),
    )
    timers.push(setTimeout(() => setDeviceIndex(1), 3400))
    timers.push(setTimeout(() => setDeviceIndex(2), 3600))
    timers.push(setTimeout(() => setDeviceIndex(3), 3800))
    timers.push(
      setTimeout(() => {
        setPhase('connections')
        setConnectionProgress(0)
      }, 4000),
    )
    // Arrive at CTA — particles have become atmosphere by now
    timers.push(
      setTimeout(() => {
        setPhase('cta')
        setShowCTA(true)
      }, 5500),
    )

    return () => timers.forEach(clearTimeout)
  }, [isClient, animationKey])

  if (!isClient) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a1a] -mt-[100px] pt-[100px]">
        <div className="absolute -top-[100px] left-0 right-0 h-[200px] bg-[#0a0a1a] z-0" />
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center px-4">
            Rental Management Software
            <br />
            <span className="bg-gradient-to-r from-brand-purple via-purple-400 to-blue-400 bg-clip-text text-transparent">
              for Australian Hire Businesses
            </span>
          </h1>
        </div>
      </section>
    )
  }

  return (
    <section
      key={animationKey}
      className="relative min-h-screen w-full overflow-hidden bg-transparent -mt-[100px] pt-[100px]"
    >
      <h1 className="sr-only">Rental Management Software for Australian Hire Businesses</h1>
      <div className="absolute -top-[100px] left-0 right-0 h-[200px] bg-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />

      {/* Technical background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-[10%] left-[5%] w-64 h-64 opacity-20 animate-pulse"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="hexGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#881ba9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#881ba9" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <polygon
            points="50,5 90,25 90,75 50,95 10,75 10,25"
            fill="none"
            stroke="url(#hexGrad1)"
            strokeWidth="0.5"
          />
          <polygon
            points="50,15 80,30 80,70 50,85 20,70 20,30"
            fill="none"
            stroke="#881ba9"
            strokeWidth="0.3"
            opacity="0.6"
          />
          <polygon
            points="50,25 70,35 70,65 50,75 30,65 30,35"
            fill="none"
            stroke="#881ba9"
            strokeWidth="0.3"
            opacity="0.4"
          />
          {[
            ['50', '5'],
            ['90', '25'],
            ['90', '75'],
            ['50', '95'],
            ['10', '75'],
            ['10', '25'],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2" fill="#881ba9" />
          ))}
        </svg>
        <svg className="absolute top-[15%] right-[10%] w-80 h-80 opacity-15" viewBox="0 0 100 100">
          <line
            x1="0"
            y1="20"
            x2="40"
            y2="20"
            stroke="#881ba9"
            strokeWidth="0.5"
            className="animate-pulse"
          />
          <line
            x1="60"
            y1="20"
            x2="100"
            y2="20"
            stroke="#881ba9"
            strokeWidth="0.5"
            className="animate-pulse"
          />
          <line
            x1="0"
            y1="50"
            x2="30"
            y2="50"
            stroke="#881ba9"
            strokeWidth="0.5"
            className="animate-pulse"
          />
          <line
            x1="70"
            y1="50"
            x2="100"
            y2="50"
            stroke="#881ba9"
            strokeWidth="0.5"
            className="animate-pulse"
          />
          <line x1="40" y1="20" x2="40" y2="50" stroke="#881ba9" strokeWidth="0.5" />
          <line x1="60" y1="20" x2="60" y2="80" stroke="#881ba9" strokeWidth="0.5" />
          <circle cx="40" cy="20" r="3" fill="#881ba9" className="animate-pulse" />
          <circle cx="60" cy="20" r="3" fill="#881ba9" className="animate-pulse" />
          <circle cx="30" cy="50" r="3" fill="#881ba9" className="animate-pulse" />
          <polygon points="50,35 65,50 50,65 35,50" fill="none" stroke="#881ba9" strokeWidth="1" />
          <circle cx="50" cy="50" r="4" fill="#881ba9" opacity="0.8" />
        </svg>
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#881ba9]/10 blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-[#881ba9]/8 blur-3xl" />
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === 'particles' ? 'opacity-100' : phase === 'morphing' ? 'opacity-60' : 'opacity-0'
        }`}
      />

      {/* ── PERMANENT ABOVE-FOLD OVERLAY ─────────────────────────────────────
           Always visible from frame zero. Sits above the animation backdrop.
           This is the headline, subhead, and CTA — no waiting required.        */}
      <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col items-center justify-center z-50 pointer-events-none px-4">
        <div className="text-center max-w-3xl pointer-events-auto">
          {/* Eyebrow badge */}
          {!expired && (
            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-7">
              <span className="relative flex w-4 h-4 flex-shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                  style={{ animationDuration: '1.2s' }}
                />
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"
                  style={{ animationDuration: '1.2s', animationDelay: '0.4s' }}
                />
                <span
                  className="relative inline-flex rounded-full w-4 h-4 bg-green-500"
                  style={{ boxShadow: '0 0 8px rgba(74,222,128,0.8)' }}
                />
              </span>
              <span className="text-green-400 text-xs font-medium">
                Launch offer · $85/user/month locked for life ·{' '}
                <strong className="text-white">
                  {days}d {String(hours).padStart(2, '0')}h {String(minutes).padStart(2, '0')}m{' '}
                  {String(seconds).padStart(2, '0')}s
                </strong>
              </span>
            </div>
          )}

          {/* Headline */}
          <h2
            className="font-bold text-white leading-[1.08] tracking-tight mb-5"
            style={{
              fontSize: 'clamp(38px, 5.5vw, 60px)',
              letterSpacing: '-1.5px',
              textShadow: '0 2px 40px rgba(0,0,0,0.8)',
            }}
          >
            Your hire business.
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #c084fc 0%, #818cf8 50%, #67e8f9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              One platform. Every device.
            </span>
          </h2>

          {/* Subhead */}
          <p
            className="text-white/60 leading-relaxed mb-8 mx-auto"
            style={{
              fontSize: 17,
              maxWidth: 540,
              fontWeight: 300,
              textShadow: '0 1px 20px rgba(0,0,0,0.9)',
            }}
          >
            Connect your <strong className="text-white/85 font-medium">office</strong>,{' '}
            <strong className="text-white/85 font-medium">field crew</strong>,{' '}
            <strong className="text-white/85 font-medium">drivers</strong> and{' '}
            <strong className="text-white/85 font-medium">customers</strong> in real time — with AI
            damage detection, digital signatures and live availability built in.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-5">
            <Link
              href="https://app.cloudrent.me/register"
              className="flex items-center gap-3 text-white rounded-xl px-7 py-3.5 font-medium text-sm relative overflow-hidden transition-all hover:-translate-y-0.5"
              style={{ background: '#881ba9', boxShadow: '0 4px 24px rgba(136,27,169,0.5)' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)',
                }}
              />
              <div className="relative z-10 flex flex-col items-start">
                <span className="font-bold text-[15px]">Start for $1 — 30 days full access</span>
                <span className="text-white/55 text-[11px] font-normal">
                  Every feature · No surprises
                </span>
              </div>
              <ChevronRight className="w-4 h-4 relative z-10 flex-shrink-0" />
            </Link>

            <Link
              href="/demo"
              className="flex items-center gap-2 text-white/60 hover:text-white border border-white/15 hover:border-white/30 rounded-xl px-5 py-3.5 text-sm transition-all"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <Phone className="w-4 h-4" />
              Book a demo
            </Link>
          </div>

          {/* Cancel promise */}
          <div
            className="inline-flex items-start gap-2.5 rounded-xl px-4 py-3 text-left max-w-[440px]"
            style={{
              background: 'rgba(136,27,169,0.08)',
              border: '1px solid rgba(136,27,169,0.2)',
            }}
          >
            <Shield className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white/45 leading-relaxed">
              Three days before your trial ends, we&apos;ll email you a{' '}
              <strong className="text-white/75 font-medium">one-click cancellation link</strong> —
              no calls, no forms, no questions asked.
            </p>
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-4 text-xs text-white/30">
            {['Free data migration', 'Australian support', 'Cancel anytime'].map((chip, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-green-500" />
                {chip}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ── END PERMANENT OVERLAY ──────────────────────────────────────────── */}

      {/* Animation backdrop — dashboard, devices, connections play behind the overlay */}
      <div
        className="absolute inset-x-0 top-[100px] bottom-0 flex items-center justify-center transition-all duration-1000"
        style={{ opacity: dashboardOpacity * 0.5 }}
      >
        {/* Desktop Dashboard */}
        <div
          className={`absolute transition-all duration-1000 ${
            phase === 'devices' || phase === 'connections' || phase === 'cta'
              ? 'left-[5%] top-[10%] scale-[0.65]'
              : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          }`}
        >
          <div className="relative w-[900px] max-w-[90vw]">
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
            <div className="bg-gray-100 rounded-b-xl overflow-hidden shadow-2xl shadow-purple-900/30 border border-gray-700/50 border-t-0">
              <div className="flex">
                <div className="w-14 bg-gray-800 py-4 flex flex-col items-center gap-2">
                  <div className="w-9 h-9 bg-brand-purple rounded-lg flex items-center justify-center mb-3">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  {[Calendar, Users, Package, FileText, Truck, Wrench, BarChart3].map((Icon, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-brand-purple/20 text-brand-purple' : 'text-gray-500'}`}
                    >
                      <Icon size={16} />
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <div className="bg-brand-purple h-12 flex items-center justify-between px-4">
                    <div className="bg-white/10 rounded-lg px-3 py-1 flex items-center gap-2 w-40">
                      <Search size={14} className="text-white/50" />
                      <span className="text-white/50 text-xs">Search...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bell size={16} className="text-white/80" />
                      <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                        <User size={12} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 space-y-3">
                    <div className="grid grid-cols-6 gap-2">
                      {[
                        { label: 'Overdue', value: '3', color: 'bg-red-600', icon: Clock },
                        { label: 'Service', value: '7', color: 'bg-blue-600', icon: Wrench },
                        {
                          label: 'Billing',
                          value: '12',
                          color: 'bg-brand-purple',
                          icon: DollarSign,
                        },
                        { label: 'Pickups', value: '5', color: 'bg-green-600', icon: CheckCircle },
                        { label: 'Deliveries', value: '8', color: 'bg-orange-500', icon: Truck },
                        { label: 'Maintenance', value: '2', color: 'bg-amber-600', icon: Wrench },
                      ].map((card, i) => (
                        <div
                          key={i}
                          className={`${card.color} rounded-lg p-2 text-white transform transition-all duration-500 ${featureIndex >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                          style={{ transitionDelay: `${i * 80}ms` }}
                        >
                          <card.icon size={12} className="mb-1 opacity-80" />
                          <div className="text-lg font-bold">{card.value}</div>
                          <div className="text-[10px] opacity-80">{card.label}</div>
                        </div>
                      ))}
                    </div>
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
                            className={`bg-white rounded-lg p-2 border border-gray-100 shadow-sm transition-all duration-500 ${featureIndex >= 1 ? 'opacity-100' : 'opacity-0'}`}
                            style={{ transitionDelay: `${i * 80 + 200}ms` }}
                          >
                            <div className="text-[9px] text-gray-500">{stat.label}</div>
                            <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
                            <div className="flex items-center gap-0.5 text-[8px] text-green-600">
                              <TrendingUp size={8} />
                              +12%
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className={`bg-white rounded-lg p-2 border border-gray-100 shadow-sm transition-all duration-500 ${featureIndex >= 2 ? 'opacity-100' : 'opacity-0'}`}
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
                    <div
                      className={`bg-white rounded-lg p-2 border border-gray-100 shadow-sm transition-all duration-500 ${featureIndex >= 3 ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <div className="text-[10px] font-semibold text-gray-800 mb-2">
                        Recent Rentals
                      </div>
                      {[
                        { customer: 'ABC Construction', items: '3 items' },
                        { customer: 'Smith Builders', items: '5 items' },
                      ].map((rental, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0"
                        >
                          <div>
                            <div className="text-[10px] font-medium text-gray-800">
                              {rental.customer}
                            </div>
                            <div className="text-[8px] text-gray-500">{rental.items}</div>
                          </div>
                          <div className="flex gap-0.5">
                            {[1, 2, 3].map((j) => (
                              <div key={j} className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Admin */}
        <div
          className={`absolute transition-all duration-700 ${deviceIndex >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
          style={{ right: 'calc(15% + 200px)', top: '8%' }}
        >
          <div className="w-[180px] bg-gray-900 rounded-[28px] p-2 shadow-2xl shadow-purple-900/40 border border-gray-700">
            <div className="bg-white rounded-[20px] overflow-hidden">
              <div className="bg-brand-purple px-3 py-1.5 flex justify-between items-center">
                <span className="text-white text-[8px]">9:41</span>
                <div className="flex gap-1">
                  <div className="w-3 h-1.5 bg-white/60 rounded-sm" />
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                </div>
              </div>
              <div className="bg-brand-purple px-3 py-2">
                <div className="text-white text-[10px] font-medium">Hi Sarah! 👋</div>
                <div className="text-white/70 text-[8px]">Here&apos;s what&apos;s on today</div>
              </div>
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
              <div className="px-2 pb-2">
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-[8px] text-gray-600 mb-1">Today&apos;s Revenue</div>
                  <div className="text-sm font-bold text-brand-purple">$4,280</div>
                  <div className="h-8 flex items-end justify-between gap-0.5 mt-1">
                    {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-brand-purple/60 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white border-t border-gray-100 px-2 py-1.5 flex justify-around">
                {[Home, Calendar, Package, Settings].map((Icon, i) => (
                  <div
                    key={i}
                    className={`p-1.5 rounded-lg ${i === 0 ? 'bg-brand-purple/10' : ''}`}
                  >
                    <Icon size={14} className={i === 0 ? 'text-brand-purple' : 'text-gray-400'} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap">
            <Smartphone size={14} className="text-blue-400" />
            <span className="text-white text-xs font-medium">Mobile Admin</span>
          </div>
        </div>

        {/* Driver App */}
        <div
          className={`absolute transition-all duration-700 ${deviceIndex >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
          style={{ right: '5%', top: '35%' }}
        >
          <div className="w-[170px] bg-gray-900 rounded-[28px] p-2 shadow-2xl shadow-blue-900/40 border border-gray-700">
            <div className="bg-white rounded-[20px] overflow-hidden">
              <div className="bg-gray-900 px-3 py-1.5 flex justify-between items-center">
                <span className="text-white text-[8px]">9:41</span>
                <div className="w-3 h-1.5 bg-white/60 rounded-sm" />
              </div>
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
              <div className="px-3 py-2">
                <div className="text-[8px] text-gray-500 mb-1">ITEMS TO DELIVER</div>
                {['Excavator 5T', 'Safety Kit', 'Fuel Can'].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 py-1 border-b border-gray-100 last:border-0"
                  >
                    <CheckCircle size={10} className="text-green-500" />
                    <span className="text-[9px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="px-3 pb-3">
                <button className="w-full bg-brand-purple text-white py-2 rounded-lg text-[9px] font-medium flex items-center justify-center gap-1">
                  <PenTool size={10} />
                  Capture Signature
                </button>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap">
            <Truck size={14} className="text-orange-400" />
            <span className="text-white text-xs font-medium">Driver App</span>
          </div>
        </div>

        {/* Customer Portal */}
        <div
          className={`absolute transition-all duration-700 ${deviceIndex >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
          style={{ right: '20%', bottom: '8%' }}
        >
          <div className="w-[280px] bg-gray-900 rounded-[20px] p-2 shadow-2xl shadow-green-900/30 border border-gray-700">
            <div className="bg-white rounded-[14px] overflow-hidden">
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
                <div className="relative">
                  <ShoppingCart size={10} className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full text-[6px] text-white flex items-center justify-center font-bold">
                    2
                  </span>
                </div>
              </div>
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
              <div className="px-2 pt-2 flex gap-1">
                {['All', 'Excavators', 'Trucks', 'Tools'].map((cat, i) => (
                  <div
                    key={i}
                    className={`px-2 py-0.5 rounded-full text-[7px] font-medium ${i === 1 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
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
                      <span className="text-[8px] font-bold text-green-600">
                        {item.price}
                        <span className="text-[6px] text-gray-400">/day</span>
                      </span>
                      <span
                        className={`text-[6px] px-1 py-0.5 rounded ${item.avail ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}
                      >
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
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap">
            <Globe size={14} className="text-green-400" />
            <span className="text-white text-xs font-medium">24/7 Customer Portal</span>
          </div>
        </div>
      </div>

      {/* Connections gauge — backdrop only, fades in */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-1000 ${phase === 'connections' || phase === 'cta' ? 'opacity-30' : 'opacity-0'}`}
      >
        <div className="relative w-[500px] h-[500px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
            <defs>
              <filter id="gaugeGlow2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="progressGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#881ba9" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <circle
              cx="250"
              cy="250"
              r="180"
              fill="none"
              stroke="#881ba9"
              strokeWidth="4"
              opacity="0.2"
            />
            <circle
              cx="250"
              cy="250"
              r="180"
              fill="none"
              stroke="url(#progressGradient2)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#gaugeGlow2)"
              strokeDasharray={2 * Math.PI * 180}
              strokeDashoffset={2 * Math.PI * 180 * (1 - connectionProgress / 100)}
              transform="rotate(-90 250 250)"
              className="transition-all duration-100"
            />
          </svg>
          {[
            { label: 'Driver App', bottom: 0, left: '50%', xOff: '-50%', Icon: Truck },
            { label: 'Mobile Admin', right: 0, top: '50%', yOff: '-50%', Icon: Smartphone },
            { label: 'Customer Portal', top: 0, left: '50%', xOff: '-50%', Icon: Globe },
            { label: 'Web Dashboard', left: 0, top: '50%', yOff: '-50%', Icon: Monitor },
          ].map((node, i) => (
            <div
              key={i}
              className={`absolute flex flex-col items-center gap-2 transition-all duration-500 ${connectionProgress >= i * 25 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
              style={node as React.CSSProperties}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${connectionProgress >= (i + 1) * 25 ? 'bg-[#881ba9]' : 'bg-[#881ba9]/30 border-2 border-[#881ba9]/50'}`}
              >
                <node.Icon size={28} className="text-white" />
              </div>
              <span className="text-sm font-medium text-white/60">{node.label}</span>
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-1 tabular-nums">
                {Math.round(connectionProgress)}%
              </div>
              <div className="text-sm text-white/60">Connecting...</div>
            </div>
          </div>
        </div>
      </div>

      {/* Replay button — shown after animation completes, bottom centre */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center z-40">
        <button
          onClick={replayAnimation}
          className="flex items-center gap-2 text-white/30 hover:text-white/60 text-sm transition-colors group"
        >
          <RotateCcw
            size={14}
            className="group-hover:rotate-[-360deg] transition-transform duration-500"
          />
          Replay animation
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 text-white/30 animate-bounce z-40">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}

export default ImmersiveHero

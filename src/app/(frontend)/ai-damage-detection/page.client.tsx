'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Camera,
  Scan,
  ShieldCheck,
  Zap,
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Play,
  TrendingUp,
  DollarSign,
  Users,
  Smartphone,
  Layers,
  RefreshCw,
  Eye,
  BarChart3,
  Target,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

// ============================================
// TYPES
// ============================================

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
  metric?: string
}

interface UseCase {
  industry: string
  description: string
  examples: string[]
}

interface Step {
  number: number
  title: string
  description: string
  icon: LucideIcon
}

// ============================================
// DATA
// ============================================

const heroFeatures: { icon: LucideIcon; text: string }[] = [
  { icon: Camera, text: 'Photo Capture' },
  { icon: Scan, text: 'AI Analysis' },
  { icon: FileText, text: 'Auto Documentation' },
  { icon: ShieldCheck, text: 'Dispute Protection' },
]

const coreFeatures: Feature[] = [
  {
    icon: Camera,
    title: 'Guided Photo Capture',
    description:
      'Mobile app guides staff to capture equipment from all required angles. Consistent documentation every time.',
  },
  {
    icon: Scan,
    title: 'AI-Powered Comparison',
    description:
      'Advanced AI compares before and after photos, automatically detecting scratches, dents, and damage.',
  },
  {
    icon: AlertTriangle,
    title: 'Damage Highlighting',
    description:
      'New damage is highlighted and flagged automatically. No more missed damage at check-in.',
  },
  {
    icon: FileText,
    title: 'Automatic Reports',
    description:
      'Generate professional damage reports with photos, timestamps, and AI analysis in one click.',
  },
  {
    icon: ShieldCheck,
    title: 'Dispute Resolution',
    description:
      'Timestamped, GPS-tagged photos with AI analysis provide irrefutable evidence for damage claims.',
  },
  {
    icon: RefreshCw,
    title: 'Condition Tracking',
    description:
      'Track equipment condition over time. See wear patterns and predict maintenance needs.',
  },
]

const benefits: Benefit[] = [
  {
    icon: DollarSign,
    title: 'Recover More Damage Costs',
    description: 'Documented damage with AI evidence means successful damage claims.',
    metric: '3x',
  },
  {
    icon: Clock,
    title: 'Faster Check-ins',
    description: 'Guided photo capture and AI analysis reduces inspection time.',
    metric: '60%',
  },
  {
    icon: Users,
    title: 'Reduce Disputes',
    description: 'Clear before/after evidence eliminates he-said-she-said arguments.',
    metric: '80%',
  },
  {
    icon: TrendingUp,
    title: 'Extend Asset Life',
    description: 'Catch damage early and track wear patterns to optimize maintenance.',
    metric: '25%',
  },
]

const howItWorks: Step[] = [
  {
    number: 1,
    title: 'Capture at Dispatch',
    description:
      'Staff uses the mobile app to photograph equipment before it leaves. The app guides them through required angles.',
    icon: Camera,
  },
  {
    number: 2,
    title: 'Customer Signs Off',
    description:
      'Customer reviews and signs for equipment condition on delivery. Photos are timestamped and GPS-tagged.',
    icon: Smartphone,
  },
  {
    number: 3,
    title: 'Return & Compare',
    description:
      'On return, capture new photos. AI instantly compares before/after images and flags any changes.',
    icon: Scan,
  },
  {
    number: 4,
    title: 'Auto-Generate Report',
    description:
      'Damage is documented automatically with highlighted photos, creating a professional damage report.',
    icon: FileText,
  },
]

const useCases: UseCase[] = [
  {
    industry: 'Equipment Hire',
    description: 'Excavators, tools, and machinery come back damaged. Capture and document every scratch.',
    examples: ['Excavators & earthmoving', 'Power tools & compressors', 'Scaffolding & access'],
  },
  {
    industry: 'Event Hire',
    description: 'Tables, chairs, and staging take a beating. Track condition across hundreds of items.',
    examples: ['Furniture & seating', 'Staging & structures', 'AV equipment'],
  },
  {
    industry: 'Vehicle Rental',
    description: 'From utes to trailers, document vehicle condition with comprehensive photo evidence.',
    examples: ['Utes & vans', 'Trailers & trucks', 'Specialty vehicles'],
  },
]

const integrationFeatures: Feature[] = [
  {
    icon: Layers,
    title: 'Seamless Integration',
    description: 'Damage detection is built into your existing CloudRent workflow. No separate app needed.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First',
    description: 'Capture photos on iOS or Android. Works offline and syncs when connected.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'See damage trends, identify problem equipment, and track recovery rates.',
  },
]

const stats = [
  { value: '95%', label: 'Damage Detection Accuracy' },
  { value: '3x', label: 'Faster Documentation' },
  { value: '80%', label: 'Fewer Disputes' },
  { value: '$$$', label: 'Recovered Damage Costs' },
]

// ============================================
// COMPONENTS
// ============================================

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              <Sparkles className="h-4 w-4" />
              AI-Powered Inventory Protection
            </div>

            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Never miss
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                equipment damage
              </span>{' '}
              again.
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-xl text-gray-300 lg:mx-0">
              AI-powered damage detection automatically captures, compares, and documents equipment
              condition. Protect your inventory and recover damage costs with irrefutable evidence.
            </p>

            {/* Hero feature pills */}
            <div className="mb-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              {heroFeatures.map((feature, i) => {
                const FIcon = feature.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-900/40 px-4 py-2"
                  >
                    <FIcon className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-purple-100">{feature.text}</span>
                  </div>
                )
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="https://app.cloudrent.me/register"
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-purple-500/30 transition-all hover:from-purple-400 hover:to-fuchsia-400"
              >
                Start $1 Trial
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-purple-400/50 px-8 py-4 text-lg font-semibold text-purple-100 transition-all hover:bg-purple-500/20"
              >
                <Play className="h-5 w-5" /> See It In Action
              </Link>
            </div>
          </div>

          {/* Visual - AI Comparison Mockup */}
          <div className="relative flex-1">
            <div className="relative mx-auto w-full max-w-xl">
              {/* Comparison visualization */}
              <div className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 p-6 shadow-2xl shadow-purple-900/50">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scan className="h-5 w-5 text-purple-400" />
                    <span className="font-semibold text-white">AI Damage Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                    Analyzing
                  </div>
                </div>

                {/* Before/After Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Before */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Before (Dispatch)
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src="/images/ai-damage-detection/before.webp"
                        alt="JCB Generator before rental - no damage"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-green-500/90 px-2 py-1 text-xs font-medium text-white">
                        <CheckCircle2 className="h-3 w-3" />
                        No Issues
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>10 Mar 2024, 08:30</span>
                    </div>
                  </div>

                  {/* After */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      After (Return)
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src="/images/ai-damage-detection/after.webp"
                        alt="JCB Generator after rental - damage detected on right panel"
                        fill
                        className="object-cover"
                      />
                      {/* Damage highlight overlay */}
                      <div className="absolute bottom-0 right-0 top-0 w-1/3 border-2 border-red-500 bg-red-500/20">
                        <div className="absolute right-1 top-1/2 -translate-y-1/2">
                          <div className="h-16 w-0.5 bg-red-500" />
                          <div className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-red-500" />
                          <div className="absolute -left-1 bottom-0 h-2 w-2 rounded-full bg-red-500" />
                        </div>
                      </div>
                      {/* Damage indicator badge */}
                      <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-red-500/90 px-2 py-1 text-xs font-medium text-white">
                        <AlertTriangle className="h-3 w-3" />
                        Damage Detected
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>17 Mar 2024, 14:45</span>
                    </div>
                  </div>
                </div>

                {/* AI Findings */}
                <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-semibold text-red-300">2 Issues Detected</span>
                  </div>
                  <ul className="space-y-1 text-sm text-red-200/80">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      Major impact damage on right panel
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      Structural crease running full height
                    </li>
                  </ul>
                </div>

                {/* Watch Demo Button */}
                <a
                  href="https://www.youtube.com/watch?v=EQHzTnQ1Y6g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-500/20 py-3 font-medium text-purple-300 transition-colors hover:bg-purple-500/30"
                >
                  <Play className="h-4 w-4" />
                  Watch How It Works
                </a>
              </div>

              {/* Decorative glows */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const StatsBar: React.FC = () => {
  return (
    <section className="relative z-10 w-full border-y border-white/10 bg-gradient-to-r from-brand-purple/10 via-transparent to-brand-purple/10">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-1 text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ProblemSection: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          Equipment damage costs{' '}
          <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            hire businesses thousands
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Without proper documentation, proving damage is nearly impossible. Customers dispute
          charges. Staff forget to check. You absorb the cost.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: AlertTriangle,
            title: 'Missed Damage',
            description:
              'Rushed check-ins mean scratches and dents go unnoticed until the next hire.',
            color: 'red',
          },
          {
            icon: Users,
            title: 'Customer Disputes',
            description:
              '"It was like that when I got it." Without photos, you can\'t prove otherwise.',
            color: 'orange',
          },
          {
            icon: DollarSign,
            title: 'Lost Revenue',
            description:
              'Failed damage claims and repair costs eat into your margins every month.',
            color: 'yellow',
          },
        ].map((problem, index) => {
          const Icon = problem.icon
          const colorClasses = {
            red: 'bg-red-500/20 text-red-400 border-red-500/30',
            orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
            yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          }
          return (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div
                className={`mb-4 inline-flex rounded-xl border p-3 ${colorClasses[problem.color as keyof typeof colorClasses]}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          How{' '}
          <span className="bg-gradient-to-r from-brand-purple via-purple-400 to-blue-400 bg-clip-text text-transparent">
            AI damage detection
          </span>{' '}
          works
        </h2>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          A simple, mobile-first workflow that integrates seamlessly into your dispatch and return
          process.
        </p>
      </div>

      <div className="relative">
        {/* Connection line */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-purple-500/50 via-purple-500/50 to-transparent lg:block" />

        <div className="space-y-12 lg:space-y-0">
          {howItWorks.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0
            return (
              <div key={index} className="relative lg:flex lg:items-center lg:gap-8">
                {/* Content - alternating sides on desktop */}
                <div
                  className={`lg:w-1/2 ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:order-last lg:pl-16 lg:text-left'}`}
                >
                  <div
                    className={`inline-flex items-center gap-3 ${isEven ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="mb-2 mt-4 text-2xl font-bold text-white">{step.title}</h3>
                  <p className="text-lg text-gray-400">{step.description}</p>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-purple-500 bg-background lg:block" />

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block lg:w-1/2" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const FeaturesSection: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          Powerful features for{' '}
          <span className="bg-gradient-to-r from-brand-purple via-purple-400 to-blue-400 bg-clip-text text-transparent">
            complete protection
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Everything you need to document, track, and recover equipment damage costs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coreFeatures.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-white/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple/20">
                <Icon className="h-6 w-6 text-brand-purple" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const BenefitsSection: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          Real results for{' '}
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            hire businesses
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          AI damage detection pays for itself by recovering costs you&apos;re currently losing.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <div
              key={index}
              className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 text-center"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/30">
                <Icon className="h-7 w-7 text-white" />
              </div>
              {benefit.metric && (
                <div className="mb-2 text-4xl font-bold text-green-400">{benefit.metric}</div>
              )}
              <h3 className="mb-2 text-lg font-bold text-white">{benefit.title}</h3>
              <p className="text-sm text-gray-400">{benefit.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const UseCasesSection: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          Built for{' '}
          <span className="bg-gradient-to-r from-brand-purple via-purple-400 to-blue-400 bg-clip-text text-transparent">
            every hire industry
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          From earthmoving equipment to event furniture, protect your assets across any rental
          business.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
          >
            <h3 className="mb-3 text-2xl font-bold text-white">{useCase.industry}</h3>
            <p className="mb-4 text-gray-400">{useCase.description}</p>
            <ul className="space-y-2">
              {useCase.examples.map((example, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-400" />
                  {example}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

const IntegrationSection: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
      <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 p-8 md:p-12">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="flex-1">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Seamlessly integrated into{' '}
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                CloudRent Pro
              </span>
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              AI damage detection isn&apos;t a separate tool—it&apos;s built right into your
              existing workflow. Capture photos during dispatch and return, with everything linked
              to your rentals.
            </p>

            <div className="space-y-4">
              {integrationFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/20">
                      <Icon className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex-1">
            <div className="relative">
              {/* Mobile App Mockup */}
              <div className="mx-auto w-64 rounded-3xl border-4 border-gray-700 bg-gray-900 p-2 shadow-2xl">
                <div className="rounded-2xl bg-gray-800 p-4">
                  {/* App Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Equipment Check</span>
                    <Eye className="h-4 w-4 text-purple-400" />
                  </div>

                  {/* Photo Grid */}
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg ${i === 4 ? 'flex items-center justify-center border-2 border-dashed border-purple-500/50 bg-purple-500/10' : 'bg-gray-700'}`}
                      >
                        {i === 4 && <Camera className="h-6 w-6 text-purple-400" />}
                      </div>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="mb-1 flex justify-between text-xs text-gray-400">
                      <span>Photo Progress</span>
                      <span>3/4</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500" />
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 py-3 text-sm font-semibold text-white">
                    Capture Next Photo
                  </button>
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-8 -z-10 rounded-full bg-purple-500/20 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CTASection: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24">
      <div className="relative overflow-hidden rounded-2xl border border-brand-purple/30 bg-gradient-to-r from-brand-purple/20 to-purple-500/20 p-8 text-center backdrop-blur-xl md:p-12">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/20 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-green-400">
            Included with CloudRent Pro
          </span>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Stop losing money on equipment damage
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Join Australian hire businesses protecting their assets with AI-powered damage
          detection. Start your $1 trial today.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://app.cloudrent.me/register"
            className="group relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple to-purple-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(136,27,169,0.5)]"
          >
            Start Your $1 Trial
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            href="/demo"
            className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-4 text-muted-foreground transition-all hover:border-white/20 hover:text-foreground"
          >
            <Play className="h-4 w-4" />
            Book a Demo
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            Just $1 to start
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            Full feature access
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            Cancel anytime
          </span>
        </div>
      </div>
    </section>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function AIDamageDetectionPageClient() {
  return (
    <div className="min-h-screen text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/10 blur-[150px]" />
      </div>

      <HeroSection />
      <StatsBar />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <BenefitsSection />
      <UseCasesSection />
      <IntegrationSection />
      <CTASection />
    </div>
  )
}

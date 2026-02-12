import Link from 'next/link'
import { Calendar, Rocket } from 'lucide-react'

export function PostCTA() {
  return (
    <div className="mt-12 rounded-2xl border border-brand-purple/20 bg-gradient-to-br from-brand-purple/10 to-[#0a0a1a] p-8 md:p-10">
      <div className="text-center">
        <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">
          Ready to transform your hire business?
        </h3>
        <p className="mx-auto mb-8 max-w-xl text-gray-400">
          See how CloudRent Pro can streamline your operations, reduce admin time, and help you grow.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/demo"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand-purple px-6 py-3 font-semibold text-white transition-all hover:bg-[#a855c9] hover:shadow-[0_0_20px_rgba(136,27,169,0.4)]"
          >
            <Calendar className="h-5 w-5" />
            Book a Demo
          </Link>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-lg border border-brand-purple px-6 py-3 font-semibold text-brand-purple transition-all hover:bg-brand-purple/10 hover:text-white"
          >
            <Rocket className="h-5 w-5" />
            Start 30-Day Free Trial
          </Link>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          No credit card required. Cancel anytime.
        </p>
      </div>
    </div>
  )
}

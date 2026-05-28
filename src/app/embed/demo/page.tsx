import { BookingWidget } from '@/components/Booking/BookingWidget'

interface EmbedDemoPageProps {
  searchParams: Promise<{
    name?: string
    email?: string
    company?: string
    phone?: string
  }>
}

export default async function EmbedDemoPage({ searchParams }: EmbedDemoPageProps) {
  const params = await searchParams
  const { name, email, company, phone } = params

  return (
    <div className="mx-auto max-w-2xl p-6">
      <BookingWidget
        eventTypeSlug="demo"
        theme="light"
        prefill={{ name, email, company, phone }}
      />
    </div>
  )
}

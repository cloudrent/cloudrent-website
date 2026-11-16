import { describe, expect, it, vi, afterEach } from 'vitest'
import {
  bookingInstants,
  calculateAvailableSlots,
  createDateInTimezone,
  rangesOverlap,
  type BookingSettings,
  type ExistingBooking,
} from '@/lib/booking/calculate-slots'

const TZ = 'Australia/Brisbane'
const day = { enabled: true, startTime: '09:00', endTime: '17:00' }
const off = { enabled: false, startTime: '09:00', endTime: '17:00' }

function settings(slotDuration: number): BookingSettings {
  return {
    availability: {
      timezone: TZ,
      slotDuration,
      bufferBefore: 0,
      bufferAfter: 15,
      maxBookingsPerDay: 8,
      advanceBookingDays: 60,
      minimumNotice: 24,
    },
    schedule: {
      monday: day,
      tuesday: day,
      wednesday: day,
      thursday: day,
      friday: day,
      saturday: off,
      sunday: off,
    },
  }
}

function run(slotDuration: number, existingBookings: ExistingBooking[] = []) {
  return calculateAvailableSlots({
    settings: settings(slotDuration),
    startDate: '2026-12-17',
    endDate: '2026-12-18',
    existingBookings,
    googleBusyTimes: [],
    userTimezone: TZ,
  })
}

const localTime = (iso: string) =>
  new Intl.DateTimeFormat('en-AU', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hour12: false }).format(
    new Date(iso),
  )

describe('booking slots', () => {
  afterEach(() => vi.useRealTimers())

  it('tags each slot with its Brisbane day, so 9:00 am is not grouped under the previous day', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-17T00:00:00Z'))
    const { slots } = run(60)

    // 9:00 am Fri 18 Dec in Brisbane is 23:00 UTC on Thu 17 Dec
    const friNine = slots.find((s) => s.date === '2026-12-18' && localTime(s.startTime) === '09:00')
    expect(friNine?.startTime).toBe('2026-12-17T23:00:00.000Z')

    const thursday = slots.filter((s) => s.date === '2026-12-17').map((s) => localTime(s.startTime))
    expect(thursday).toEqual(['09:00', '10:15', '11:30', '12:45', '14:00', '15:15'])
  })

  it('blocks demo slots that overlap a training booking with a different start time', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-17T00:00:00Z'))
    // Training 9:45 to 10:15 sits inside the 9:00 demo slot and the 10:15 demo slot's buffer
    const { slots } = run(60, [{ date: '2026-12-17', startTime: '09:45', endTime: '10:15', status: 'confirmed' }])
    const thursday = slots.filter((s) => s.date === '2026-12-17').map((s) => localTime(s.startTime))
    expect(thursday).not.toContain('09:00')
    expect(thursday).toContain('10:15')
  })

  it('ignores cancelled bookings', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-17T00:00:00Z'))
    const { slots } = run(60, [{ date: '2026-12-17', startTime: '09:00', endTime: '10:00', status: 'cancelled' }])
    expect(slots.filter((s) => s.date === '2026-12-17').map((s) => localTime(s.startTime))).toContain('09:00')
  })

  it('reads Payload ISO dates when working out a booking instant (reminder timing)', () => {
    const { start, end } = bookingInstants(
      { date: '2026-11-25T00:00:00.000Z', startTime: '09:00', endTime: '10:00' },
      TZ,
    )
    expect(start.toISOString()).toBe('2026-11-24T23:00:00.000Z')
    expect(end.toISOString()).toBe('2026-11-25T00:00:00.000Z')
    expect(createDateInTimezone('2026-11-25', '09:00', TZ).getTime()).toBe(start.getTime())
  })

  it('treats back-to-back ranges as free', () => {
    const a = new Date('2026-12-17T00:00:00Z')
    const b = new Date('2026-12-17T01:00:00Z')
    const c = new Date('2026-12-17T02:00:00Z')
    expect(rangesOverlap(a, b, b, c)).toBe(false)
    expect(rangesOverlap(a, c, b, c)).toBe(true)
  })
})

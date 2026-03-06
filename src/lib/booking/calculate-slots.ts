export interface TimeSlot {
  startTime: string // ISO datetime
  endTime: string // ISO datetime
  available: boolean
}

export interface DateSummary {
  date: string // YYYY-MM-DD
  hasAvailability: boolean
  slotsCount: number
}

export interface ScheduleDay {
  enabled: boolean
  startTime: string // HH:MM
  endTime: string // HH:MM
}

export interface BookingSettings {
  availability: {
    timezone: string
    slotDuration: number
    bufferBefore: number
    bufferAfter: number
    maxBookingsPerDay: number
    advanceBookingDays: number
    minimumNotice: number
  }
  schedule: {
    monday: ScheduleDay
    tuesday: ScheduleDay
    wednesday: ScheduleDay
    thursday: ScheduleDay
    friday: ScheduleDay
    saturday: ScheduleDay
    sunday: ScheduleDay
  }
}

export interface ExistingBooking {
  date: string
  startTime: string
  endTime: string
  status: string
}

export interface BusyTime {
  start: Date
  end: Date
}

const DAY_NAMES = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const

/**
 * Calculate available slots for a date range
 */
export function calculateAvailableSlots(params: {
  settings: BookingSettings
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
  existingBookings: ExistingBooking[]
  googleBusyTimes: BusyTime[]
  userTimezone: string
}): { dates: DateSummary[]; slots: TimeSlot[] } {
  const { settings, startDate, endDate, existingBookings, googleBusyTimes } = params

  const dates: DateSummary[] = []
  const slots: TimeSlot[] = []

  const now = new Date()
  const minimumNoticeMs = (settings.availability.minimumNotice || 24) * 60 * 60 * 1000
  const earliestBookingTime = new Date(now.getTime() + minimumNoticeMs)

  const maxBookingDate = new Date()
  maxBookingDate.setDate(maxBookingDate.getDate() + (settings.availability.advanceBookingDays || 60))

  // Count bookings per day for max bookings check
  const bookingsPerDay: Record<string, number> = {}
  for (const booking of existingBookings) {
    if (booking.status === 'confirmed' || booking.status === 'pending') {
      bookingsPerDay[booking.date] = (bookingsPerDay[booking.date] || 0) + 1
    }
  }

  // Iterate through each day in the range
  const currentDate = new Date(startDate + 'T00:00:00')
  const lastDate = new Date(endDate + 'T00:00:00')

  while (currentDate <= lastDate) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const dayOfWeek = currentDate.getDay()
    const dayName = DAY_NAMES[dayOfWeek]
    const daySchedule = settings.schedule[dayName]

    // Check if day is enabled in schedule
    if (!daySchedule?.enabled) {
      dates.push({ date: dateStr, hasAvailability: false, slotsCount: 0 })
      currentDate.setDate(currentDate.getDate() + 1)
      continue
    }

    // Check if date is within booking window
    const dateForComparison = new Date(dateStr + 'T23:59:59')
    if (dateForComparison < earliestBookingTime || currentDate > maxBookingDate) {
      dates.push({ date: dateStr, hasAvailability: false, slotsCount: 0 })
      currentDate.setDate(currentDate.getDate() + 1)
      continue
    }

    // Check max bookings per day
    const maxPerDay = settings.availability.maxBookingsPerDay || 0
    if (maxPerDay > 0 && (bookingsPerDay[dateStr] || 0) >= maxPerDay) {
      dates.push({ date: dateStr, hasAvailability: false, slotsCount: 0 })
      currentDate.setDate(currentDate.getDate() + 1)
      continue
    }

    // Generate slots for this day
    const daySlots = generateDaySlots({
      date: dateStr,
      schedule: daySchedule,
      slotDuration: settings.availability.slotDuration || 30,
      bufferBefore: settings.availability.bufferBefore || 0,
      bufferAfter: settings.availability.bufferAfter || 15,
      existingBookings: existingBookings.filter((b) => b.date === dateStr),
      googleBusyTimes,
      earliestBookingTime,
      timezone: settings.availability.timezone,
    })

    const availableSlots = daySlots.filter((s) => s.available)
    dates.push({
      date: dateStr,
      hasAvailability: availableSlots.length > 0,
      slotsCount: availableSlots.length,
    })
    slots.push(...availableSlots)

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return { dates, slots }
}

/**
 * Generate slots for a single day
 */
function generateDaySlots(params: {
  date: string
  schedule: ScheduleDay
  slotDuration: number
  bufferBefore: number
  bufferAfter: number
  existingBookings: ExistingBooking[]
  googleBusyTimes: BusyTime[]
  earliestBookingTime: Date
  timezone: string
}): TimeSlot[] {
  const {
    date,
    schedule,
    slotDuration,
    bufferBefore,
    bufferAfter,
    existingBookings,
    googleBusyTimes,
    earliestBookingTime,
  } = params

  const slots: TimeSlot[] = []

  // Parse start and end times
  const [startHour, startMin] = schedule.startTime.split(':').map(Number)
  const [endHour, endMin] = schedule.endTime.split(':').map(Number)

  const startMinutes = startHour * 60 + startMin
  const endMinutes = endHour * 60 + endMin

  // Total time needed per slot (including buffers)
  const totalSlotTime = bufferBefore + slotDuration + bufferAfter

  // Generate slots
  let currentMinutes = startMinutes

  while (currentMinutes + slotDuration <= endMinutes) {
    const slotStartHour = Math.floor(currentMinutes / 60)
    const slotStartMin = currentMinutes % 60
    const slotEndMinutes = currentMinutes + slotDuration
    const slotEndHour = Math.floor(slotEndMinutes / 60)
    const slotEndMin = slotEndMinutes % 60

    const startTimeStr = `${String(slotStartHour).padStart(2, '0')}:${String(slotStartMin).padStart(2, '0')}`
    const endTimeStr = `${String(slotEndHour).padStart(2, '0')}:${String(slotEndMin).padStart(2, '0')}`

    const startDateTime = new Date(`${date}T${startTimeStr}:00`)
    const endDateTime = new Date(`${date}T${endTimeStr}:00`)

    // Check if slot is after minimum notice
    const isAfterMinNotice = startDateTime >= earliestBookingTime

    // Check for conflicts with existing bookings
    const hasBookingConflict = existingBookings.some((booking) => {
      if (booking.status === 'cancelled') return false
      return booking.startTime === startTimeStr
    })

    // Check for conflicts with Google Calendar
    const hasGoogleConflict = googleBusyTimes.some((busy) => {
      return startDateTime < busy.end && endDateTime > busy.start
    })

    const isAvailable = isAfterMinNotice && !hasBookingConflict && !hasGoogleConflict

    slots.push({
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      available: isAvailable,
    })

    // Move to next slot (including buffer)
    currentMinutes += totalSlotTime
  }

  return slots
}

/**
 * Parse a date string and time string into a Date object
 */
export function parseDateTime(date: string, time: string, timezone: string): Date {
  // For now, simple parsing - in production you might want luxon or date-fns-tz
  const dateTime = new Date(`${date}T${time}:00`)
  return dateTime
}

/**
 * Format a date for display
 */
export function formatDate(date: string, timezone: string): string {
  const d = new Date(date + 'T00:00:00')
  return d.toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: timezone,
  })
}

/**
 * Format a time for display
 */
export function formatTime(time: string, _timezone: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHour = hours % 12 || 12
  return `${displayHour}:${String(minutes).padStart(2, '0')} ${period}`
}

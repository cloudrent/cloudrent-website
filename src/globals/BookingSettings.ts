import type { GlobalConfig } from 'payload'

const dayFields = (defaultEnabled: boolean) => [
  { name: 'enabled', type: 'checkbox' as const, defaultValue: defaultEnabled },
  {
    name: 'startTime',
    type: 'text' as const,
    defaultValue: '09:00',
    admin: {
      condition: (_: unknown, siblingData: { enabled?: boolean }): boolean =>
        Boolean(siblingData?.enabled),
      width: '50%',
    },
  },
  {
    name: 'endTime',
    type: 'text' as const,
    defaultValue: '17:00',
    admin: {
      condition: (_: unknown, siblingData: { enabled?: boolean }): boolean =>
        Boolean(siblingData?.enabled),
      width: '50%',
    },
  },
]

export const BookingSettings: GlobalConfig = {
  slug: 'booking-settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    // Event Info
    {
      type: 'row',
      fields: [
        {
          name: 'eventName',
          type: 'text',
          defaultValue: 'Product Demo',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'hostName',
          type: 'text',
          defaultValue: 'CloudRent Team',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'eventDescription',
      type: 'textarea',
      admin: { description: 'Description shown on booking widget' },
    },
    {
      name: 'hostEmail',
      type: 'email',
      required: true,
      admin: { description: 'Email for calendar invites and notifications' },
    },

    // Availability Settings
    {
      name: 'availability',
      type: 'group',
      label: 'Availability Settings',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'timezone',
              type: 'select',
              defaultValue: 'Australia/Sydney',
              options: [
                { label: 'Sydney (AEST/AEDT)', value: 'Australia/Sydney' },
                { label: 'Melbourne', value: 'Australia/Melbourne' },
                { label: 'Brisbane', value: 'Australia/Brisbane' },
                { label: 'Perth', value: 'Australia/Perth' },
                { label: 'Adelaide', value: 'Australia/Adelaide' },
                { label: 'London', value: 'Europe/London' },
                { label: 'New York', value: 'America/New_York' },
              ],
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'slotDuration',
              type: 'number',
              defaultValue: 30,
              min: 15,
              max: 120,
              admin: { description: 'Meeting duration in minutes', width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'bufferBefore',
              type: 'number',
              defaultValue: 0,
              admin: { description: 'Buffer before meetings (minutes)', width: '50%' },
            },
            {
              name: 'bufferAfter',
              type: 'number',
              defaultValue: 15,
              admin: { description: 'Buffer after meetings (minutes)', width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'maxBookingsPerDay',
              type: 'number',
              defaultValue: 8,
              admin: { description: 'Maximum bookings per day (0 = unlimited)', width: '50%' },
            },
            {
              name: 'advanceBookingDays',
              type: 'number',
              defaultValue: 60,
              admin: { description: 'How far in advance can people book (days)', width: '50%' },
            },
          ],
        },
        {
          name: 'minimumNotice',
          type: 'number',
          defaultValue: 24,
          admin: { description: 'Minimum notice required (hours)' },
        },
      ],
    },

    // Weekly Schedule
    {
      name: 'schedule',
      type: 'group',
      label: 'Weekly Schedule',
      fields: [
        {
          name: 'monday',
          type: 'group',
          label: 'Monday',
          fields: dayFields(true),
        },
        {
          name: 'tuesday',
          type: 'group',
          label: 'Tuesday',
          fields: dayFields(true),
        },
        {
          name: 'wednesday',
          type: 'group',
          label: 'Wednesday',
          fields: dayFields(true),
        },
        {
          name: 'thursday',
          type: 'group',
          label: 'Thursday',
          fields: dayFields(true),
        },
        {
          name: 'friday',
          type: 'group',
          label: 'Friday',
          fields: dayFields(true),
        },
        {
          name: 'saturday',
          type: 'group',
          label: 'Saturday',
          fields: dayFields(false),
        },
        {
          name: 'sunday',
          type: 'group',
          label: 'Sunday',
          fields: dayFields(false),
        },
      ],
    },

    // Google Calendar Integration
    {
      name: 'googleCalendar',
      type: 'group',
      label: 'Google Calendar Integration',
      fields: [
        {
          name: 'connected',
          type: 'checkbox',
          defaultValue: false,
          admin: { readOnly: true, description: 'Whether Google Calendar is connected' },
        },
        {
          name: 'connectedEmail',
          type: 'text',
          admin: { readOnly: true, description: 'Connected Google account email' },
        },
        {
          name: 'calendarId',
          type: 'text',
          defaultValue: 'primary',
          admin: { description: 'Calendar ID to use (default: primary)' },
        },
      ],
    },

    // Notifications
    {
      name: 'notifications',
      type: 'group',
      label: 'Email Notifications',
      fields: [
        {
          name: 'sendHostNotification',
          type: 'checkbox',
          defaultValue: true,
          label: 'Send notification to host when booking is made',
        },
        {
          name: 'sendGuestConfirmation',
          type: 'checkbox',
          defaultValue: true,
          label: 'Send confirmation email to guest',
        },
      ],
    },
  ],
}

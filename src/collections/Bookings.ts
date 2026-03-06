import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  access: {
    create: anyone, // Public can create bookings
    delete: authenticated,
    read: authenticated, // Only admin can view all bookings
    update: authenticated,
  },
  admin: {
    useAsTitle: 'guestName',
    defaultColumns: ['guestName', 'guestEmail', 'date', 'startTime', 'status', 'createdAt'],
    group: 'Booking',
  },
  fields: [
    // Scheduling
    {
      type: 'row',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
          admin: {
            date: { pickerAppearance: 'dayOnly' },
            width: '33%',
          },
        },
        {
          name: 'startTime',
          type: 'text',
          required: true,
          admin: {
            description: 'Format: HH:MM (e.g., 09:00)',
            width: '33%',
          },
        },
        {
          name: 'endTime',
          type: 'text',
          required: true,
          admin: {
            description: 'Format: HH:MM (e.g., 09:30)',
            width: '33%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'duration',
          type: 'number',
          defaultValue: 30,
          admin: { description: 'Duration in minutes', width: '50%' },
        },
        {
          name: 'timezone',
          type: 'text',
          defaultValue: 'Australia/Sydney',
          admin: { width: '50%' },
        },
      ],
    },

    // Guest Information
    {
      type: 'row',
      fields: [
        {
          name: 'guestName',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'guestEmail',
          type: 'email',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'guestPhone',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'guestCompany',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      admin: { description: 'What the guest wants to discuss' },
    },

    // Status & Tracking
    {
      name: 'status',
      type: 'select',
      defaultValue: 'confirmed',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
        { label: 'No Show', value: 'no_show' },
      ],
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'cancellationReason',
      type: 'textarea',
      admin: {
        condition: (data) => data?.status === 'cancelled',
      },
    },

    // Google Calendar Integration
    {
      name: 'googleEventId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Google Calendar event ID',
        position: 'sidebar',
      },
    },
    {
      name: 'meetingUrl',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Google Meet URL',
        position: 'sidebar',
      },
    },

    // Metadata
    {
      name: 'source',
      type: 'select',
      defaultValue: 'website',
      options: [
        { label: 'Website', value: 'website' },
        { label: 'Manual', value: 'manual' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
  timestamps: true,
  defaultSort: '-createdAt',
}

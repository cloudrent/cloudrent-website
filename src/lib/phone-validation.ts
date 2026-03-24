import twilio from 'twilio'

/**
 * Validate a phone number using Twilio Lookup API
 * Returns validation result with details about the number
 */
export async function validatePhoneNumber(phoneNumber: string): Promise<{
  valid: boolean
  formatted?: string
  countryCode?: string
  error?: string
}> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN

  // If Twilio isn't configured, fall back to basic validation
  if (!accountSid || !authToken) {
    console.warn('Twilio credentials not configured, using basic validation')
    return basicPhoneValidation(phoneNumber)
  }

  try {
    const client = twilio(accountSid, authToken)

    const lookup = await client.lookups.v2.phoneNumbers(phoneNumber).fetch()

    return {
      valid: lookup.valid,
      formatted: lookup.phoneNumber,
      countryCode: lookup.countryCode,
    }
  } catch (error: unknown) {
    // Handle specific Twilio errors
    if (error && typeof error === 'object' && 'code' in error) {
      const twilioError = error as { code: number; message?: string }

      // 20404 = Phone number not found (invalid)
      if (twilioError.code === 20404) {
        return {
          valid: false,
          error: 'Invalid phone number',
        }
      }
    }

    console.error('Twilio lookup error:', error)
    // Fall back to basic validation on API errors
    return basicPhoneValidation(phoneNumber)
  }
}

/**
 * Basic phone number validation (fallback when Twilio unavailable)
 * Checks format only, not if number is actually real
 */
function basicPhoneValidation(phoneNumber: string): {
  valid: boolean
  formatted?: string
  error?: string
} {
  // Remove all non-digit characters except leading +
  const cleaned = phoneNumber.replace(/[^\d+]/g, '')

  // Must have at least 8 digits (shortest valid phone numbers)
  const digitCount = cleaned.replace(/\D/g, '').length
  if (digitCount < 8) {
    return { valid: false, error: 'Phone number too short' }
  }

  // Must not exceed 15 digits (E.164 max)
  if (digitCount > 15) {
    return { valid: false, error: 'Phone number too long' }
  }

  // Australian number patterns
  const auMobileRegex = /^(\+?61|0)?4\d{8}$/
  const auLandlineRegex = /^(\+?61|0)?[2-9]\d{8}$/

  // International format with country code
  const internationalRegex = /^\+\d{8,15}$/

  if (
    auMobileRegex.test(cleaned) ||
    auLandlineRegex.test(cleaned) ||
    internationalRegex.test(cleaned)
  ) {
    return { valid: true, formatted: cleaned }
  }

  // Accept if it's just digits and reasonable length
  if (/^\d{8,15}$/.test(cleaned.replace('+', ''))) {
    return { valid: true, formatted: cleaned }
  }

  return { valid: false, error: 'Invalid phone number format' }
}

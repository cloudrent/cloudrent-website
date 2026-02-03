import { Shield } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | CloudRent Pro',
  description: 'Learn how CloudRent Pro collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="px-4 pb-12 pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              <Shield className="h-4 w-4" />
              Your privacy matters
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: February 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-2xl border border-purple-500/20 bg-purple-900/10 p-8 md:p-12">
            <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-a:text-purple-400 prose-strong:text-white">
              <h2>1. Introduction</h2>
              <p>
                CloudRent Pty Ltd (&quot;CloudRent&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our CloudRent Pro platform and related services.
              </p>
              <p>
                By using CloudRent Pro, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this privacy policy, please do not access the platform.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>2.1 Information You Provide</h3>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, phone number, company name, ABN, and billing address when you create an account.</li>
                <li><strong>Business Data:</strong> Equipment details, customer information, reservations, invoices, and other data you enter into the platform.</li>
                <li><strong>Payment Information:</strong> Credit card details are processed securely by our payment provider (Stripe) and are not stored on our servers.</li>
                <li><strong>Communications:</strong> Emails, support tickets, and other correspondence with our team.</li>
              </ul>

              <h3>2.2 Information Collected Automatically</h3>
              <ul>
                <li><strong>Usage Data:</strong> How you interact with the platform, features used, and pages visited.</li>
                <li><strong>Device Information:</strong> Browser type, operating system, device identifiers, and IP address.</li>
                <li><strong>Location Data:</strong> GPS data when using mobile app features that require location (with your permission).</li>
                <li><strong>Cookies:</strong> We use cookies and similar technologies to maintain sessions and improve user experience.</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul>
                <li>Provide, operate, and maintain CloudRent Pro</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative information, updates, and security alerts</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Analyze usage patterns to improve our services</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>4. Data Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul>
                <li><strong>Service Providers:</strong> Third parties that help us operate our platform (hosting, payment processing, email delivery).</li>
                <li><strong>Integrations:</strong> When you connect to third-party services like Xero, data is shared as necessary for the integration to function.</li>
                <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>

              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your data, including:
              </p>
              <ul>
                <li>Encryption of data in transit (TLS/SSL) and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication requirements</li>
                <li>Secure data centers located in Australia</li>
                <li>Regular data backups</li>
              </ul>

              <h2>6. Data Retention</h2>
              <p>
                We retain your data for as long as your account is active or as needed to provide services. If you close your account, we will retain certain data as required by law or for legitimate business purposes (such as resolving disputes and enforcing agreements).
              </p>

              <h2>7. Your Rights</h2>
              <p>Under Australian Privacy Law, you have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Export your data in a portable format</li>
                <li>Opt-out of marketing communications</li>
              </ul>
              <p>
                To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@cloudrent.me">privacy@cloudrent.me</a>.
              </p>

              <h2>8. Third-Party Services</h2>
              <p>
                CloudRent Pro integrates with third-party services including:
              </p>
              <ul>
                <li><strong>Stripe:</strong> Payment processing</li>
                <li><strong>Xero:</strong> Accounting integration</li>
                <li><strong>Google Maps:</strong> Location and mapping services</li>
                <li><strong>Firebase/Supabase:</strong> Authentication and database services</li>
              </ul>
              <p>These services have their own privacy policies, and we encourage you to review them.</p>

              <h2>9. Children&apos;s Privacy</h2>
              <p>
                CloudRent Pro is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <ul>
                <li>Email: <a href="mailto:privacy@cloudrent.me">privacy@cloudrent.me</a></li>
                <li>Address: Brisbane, Queensland, Australia</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/terms" className="text-purple-400 hover:text-purple-300">
              View our Terms of Service →
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

import { FileText } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | CloudRent Pro',
  description: 'Terms and conditions for using CloudRent Pro rental management software.',
}

export default function TermsPage() {
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
              <FileText className="h-4 w-4" />
              Legal agreement
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Terms of Service</h1>
            <p className="text-gray-400">Last updated: February 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="rounded-2xl border border-purple-500/20 bg-purple-900/10 p-8 md:p-12">
            <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-a:text-purple-400 prose-strong:text-white">
              <h2>1. Agreement to Terms</h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and CloudRent Pty Ltd (&quot;CloudRent&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) governing your access to and use of the CloudRent Pro platform, including any related mobile applications and services (collectively, the &quot;Service&quot;).
              </p>
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                CloudRent Pro is a cloud-based rental management platform designed for equipment hire businesses. The Service includes features for equipment tracking, reservations, invoicing, customer management, digital signatures, safety compliance, and related functionality.
              </p>

              <h2>3. Account Registration</h2>
              <p>To use the Service, you must:</p>
              <ul>
                <li>Create an account with accurate and complete information</li>
                <li>Be at least 18 years of age</li>
                <li>Have the authority to bind your organization (if applicable)</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
              <p>
                You are responsible for all activities that occur under your account.
              </p>

              <h2>4. Subscription and Billing</h2>
              <h3>4.1 Free Trial</h3>
              <p>
                We offer a 30-day free trial with full access to the Service. No credit card is required to start a trial. At the end of the trial, you must subscribe to a paid plan to continue using the Service.
              </p>

              <h3>4.2 Subscription Plans</h3>
              <p>
                Paid subscriptions are billed monthly or annually in advance. Prices are listed on our website and are subject to change with 30 days&apos; notice. All prices are in Australian Dollars (AUD) and exclude GST unless otherwise stated.
              </p>

              <h3>4.3 Payment</h3>
              <p>
                Payment is processed through Stripe. By providing payment information, you authorize us to charge the applicable fees. Failed payments may result in suspension of your account.
              </p>

              <h3>4.4 Refunds</h3>
              <p>
                Subscription fees are non-refundable except as required by Australian Consumer Law. You may cancel your subscription at any time, and it will remain active until the end of the current billing period.
              </p>

              <h2>5. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Upload malicious code, viruses, or harmful content</li>
                <li>Reverse engineer, decompile, or disassemble the Service</li>
                <li>Resell, sublicense, or redistribute the Service</li>
                <li>Use the Service in a manner that exceeds reasonable use limits</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>

              <h2>6. Your Data</h2>
              <h3>6.1 Ownership</h3>
              <p>
                You retain all ownership rights to the data you upload to the Service (&quot;Your Data&quot;). We do not claim ownership of Your Data.
              </p>

              <h3>6.2 License</h3>
              <p>
                You grant us a limited license to use, store, and process Your Data solely to provide the Service and as described in our Privacy Policy.
              </p>

              <h3>6.3 Data Export</h3>
              <p>
                You may export Your Data at any time through the Service. Upon termination, we will retain Your Data for 30 days to allow for export, after which it may be deleted.
              </p>

              <h3>6.4 Backups</h3>
              <p>
                While we perform regular backups, you are responsible for maintaining your own backups of critical data.
              </p>

              <h2>7. Intellectual Property</h2>
              <p>
                The Service, including all software, designs, trademarks, and content (excluding Your Data), is the property of CloudRent and is protected by Australian and international intellectual property laws. You may not copy, modify, or create derivative works without our written permission.
              </p>

              <h2>8. Third-Party Integrations</h2>
              <p>
                The Service may integrate with third-party services (e.g., Xero, Stripe). Your use of these integrations is subject to the respective third party&apos;s terms and conditions. We are not responsible for the functionality or availability of third-party services.
              </p>

              <h2>9. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p>
                We do not warrant that the Service will be uninterrupted, error-free, or secure.
              </p>

              <h2>10. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CLOUDRENT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES.
              </p>
              <p>
                Our total liability for any claims arising from or relating to the Service shall not exceed the amount you paid to us in the 12 months preceding the claim.
              </p>

              <h2>11. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless CloudRent and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Service or violation of these Terms.
              </p>

              <h2>12. Termination</h2>
              <p>
                Either party may terminate this agreement at any time. We may suspend or terminate your access to the Service immediately if you breach these Terms or engage in fraudulent or illegal activity.
              </p>
              <p>
                Upon termination, your right to use the Service ceases immediately. Sections relating to intellectual property, limitation of liability, indemnification, and governing law shall survive termination.
              </p>

              <h2>13. Modifications to Terms</h2>
              <p>
                We may modify these Terms at any time. Material changes will be communicated via email or through the Service with at least 30 days&apos; notice. Continued use of the Service after changes take effect constitutes acceptance of the modified Terms.
              </p>

              <h2>14. Governing Law</h2>
              <p>
                These Terms are governed by the laws of Queensland, Australia. Any disputes shall be resolved in the courts of Queensland, and you consent to the exclusive jurisdiction of those courts.
              </p>

              <h2>15. General Provisions</h2>
              <ul>
                <li><strong>Entire Agreement:</strong> These Terms, together with the Privacy Policy, constitute the entire agreement between you and CloudRent.</li>
                <li><strong>Severability:</strong> If any provision is found unenforceable, the remaining provisions shall continue in effect.</li>
                <li><strong>Waiver:</strong> Failure to enforce any right shall not constitute a waiver of that right.</li>
                <li><strong>Assignment:</strong> You may not assign these Terms without our consent. We may assign these Terms in connection with a merger or acquisition.</li>
              </ul>

              <h2>16. Contact Information</h2>
              <p>
                For questions about these Terms, please contact us:
              </p>
              <ul>
                <li>Email: <a href="mailto:legal@cloudrent.me">legal@cloudrent.me</a></li>
                <li>Address: Brisbane, Queensland, Australia</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
              View our Privacy Policy →
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

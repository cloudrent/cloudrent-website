'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useUTMParams } from '@/hooks/useUTMParams'
import {
  trackLandingPageEvent,
  trackLandingPageView,
} from '@/utilities/trackLandingPageEvent'

export default function SafetyComplianceClient() {
  const utmString = useUTMParams()

  useEffect(() => {
    trackLandingPageView('safety')
  }, [])

  const handleTrialClick = () => {
    trackLandingPageEvent('begin_trial', 'safety')
  }

  const handleDemoClick = () => {
    trackLandingPageEvent('book_demo', 'safety')
  }

  const handleNavCtaClick = () => {
    trackLandingPageEvent('nav_cta_click', 'safety')
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');

        :root {
          --sc-black: #21152b;
          --sc-steel: #2a1540;
          --sc-mid: #3a1f55;
          --sc-border: #4d2068;
          --sc-yellow: #9731cb;
          --sc-yellow2: #881ba9;
          --sc-white: #f0f0f0;
          --sc-muted: #8a93ab;
          --sc-danger: #e84040;
          --sc-green: #27c47a;
          --sc-font-display: 'Barlow Condensed', sans-serif;
          --sc-font-body: 'Barlow', sans-serif;
        }

        .safety-page {
          background: #21152b;
          color: var(--sc-white);
          font-family: var(--sc-font-body);
          font-size: 16px;
          line-height: 1.6;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* NAV */
        .sc-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 40px;
          background: rgba(13, 13, 13, 0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--sc-border);
        }

        .sc-nav-logo {
          font-family: var(--sc-font-display);
          font-weight: 900;
          font-size: 22px;
          letter-spacing: 0.04em;
          color: var(--sc-white);
          text-decoration: none;
        }

        .sc-nav-logo span {
          color: var(--sc-yellow);
        }

        .sc-nav-cta {
          background: var(--sc-yellow);
          color: var(--sc-black);
          font-family: var(--sc-font-display);
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 10px 24px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
        }

        .sc-nav-cta:hover {
          background: var(--sc-yellow2);
        }

        /* HERO */
        .sc-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 140px 40px 80px;
          position: relative;
          overflow: hidden;
          background: repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 28px,
              rgba(151, 49, 203, 0.03) 28px,
              rgba(151, 49, 203, 0.03) 30px
            ),
            linear-gradient(160deg, #0d0d0d 0%, #141824 100%);
        }

        .sc-hero::before {
          content: 'SAFETY';
          position: absolute;
          right: -60px;
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          font-family: var(--sc-font-display);
          font-size: 240px;
          font-weight: 900;
          color: rgba(151, 49, 203, 0.04);
          letter-spacing: 0.1em;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }

        .sc-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(232, 64, 64, 0.12);
          border: 1px solid rgba(232, 64, 64, 0.35);
          color: #ff6b6b;
          font-family: var(--sc-font-display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 7px 16px;
          margin-bottom: 32px;
          width: fit-content;
        }

        .sc-hero-badge::before {
          content: '';
          width: 8px;
          height: 8px;
          background: #e84040;
          border-radius: 50%;
          animation: sc-pulse 1.6s infinite;
        }

        @keyframes sc-pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.4);
          }
        }

        .sc-hero h1 {
          font-family: var(--sc-font-display);
          font-weight: 900;
          font-size: clamp(52px, 7vw, 96px);
          line-height: 0.95;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          max-width: 820px;
          margin-bottom: 28px;
        }

        .sc-hero h1 em {
          font-style: normal;
          color: var(--sc-yellow);
          display: block;
        }

        .sc-hero-sub {
          font-size: 20px;
          color: var(--sc-muted);
          max-width: 560px;
          margin-bottom: 48px;
          line-height: 1.55;
        }

        .sc-hero-sub strong {
          color: var(--sc-white);
        }

        .sc-hero-actions {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .sc-btn-primary {
          background: var(--sc-yellow);
          color: var(--sc-black);
          font-family: var(--sc-font-display);
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 18px 40px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s;
          position: relative;
        }

        .sc-btn-primary::after {
          content: '';
          position: absolute;
          bottom: -4px;
          right: -4px;
          width: 100%;
          height: 100%;
          border: 2px solid var(--sc-yellow);
          transition: all 0.2s;
        }

        .sc-btn-primary:hover {
          background: var(--sc-yellow2);
        }

        .sc-btn-primary:hover::after {
          bottom: -6px;
          right: -6px;
        }

        .sc-btn-ghost {
          color: var(--sc-white);
          font-family: var(--sc-font-display);
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 0.04em;
          text-decoration: none;
          border-bottom: 2px solid var(--sc-border);
          padding-bottom: 2px;
          transition: border-color 0.2s, color 0.2s;
        }

        .sc-btn-ghost:hover {
          border-color: var(--sc-yellow);
          color: var(--sc-yellow);
        }

        .sc-hero-trial-note {
          margin-top: 16px;
          font-size: 13px;
          color: var(--sc-muted);
          letter-spacing: 0.02em;
        }

        /* PROOF BAR */
        .sc-proof-bar {
          background: var(--sc-steel);
          border-top: 1px solid var(--sc-border);
          border-bottom: 1px solid var(--sc-border);
          padding: 20px 40px;
          display: flex;
          align-items: center;
          gap: 48px;
          overflow-x: auto;
          white-space: nowrap;
        }

        .sc-proof-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--sc-font-display);
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--sc-muted);
          flex-shrink: 0;
        }

        .sc-proof-item .icon {
          font-size: 20px;
        }

        .sc-proof-divider {
          color: var(--sc-border);
          font-size: 24px;
          flex-shrink: 0;
        }

        /* PAIN SECTION */
        .sc-pain {
          padding: 100px 40px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .sc-section-label {
          font-family: var(--sc-font-display);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--sc-yellow);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sc-section-label::before {
          content: '';
          width: 32px;
          height: 2px;
          background: var(--sc-yellow);
          display: block;
        }

        .sc-pain h2 {
          font-family: var(--sc-font-display);
          font-weight: 900;
          font-size: clamp(36px, 4vw, 58px);
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: 0.02em;
          margin-bottom: 60px;
          max-width: 700px;
        }

        .sc-pain h2 span {
          color: var(--sc-danger);
        }

        .sc-pain-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2px;
          background: var(--sc-border);
        }

        .sc-pain-card {
          background: var(--sc-steel);
          padding: 36px 32px;
          position: relative;
        }

        .sc-pain-card::before {
          content: attr(data-num);
          position: absolute;
          top: 20px;
          right: 24px;
          font-family: var(--sc-font-display);
          font-size: 64px;
          font-weight: 900;
          color: rgba(232, 64, 64, 0.08);
          line-height: 1;
        }

        .sc-pain-icon {
          font-size: 28px;
          margin-bottom: 16px;
          display: block;
        }

        .sc-pain-card h3 {
          font-family: var(--sc-font-display);
          font-weight: 700;
          font-size: 20px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 10px;
          color: var(--sc-white);
        }

        .sc-pain-card p {
          font-size: 15px;
          color: var(--sc-muted);
          line-height: 1.55;
        }

        /* SOLUTION SECTION */
        .sc-solution {
          background: var(--sc-steel);
          border-top: 1px solid var(--sc-border);
          border-bottom: 1px solid var(--sc-border);
          padding: 100px 40px;
        }

        .sc-solution-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sc-solution-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: end;
          margin-bottom: 80px;
        }

        .sc-solution h2 {
          font-family: var(--sc-font-display);
          font-weight: 900;
          font-size: clamp(36px, 4vw, 58px);
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: 0.02em;
        }

        .sc-solution h2 span {
          color: var(--sc-yellow);
        }

        .sc-solution-intro {
          font-size: 18px;
          color: var(--sc-muted);
          line-height: 1.6;
          padding-top: 16px;
          border-top: 2px solid var(--sc-yellow);
        }

        .sc-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2px;
          background: var(--sc-border);
        }

        .sc-feature-card {
          background: var(--sc-mid);
          padding: 40px 36px;
          transition: background 0.2s;
          position: relative;
          overflow: hidden;
        }

        .sc-feature-card::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--sc-yellow);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s;
        }

        .sc-feature-card:hover {
          background: #3a2555;
        }

        .sc-feature-card:hover::after {
          transform: scaleY(1);
        }

        .sc-feature-icon {
          font-size: 32px;
          margin-bottom: 20px;
          display: block;
        }

        .sc-feature-card h3 {
          font-family: var(--sc-font-display);
          font-weight: 700;
          font-size: 22px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 12px;
          color: var(--sc-white);
        }

        .sc-feature-card p {
          font-size: 15px;
          color: var(--sc-muted);
          line-height: 1.6;
        }

        .sc-feature-tag {
          display: inline-block;
          margin-top: 16px;
          font-family: var(--sc-font-display);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--sc-yellow);
          border: 1px solid rgba(151, 49, 203, 0.3);
          padding: 4px 10px;
        }

        /* COMPLIANCE CALLOUT */
        .sc-callout {
          padding: 100px 40px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .sc-callout-box {
          background: var(--sc-steel);
          border: 1px solid var(--sc-border);
          padding: 64px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .sc-callout-box::before {
          content: '\u26A0';
          position: absolute;
          right: -30px;
          bottom: -40px;
          font-size: 260px;
          opacity: 0.04;
          line-height: 1;
        }

        .sc-callout-box h2 {
          font-family: var(--sc-font-display);
          font-weight: 900;
          font-size: clamp(28px, 3.5vw, 46px);
          text-transform: uppercase;
          line-height: 1.05;
          margin-bottom: 20px;
        }

        .sc-callout-box h2 span {
          color: var(--sc-yellow);
        }

        .sc-callout-box p {
          font-size: 17px;
          color: var(--sc-muted);
          max-width: 520px;
          line-height: 1.65;
        }

        .sc-callout-stat {
          text-align: center;
          flex-shrink: 0;
          background: rgba(151, 49, 203, 0.06);
          border: 1px solid rgba(151, 49, 203, 0.2);
          padding: 36px 48px;
        }

        .sc-callout-stat .number {
          font-family: var(--sc-font-display);
          font-size: 72px;
          font-weight: 900;
          color: var(--sc-yellow);
          line-height: 1;
          display: block;
        }

        .sc-callout-stat .label {
          font-family: var(--sc-font-display);
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--sc-muted);
          margin-top: 8px;
          display: block;
        }

        /* TESTIMONIAL */
        .sc-testimonial-section {
          background: var(--sc-yellow);
          padding: 80px 40px;
        }

        .sc-testimonial-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .sc-quote-mark {
          font-family: var(--sc-font-display);
          font-size: 120px;
          font-weight: 900;
          color: rgba(0, 0, 0, 0.12);
          line-height: 0.7;
          display: block;
          margin-bottom: 24px;
        }

        .sc-testimonial-text {
          font-family: var(--sc-font-display);
          font-weight: 700;
          font-size: clamp(22px, 3vw, 36px);
          color: var(--sc-black);
          line-height: 1.2;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          margin-bottom: 32px;
        }

        .sc-testimonial-author {
          font-family: var(--sc-font-body);
          font-size: 15px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.55);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* SEGMENTS */
        .sc-segments {
          padding: 100px 40px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .sc-segments h2 {
          font-family: var(--sc-font-display);
          font-weight: 900;
          font-size: clamp(32px, 3.5vw, 52px);
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: 0.02em;
          margin-bottom: 48px;
          max-width: 600px;
        }

        .sc-segments h2 span {
          color: var(--sc-yellow);
        }

        .sc-segment-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2px;
          background: var(--sc-border);
        }

        .sc-segment-item {
          background: var(--sc-steel);
          padding: 28px 24px;
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: var(--sc-font-display);
          font-weight: 700;
          font-size: 18px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--sc-white);
          transition: background 0.2s;
        }

        .sc-segment-item:hover {
          background: var(--sc-mid);
        }

        .sc-segment-item .seg-icon {
          font-size: 24px;
        }

        .sc-segment-check {
          margin-left: auto;
          color: var(--sc-green);
          font-size: 18px;
        }

        /* CTA SECTION */
        .sc-cta-section {
          background: linear-gradient(135deg, #141824 0%, #0d0d0d 100%);
          border-top: 1px solid var(--sc-border);
          padding: 120px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .sc-cta-section::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(
            circle,
            rgba(151, 49, 203, 0.06) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .sc-cta-section h2 {
          font-family: var(--sc-font-display);
          font-weight: 900;
          font-size: clamp(42px, 6vw, 88px);
          text-transform: uppercase;
          line-height: 0.95;
          letter-spacing: 0.01em;
          margin-bottom: 24px;
          position: relative;
        }

        .sc-cta-section h2 span {
          color: var(--sc-yellow);
        }

        .sc-cta-section > p {
          font-size: 18px;
          color: var(--sc-muted);
          max-width: 500px;
          margin: 0 auto 48px;
          line-height: 1.6;
        }

        .sc-cta-pricing {
          display: flex;
          justify-content: center;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 40px;
        }

        .sc-price-big {
          font-family: var(--sc-font-display);
          font-size: 80px;
          font-weight: 900;
          color: var(--sc-yellow);
          line-height: 1;
        }

        .sc-price-detail {
          font-family: var(--sc-font-display);
          font-size: 20px;
          color: var(--sc-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-align: left;
        }

        .sc-cta-guarantees {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          margin-top: 40px;
        }

        .sc-cta-guarantee {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--sc-font-display);
          font-size: 14px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--sc-muted);
        }

        .sc-cta-guarantee .check {
          color: var(--sc-green);
          font-size: 16px;
        }

        .sc-cta-demo-link {
          display: inline-block;
          margin-top: 32px;
        }

        /* FOOTER */
        .sc-footer {
          background: #21152b;
          border-top: 1px solid var(--sc-border);
          padding: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .sc-footer .logo {
          font-family: var(--sc-font-display);
          font-weight: 900;
          font-size: 20px;
          color: var(--sc-white);
        }

        .sc-footer .logo span {
          color: var(--sc-yellow);
        }

        .sc-footer p {
          font-size: 13px;
          color: var(--sc-muted);
        }

        .sc-footer a {
          color: var(--sc-yellow);
          text-decoration: none;
          font-weight: 600;
        }

        /* ANIMATIONS */
        @keyframes sc-fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .sc-hero h1 {
          animation: sc-fadeUp 0.7s ease both;
        }

        .sc-hero-badge {
          animation: sc-fadeUp 0.5s ease both;
        }

        .sc-hero-sub {
          animation: sc-fadeUp 0.7s 0.15s ease both;
        }

        .sc-hero-actions {
          animation: sc-fadeUp 0.7s 0.25s ease both;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .sc-nav {
            padding: 16px 20px;
          }

          .sc-hero {
            padding: 120px 20px 60px;
          }

          .sc-pain,
          .sc-callout,
          .sc-segments {
            padding: 70px 20px;
          }

          .sc-solution {
            padding: 70px 20px;
          }

          .sc-solution-header {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .sc-callout-box {
            grid-template-columns: 1fr;
            padding: 36px 28px;
            gap: 32px;
          }

          .sc-callout-stat {
            width: 100%;
          }

          .sc-proof-bar {
            gap: 28px;
            padding: 16px 20px;
          }

          .sc-cta-section {
            padding: 80px 20px;
          }

          .sc-footer {
            padding: 28px 20px;
            flex-direction: column;
            text-align: center;
          }

          .sc-testimonial-section {
            padding: 60px 20px;
          }
        }
      `}</style>

      <div className="safety-page">
        {/* NAV */}
        <nav className="sc-nav">
          <Link href="/" className="sc-nav-logo">
            Cloud<span>Rent</span> Pro
          </Link>
          <Link
            href={`/demo${utmString}`}
            className="sc-nav-cta"
            onClick={handleNavCtaClick}
          >
            Book a Demo
          </Link>
        </nav>

        {/* HERO */}
        <section className="sc-hero">
          <div className="sc-hero-badge">WHS &amp; Safe Work Compliance</div>
          <h1>
            Your Hire Business
            <br />
            <em>Needs SWMS.</em>
            Not Paperwork.
          </h1>
          <p className="sc-hero-sub">
            Safe Work Method Statements built into your hire software — not a
            bolt-on, not an afterthought.{' '}
            <strong>
              CloudRent Pro is the only hire management platform with SWMS
              compliance built in from day one.
            </strong>
          </p>
          <div className="sc-hero-actions">
            <a
              href={`https://app.cloudrent.me/register${utmString}`}
              className="sc-btn-primary"
              onClick={handleTrialClick}
            >
              Start $1 Trial — 30 Days Full Access
            </a>
            <Link
              href={`/demo${utmString}`}
              className="sc-btn-ghost"
              onClick={handleDemoClick}
            >
              Book a Live Demo &rarr;
            </Link>
          </div>
          <p className="sc-hero-trial-note">
            Credit card required for $1 charge. Cancel anytime.
          </p>
        </section>

        {/* PROOF BAR */}
        <div className="sc-proof-bar">
          <div className="sc-proof-item">
            <span className="icon">🏗️</span> Construction &amp; Plant Hire
          </div>
          <div className="sc-proof-divider">|</div>
          <div className="sc-proof-item">
            <span className="icon">🏗️</span> Scaffold &amp; Fencing
          </div>
          <div className="sc-proof-divider">|</div>
          <div className="sc-proof-item">
            <span className="icon">🔧</span> Tool Hire
          </div>
          <div className="sc-proof-divider">|</div>
          <div className="sc-proof-item">
            <span className="icon">🎪</span> Event &amp; Party
          </div>
          <div className="sc-proof-divider">|</div>
          <div className="sc-proof-item">
            <span className="icon">🎬</span> AV &amp; Film
          </div>
          <div className="sc-proof-divider">|</div>
          <div className="sc-proof-item">
            <span className="icon">🇦🇺</span> Australian-Made. GST Ready.
          </div>
        </div>

        {/* PAIN SECTION */}
        <section className="sc-pain">
          <div className="sc-section-label">The Real Problem</div>
          <h2>
            When Someone Gets Hurt On Site — <span>Who&apos;s Liable?</span>
          </h2>
          <div className="sc-pain-grid">
            <div className="sc-pain-card" data-num="01">
              <span className="sc-pain-icon">📋</span>
              <h3>No SWMS = No Cover</h3>
              <p>
                If your equipment is on a worksite without a valid Safe Work
                Method Statement, Safe Work Australia holds you responsible.
                Full stop.
              </p>
            </div>
            <div className="sc-pain-card" data-num="02">
              <span className="sc-pain-icon">📁</span>
              <h3>Paper Forms Get Lost</h3>
              <p>
                Clipboards go missing. PDFs sit in email chains. When an
                inspector arrives, scrambling for paperwork is not a defence.
              </p>
            </div>
            <div className="sc-pain-card" data-num="03">
              <span className="sc-pain-icon">✍️</span>
              <h3>Signatures Are Impossible to Prove</h3>
              <p>
                Paper sign-offs are easily disputed. Without timestamped digital
                records, you have no proof anyone actually read and agreed to
                the SWMS.
              </p>
            </div>
            <div className="sc-pain-card" data-num="04">
              <span className="sc-pain-icon">⏰</span>
              <h3>Expired Documents Happen</h3>
              <p>
                SWMS documents expire. Keeping track of what&apos;s current and what
                needs renewal across multiple jobs is a full-time job in itself.
              </p>
            </div>
          </div>
        </section>

        {/* SOLUTION SECTION */}
        <section className="sc-solution">
          <div className="sc-solution-inner">
            <div className="sc-section-label">How CloudRent Pro Solves It</div>
            <div className="sc-solution-header">
              <h2>
                Built-In Safety. <span>Zero Extra Software.</span>
              </h2>
              <p className="sc-solution-intro">
                Every SWMS is created, signed, stored and tracked inside the
                same platform you use to manage your bookings, invoices and
                dispatch. One login. Total compliance.
              </p>
            </div>
            <div className="sc-features-grid">
              <div className="sc-feature-card">
                <span className="sc-feature-icon">📝</span>
                <h3>SWMS Creation</h3>
                <p>
                  Build Safe Work Method Statements directly inside CloudRent
                  Pro. Identify hazards, set control measures, and document task
                  steps — all in a guided workflow.
                </p>
                <span className="sc-feature-tag">Built In</span>
              </div>
              <div className="sc-feature-card">
                <span className="sc-feature-icon">✍️</span>
                <h3>Digital Sign-Off</h3>
                <p>
                  Multiple signatories. On-site signing via mobile. Timestamped,
                  legally sound, and instantly stored against the booking — no
                  printing required.
                </p>
                <span className="sc-feature-tag">Mobile Ready</span>
              </div>
              <div className="sc-feature-card">
                <span className="sc-feature-icon">📸</span>
                <h3>Photo Evidence</h3>
                <p>
                  Attach photos of site conditions directly to the SWMS.
                  Documented proof of what was assessed on the day —
                  unambiguous, timestamped, yours.
                </p>
                <span className="sc-feature-tag">Site Proof</span>
              </div>
              <div className="sc-feature-card">
                <span className="sc-feature-icon">📄</span>
                <h3>PDF Generation</h3>
                <p>
                  Generate professional SWMS PDFs on demand. Share with site
                  managers, inspectors or clients in seconds — straight from the
                  booking record.
                </p>
                <span className="sc-feature-tag">Instant PDF</span>
              </div>
              <div className="sc-feature-card">
                <span className="sc-feature-icon">🔔</span>
                <h3>Expiry Alerts</h3>
                <p>
                  CloudRent Pro tracks every SWMS and flags documents before
                  they expire. Never send equipment to site on an out-of-date
                  document again.
                </p>
                <span className="sc-feature-tag">Auto-Alerts</span>
              </div>
              <div className="sc-feature-card">
                <span className="sc-feature-icon">🗂️</span>
                <h3>Audit-Ready Records</h3>
                <p>
                  Every SWMS is stored against the booking, linked to the
                  customer, and ready for inspection. Status tracked from Draft
                  → Pending → Active.
                </p>
                <span className="sc-feature-tag">Fully Traceable</span>
              </div>
            </div>
          </div>
        </section>

        {/* COMPLIANCE CALLOUT */}
        <section className="sc-callout">
          <div className="sc-callout-box">
            <div>
              <div className="sc-section-label">Australian WHS Law</div>
              <h2>
                Safe Work Australia <span>Fines Are Real.</span>
              </h2>
              <p>
                Under Australian WHS legislation, hire businesses that supply
                plant or equipment to a worksite are classified as a &quot;person
                conducting a business or undertaking&quot; (PCBU). That means you
                share the duty of care — and the legal exposure — if something
                goes wrong without proper documentation in place.
              </p>
              <br />
              <p style={{ color: 'var(--sc-white)' }}>
                CloudRent Pro gives you the paper trail to prove you did
                everything right.
              </p>
            </div>
            <div className="sc-callout-stat">
              <span className="number">$3.8M</span>
              <span className="label">
                Max WHS penalty
                <br />
                for corporations
              </span>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="sc-testimonial-section">
          <div className="sc-testimonial-inner">
            <span className="sc-quote-mark">&quot;</span>
            <p className="sc-testimonial-text">
              &quot;We used to have SWMS on paper. CloudRent Pro changed everything —
              our team signs off on site from their phone and the record is
              there instantly. An inspector turned up last month and we had
              everything ready in 30 seconds.&quot;
            </p>
            <p className="sc-testimonial-author">
              — CloudRent Pro Customer &nbsp;|&nbsp; Plant Hire Business, QLD
            </p>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section className="sc-segments">
          <div className="sc-section-label">Who It&apos;s Built For</div>
          <h2>
            Every Hire Segment. <span>One Platform.</span>
          </h2>
          <div className="sc-segment-list">
            <div className="sc-segment-item">
              <span className="seg-icon">🏗️</span> Construction &amp; Plant Hire{' '}
              <span className="sc-segment-check">✓</span>
            </div>
            <div className="sc-segment-item">
              <span className="seg-icon">🔩</span> Scaffold &amp; Fencing{' '}
              <span className="sc-segment-check">✓</span>
            </div>
            <div className="sc-segment-item">
              <span className="seg-icon">🔧</span> Tool Hire{' '}
              <span className="sc-segment-check">✓</span>
            </div>
            <div className="sc-segment-item">
              <span className="seg-icon">🎪</span> Event &amp; Party Hire{' '}
              <span className="sc-segment-check">✓</span>
            </div>
            <div className="sc-segment-item">
              <span className="seg-icon">🎬</span> AV &amp; Film{' '}
              <span className="sc-segment-check">✓</span>
            </div>
            <div className="sc-segment-item">
              <span className="seg-icon">🌿</span> Landscaping &amp; Civil{' '}
              <span className="sc-segment-check">✓</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="sc-cta-section">
          <h2>
            Start Safe.
            <br />
            <span>Start Today.</span>
          </h2>
          <p>
            Full access to every feature — including SWMS, digital sign-off, and
            dispatch. One price. No lock-in.
          </p>
          <div className="sc-cta-pricing">
            <span className="sc-price-big">$1</span>
            <span className="sc-price-detail">
              / 30-day full
              <br />
              access trial
            </span>
          </div>
          <a
            href={`https://app.cloudrent.me/register${utmString}`}
            className="sc-btn-primary"
            style={{ fontSize: '20px', padding: '22px 56px' }}
            onClick={handleTrialClick}
          >
            Start Your $1 Trial Now
          </a>
          <div className="sc-cta-guarantees">
            <div className="sc-cta-guarantee">
              <span className="check">✓</span> Credit card required for $1
            </div>
            <div className="sc-cta-guarantee">
              <span className="check">✓</span> Full feature access from day one
            </div>
            <div className="sc-cta-guarantee">
              <span className="check">✓</span> Cancel anytime
            </div>
            <div className="sc-cta-guarantee">
              <span className="check">✓</span> Australian-made &amp; supported
            </div>
          </div>
          <div className="sc-cta-demo-link">
            <Link
              href={`/demo${utmString}`}
              className="sc-btn-ghost"
              onClick={handleDemoClick}
            >
              Prefer a live walkthrough? Book a demo with Ron &rarr;
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="sc-footer">
          <div className="logo">
            Cloud<span>Rent</span> Pro
          </div>
          <p>
            Built for Australian hire businesses. GST compliant. &copy; 2026
            CloudRent Pro.
          </p>
          <p>
            Questions?{' '}
            <a href="mailto:support@cloudrent.me">support@cloudrent.me</a>
          </p>
        </footer>
      </div>
    </>
  )
}

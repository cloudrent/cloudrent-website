'use client'

import { useEffect, useId, useRef } from "react";

/**
 * CloudRentEcosystem
 * -------------------
 * Animated, self-contained SVG diagram of the CloudRent product suite.
 *
 * Behaviour:
 *   - On mount (and when scrolled back into view) the diagram builds itself:
 *     CloudRent Pro appears first, then each product is introduced one at a
 *     time, connectors draw in, data-flow pulses run, and finally the headline
 *     rises in as the closing payoff.
 *   - A "Replay" button restarts the whole sequence.
 *
 * Notes:
 *   - Styling is fully scoped under `.cre-stage` with `cre-` prefixed class
 *     names, so it will not collide with your app's global CSS.
 *   - All gradient/filter IDs are namespaced with useId(), so multiple
 *     instances on the same page render correctly.
 *   - To retime the animation, edit the `--delay` / `--edelay` inline styles
 *     on each element. To restyle, change the palette custom properties in the
 *     `.cre-stage { ... }` block (--purple-deep, --lav, --line, etc.).
 */

const CSS = `
.cre-stage{
  --purple-deep:#7B1E9E; --purple-mid:#9C27B0;
  --lav:#EFE4F7; --lav-soft:#F6EEFB;
  --ink:#17223B; --muted:#5B6472; --line:#D9C2EA; --dash:#B79BD0;
  position:relative; width:100%; max-width:1600px; margin:0 auto; padding:8px 16px 4px;
  font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  color:var(--ink);
}
.cre-stage svg{ width:100%; height:auto; display:block; overflow:visible; }

/* ---------- Replay control ---------- */
.cre-controls{ position:absolute; top:14px; right:22px; z-index:5; display:flex; gap:8px; }
.cre-btn{
  appearance:none; border:1px solid var(--line); background:#fff; color:var(--purple-deep);
  font-weight:600; font-size:13px; letter-spacing:.2px; padding:8px 14px; border-radius:999px;
  cursor:pointer; box-shadow:0 2px 8px rgba(123,30,158,.08);
  transition:transform .15s ease, box-shadow .15s ease, background .15s ease;
}
.cre-btn:hover{ transform:translateY(-1px); box-shadow:0 6px 16px rgba(123,30,158,.18); background:var(--lav-soft); }
.cre-btn:active{ transform:translateY(0); }

/* ---------- Cards: fade + rise + slight scale ---------- */
.cre-card{
  opacity:0; transform:translate(var(--dx,0px),var(--dy,22px)) scale(.965);
  transform-box:fill-box; transform-origin:center;
}
.cre-play .cre-card{ animation:cre-cardIn .8s cubic-bezier(.2,.7,.2,1) forwards; animation-delay:var(--delay,0s); }
@keyframes cre-cardIn{
  0%{ opacity:0; transform:translate(var(--dx,0px),var(--dy,22px)) scale(.965); }
  100%{ opacity:1; transform:translate(0,0) scale(1); }
}

/* ---------- Connector draw ---------- */
.cre-connector{
  fill:none; stroke:var(--line); stroke-width:3.2; stroke-linecap:round; stroke-linejoin:round;
  stroke-dasharray:100; stroke-dashoffset:100;
}
.cre-play .cre-connector{ animation:cre-draw .7s ease forwards; animation-delay:var(--delay,0s); }
@keyframes cre-draw{ to{ stroke-dashoffset:0; } }

.cre-connector.cre-dashed{ stroke:var(--dash); stroke-width:2.6; stroke-dasharray:6 7; stroke-dashoffset:0; opacity:0; }
.cre-play .cre-connector.cre-dashed{
  animation:cre-dashIn .6s ease forwards, cre-marching 1.4s linear .6s infinite;
  animation-delay:var(--delay,0s), calc(var(--delay,0s) + .6s);
}
@keyframes cre-dashIn{ from{ opacity:0 } to{ opacity:1 } }
@keyframes cre-marching{ to{ stroke-dashoffset:-26; } }

/* ---------- Fade-in helper (footer) ---------- */
.cre-fade{ opacity:0; }
.cre-play .cre-fade{ animation:cre-fadeIn .7s ease forwards; animation-delay:var(--delay,0s); }
@keyframes cre-fadeIn{ to{ opacity:1; } }

/* ---------- Flowing data pulse along connectors (loops) ---------- */
.cre-pulse{ fill:var(--purple-mid); opacity:0; }
.cre-play .cre-pulse{ animation:cre-pulseShow .01s linear forwards; animation-delay:var(--delay,0s); }
@keyframes cre-pulseShow{ to{ opacity:1; } }

/* ---------- Gentle screen shimmer on the central laptop ---------- */
.cre-shimmer{ opacity:0; }
.cre-play .cre-shimmer{ animation:cre-shimmer 3.4s ease-in-out 1.4s infinite; }
@keyframes cre-shimmer{ 0%,100%{ opacity:0 } 50%{ opacity:.5 } }

/* ---------- Soft breathing glow behind the hub ---------- */
.cre-hub-glow{ opacity:0; transform-box:fill-box; transform-origin:center; }
.cre-play .cre-hub-glow{ animation:cre-glow 4.5s ease-in-out 1.2s infinite; }
@keyframes cre-glow{ 0%,100%{ opacity:0; transform:scale(.96) } 50%{ opacity:.55; transform:scale(1.04) } }

/* ---------- Headline: hidden during the build, ENTERS only at the end ---------- */
.cre-hl-group{ opacity:1; transform-box:fill-box; transform-origin:center; }
.cre-play .cre-hl-group{ animation:cre-hlBreathe 4.2s ease-in-out 10.6s infinite; }

.cre-hl-line{ opacity:0; transform-box:fill-box; transform-origin:left center; }
.cre-play .cre-hl-line{ animation:cre-hlIn .95s cubic-bezier(.2,.7,.2,1) var(--edelay,8.4s) both; }
@keyframes cre-hlIn{
  0%{ opacity:0; transform:translateY(16px) scale(.97); }
  60%{ opacity:1; transform:translateY(0) scale(1.04); }
  80%{ transform:scale(1); }
  100%{ opacity:1; transform:translateY(0) scale(1); }
}
@keyframes cre-hlBreathe{ 0%,100%{ transform:scale(1); } 50%{ transform:scale(1.014); } }

.cre-hl-accent{ fill:var(--purple-mid); opacity:0; transform-box:fill-box; transform-origin:left center; transform:scaleX(0); }
.cre-play .cre-hl-accent{ animation:cre-accIn .55s cubic-bezier(.2,.7,.2,1) 9.7s forwards; }
@keyframes cre-accIn{ 0%{ opacity:0; transform:scaleX(0); } 30%{ opacity:1; } 100%{ opacity:1; transform:scaleX(1); } }

/* ---------- Text styles ---------- */
.cre-title{ font-weight:800; fill:var(--ink); }
.cre-kicker{ font-weight:600; fill:var(--muted); }
.cre-sub{ font-weight:500; fill:var(--muted); }
.cre-brand{ font-weight:500; fill:#9AA3B2; letter-spacing:.4px; }

@media (prefers-reduced-motion: reduce){
  .cre-stage svg *{ animation:none !important; }
  .cre-card, .cre-fade, .cre-hl-line{ opacity:1 !important; transform:none !important; }
  .cre-connector{ stroke-dashoffset:0 !important; }
  .cre-hl-accent{ opacity:1 !important; transform:scaleX(1) !important; }
  .cre-hub-glow, .cre-pulse{ opacity:0 !important; }
}
`;

interface CloudRentEcosystemProps {
  className?: string;
  [key: string]: unknown;
}

export default function CloudRentEcosystem({ className = "", ...rest }: CloudRentEcosystemProps) {
  const sceneRef = useRef<SVGSVGElement>(null);
  const uid = useId();
  const gid = (name: string) => `${uid}${name}`;
  const u = (name: string) => `url(#${uid}${name})`;

  const play = () => {
    const scene = sceneRef.current;
    if (!scene) return;
    scene.classList.remove("cre-play");
    // force reflow so the CSS animations restart from 0
    void scene.getBoundingClientRect();
    scene.classList.add("cre-play");
  };

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || typeof IntersectionObserver === "undefined") return;
    let seen = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (seen) play();
            seen = true;
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(scene);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`cre-stage ${className}`.trim()} {...rest}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="cre-controls">
        <button className="cre-btn" type="button" onClick={play} aria-label="Replay animation">
          ↻ Replay
        </button>
      </div>

      <svg
        ref={sceneRef}
        className="cre-play"
        viewBox="0 0 1600 770"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="CloudRent product ecosystem diagram"
      >
        <defs>
          <linearGradient id={gid("lav")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EFE4F7" />
            <stop offset=".55" stopColor="#F8F2FC" />
            <stop offset="1" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id={gid("hdr")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8A24AE" />
            <stop offset="1" stopColor="#7B1E9E" />
          </linearGradient>
          <radialGradient id={gid("glowg")} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#C77DE0" stopOpacity=".9" />
            <stop offset="1" stopColor="#C77DE0" stopOpacity="0" />
          </radialGradient>
          <filter id={gid("soft")} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="#7B1E9E" floodOpacity="0.10" />
          </filter>
          <filter id={gid("softsm")} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1a1030" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* ================= CONNECTORS (under cards) ================= */}
        <path className="cre-connector" style={{ "--delay": "2.2s" } as React.CSSProperties} pathLength={100} d="M 610 452 H 566 V 280 H 524" />
        <path className="cre-connector" style={{ "--delay": "3.7s" } as React.CSSProperties} pathLength={100} d="M 610 520 H 574 V 604 H 508" />
        <path className="cre-connector" style={{ "--delay": "5.2s" } as React.CSSProperties} pathLength={100} d="M 1082 476 H 1120 V 596 H 1158" />
        <path className="cre-connector cre-dashed" style={{ "--delay": "6.7s" } as React.CSSProperties} pathLength={100} d="M 846 250 V 210" />

        {/* Flowing data pulses (loop after the intro) */}
        <circle className="cre-pulse" r="5" style={{ "--delay": "8.0s" } as React.CSSProperties}>
          <animateMotion dur="2.6s" begin="8s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear" path="M 610 452 H 566 V 280 H 524" />
        </circle>
        <circle className="cre-pulse" r="5" style={{ "--delay": "8.2s" } as React.CSSProperties}>
          <animateMotion dur="2.8s" begin="8.2s" repeatCount="indefinite" path="M 610 520 H 574 V 604 H 508" />
        </circle>
        <circle className="cre-pulse" r="5" style={{ "--delay": "8.4s" } as React.CSSProperties}>
          <animateMotion dur="2.8s" begin="8.4s" repeatCount="indefinite" path="M 1082 476 H 1120 V 596 H 1158" />
        </circle>

        {/* ================= REACH (top, marketing layer) ================= */}
        <g className="cre-card" style={{ "--delay": "7.0s", "--dy": "-18px" } as React.CSSProperties}>
          <rect x="566" y="18" width="560" height="190" rx="18" fill={u("lav")} filter={u("soft")} />
          <rect x="566" y="18" width="560" height="12" rx="6" fill={u("hdr")} />
          <g transform="translate(602,65)">
            <rect x="0" y="0" width="150" height="108" rx="10" fill="#fff" stroke="#E7D8F2" />
            <rect x="0" y="0" width="150" height="20" rx="10" fill="#F0E3F8" />
            <circle cx="14" cy="10" r="3" fill="#C77DE0" />
            <circle cx="26" cy="10" r="3" fill="#D9C2EA" />
            <circle cx="38" cy="10" r="3" fill="#E7D8F2" />
            <circle cx="30" cy="52" r="16" fill="none" stroke="#9C27B0" strokeWidth="6" strokeDasharray="52 100" transform="rotate(-90 30 52)" />
            <rect x="58" y="34" width="78" height="7" rx="3.5" fill="#E3D2F0" />
            <rect x="58" y="47" width="60" height="7" rx="3.5" fill="#EEE3F6" />
            <rect x="18" y="78" width="16" height="18" rx="2" fill="#9C27B0" />
            <rect x="40" y="70" width="16" height="26" rx="2" fill="#C77DE0" />
            <rect x="62" y="82" width="16" height="14" rx="2" fill="#E0C7EE" />
            <rect x="92" y="72" width="44" height="7" rx="3.5" fill="#E3D2F0" />
            <rect x="92" y="85" width="30" height="7" rx="3.5" fill="#EEE3F6" />
          </g>
          <text className="cre-kicker" x="784" y="86" fontSize="21">CloudRent marketing layer</text>
          <text className="cre-title" x="784" y="126" fontSize="40">CloudRent Reach</text>
          <text className="cre-sub" x="784" y="162" fontSize="22">Marketing and lead generation</text>
        </g>

        {/* ================= HEADLINE (top-right, opposite Connect) ================= */}
        <g className="cre-hl-group">
          <text className="cre-kicker cre-hl-line" style={{ "--edelay": "8.2s" } as React.CSSProperties} x="1172" y="196" fontSize="19" letterSpacing="2.4" fontWeight="700">THE CLOUDRENT ECOSYSTEM</text>
          <text className="cre-title cre-hl-line" style={{ "--edelay": "8.4s" } as React.CSSProperties} x="1170" y="248" fontSize="41">One platform.</text>
          <text className="cre-title cre-hl-line" style={{ "--edelay": "8.6s" } as React.CSSProperties} x="1170" y="296" fontSize="41">Every role in</text>
          <text className="cre-title cre-hl-line" style={{ "--edelay": "8.8s" } as React.CSSProperties} x="1170" y="344" fontSize="41">a business.</text>
          <rect className="cre-hl-accent" x="1170" y="362" width="214" height="7" rx="3.5" />
        </g>

        {/* ================= CONNECT (left top) ================= */}
        <g className="cre-card" style={{ "--delay": "2.5s", "--dx": "-26px" } as React.CSSProperties}>
          <rect x="120" y="120" width="404" height="310" rx="18" fill={u("lav")} filter={u("soft")} />
          <g transform="translate(196,150)">
            <rect x="0" y="0" width="150" height="112" rx="10" fill="#fff" stroke="#E7D8F2" />
            <rect x="10" y="12" width="72" height="12" rx="4" fill="#3A2350" />
            <rect x="10" y="30" width="86" height="6" rx="3" fill="#E7D8F2" />
            <rect x="10" y="42" width="60" height="6" rx="3" fill="#EEE3F6" />
            <rect x="10" y="78" width="42" height="10" rx="5" fill="#9C27B0" />
            <g transform="translate(92,44)">
              <rect x="0" y="14" width="52" height="44" rx="5" fill="#fff" stroke="#C77DE0" strokeWidth="2" />
              <path d="M -4 14 L 4 0 H 52 L 60 14 Z" fill="#9C27B0" />
              <rect x="0" y="14" width="56" height="6" fill="#C77DE0" />
              <path d="M 4 20 h 8 v 6 a4 4 0 0 1 -8 0 z M 12 20 h 8 v 6 a4 4 0 0 1 -8 0 z M 20 20 h 8 v 6 a4 4 0 0 1 -8 0 z M 28 20 h 8 v 6 a4 4 0 0 1 -8 0 z M 36 20 h 8 v 6 a4 4 0 0 1 -8 0 z" fill="#EAD6F4" />
              <rect x="18" y="36" width="18" height="22" rx="2" fill="#F0E3F8" />
              <circle cx="44" cy="60" r="6" fill="#9C27B0" />
            </g>
          </g>
          <text className="cre-title" x="322" y="330" fontSize="34" textAnchor="middle">CloudRent Connect</text>
          <text className="cre-sub" x="322" y="368" fontSize="22" textAnchor="middle">24/7 customer portal</text>
        </g>

        {/* ================= CREW (left bottom, mobile) ================= */}
        <g className="cre-card" style={{ "--delay": "4.0s", "--dx": "-26px", "--dy": "20px" } as React.CSSProperties}>
          <rect x="120" y="502" width="360" height="210" rx="18" fill="#fff" filter={u("soft")} stroke="#F0E9F6" />
          <text className="cre-title" x="150" y="586" fontSize="30">CloudRent</text>
          <text className="cre-title" x="150" y="620" fontSize="30">Crew</text>
          <text className="cre-sub" x="150" y="656" fontSize="21">Driver &amp; warehouse</text>
          <text className="cre-sub" x="150" y="682" fontSize="21">mobile app</text>
        </g>
        <g className="cre-card" style={{ "--delay": "4.2s", "--dy": "24px" } as React.CSSProperties}>
          <g transform="translate(392,486)" filter={u("softsm")}>
            <rect x="0" y="0" width="118" height="210" rx="20" fill="#2B2E38" />
            <rect x="7" y="9" width="104" height="192" rx="14" fill="#fff" />
            <rect x="42" y="4" width="34" height="7" rx="3.5" fill="#2B2E38" />
            <text x="20" y="42" fontSize="13" fontWeight="700" fill="#17223B">Job list</text>
            <g fill="#EFE4F7">
              <rect x="18" y="54" width="82" height="14" rx="4" />
              <rect x="18" y="74" width="82" height="14" rx="4" />
              <rect x="18" y="94" width="82" height="14" rx="4" />
            </g>
            <g fill="#C77DE0">
              <rect x="24" y="59" width="46" height="4" rx="2" />
              <rect x="24" y="79" width="54" height="4" rx="2" />
              <rect x="24" y="99" width="40" height="4" rx="2" />
            </g>
            <g fill="#2B2E38" transform="translate(24,128)">
              <rect x="0" y="0" width="3" height="46" /><rect x="6" y="0" width="2" height="46" /><rect x="11" y="0" width="4" height="46" /><rect x="18" y="0" width="2" height="46" /><rect x="23" y="0" width="3" height="46" /><rect x="30" y="0" width="2" height="46" /><rect x="35" y="0" width="4" height="46" /><rect x="42" y="0" width="2" height="46" /><rect x="47" y="0" width="3" height="46" /><rect x="54" y="0" width="4" height="46" /><rect x="61" y="0" width="2" height="46" /><rect x="66" y="0" width="3" height="46" />
            </g>
          </g>
        </g>

        {/* ================= COMMAND (right, mobile) ================= */}
        <g className="cre-card" style={{ "--delay": "5.5s", "--dx": "26px", "--dy": "20px" } as React.CSSProperties}>
          <rect x="1230" y="502" width="330" height="188" rx="18" fill="#fff" filter={u("soft")} stroke="#F0E9F6" />
          <text className="cre-title" x="1408" y="576" fontSize="30" textAnchor="middle">CloudRent</text>
          <text className="cre-title" x="1408" y="610" fontSize="30" textAnchor="middle">Command</text>
          <text className="cre-sub" x="1408" y="648" fontSize="21" textAnchor="middle">Manager mobile app</text>
        </g>
        <g className="cre-card" style={{ "--delay": "5.7s", "--dy": "24px" } as React.CSSProperties}>
          <g transform="translate(1156,486)" filter={u("softsm")}>
            <rect x="0" y="0" width="118" height="210" rx="20" fill="#2B2E38" />
            <rect x="7" y="9" width="104" height="192" rx="14" fill="#fff" />
            <rect x="42" y="4" width="34" height="7" rx="3.5" fill="#2B2E38" />
            <text x="20" y="40" fontSize="11" fontWeight="700" fill="#17223B">Dashboard</text>
            <rect x="18" y="50" width="40" height="26" rx="6" fill="#EFE4F7" />
            <rect x="62" y="50" width="40" height="26" rx="6" fill="#DDF3E3" />
            <circle cx="30" cy="63" r="5" fill="#9C27B0" />
            <circle cx="74" cy="63" r="5" fill="#37B24D" />
            <text x="20" y="98" fontSize="10" fontWeight="600" fill="#5B6472">Approvals</text>
            <g>
              <rect x="18" y="104" width="84" height="14" rx="4" fill="#F4F6F8" />
              <rect x="18" y="122" width="84" height="14" rx="4" fill="#F4F6F8" />
              <rect x="18" y="140" width="84" height="14" rx="4" fill="#F4F6F8" />
            </g>
            <g fill="#37B24D">
              <circle cx="26" cy="111" r="4" /><circle cx="26" cy="129" r="4" /><circle cx="26" cy="147" r="4" />
            </g>
            <g fill="#DCE1E7">
              <rect x="36" y="109" width="56" height="4" rx="2" /><rect x="36" y="127" width="48" height="4" rx="2" /><rect x="36" y="145" width="52" height="4" rx="2" />
            </g>
            <text x="20" y="176" fontSize="10" fontWeight="600" fill="#5B6472">Schedules</text>
            <rect x="18" y="182" width="84" height="8" rx="4" fill="#EFE4F7" />
          </g>
        </g>

        {/* ================= PRO (center hub) ================= */}
        <ellipse className="cre-hub-glow" cx="846" cy="450" rx="330" ry="250" fill={u("glowg")} />
        <g className="cre-card" style={{ "--delay": ".25s" } as React.CSSProperties}>
          <rect x="610" y="250" width="472" height="392" rx="20" fill={u("lav")} filter={u("soft")} />
          <rect x="610" y="250" width="472" height="70" rx="20" fill={u("hdr")} />
          <rect x="610" y="300" width="472" height="20" fill={u("hdr")} />
          <circle cx="640" cy="285" r="4.5" fill="#E9C7F2" />
          <g transform="translate(686,300)">
            <rect x="0" y="0" width="320" height="196" rx="12" fill="#2B2440" />
            <rect x="10" y="10" width="300" height="176" rx="7" fill="#F7F3FB" />
            <rect x="10" y="10" width="52" height="176" rx="7" fill="#efe4f7" />
            <circle cx="26" cy="30" r="6" fill="#9C27B0" />
            <g fill="#CBB6DE">
              <rect x="20" y="52" width="30" height="5" rx="2.5" /><rect x="20" y="66" width="30" height="5" rx="2.5" /><rect x="20" y="80" width="30" height="5" rx="2.5" /><rect x="20" y="94" width="30" height="5" rx="2.5" />
            </g>
            <text x="76" y="40" fontSize="15" fontWeight="700" fill="#3A2350">Inventory</text>
            <rect className="cre-shimmer" x="76" y="14" width="224" height="26" rx="6" fill="#C77DE0" />
            <g>
              <rect x="76" y="56" width="52" height="42" rx="6" fill="#fff" stroke="#E7D8F2" />
              <rect x="136" y="56" width="52" height="42" rx="6" fill="#fff" stroke="#E7D8F2" />
              <rect x="196" y="56" width="52" height="42" rx="6" fill="#fff" stroke="#E7D8F2" />
              <text x="90" y="83" fontSize="18">🚚</text>
              <rect x="148" y="72" width="28" height="12" rx="2" fill="#C77DE0" />
              <rect x="206" y="70" width="32" height="16" rx="2" fill="#EAD6F4" />
            </g>
            <rect x="256" y="56" width="46" height="42" rx="6" fill="#fff" stroke="#E7D8F2" />
            <g fill="#D9C2EA">
              <rect x="262" y="66" width="8" height="6" rx="1" /><rect x="273" y="66" width="8" height="6" rx="1" /><rect x="284" y="66" width="8" height="6" rx="1" /><rect x="262" y="76" width="8" height="6" rx="1" /><rect x="273" y="76" width="8" height="6" rx="1" /><rect x="284" y="76" width="8" height="6" rx="1" />
            </g>
            <rect x="284" y="76" width="8" height="6" rx="1" fill="#9C27B0" />
            <g>
              <rect x="76" y="112" width="226" height="16" rx="4" fill="#fff" stroke="#EEE3F6" />
              <rect x="76" y="134" width="226" height="16" rx="4" fill="#fff" stroke="#EEE3F6" />
              <rect x="76" y="156" width="226" height="16" rx="4" fill="#fff" stroke="#EEE3F6" />
            </g>
            <g fill="#DCE1E7">
              <rect x="86" y="118" width="70" height="4" rx="2" /><rect x="86" y="140" width="70" height="4" rx="2" /><rect x="86" y="162" width="70" height="4" rx="2" />
            </g>
            <g fill="#EAD6F4">
              <rect x="180" y="118" width="40" height="4" rx="2" /><rect x="180" y="140" width="40" height="4" rx="2" /><rect x="180" y="162" width="40" height="4" rx="2" />
            </g>
            <path d="M -26 196 H 346 L 336 214 H -16 Z" fill="#C9C2D6" />
            <rect x="130" y="196" width="60" height="5" rx="2.5" fill="#A99FBE" />
          </g>
          <text className="cre-title" x="846" y="586" fontSize="40" textAnchor="middle">CloudRent Pro</text>
          <text className="cre-sub" x="846" y="626" fontSize="23" textAnchor="middle">Business management platform</text>
        </g>

        {/* ================= FOOTER ================= */}
        <text className="cre-brand cre-fade" style={{ "--delay": "7.8s" } as React.CSSProperties} x="800" y="752" fontSize="22" textAnchor="middle">cloudrent.me</text>
      </svg>
    </div>
  );
}

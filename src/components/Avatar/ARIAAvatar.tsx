import React, { useEffect, useState } from 'react';
import { ARIAState } from '../../types';

interface ARIAAvatarProps {
  state: ARIAState;
  audioVolume?: number; // 0 to 1 for dynamic reactive animation
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showStatusBadge?: boolean;
  statusLabel?: string;
  languageText?: string;
}

export const ARIAAvatar: React.FC<ARIAAvatarProps> = ({
  state,
  audioVolume = 0,
  size = 'lg',
  showStatusBadge = true,
  statusLabel,
  languageText,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(0.2);

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3800 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Speaking mouth movement simulation
  useEffect(() => {
    if (state !== 'SPEAKING') {
      setMouthOpen(0.15);
      return;
    }

    const interval = setInterval(() => {
      // Oscillate between 0.2 and 0.85
      setMouthOpen(0.2 + Math.random() * 0.65);
    }, 140);

    return () => clearInterval(interval);
  }, [state]);

  // Size mappings
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-44 h-44',
    lg: 'w-72 h-72 sm:w-80 sm:h-80',
    hero: 'w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96',
  }[size];

  // Colors & Aura based on state
  const getGlowRingClass = () => {
    switch (state) {
      case 'SPEAKING':
        return 'border-violet shadow-glow-violet animate-pulse';
      case 'LISTENING':
        return 'border-cyan shadow-glow-cyan animate-pulse';
      case 'THINKING':
        return 'border-violet/60 border-dashed animate-spin-slow';
      case 'COMPLETED':
        return 'border-status-success shadow-[0_0_35px_rgba(66,214,164,0.4)]';
      case 'IDLE':
      default:
        return 'border-violet/30 shadow-[0_0_20px_rgba(128,103,247,0.15)]';
    }
  };

  const getStatusBadgeStyle = () => {
    switch (state) {
      case 'SPEAKING':
        return { bg: 'bg-violet/20 border-violet/40 text-violet-light', dot: 'bg-violet animate-ping' };
      case 'LISTENING':
        return { bg: 'bg-cyan/20 border-cyan/40 text-cyan-light', dot: 'bg-cyan animate-pulse' };
      case 'THINKING':
        return { bg: 'bg-amber-500/20 border-amber-400/40 text-amber-300', dot: 'bg-amber-400 animate-spin' };
      case 'COMPLETED':
        return { bg: 'bg-status-success/20 border-status-success/40 text-status-success', dot: 'bg-status-success' };
      case 'IDLE':
      default:
        return { bg: 'bg-surface-light border-white/10 text-text-muted', dot: 'bg-emerald-400' };
    }
  };

  const badge = getStatusBadgeStyle();

  return (
    <div className="flex flex-col items-center select-none">
      {/* Outer Halo Container */}
      <div className={`relative ${sizeClasses} flex items-center justify-center`}>
        {/* State-driven pulsing aura background */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-700 ${
            state === 'SPEAKING'
              ? 'bg-gradient-to-tr from-violet/20 via-cyan/15 to-transparent scale-110 blur-xl'
              : state === 'LISTENING'
              ? 'bg-gradient-to-tr from-cyan/30 via-violet/10 to-transparent scale-110 blur-xl'
              : state === 'THINKING'
              ? 'bg-gradient-to-r from-violet/20 to-amber-500/20 scale-105 blur-lg'
              : 'bg-violet/10 blur-md'
          }`}
        />

        {/* Outer Ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${getGlowRingClass()}`}
        />

        {/* Listening / Speaking Sound Ripple Rings */}
        {(state === 'SPEAKING' || state === 'LISTENING') && (
          <div
            className={`absolute -inset-3 rounded-full border border-dashed transition-all duration-1000 ${
              state === 'SPEAKING' ? 'border-violet/40 animate-ping' : 'border-cyan/50 animate-pulse'
            }`}
          />
        )}

        {/* Orbiting particles for THINKING state */}
        {state === 'THINKING' && (
          <div className="absolute -inset-4 rounded-full border border-violet/30 animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan rounded-full shadow-glow-cyan" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-violet-light rounded-full shadow-glow-violet" />
          </div>
        )}

        {/* Main ARIA Digital Human SVG */}
        <div
          className={`relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#18233C] to-[#0D1426] shadow-inner transition-transform duration-500 ${
            state === 'IDLE' ? 'animate-float' : ''
          }`}
        >
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full transform transition-all duration-300"
            style={{
              transform: state === 'LISTENING' ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <defs>
              {/* Radial backdrop */}
              <radialGradient id="ariaBg" cx="50%" cy="38%" r="65%">
                <stop offset="0%" stopColor="#253558" />
                <stop offset="60%" stopColor="#131B2F" />
                <stop offset="100%" stopColor="#0B1020" />
              </radialGradient>

              {/* Skin Tone Gradient */}
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F9D4B8" />
                <stop offset="60%" stopColor="#F0BC98" />
                <stop offset="100%" stopColor="#E2A680" />
              </linearGradient>

              {/* Hair Gradient */}
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2A1B3D" />
                <stop offset="45%" stopColor="#443166" />
                <stop offset="100%" stopColor="#1E142B" />
              </linearGradient>

              {/* Suit / Outfit Gradient */}
              <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E2A4A" />
                <stop offset="50%" stopColor="#151E36" />
                <stop offset="100%" stopColor="#0E1424" />
              </linearGradient>

              {/* Neon Accent Gradient */}
              <linearGradient id="neonTrim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8067F7" />
                <stop offset="100%" stopColor="#56DDF0" />
              </linearGradient>

              {/* Eye Gradient */}
              <radialGradient id="eyeIris" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#56DDF0" />
                <stop offset="70%" stopColor="#2B7A8B" />
                <stop offset="100%" stopColor="#0E2F38" />
              </radialGradient>
            </defs>

            {/* Background Canvas */}
            <rect width="400" height="400" fill="url(#ariaBg)" />

            {/* Subtle digital grid in background */}
            <circle cx="200" cy="180" r="160" stroke="#8067F7" strokeWidth="1" strokeOpacity="0.12" fill="none" />
            <circle cx="200" cy="180" r="130" stroke="#56DDF0" strokeWidth="1" strokeOpacity="0.08" fill="none" />

            {/* 1. Back Hair Layer */}
            <path
              d="M115 150 C110 260 120 310 150 340 L250 340 C280 310 290 260 285 150 C285 90 250 50 200 50 C150 50 115 90 115 150 Z"
              fill="url(#hairGrad)"
            />

            {/* 2. Neck */}
            <path d="M178 220 L178 275 C185 282 215 282 222 275 L222 220 Z" fill="#E2A680" />
            <path d="M185 240 C195 252 205 252 215 240 L215 275 L185 275 Z" fill="#D4956E" opacity="0.4" />

            {/* 3. Shoulders and Blazer */}
            <path
              d="M85 380 C95 310 135 270 178 265 L222 265 C265 270 305 310 315 380 Z"
              fill="url(#suitGrad)"
            />

            {/* Blazer Lapels with futuristic cyan/violet piping */}
            <path d="M175 265 L150 380 L185 380 L195 305 Z" fill="#243356" />
            <path d="M225 265 L250 380 L215 380 L205 305 Z" fill="#243356" />
            <line x1="175" y1="265" x2="150" y2="380" stroke="url(#neonTrim)" strokeWidth="2.5" />
            <line x1="225" y1="265" x2="250" y2="380" stroke="url(#neonTrim)" strokeWidth="2.5" />

            {/* Inner Top Shirt */}
            <polygon points="185,275 215,275 200,320" fill="#0B1020" />
            {/* Tech badge / pendant */}
            <circle cx="200" cy="330" r="4" fill="#56DDF0" opacity="0.8" />

            {/* 4. Head and Face */}
            <path
              d="M145 150 C145 225 165 250 200 250 C235 250 255 225 255 150 C255 95 230 75 200 75 C170 75 145 95 145 150 Z"
              fill="url(#skinGrad)"
            />

            {/* Subtle Face Cheek Blush */}
            <ellipse cx="166" cy="182" rx="12" ry="6" fill="#F08A8A" opacity="0.22" />
            <ellipse cx="234" cy="182" rx="12" ry="6" fill="#F08A8A" opacity="0.22" />

            {/* 5. Eyebrows (Expressive) */}
            <path
              d={
                state === 'THINKING'
                  ? 'M158 135 Q172 131 184 136'
                  : 'M158 135 Q172 133 184 137'
              }
              stroke="#3D2952"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={
                state === 'THINKING'
                  ? 'M216 137 Q228 132 242 134'
                  : 'M216 137 Q228 133 242 135'
              }
              stroke="#3D2952"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* 6. Eyes with Blinking */}
            {isBlinking ? (
              // Closed eye lids
              <>
                <path d="M160 152 Q171 157 182 152" stroke="#3D2952" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M218 152 Q229 157 240 152" stroke="#3D2952" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              // Open eyes with cyan-glowing irises
              <>
                {/* Left Eye */}
                <ellipse cx="171" cy="151" rx="11" ry="7.5" fill="#FFFFFF" />
                <ellipse cx="172" cy="151" rx="5.5" ry="5.5" fill="url(#eyeIris)" />
                <circle cx="172" cy="151" r="2.5" fill="#09141F" />
                <circle cx="174" cy="149" r="1.5" fill="#FFFFFF" />
                {/* Eyelashes */}
                <path d="M160 149 Q171 143 182 149" stroke="#251636" strokeWidth="2" strokeLinecap="round" fill="none" />

                {/* Right Eye */}
                <ellipse cx="229" cy="151" rx="11" ry="7.5" fill="#FFFFFF" />
                <ellipse cx="228" cy="151" rx="5.5" ry="5.5" fill="url(#eyeIris)" />
                <circle cx="228" cy="151" r="2.5" fill="#09141F" />
                <circle cx="230" cy="149" r="1.5" fill="#FFFFFF" />
                {/* Eyelashes */}
                <path d="M218 149 Q229 143 240 149" stroke="#251636" strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* 7. Nose */}
            <path d="M198 165 L195 183 L202 183" stroke="#D18E66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* 8. Mouth (Animated for SPEAKING, smiling for IDLE/LISTENING) */}
            {state === 'SPEAKING' ? (
              <g>
                {/* Open mouth during speech */}
                <ellipse
                  cx="200"
                  cy="210"
                  rx={10 + mouthOpen * 4}
                  ry={3 + mouthOpen * 8}
                  fill="#752233"
                />
                {/* Upper teeth */}
                <path
                  d={`M${194 - mouthOpen * 2} 207 Q200 209 M${206 + mouthOpen * 2} 207`}
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  fill="none"
                />
                {/* Lower lip highlight */}
                <path
                  d={`M${192} ${212 + mouthOpen * 7} Q200 ${215 + mouthOpen * 7} ${208} ${212 + mouthOpen * 7}`}
                  stroke="#B84A62"
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            ) : state === 'THINKING' ? (
              // Slight pensive straight smile
              <path d="M192 210 Q200 211 208 209" stroke="#B84A62" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            ) : (
              // Warm welcoming smile for IDLE, LISTENING, COMPLETED
              <g>
                <path d="M190 207 Q200 216 210 207" stroke="#A83B55" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M193 211 Q200 218 207 211" stroke="#E5788F" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
              </g>
            )}

            {/* 9. Front Hair Layer (Stylized bob with purple highlights) */}
            <path
              d="M135 125 C135 60 170 50 200 50 C235 50 265 65 265 125 C265 145 260 180 255 195 C250 170 248 130 245 110 C230 85 195 85 170 95 C155 102 148 135 145 195 C140 180 135 145 135 125 Z"
              fill="url(#hairGrad)"
            />
            {/* Hair strands shine */}
            <path d="M175 62 Q200 56 225 65" stroke="#8067F7" strokeWidth="2.5" strokeOpacity="0.45" fill="none" />

            {/* 10. Futuristic Headset with Boom Mic and Glowing LED */}
            {/* Headset Band */}
            <path
              d="M135 140 C130 90 160 55 200 55 C240 55 270 90 265 140"
              stroke="#2E3B5C"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Headset Ear Cushion (Right ear) */}
            <rect x="258" y="130" width="12" height="28" rx="6" fill="#1C2642" stroke="#56DDF0" strokeWidth="1.5" />
            {/* Microphone Boom Arm */}
            <path
              d="M264 150 C264 195 240 215 216 216"
              stroke="#2E3B5C"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Mic Tip / Capsule */}
            <circle cx="216" cy="216" r="5" fill="#131B2F" stroke="#33B8CC" strokeWidth="1.5" />
            {/* LED Status Indicator on Mic */}
            <circle
              cx="216"
              cy="216"
              r="2.5"
              fill={state === 'LISTENING' ? '#56DDF0' : state === 'SPEAKING' ? '#8067F7' : '#42D6A4'}
              className={state === 'LISTENING' ? 'animate-pulse' : ''}
            />
          </svg>
        </div>
      </div>

      {/* Live Avatar Status Badge */}
      {showStatusBadge && (
        <div className="mt-4 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-primary text-base sm:text-lg tracking-wide">
              ARIA
            </span>
            <span className="text-xs text-text-subtle font-mono uppercase px-1.5 py-0.5 rounded bg-surface-light border border-white/5">
              AI Interviewer
            </span>
          </div>

          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${badge.bg}`}
          >
            <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
            <span>{statusLabel || state}</span>
            {languageText && (
              <span className="text-text-subtle border-l border-white/10 pl-2 ml-1">
                {languageText}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

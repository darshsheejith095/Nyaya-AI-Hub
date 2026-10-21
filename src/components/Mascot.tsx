import { motion, AnimatePresence } from 'framer-motion';

interface MascotProps {
  message: string;
}

// A friendly, dynamic golden lion cub mascot rendered in SVG.
// Dharma wears round glasses and has a big welcoming smile.
export function Mascot({ message }: MascotProps) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="shrink-0"
      >
        <DharmaLionCub />
      </motion.div>
      <div className="relative min-w-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-2xl border border-taupe-300/40 px-4 py-3 text-[15px] leading-relaxed text-ink shadow-soft sm:px-5 sm:py-4"
          >
            <span className="pointer-events-none absolute -left-2 top-5 h-4 w-4 rotate-45 border-b border-l border-taupe-300/40 bg-white" />
            <p className="font-semibold">{message}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function DharmaLionCub({ className = 'h-24 w-24 sm:h-28 sm:w-28' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 130" className={className} role="img" aria-label="Dharma the lion cub mascot">
      {/* Mane */}
      <g>
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2;
          const cx = 60 + Math.cos(angle) * 38;
          const cy = 58 + Math.sin(angle) * 38;
          return <circle key={i} cx={cx} cy={cy} r={14} fill="#E3C7A3" />;
        })}
      </g>
      {/* Head */}
      <circle cx="60" cy="58" r="32" fill="#F0C987" />
      {/* Ears */}
      <circle cx="36" cy="36" r="9" fill="#E3C7A3" />
      <circle cx="84" cy="36" r="9" fill="#E3C7A3" />
      <circle cx="36" cy="36" r="4.5" fill="#BF9866" />
      <circle cx="84" cy="36" r="4.5" fill="#BF9866" />
      {/* Snout */}
      <ellipse cx="60" cy="72" rx="14" ry="11" fill="#FBF3E0" />
      {/* Nose */}
      <path d="M54 67 Q60 62 66 67 Q60 72 54 67 Z" fill="#1A1A1A" />
      {/* Smile */}
      <path d="M48 76 Q60 88 72 76" stroke="#1A1A1A" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* Whiskers */}
      <path d="M40 74 L50 76 M38 79 L50 78 M80 74 L70 76 M82 79 L70 78" stroke="#BF9866" strokeWidth="1.2" strokeLinecap="round" />
      {/* Eyes (behind glasses) */}
      <circle cx="49" cy="56" r="4" fill="#1A1A1A" />
      <circle cx="71" cy="56" r="4" fill="#1A1A1A" />
      <circle cx="50.2" cy="54.6" r="1.4" fill="#fff" />
      <circle cx="72.2" cy="54.6" r="1.4" fill="#fff" />
      {/* Round glasses */}
      <g stroke="#1A1A1A" strokeWidth="2.4" fill="rgba(174,217,224,0.25)">
        <circle cx="49" cy="56" r="9" />
        <circle cx="71" cy="56" r="9" />
      </g>
      <line x1="58" y1="56" x2="62" y2="56" stroke="#1A1A1A" strokeWidth="2.4" />
      {/* Body hint */}
      <path d="M30 108 Q60 96 90 108 L90 130 L30 130 Z" fill="#F0C987" />
      {/* Bow tie */}
      <path d="M52 98 L60 104 L68 98 L68 112 L60 106 L52 112 Z" fill="#C8593F" />
      <circle cx="60" cy="105" r="2.5" fill="#FDFCF5" />
    </svg>
  );
}

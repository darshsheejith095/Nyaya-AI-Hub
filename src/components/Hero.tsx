import { motion } from 'framer-motion';
import { Scale, Sparkles } from 'lucide-react';
import { Mascot } from '@/components/Mascot';
import { mascotMessages } from '@/data/mascot';
import type { TabId } from '@/types';

interface HeroProps {
  onExplore: (tab: TabId) => void;
}

const features: { tab: TabId; title: string; desc: string; emoji: string }[] = [
  { tab: 'courts', title: 'Judicial Web', desc: 'Explore the Indian court hierarchy', emoji: '🗺️' },
  { tab: 'deJargonizer', title: 'De-Jargonizer', desc: 'AI-powered contract risk analysis', emoji: '⚖️' },
  { tab: 'rights', title: 'Constitutional Shield', desc: 'Know your fundamental rights', emoji: '🛡️' },
  { tab: 'codex', title: 'Supreme Codex', desc: 'Learn 50 legal terms with flashcards', emoji: '📖' },
];

export function Hero({ onExplore }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Soft decorative blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-soft/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-taupe-300/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: heading + mascot */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-taupe-300/50 bg-white/70 px-3 py-1.5 text-sm font-semibold text-taupe-500 shadow-soft"
            >
              <Sparkles className="h-4 w-4 text-terracotta-amber" />
              Legal literacy for every Indian
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="font-display text-4xl font-semibold leading-[1.1] text-ink text-balance sm:text-5xl lg:text-6xl"
            >
              Understanding Indian Law, <span className="text-sky-deep">Made Simple</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="max-w-xl text-lg leading-relaxed text-taupe-500"
            >
              A warm, friendly guide to courts, contracts, constitutional rights, and legal terms —
              built for citizens of every age, with Dharma the Lion Cub by your side.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="rounded-2xl border border-taupe-300/30 bg-white/80 p-4 shadow-card sm:p-5"
            >
              <Mascot message={mascotMessages.home} />
            </motion.div>
          </div>

          {/* Right: feature quick-access cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {features.map((f) => (
              <button
                key={f.tab}
                onClick={() => onExplore(f.tab)}
                className="group flex flex-col items-start gap-2 rounded-2xl border border-taupe-300/30 bg-white/85 p-4 text-left shadow-soft transition hover:-translate-y-1 hover:border-sky-deep/40 hover:shadow-card sm:p-5"
              >
                <span className="text-3xl">{f.emoji}</span>
                <span className="font-display text-lg font-semibold text-ink">{f.title}</span>
                <span className="text-sm text-taupe-500">{f.desc}</span>
                <span className="mt-1 text-sm font-semibold text-sky-deep opacity-0 transition group-hover:opacity-100">
                  Explore →
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-taupe-300/30 pt-6 text-center text-sm text-taupe-500"
        >
          <span className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-sky-deep" /> Constitution of India
          </span>
          <span>•</span>
          <span>Bharatiya Nagarik Suraksha Sanhita, 2023</span>
          <span>•</span>
          <span>Powered by Groq AI</span>
        </motion.div>
      </div>
    </section>
  );
}

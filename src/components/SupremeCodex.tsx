import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { legalTerms } from '@/data/legalTerms';
import type { LegalTerm } from '@/types';

interface CodexProps {
  search: string;
}

const filters = ['All', 'Easy', 'Intermediate', 'Advanced'] as const;
type Filter = (typeof filters)[number];

const filterLabels: Record<Filter, string> = {
  All: 'All',
  Easy: 'Easy / Everyday',
  Intermediate: 'Intermediate',
  Advanced: 'Advanced / Rare',
};

const difficultyColors: Record<LegalTerm['difficulty'], string> = {
  Easy: 'bg-terracotta-safe/15 text-terracotta-safe',
  Intermediate: 'bg-terracotta-amber/15 text-terracotta-amber',
  Advanced: 'bg-terracotta-red/15 text-terracotta-red',
};

export function SupremeCodex({ search }: CodexProps) {
  const [filter, setFilter] = useState<Filter>('All');
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return legalTerms.filter((t) => {
      const fMatch = filter === 'All' || t.difficulty === filter;
      const qMatch =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.root.toLowerCase().includes(q) ||
        t.explanation.toLowerCase().includes(q);
      return fMatch && qMatch;
    });
  }, [filter, search]);

  const toggleFlip = (id: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const speak = (term: string) => {
    try {
      const utterance = new SpeechSynthesisUtterance(term);
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-taupe-300/30 bg-white/80 p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Supreme Codex</h2>
            <p className="mt-1 text-taupe-500">
              {legalTerms.length} essential legal terms — from everyday basics to rare Latin maxims. Click a card to flip.
            </p>
          </div>
          <button
            onClick={() => setFlipped(new Set())}
            className="flex items-center gap-2 rounded-xl border border-taupe-300/50 bg-white/80 px-3 py-2 text-sm font-semibold text-taupe-500 shadow-soft transition hover:text-ink"
          >
            <RefreshCw className="h-4 w-4" /> Reset flips
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                filter === f
                  ? 'bg-sky-deep text-white shadow-soft'
                  : 'bg-taupe-100 text-taupe-500 hover:bg-taupe-200 hover:text-ink'
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-taupe-300/30 bg-white/70 p-10 text-center text-taupe-500 shadow-soft">
          No terms match your search. Try a different keyword.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((term) => {
              const isFlipped = flipped.has(term.id);
              return (
                <motion.div
                  key={term.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group [perspective:1200px]"
                >
                  <button
                    onClick={() => toggleFlip(term.id)}
                    className="relative block h-52 w-full cursor-pointer [transform-style:preserve-3d] transition-transform duration-500 sm:h-56"
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    aria-label={`Flashcard for ${term.term}. Click to flip.`}
                  >
                    {/* Front */}
                    <div className="backface-hidden absolute inset-0 flex flex-col rounded-2xl border border-taupe-300/30 bg-gradient-to-br from-white to-cream p-4 shadow-soft">
                      <div className="flex items-start justify-between">
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${difficultyColors[term.difficulty]}`}>
                          {term.difficulty}
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
            speak(term.term);
                          }}
                          role="button"
                          aria-label={`Pronounce ${term.term}`}
                          className="rounded-lg p-1.5 text-taupe-400 transition hover:bg-sky-soft/40 hover:text-sky-deep"
                        >
                          <Volume2 className="h-4 w-4" />
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <h3 className="font-display text-lg font-semibold leading-tight text-ink sm:text-xl">{term.term}</h3>
                        <p className="mt-1 text-xs italic text-taupe-500">{term.root}</p>
                      </div>
                      <p className="text-center text-xs font-semibold text-sky-deep opacity-70">Tap to flip</p>
                    </div>

                    {/* Back */}
                    <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col overflow-y-auto rounded-2xl border border-sky-deep/30 bg-white p-4 shadow-card scrollbar-thin">
                      <p className="text-sm font-semibold text-ink">{term.explanation}</p>
                      <p className="mt-2 rounded-lg bg-sky-soft/20 p-2 text-xs italic text-ink">
                        {term.analogy}
                      </p>
                      <p className="mt-2 text-xs text-taupe-500">
                        <span className="font-bold">Example: </span>{term.example}
                      </p>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

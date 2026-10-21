import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Gavel, Scale, BookOpen } from 'lucide-react';
import { useMemo, useState } from 'react';
import { rights, landmarkCases } from '@/data/rights';
import type { RightEntry } from '@/types';

interface RightsProps {
  search: string;
}

const categories = ['All', 'Fundamental Rights', 'Fundamental Duties', 'Writs & Remedies', 'Arrest & Bail'] as const;
type Category = (typeof categories)[number];

const categoryIcon: Record<RightEntry['category'], typeof Shield> = {
  'Fundamental Rights': Shield,
  'Fundamental Duties': BookOpen,
  'Writs & Remedies': Gavel,
  'Arrest & Bail': Scale,
};

export function ConstitutionalShield({ search }: RightsProps) {
  const [category, setCategory] = useState<Category>('All');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rights.filter((r) => {
      const catMatch = category === 'All' || r.category === category;
      const qMatch =
        !q ||
        r.article.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.plainEnglish.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
  }, [category, search]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-taupe-300/30 bg-white/80 p-5 shadow-soft sm:p-6">
        <h2 className="font-display text-2xl font-semibold text-ink">Constitutional Shield</h2>
        <p className="mt-1 text-taupe-500">
          Search any Article number or browse citizen safeguards under Indian law — explained in plain English.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                category === cat
                  ? 'bg-sky-deep text-white shadow-soft'
                  : 'bg-taupe-100 text-taupe-500 hover:bg-taupe-200 hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        {/* Rights cards */}
        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-taupe-300/30 bg-white/70 p-10 text-center text-taupe-500 shadow-soft">
              <Search className="mx-auto mb-3 h-8 w-8 text-taupe-300" />
              No rights match your search. Try a different keyword or Article number.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((r) => {
                  const Icon = categoryIcon[r.category];
                  return (
                    <motion.article
                      key={r.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col rounded-2xl border border-taupe-300/30 bg-white/85 p-4 shadow-soft transition hover:shadow-card"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-soft/50 text-sky-deep">
                          <Icon className="h-5 w-5" strokeWidth={2.2} />
                        </span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-terracotta-amber">{r.article}</p>
                          <h3 className="font-display text-base font-semibold leading-tight text-ink">{r.title}</h3>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ink">{r.plainEnglish}</p>
                      <div className="mt-3 rounded-xl bg-cream p-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-taupe-500">When to invoke</p>
                        <p className="mt-1 text-sm text-ink">{r.whenToInvoke}</p>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Landmark judgments */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-taupe-300/30 bg-white/85 p-5 shadow-card">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
              <Gavel className="h-5 w-5 text-terracotta-red" /> Landmark Judgments
            </h3>
            <p className="mt-1 text-sm text-taupe-500">Historic Supreme Court cases that shaped Indian law.</p>
            <div className="mt-4 space-y-3">
              {landmarkCases.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-xl border border-taupe-300/30 bg-cream p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-terracotta-red/10 px-2.5 py-0.5 text-xs font-bold text-terracotta-red">
                      {c.topic}
                    </span>
                    <span className="text-xs font-semibold text-taupe-500">{c.year}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-ink">{c.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-taupe-500">{c.summary}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

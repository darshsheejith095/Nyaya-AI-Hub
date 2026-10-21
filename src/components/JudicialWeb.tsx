import { motion, AnimatePresence } from 'framer-motion';
import { X, Landmark, ArrowRight, ArrowDown, Gavel } from 'lucide-react';
import { useState } from 'react';
import { courtHierarchy } from '@/data/courts';
import type { CourtNode } from '@/types';

export function JudicialWeb() {
  const [selected, setSelected] = useState<CourtNode | null>(null);

  // Flatten the tree into ordered levels for the map
  const levels: CourtNode[] = [];
  let cursor: CourtNode | undefined = courtHierarchy[0];
  while (cursor) {
    levels.push(cursor);
    cursor = cursor.children[0];
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-taupe-300/30 bg-white/80 p-5 shadow-soft sm:p-6">
        <h2 className="font-display text-2xl font-semibold text-ink">The Hierarchy of Indian Courts</h2>
        <p className="mt-1 text-taupe-500">
          Click any court tier to explore its jurisdiction, common case types, and the step-by-step
          appeal flow for citizens.
        </p>
      </div>

      {/* Tree */}
      <div className="rounded-2xl border border-taupe-300/30 bg-white/80 p-5 shadow-card sm:p-8">
        <div className="flex flex-col items-center gap-4">
          {levels.map((node, idx) => (
            <div key={node.id} className="flex w-full flex-col items-center">
              <CourtCard node={node} index={idx} onSelect={setSelected} />
              {idx < levels.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="my-1 flex flex-col items-center text-taupe-400"
                >
                  <ArrowDown className="h-5 w-5" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Side drawer */}
      <AnimatePresence>
        {selected && <CourtDrawer node={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}

function CourtCard({
  node,
  index,
  onSelect,
}: {
  node: CourtNode;
  index: number;
  onSelect: (n: CourtNode) => void;
}) {
  const widths = ['max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl'];
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={() => onSelect(node)}
      className={`group w-full ${widths[Math.min(index, widths.length - 1)]} rounded-2xl border p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-card ${
        index === 0
          ? 'border-sky-deep/40 bg-gradient-to-br from-sky-soft/40 to-white'
          : 'border-taupe-300/40 bg-white/85 hover:border-sky-deep/40'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            index === 0 ? 'bg-sky-deep text-white' : 'bg-taupe-100 text-taupe-500'
          }`}
        >
          <Landmark className="h-6 w-6" strokeWidth={2.2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-taupe-500">Tier {node.level}</p>
          <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">{node.name}</h3>
        </div>
        <ArrowRight className="h-5 w-5 text-sky-deep opacity-0 transition group-hover:opacity-100" />
      </div>
    </motion.button>
  );
}

function CourtDrawer({ node, onClose }: { node: CourtNode; onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 36 }}
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-cream shadow-card scrollbar-thin"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-taupe-300/30 bg-cream/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <Gavel className="h-5 w-5 text-sky-deep" />
            <h3 className="font-display text-lg font-semibold text-ink">{node.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-taupe-500 transition hover:bg-taupe-100 hover:text-ink"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-5">
          <p className="text-[15px] leading-relaxed text-ink">{node.description}</p>

          <section>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-taupe-500">Jurisdiction</h4>
            <div className="flex flex-wrap gap-2">
              {node.jurisdiction.map((j) => (
                <span key={j} className="rounded-full bg-sky-soft/40 px-3 py-1 text-sm font-semibold text-ink">
                  {j}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-taupe-500">Common Case Types</h4>
            <ul className="space-y-1.5">
              {node.caseTypes.map((c) => (
                <li key={c} className="flex items-start gap-2 text-[15px] text-ink">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta-gold" />
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-taupe-500">
              Citizen Appeal Flowchart
            </h4>
            <ol className="relative space-y-4 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-taupe-300/50">
              {node.appealFlow.map((step) => (
                <li key={step.step} className="relative flex gap-4">
                  <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-deep text-sm font-bold text-white shadow-soft">
                    {step.step}
                  </span>
                  <div className="pt-1">
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="text-sm text-taupe-500">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </motion.aside>
    </>
  );
}

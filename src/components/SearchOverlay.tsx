import { motion, AnimatePresence } from 'framer-motion';
import { Search, Scale, Shield, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import { rights } from '@/data/rights';
import { legalTerms } from '@/data/legalTerms';
import { contractTemplates } from '@/data/contracts';
import type { TabId } from '@/types';

interface SearchOverlayProps {
  query: string;
  onNavigate: (tab: TabId) => void;
  onClear: () => void;
}

interface SearchHit {
  key: string;
  label: string;
  sub: string;
  tab: TabId;
  icon: typeof Shield;
  accent: string;
}

export function SearchOverlay({ query, onNavigate, onClear }: SearchOverlayProps) {
  const hits = useMemo<SearchHit[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const results: SearchHit[] = [];

    for (const r of rights) {
      if (
        r.article.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.plainEnglish.toLowerCase().includes(q) ||
        r.whenToInvoke.toLowerCase().includes(q)
      ) {
        results.push({
          key: `right-${r.id}`,
          label: `${r.article} — ${r.title}`,
          sub: r.plainEnglish.slice(0, 80) + (r.plainEnglish.length > 80 ? '...' : ''),
          tab: 'rights',
          icon: Shield,
          accent: 'text-sky-deep',
        });
      }
    }

    for (const t of legalTerms) {
      if (
        t.term.toLowerCase().includes(q) ||
        t.root.toLowerCase().includes(q) ||
        t.explanation.toLowerCase().includes(q)
      ) {
        results.push({
          key: `term-${t.id}`,
          label: t.term,
          sub: t.explanation.slice(0, 80) + (t.explanation.length > 80 ? '...' : ''),
          tab: 'codex',
          icon: BookOpen,
          accent: 'text-terracotta-amber',
        });
      }
    }

    for (const tpl of contractTemplates) {
      if (tpl.name.toLowerCase().includes(q) || tpl.text.toLowerCase().includes(q)) {
        results.push({
          key: `tpl-${tpl.id}`,
          label: tpl.name,
          sub: tpl.description,
          tab: 'deJargonizer',
          icon: FileText,
          accent: 'text-terracotta-red',
        });
      }
    }

    return results.slice(0, 12);
  }, [query]);

  const q = query.trim();
  if (q.length < 2) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 right-0 top-full z-40 mx-auto mt-1 max-w-2xl rounded-2xl border border-taupe-300/40 bg-white p-2 shadow-card"
      >
        <div className="flex items-center justify-between px-3 py-2">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-taupe-500">
            <Search className="h-3.5 w-3.5" /> {hits.length} result{hits.length !== 1 ? 's' : ''} across NyayaAI
          </span>
          <button onClick={onClear} className="text-xs font-semibold text-sky-deep hover:underline">
            Clear
          </button>
        </div>

        {hits.length === 0 ? (
          <p className="px-3 py-6 text-center text-sm text-taupe-500">
            No matches yet. Try "bail", "Article 21", "privacy", or "lease".
          </p>
        ) : (
          <ul className="max-h-80 overflow-y-auto scrollbar-thin">
            {hits.map((hit) => {
              const Icon = hit.icon;
              return (
                <li key={hit.key}>
                  <button
                    onClick={() => onNavigate(hit.tab)}
                    className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-cream"
                  >
                    <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cream ${hit.accent}`}>
                      <Icon className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink">{hit.label}</span>
                      <span className="block truncate text-xs text-taupe-500">{hit.sub}</span>
                    </span>
                    <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-taupe-300" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex items-center gap-1.5 border-t border-taupe-300/20 px-3 py-2 text-[11px] text-taupe-500">
          <Scale className="h-3 w-3" /> Cross-search: Rights, Codex &amp; Contract templates
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

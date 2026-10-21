import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Scale, Map, FileText, Shield, BookOpen, Home } from 'lucide-react';
import { useState } from 'react';
import type { TabId } from '@/types';

interface TopNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

const tabs: { id: TabId; label: string; icon: typeof Scale }[] = [
  { id: 'courts', label: 'Judicial Web', icon: Map },
  { id: 'deJargonizer', label: 'De-Jargonizer', icon: FileText },
  { id: 'rights', label: 'Constitutional Shield', icon: Shield },
  { id: 'codex', label: 'Supreme Codex', icon: BookOpen },
];

const languages = [
  { code: 'en', label: 'English', available: true },
  { code: 'hi', label: 'हिन्दी (Hindi)', available: false },
  { code: 'mr', label: 'मराठी (Marathi)', available: false },
  { code: 'ta', label: 'தமிழ் (Tamil)', available: false },
  { code: 'bn', label: 'বাংলা (Bengali)', available: false },
];

export function TopNav({ activeTab, onTabChange, search, onSearchChange }: TopNavProps) {
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-taupe-300/40 shadow-soft">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:py-4">
        {/* Top row: logo, search, language */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => onTabChange('home')}
            className="flex shrink-0 items-center gap-2"
            aria-label="Go to home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-soft text-ink shadow-soft">
              <Scale className="h-6 w-6" strokeWidth={2.2} />
            </div>
            <div className="hidden text-left sm:block">
              <p className="font-display text-lg font-semibold leading-none text-ink">NyayaAI Hub</p>
              <p className="text-xs text-taupe-500">Law, made simple</p>
            </div>
          </button>

          {/* Global search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-taupe-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Ask Dharma anything... e.g., 'What is my right during a police check?'"
              className="w-full rounded-xl border border-taupe-300/50 bg-white/80 py-2.5 pl-11 pr-4 text-sm text-ink shadow-soft outline-none transition placeholder:text-taupe-500/80 focus:border-sky-deep focus:ring-4 focus:ring-sky-soft/40"
            />
          </div>

          {/* Language selector */}
          <div className="relative shrink-0">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-xl border border-taupe-300/50 bg-white/80 px-3 py-2.5 text-sm font-semibold text-ink shadow-soft transition hover:bg-white"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              <span className="hidden sm:inline">English</span>
              <span className="sm:hidden">EN</span>
              <ChevronDown className={`h-4 w-4 transition ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-taupe-300/40 bg-white py-1 shadow-card"
                    role="listbox"
                  >
                    {languages.map((lang) => (
                      <li key={lang.code}>
                        <button
                          disabled={!lang.available}
                          className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-cream disabled:cursor-not-allowed disabled:text-taupe-500/60 disabled:hover:bg-transparent"
                          onClick={() => lang.available && setLangOpen(false)}
                        >
                          <span>{lang.label}</span>
                          {!lang.available && (
                            <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-taupe-500">
                              Soon
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Tab row */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin">
          <TabButton active={activeTab === 'home'} onClick={() => onTabChange('home')} icon={Home} label="Home" />
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
              icon={tab.icon}
              label={tab.label}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Scale;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
        active ? 'text-ink' : 'text-taupe-500 hover:text-ink'
      }`}
    >
      <Icon className="h-4 w-4" strokeWidth={2.2} />
      <span>{label}</span>
      {active && (
        <motion.span
          layoutId="tab-pill"
          className="absolute inset-0 -z-10 rounded-xl bg-sky-soft/60 shadow-glow"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}
    </button>
  );
}

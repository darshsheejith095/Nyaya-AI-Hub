import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X } from 'lucide-react';
import { TopNav } from '@/components/TopNav';
import { Hero } from '@/components/Hero';
import { Mascot, DharmaLionCub } from '@/components/Mascot';
import { JudicialWeb } from '@/components/JudicialWeb';
import { DeJargonizer } from '@/components/DeJargonizer';
import { ConstitutionalShield } from '@/components/ConstitutionalShield';
import { SupremeCodex } from '@/components/SupremeCodex';
import { SearchOverlay } from '@/components/SearchOverlay';
import { mascotMessages } from '@/data/mascot';
import type { TabId } from '@/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [search, setSearch] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [mascotOpen, setMascotOpen] = useState(false);

  // When the user types in the global search, surface the cross-search overlay.
  useEffect(() => {
    setShowOverlay(search.trim().length >= 2);
  }, [search]);

  // When switching tabs, clear the search overlay and jump to top so content
  // appears at the very top of the screen — no forced scrolling.
  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setShowOverlay(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateFromSearch = (tab: TabId) => {
    handleTabChange(tab);
  };

  const clearSearch = () => {
    setSearch('');
    setShowOverlay(false);
  };

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="relative">
        <TopNav activeTab={activeTab} onTabChange={handleTabChange} search={search} onSearchChange={setSearch} />
        {showOverlay && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SearchOverlay query={search} onNavigate={handleNavigateFromSearch} onClear={clearSearch} />
          </div>
        )}
      </div>

      <main>
        {/* Hero only on home */}
        <AnimatePresence>
          {activeTab === 'home' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <Hero onExplore={handleTabChange} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab content — appears at the very top when a tab is active */}
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          {activeTab !== 'home' && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {activeTab === 'courts' && <JudicialWeb />}
                {activeTab === 'deJargonizer' && <DeJargonizer />}
                {activeTab === 'rights' && <ConstitutionalShield search={search} />}
                {activeTab === 'codex' && <SupremeCodex search={search} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* Collapsible Dharma mascot — compact floating badge (bottom-right) */}
      {activeTab !== 'home' && (
        <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
          <AnimatePresence mode="wait">
            {mascotOpen && (
              <motion.div
                key="mascot-panel"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="mb-3 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-taupe-300/40 bg-white/95 p-4 shadow-card backdrop-blur-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wide text-taupe-500">Dharma says</p>
                  <button
                    onClick={() => setMascotOpen(false)}
                    className="rounded-lg p-1 text-taupe-400 transition hover:bg-taupe-100 hover:text-ink"
                    aria-label="Close Dharma"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <Mascot message={mascotMessages[activeTab]} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setMascotOpen((v) => !v)}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-taupe-300/40 bg-white/95 shadow-card backdrop-blur-md"
            aria-label={mascotOpen ? 'Close Dharma tip' : 'Ask Dharma for a tip'}
          >
            {mascotOpen ? (
              <MessageSquareText className="h-6 w-6 text-sky-deep" />
            ) : (
              <span className="block h-10 w-10">
                <DharmaLionCub className="h-10 w-10" />
              </span>
            )}
          </motion.button>
        </div>
      )}

      <footer className="border-t border-taupe-300/30 bg-white/60 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="font-display text-lg font-semibold text-ink">NyayaAI Hub</p>
          <p className="mt-1 text-sm text-taupe-500">
            Legal literacy for every Indian. Made with care, for citizens of all ages.
          </p>
          <p className="mt-3 text-xs text-taupe-400">
            Educational tool only — not a substitute for advice from a qualified lawyer.
          </p>
        </div>
      </footer>
    </div>
  );
}

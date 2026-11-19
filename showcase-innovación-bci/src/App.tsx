import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BienvenidaShowcase } from './components/BienvenidaShowcase';
import { ConversacionChatShowcase } from './components/ConversacionChatShowcase';
import { DeckPresentationModal } from './components/DeckPresentationModal';
import { DeckQrHeaderWidget } from './components/DeckQrHeaderWidget';
import { DemoChatGptShowcase } from './components/DemoChatGptShowcase';
import { GptComplementosShowcase } from './components/GptComplementosShowcase';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSpecsSidebar } from './components/RightSpecsSidebar';
import { SimulacionShowcase } from './components/SimulacionShowcase';
import { TopBrandingStripe } from './components/TopBrandingStripe';
import { ModuleId, SHOWCASE_MODULES } from './data/modules';

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('bienvenida');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deckModalOpen, setDeckModalOpen] = useState(false);

  const activeModule =
    SHOWCASE_MODULES.find((m) => m.id === activeModuleId) ?? SHOWCASE_MODULES[0];

  useEffect(() => {
    document.title = `ShowCase Innovación Bci - ${activeModule.title}`;
  }, [activeModule.title]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'deck') {
        setDeckModalOpen(true);
      }
    }
  }, []);

  return (
    <div className="h-full bg-white text-slate-800 font-sans flex flex-col overflow-hidden">
      {/* Top Bci 4-Color Signature Bar */}
      <TopBrandingStripe />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Navigation Sidebar */}
        <LeftSidebar
          activeModule={activeModuleId}
          onSelectModule={setActiveModuleId}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main
          className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden"
          data-purpose="workspace-and-details"
        >
          {/* Top Sub-Header & Breadcrumb Bar */}
          <header
            className="h-16 border-b border-slate-200/80 px-5 lg:px-6 flex items-center justify-between shrink-0 bg-white/95 backdrop-blur-md"
            data-purpose="sub-header-bar"
          >
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs min-w-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menú de navegación"
                className="lg:hidden p-1.5 -ml-1.5 mr-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#005FFF]"
              >
                <Menu className="w-4 h-4" />
              </button>
              <span
                className="w-2 h-2 rounded-full bg-[#59A80F] inline-block mr-1 shrink-0"
                aria-hidden="true"
              />
              <span className="font-semibold text-slate-600 tracking-wide uppercase whitespace-nowrap">
                Bci Innovación
              </span>
              <span className="text-slate-400" aria-hidden="true">
                /
              </span>
              <span className="text-slate-900 font-medium truncate">
                {activeModule.title}
              </span>
            </div>

            {/* Arriba a la derecha: Código QR para PPT Plan 2026 */}
            <DeckQrHeaderWidget onOpenDeck={() => setDeckModalOpen(true)} />
          </header>

          {/* Center & Right Columns Container */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-y-auto lg:overflow-hidden">
            {/* Center Primary Viewport (Clean & Spacious Canvas) */}
            <section
              className="flex-1 lg:overflow-y-auto bg-white flex flex-col justify-start px-6 lg:px-8 py-8"
              data-purpose="center-main-stage"
            >
              {/* Main Section Title with Module Color Accent (shown on functional modules) */}
              {activeModuleId !== 'bienvenida' && (
                <div className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-7 rounded-full shrink-0 transition-colors duration-150"
                    style={{ backgroundColor: activeModule.theme.accentColor }}
                    aria-hidden="true"
                  />
                  <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
                    {activeModule.title}
                  </h2>
                </div>
              )}

              {activeModuleId === 'bienvenida' && (
                <BienvenidaShowcase
                  onStartPlugin={() => setActiveModuleId('plugin')}
                />
              )}

              {activeModuleId === 'plugin' && (
                <GptComplementosShowcase
                  onOpenConversacion={() => setActiveModuleId('conversacion')}
                />
              )}

              {activeModuleId === 'conversacion' && (
                <ConversacionChatShowcase
                  onOpenComplementos={() => setActiveModuleId('plugin')}
                  onOpenSimulacion={() => setActiveModuleId('simulacion')}
                />
              )}

              {activeModuleId === 'simulacion' && <SimulacionShowcase />}

              {activeModuleId === 'demo-chatgpt' && <DemoChatGptShowcase />}
            </section>

            {/* Right Info & Documentation Column */}
            <RightSpecsSidebar module={activeModule} />
          </div>
        </main>
      </div>

      {/* Modal Presentación Deck Plan 2026 */}
      <DeckPresentationModal
        open={deckModalOpen}
        onClose={() => setDeckModalOpen(false)}
      />
    </div>
  );
}

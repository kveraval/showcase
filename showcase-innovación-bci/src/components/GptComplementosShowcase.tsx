import {
  ArrowLeft,
  Check,
  ChevronRight,
  Info,
  Laptop,
  MessagesSquare,
  MoreHorizontal,
  Play,
  Plus,
  RotateCcw,
  Search,
  Settings,
  UserCheck,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type CatalogTab = 'publicos' | 'personales';
type DemoPhase = 'idle' | 'focusing' | 'typing' | 'results' | 'highlighting' | 'manual';

interface ComplementoItem {
  id: string;
  name: string;
  subtitle: string;
  category: CatalogTab;
  actionType: 'install' | 'info' | 'more' | 'device';
  hasOrgBadge?: boolean;
  featuredBci?: boolean;
  developer: string;
  categoryLabel: string;
  version: string;
  website: string;
  appDescription: string;
  keywords: string[];
  icon: ReactNode;
  iconLg?: ReactNode;
}

const INITIAL_INSTALLED_IDS = ['conn-1', 'conn-2', 'conn-3', 'conn-4'];

function DefaultConnectorIcon({ muted = true }: { muted?: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${muted ? 'text-slate-600' : 'text-white'}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 14.5L6.7 17.3a3 3 0 104.2 4.2l2.8-2.8M14.5 9.5l2.8-2.8a3 3 0 10-4.2-4.2l-2.8 2.8M8.5 15.5l7-7"
      />
    </svg>
  );
}

const COMPLEMENTOS_CATALOG: ComplementoItem[] = [
  {
    id: 'bci',
    name: 'Bci',
    subtitle: 'openai admin · Bci',
    category: 'personales',
    actionType: 'install',
    hasOrgBadge: true,
    featuredBci: true,
    developer: 'openai admin',
    categoryLabel: 'Other',
    version: '1.0.0',
    website: 'No disponible',
    appDescription: 'Sin descripción',
    keywords: ['bci', 'banco', 'simulador', 'consumo', 'creditos', 'openai admin'],
    icon: (
      <img
        src="/assets/aistudio/84_x_41_ecdae81c.png"
        alt="Logo Bci"
        className="w-7 h-7 object-contain"
      />
    ),
    iconLg: (
      <img
        src="/assets/aistudio/84_x_41_ecdae81c.png"
        alt="Logo Bci"
        className="w-11 h-11 object-contain"
      />
    ),
  },
  {
    id: 'gmail',
    name: 'Gmail',
    subtitle: 'Read and manage Gmail',
    category: 'publicos',
    actionType: 'install',
    developer: 'Google',
    categoryLabel: 'Productivity',
    version: '2.1.0',
    website: 'mail.google.com',
    appDescription: 'Read and manage Gmail',
    keywords: ['gmail', 'correo', 'email', 'google'],
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#EA4335" d="M20 18h-2V9.25L12 13.75 6 9.25V18H4V6h1.2l6.8 5.1L18.8 6H20z" />
        <path fill="#4285F4" d="M4 6h2v12H4z" />
        <path fill="#34A853" d="M18 6h2v12h-2z" />
      </svg>
    ),
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    subtitle: 'Drive, Docs, Sheets or Slides',
    category: 'publicos',
    actionType: 'install',
    developer: 'Google',
    categoryLabel: 'Productivity',
    version: '1.8.0',
    website: 'drive.google.com',
    appDescription: 'Drive, Docs, Sheets or Slides',
    keywords: ['google drive', 'drive', 'docs', 'sheets', 'slides'],
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#34A853" d="M8.5 4.5l-5 8.6 3.5 6 5-8.6z" />
        <path fill="#FBBC05" d="M15.5 4.5h-7l5 8.6h7z" />
        <path fill="#4285F4" d="M7 19.1h10l3.5-6h-10z" />
      </svg>
    ),
  },
  {
    id: 'health',
    name: 'Health',
    subtitle: 'Explore your health data in ChatGPT',
    category: 'publicos',
    actionType: 'info',
    developer: 'OpenAI',
    categoryLabel: 'Health & Wellness',
    version: '1.2.0',
    website: 'No disponible',
    appDescription: 'Explore your health data in ChatGPT',
    keywords: ['health', 'salud', 'datos'],
    icon: (
      <div className="w-4 h-4 rounded-md bg-[#F42B3D] flex items-center justify-center">
        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'remote-desktop',
    name: 'Remote Desktop Commander',
    subtitle: 'Use your computer from chat',
    category: 'publicos',
    actionType: 'install',
    developer: 'Commander Labs',
    categoryLabel: 'Developer Tools',
    version: '1.4.2',
    website: 'No disponible',
    appDescription: 'Use your computer from chat',
    keywords: ['remote', 'desktop', 'commander', 'computer'],
    icon: (
      <div className="w-5 h-5 rounded-md bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center tracking-tighter">
        DC
      </div>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    subtitle: 'Triage PRs, issues, CI, and publish flows',
    category: 'publicos',
    actionType: 'install',
    developer: 'GitHub',
    categoryLabel: 'Developer Tools',
    version: '2.0.4',
    website: 'github.com',
    appDescription: 'Triage PRs, issues, CI, and publish flows',
    keywords: ['github', 'git', 'codigo', 'pr', 'issues'],
    icon: (
      <svg className="w-4 h-4 text-slate-900" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    id: 'writing-style',
    name: 'Writing Style',
    subtitle: 'Write with context from your own writing',
    category: 'publicos',
    actionType: 'install',
    developer: 'OpenAI',
    categoryLabel: 'Writing',
    version: '1.0.0',
    website: 'No disponible',
    appDescription: 'Write with context from your own writing',
    keywords: ['writing', 'style', 'texto', 'redaccion'],
    icon: (
      <svg className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l7-7 3 3-7 7-3-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 2l7.586 7.586" />
      </svg>
    ),
  },
];

interface GptComplementosShowcaseProps {
  onOpenConversacion?: () => void;
}

export function GptComplementosShowcase({
  onOpenConversacion,
}: GptComplementosShowcaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<CatalogTab>('publicos');
  const [installedPluginIds, setInstalledPluginIds] = useState<string[]>([]);
  const [selectedPluginId, setSelectedPluginId] = useState<string | null>(null);
  const [manageMenuOpen, setManageMenuOpen] = useState(false);
  const [infoToast, setInfoToast] = useState<string | null>(null);
  const [demoPhase, setDemoPhase] = useState<DemoPhase>('idle');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const timersRef = useRef<number[]>([]);

  const clearDemoTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const startDemoAnimation = useCallback(() => {
    clearDemoTimers();
    setSelectedPluginId(null);
    setSearchQuery('');
    setActiveTab('publicos');
    setInfoToast(null);
    setHighlightedId(null);
    setDemoPhase('idle');

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    let t = 500;

    // Paso 1: Enfocar buscador de complementos
    schedule(() => setDemoPhase('focusing'), t);

    // Pausa de 2 segundos antes de escribir "bci"
    t += 2000;
    schedule(() => {
      setDemoPhase('typing');
      setSearchQuery('b');
    }, t);
    t += 220;
    schedule(() => setSearchQuery('bc'), t);
    t += 220;
    schedule(() => {
      setSearchQuery('bci');
      setDemoPhase('results');
    }, t);

    // Pausa de 2 segundos antes de resaltar el resultado de Bci
    t += 2000;
    schedule(() => {
      setDemoPhase('highlighting');
      setHighlightedId('bci');
    }, t);
  }, [clearDemoTimers]);

  useEffect(() => {
    startDemoAnimation();
    return () => clearDemoTimers();
  }, [startDemoAnimation, clearDemoTimers]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleItems = useMemo(() => {
    if (normalizedQuery) {
      return COMPLEMENTOS_CATALOG.filter((item) => {
        const haystack = `${item.name} ${item.subtitle} ${item.keywords.join(' ')}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      });
    }
    return COMPLEMENTOS_CATALOG.filter((item) => item.category === activeTab);
  }, [activeTab, normalizedQuery]);

  const installedCustomItems = useMemo(
    () => COMPLEMENTOS_CATALOG.filter((item) => installedPluginIds.includes(item.id)),
    [installedPluginIds]
  );

  const selectedPlugin = useMemo(
    () => COMPLEMENTOS_CATALOG.find((item) => item.id === selectedPluginId) ?? null,
    [selectedPluginId]
  );

  function stopDemoAndSetManual() {
    if (demoPhase !== 'manual') {
      clearDemoTimers();
      setDemoPhase('manual');
      setHighlightedId(null);
    }
  }

  function handleSelectPlugin(item: ComplementoItem) {
    stopDemoAndSetManual();
    setInfoToast(null);
    setManageMenuOpen(false);
    setSelectedPluginId(item.id);
  }

  function handleAction(item: ComplementoItem) {
    stopDemoAndSetManual();

    if (item.actionType === 'info') {
      setInfoToast('Health requiere habilitación previa en la configuración de cuenta.');
      return;
    }

    if (item.actionType === 'more') {
      setInfoToast(`Detalles del conector ${item.name} (${item.subtitle}).`);
      return;
    }

    const alreadyInstalled = installedPluginIds.includes(item.id);
    if (alreadyInstalled) {
      setInstalledPluginIds((prev) => prev.filter((id) => id !== item.id));
      setInfoToast(`Se desconectó el complemento ${item.name}.`);
    } else {
      setInstalledPluginIds((prev) => [...prev, item.id]);
      setInfoToast(`Complemento ${item.name} instalado y conectado correctamente.`);
    }
  }

  const isSearchingView = normalizedQuery.length > 0;
  const isAnimating =
    demoPhase === 'focusing' || demoPhase === 'typing' || demoPhase === 'results';

  if (selectedPlugin) {
    const isInstalled = installedPluginIds.includes(selectedPlugin.id);
    return (
      <motion.div
        key={`detail-${selectedPlugin.id}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="mt-7 w-full max-w-4xl border border-slate-200/90 rounded-2xl bg-white p-6 lg:p-7 shadow-[0_1px_4px_rgba(15,23,42,0.03)]"
      >
        {/* Barra superior de retorno */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <button
            type="button"
            onClick={() => {
              setSelectedPluginId(null);
              setInfoToast(null);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-2.5 py-1.5 -ml-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#005FFF]"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Volver a Complementos
          </button>

          <button
            type="button"
            onClick={startDemoAnimation}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#005FFF] hover:text-blue-700 hover:bg-[#E7EFFD]/60 px-3 py-1.5 rounded-lg border border-[#005FFF]/20 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#005FFF]"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Repetir animación
          </button>
        </div>

        {/* Cabecera del plugin */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-2xl border border-slate-200/90 bg-white flex items-center justify-center shrink-0 shadow-2xs p-2">
              {selectedPlugin.iconLg ?? selectedPlugin.icon}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-slate-900 tracking-tight truncate">
                  {selectedPlugin.name}
                </h3>
                {selectedPlugin.hasOrgBadge && (
                  <UserCheck className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                )}
              </div>
              <p className="text-[13px] text-slate-500 mt-0.5 truncate">
                Por {selectedPlugin.developer} · {selectedPlugin.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0 relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  if (isInstalled) {
                    setManageMenuOpen((prev) => !prev);
                  } else {
                    setInfoToast(`Opciones avanzadas de ${selectedPlugin.name} en Ambiente Sandbox.`);
                  }
                }}
                aria-label="Más opciones"
                aria-expanded={isInstalled ? manageMenuOpen : undefined}
                className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors focus-visible:outline-2 focus-visible:outline-[#005FFF]"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {isInstalled && manageMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-20">
                  <button
                    type="button"
                    onClick={() => {
                      setManageMenuOpen(false);
                      handleAction(selectedPlugin);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    Desinstalar
                  </button>
                </div>
              )}
            </div>

            {isInstalled ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setManageMenuOpen(false);
                    setInfoToast(
                      `Administrando permisos y conexión de ${selectedPlugin.name} en Ambiente Sandbox.`
                    );
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-900 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#005FFF]"
                >
                  <Settings className="w-4 h-4 text-slate-700" aria-hidden="true" />
                  Administrar
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setManageMenuOpen(false);
                    onOpenConversacion?.();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium bg-slate-900 hover:bg-slate-800 text-white transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#005FFF] focus-visible:outline-offset-2"
                >
                  <MessagesSquare className="w-4 h-4" aria-hidden="true" />
                  Pruébalo en el chat
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => handleAction(selectedPlugin)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium bg-slate-900 hover:bg-slate-800 text-white transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#005FFF] focus-visible:outline-offset-2"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                Instalar complemento
              </button>
            )}
          </div>
        </div>

        {/* Sección Aplicaciones 1 */}
        <div className="mt-7">
          <div className="border-b border-slate-200/80 pb-2.5 flex items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-900">Aplicaciones</h4>
            <span className="text-sm font-normal text-slate-400 tabular-nums">1</span>
          </div>

          <div className="py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl border border-slate-200/90 bg-white flex items-center justify-center shrink-0">
              {selectedPlugin.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-slate-900 leading-tight">
                {selectedPlugin.name}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedPlugin.appDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Sección Información */}
        <div className="mt-4">
          <div className="border-b border-slate-200/80 pb-2.5">
            <h4 className="text-sm font-semibold text-slate-900">Información</h4>
          </div>

          <dl className="mt-4 grid grid-cols-[120px_1fr] gap-y-2.5 text-[13px]">
            <dt className="text-slate-500">Desarrollador</dt>
            <dd className="text-slate-900">{selectedPlugin.developer}</dd>

            <dt className="text-slate-500">Categoría</dt>
            <dd className="text-slate-900">{selectedPlugin.categoryLabel}</dd>

            <dt className="text-slate-500">Versión</dt>
            <dd className="text-slate-900 tabular-nums">{selectedPlugin.version}</dd>

            <dt className="text-slate-500">Sitio web</dt>
            <dd className="text-slate-900">{selectedPlugin.website}</dd>
          </dl>

          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            Cuando te conectas a {selectedPlugin.name}, ChatGPT puede compartir chats y memorias
            relevantes con esta aplicación para ayudar a dar contexto a tus solicitudes. El uso
            que haga {selectedPlugin.name} de estos datos está sujeto a sus términos y su política
            de privacidad. Si tienes activada la{' '}
            <button
              type="button"
              onClick={() =>
                setInfoToast('La Memoria permite recordar contexto autorizado entre sesiones.')
              }
              className="text-[#005FFF] underline hover:text-blue-700"
            >
              Memoria
            </button>
            , los datos de la aplicación pueden usarse para proporcionar de forma proactiva
            información o sugerencias útiles. ChatGPT siempre respeta tus preferencias sobre datos
            de entrenamiento, incluidos los datos de aplicaciones conectadas. El uso de
            aplicaciones puede implicar un{' '}
            <button
              type="button"
              onClick={() =>
                setInfoToast('Revisa los permisos otorgados antes de conectar aplicaciones externas.')
              }
              className="text-[#005FFF] underline hover:text-blue-700"
            >
              riesgo elevado
            </button>
            . Puedes administrar tus preferencias o desconectarte de aplicaciones en cualquier
            momento desde la configuración.{' '}
            <button
              type="button"
              onClick={() =>
                setInfoToast(`Documentación de seguridad corporativa para ${selectedPlugin.name}.`)
              }
              className="text-[#005FFF] underline hover:text-blue-700"
            >
              Obtener más información
            </button>
          </p>
        </div>

        {/* Feedback al interactuar */}
        {infoToast && (
          <div className="mt-4 px-3.5 py-2.5 rounded-xl bg-[#F8FAFF] border border-[#005FFF]/20 text-xs text-slate-700 flex items-center justify-between gap-3">
            <span>{infoToast}</span>
            <button
              type="button"
              onClick={() => setInfoToast(null)}
              className="text-slate-400 hover:text-slate-700 shrink-0"
              aria-label="Cerrar aviso"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="mt-7 w-full max-w-4xl border border-slate-200/90 rounded-2xl bg-white p-6 lg:p-7 shadow-[0_1px_4px_rgba(15,23,42,0.03)]">
      {/* Encabezado estilo ChatGPT Complementos */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h3 className="text-[22px] font-semibold text-slate-900 tracking-tight leading-snug">
            Complementos
          </h3>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Conecta complementos para que ChatGPT pueda trabajar con tus herramientas
          </p>
        </div>

        <div className="flex items-center gap-2 self-start shrink-0">
          {isSearchingView && (
            <button
              type="button"
              onClick={() => {
                clearDemoTimers();
                setSearchQuery('');
                setHighlightedId(null);
                setInfoToast(null);
                setDemoPhase('manual');
              }}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#005FFF]"
            >
              Ver catálogo completo
            </button>
          )}
          <button
            type="button"
            onClick={startDemoAnimation}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#005FFF] hover:text-blue-700 hover:bg-[#E7EFFD]/60 px-3 py-1.5 rounded-lg border border-[#005FFF]/20 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#005FFF]"
          >
            {isAnimating ? (
              <>
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
                Buscando Bci...
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Repetir animación
              </>
            )}
          </button>
        </div>
      </div>

      {/* Buscador de complementos */}
      <div
        className={`mt-5 relative flex items-center rounded-full border bg-white px-4 py-2.5 transition-all duration-200 ${
          demoPhase === 'focusing' || demoPhase === 'typing'
            ? 'border-[#005FFF] ring-4 ring-[#005FFF]/10'
            : 'border-slate-200 focus-within:border-slate-400'
        }`}
      >
        <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" aria-hidden="true" />
        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            value={searchQuery}
            onFocus={stopDemoAndSetManual}
            onChange={(e) => {
              stopDemoAndSetManual();
              setSearchQuery(e.target.value);
              if (infoToast) setInfoToast(null);
            }}
            placeholder={demoPhase === 'focusing' ? '' : 'Buscar complementos'}
            aria-label="Buscar complementos"
            className="w-full text-[13px] text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
          />
          {(demoPhase === 'focusing' || demoPhase === 'typing') && (
            <span
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 w-[1.5px] h-4 bg-slate-900 animate-pulse"
              style={{ left: `${searchQuery.length * 7.5}px` }}
              aria-hidden="true"
            />
          )}
        </div>

        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              stopDemoAndSetManual();
              setSearchQuery('');
              setInfoToast(null);
            }}
            aria-label="Limpiar búsqueda"
            className="w-5 h-5 rounded-full bg-slate-500 hover:bg-slate-700 text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-3 h-3 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Vista catálogo inicial (oculta al buscar como en ChatGPT) */}
      <AnimatePresence mode="wait">
        {!isSearchingView ? (
          <motion.div
            key="catalog-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {/* Sección Instalados > */}
            <div className="mt-6 pt-1 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-1 text-sm font-medium text-slate-900 mb-3.5">
                <span>Instalados</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              </div>

              <div className="flex items-center flex-wrap gap-2.5">
                {INITIAL_INSTALLED_IDS.map((id, index) => {
                  const isBlueHighlight = index === INITIAL_INSTALLED_IDS.length - 1;
                  return (
                    <div
                      key={id}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isBlueHighlight
                          ? 'bg-gradient-to-br from-[#38BDF8] to-[#2563EB] shadow-xs'
                          : 'border border-slate-200 bg-white'
                      }`}
                      title="Complemento instalado"
                    >
                      <DefaultConnectorIcon muted={!isBlueHighlight} />
                    </div>
                  );
                })}

                {installedCustomItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectPlugin(item)}
                    title={`${item.name} conectado (clic para ver información)`}
                    className="w-9 h-9 rounded-xl border border-[#005FFF]/30 bg-[#F8FAFF] flex items-center justify-center shrink-0 hover:border-[#005FFF] transition-colors"
                  >
                    {item.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Pestañas Públicos / Personales */}
            <div className="mt-5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  stopDemoAndSetManual();
                  setActiveTab('publicos');
                }}
                className={`px-4 py-1.5 rounded-full text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-[#005FFF] ${
                  activeTab === 'publicos'
                    ? 'bg-slate-100 text-slate-900 font-medium'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Públicos
              </button>
              <button
                type="button"
                onClick={() => {
                  stopDemoAndSetManual();
                  setActiveTab('personales');
                }}
                className={`px-4 py-1.5 rounded-full text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-[#005FFF] ${
                  activeTab === 'personales'
                    ? 'bg-slate-100 text-slate-900 font-medium'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Personales
              </button>
            </div>

            {/* Sección Populares / Personales */}
            <div className="mt-6">
              <div className="flex items-center gap-1 text-sm font-medium text-slate-900 mb-4">
                <span>{activeTab === 'personales' ? 'Personales' : 'Populares'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {visibleItems.map((item) => {
                  const isInstalled = installedPluginIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectPlugin(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectPlugin(item);
                        }
                      }}
                      className="flex items-center justify-between gap-3 py-1.5 px-2 -mx-2 rounded-xl hover:bg-slate-50/80 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#005FFF]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl border border-slate-200/90 bg-white flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-[13px] font-medium text-slate-900 leading-tight truncate">
                              {item.name}
                            </p>
                            {item.hasOrgBadge && (
                              <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction(item);
                        }}
                        aria-label={item.name}
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isInstalled
                            ? 'bg-[#EDF6E7] text-[#59A80F]'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {item.actionType === 'info' ? (
                          <Info className="w-4 h-4 text-slate-400" />
                        ) : item.actionType === 'more' ? (
                          <MoreHorizontal className="w-4 h-4 text-slate-500" />
                        ) : item.actionType === 'device' ? (
                          isInstalled ? (
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <Laptop className="w-4 h-4 text-slate-600" />
                          )
                        ) : isInstalled ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="search-results-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            {visibleItems.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-slate-200 rounded-xl">
                <p className="text-sm font-medium text-slate-700">
                  No se encontraron complementos para «{searchQuery.trim()}»
                </p>
                <button
                  type="button"
                  onClick={startDemoAnimation}
                  className="mt-2 text-xs font-medium text-[#005FFF] hover:underline"
                >
                  Repetir búsqueda «bci»
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {visibleItems.map((item, idx) => {
                  const isInstalled = installedPluginIds.includes(item.id);
                  const isHighlighted = highlightedId === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, delay: idx * 0.05 }}
                      onClick={() => handleSelectPlugin(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectPlugin(item);
                        }
                      }}
                      className={`flex items-center justify-between gap-3 py-2 px-3 rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#005FFF] ${
                        isHighlighted
                          ? 'bg-[#F8FAFF] ring-2 ring-[#005FFF]/35 shadow-xs'
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl border border-slate-200/90 bg-white flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-[13px] font-medium text-slate-900 leading-tight truncate">
                              {item.name}
                            </p>
                            {item.hasOrgBadge && (
                              <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction(item);
                        }}
                        aria-label={item.name}
                        title={
                          item.actionType === 'more'
                            ? 'Opciones'
                            : isInstalled
                            ? 'Conectado'
                            : 'Conectar complemento'
                        }
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isInstalled
                            ? 'bg-[#EDF6E7] text-[#59A80F]'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {item.actionType === 'more' ? (
                          <MoreHorizontal className="w-4 h-4 text-slate-500" />
                        ) : item.actionType === 'device' ? (
                          isInstalled ? (
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <Laptop className="w-4 h-4 text-slate-600" />
                          )
                        ) : isInstalled ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback al interactuar */}
      {infoToast && (
        <div className="mt-4 px-3.5 py-2.5 rounded-xl bg-[#F8FAFF] border border-[#005FFF]/20 text-xs text-slate-700 flex items-center justify-between gap-3">
          <span>{infoToast}</span>
          <button
            type="button"
            onClick={() => setInfoToast(null)}
            className="text-slate-400 hover:text-slate-700 shrink-0"
            aria-label="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

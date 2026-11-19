import { Home, MessageSquare, Puzzle, ShieldCheck, SlidersHorizontal, Video, X } from 'lucide-react';
import { ModuleId, SHOWCASE_MODULES } from '../data/modules';

interface LeftSidebarProps {
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

function getModuleIcon(id: ModuleId) {
  switch (id) {
    case 'bienvenida':
      return <Home className="w-[18px] h-[18px]" aria-hidden="true" />;
    case 'plugin':
      return <Puzzle className="w-[18px] h-[18px]" aria-hidden="true" />;
    case 'conversacion':
      return <MessageSquare className="w-[18px] h-[18px]" aria-hidden="true" />;
    case 'simulacion':
      return <SlidersHorizontal className="w-[18px] h-[18px]" aria-hidden="true" />;
    case 'demo-chatgpt':
      return <Video className="w-[18px] h-[18px]" aria-hidden="true" />;
  }
}

export function LeftSidebar({
  activeModule,
  onSelectModule,
  mobileOpen,
  onCloseMobile,
}: LeftSidebarProps) {
  const sidebarContent = (
    <div className="h-full flex flex-col justify-between select-none bg-white">
      {/* Upper Section: Logo & Navigation Items */}
      <div className="flex flex-col">
        {/* Logo Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200/70">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/aistudio/84_x_41_ecdae81c.png"
              alt="Logo Bci"
              className="h-8 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col">
              <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                ShowCase
              </h1>
              <span className="text-[11px] text-slate-500 font-medium leading-tight">
                Innovación Bci
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Bci 4-Color Grid Icon */}
            <div
              className="grid grid-cols-2 gap-1 p-1 bg-slate-100/80 rounded-md"
              aria-hidden="true"
            >
              <span className="w-1.5 h-1.5 rounded-sm bg-[#F40034]" />
              <span className="w-1.5 h-1.5 rounded-sm bg-[#F9B316]" />
              <span className="w-1.5 h-1.5 rounded-sm bg-[#005FFF]" />
              <span className="w-1.5 h-1.5 rounded-sm bg-[#59A80F]" />
            </div>

            {mobileOpen && (
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Cerrar menú de navegación"
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#005FFF]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Section Header */}
        <div className="px-4 pt-5 pb-2.5 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Módulos Principales
          </span>
        </div>

        {/* Navigation Group */}
        <nav aria-label="Navegación principal" className="flex flex-col gap-1.5 px-2.5">
          {SHOWCASE_MODULES.map((mod) => {
            const isActive = mod.id === activeModule;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => {
                  onSelectModule(mod.id);
                  onCloseMobile();
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 group text-left relative overflow-hidden focus-visible:outline-2 focus-visible:outline-[#005FFF] focus-visible:outline-offset-2 ${
                  isActive
                    ? `${mod.theme.activeBg} ${mod.theme.activeText} font-semibold shadow-xs border ${mod.theme.activeBorder}`
                    : 'border border-transparent text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: mod.theme.accentColor }}
                    aria-hidden="true"
                  />
                )}

                <div className={`flex items-center gap-3 min-w-0 ${isActive ? 'pl-1' : ''}`}>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-150 ${
                      isActive
                        ? 'text-white shadow-xs'
                        : `${mod.theme.iconBg} ${mod.theme.iconText} group-hover:scale-105`
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: mod.theme.accentColor }
                        : undefined
                    }
                  >
                    {getModuleIcon(mod.id)}
                  </div>
                  <span
                    className={`text-sm whitespace-nowrap truncate ${
                      isActive ? 'font-semibold' : 'font-medium'
                    }`}
                  >
                    {mod.navLabel}
                  </span>
                </div>

                {isActive ? (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shrink-0 whitespace-nowrap"
                    style={{ backgroundColor: mod.theme.accentColor }}
                  >
                    En uso
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 transition-colors" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Sandbox Environment Box */}
      <div className="p-4 border-t border-slate-200/70">
        <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FAECC9] text-[#B87D00] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-slate-900 truncate">
              Innovación Bci
            </span>
            <span className="text-[11px] text-slate-500 truncate">
              Ambiente Sandbox
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex w-[264px] shrink-0 border-r border-slate-200/80 bg-white flex-col shadow-[0_1px_8px_rgba(0,0,0,0.03)]"
        data-purpose="main-navigation-sidebar"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-[1px]"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside
            className="relative w-[264px] max-w-[85vw] h-full border-r border-slate-200 bg-white z-50 shadow-xl"
            data-purpose="main-navigation-sidebar-mobile"
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

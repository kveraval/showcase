import { Search, X, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ModuleId, SHOWCASE_MODULES } from '../data/modules';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectModule: (id: ModuleId) => void;
}

export function SearchModal({ open, onClose, onSelectModule }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const filteredModules = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return SHOWCASE_MODULES;
    return SHOWCASE_MODULES.filter((mod) => {
      const fullDesc = `${mod.title} ${mod.sidebarTitle} ${mod.descriptionPrefix}${mod.descriptionHighlight}${mod.descriptionSuffix} ${(mod.capabilities ?? [])
        .map((c) => c.text)
        .join(' ')}`.toLowerCase();
      return fullDesc.includes(trimmed);
    });
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/30 backdrop-blur-[1px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Buscar módulos y capacidades"
    >
      <div
        className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200/80">
          <Search className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar módulos, capacidades o integraciones..."
            className="flex-1 text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar búsqueda"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#005FFF]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-3 space-y-1.5">
          {filteredModules.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm font-medium text-slate-700">
                Sin resultados para «{query}»
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Intenta buscar por Plugin, OAuth, Sandbox o Simulación.
              </p>
            </div>
          ) : (
            filteredModules.map((mod) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => {
                  onSelectModule(mod.id);
                  onClose();
                }}
                className="w-full text-left px-3.5 py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 group focus-visible:outline-2 focus-visible:outline-[#005FFF]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: mod.theme.accentColor }}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-[#005FFF] transition-colors">
                      {mod.title}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500 truncate">
                      {mod.sidebarTitle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {mod.capabilities?.[0]?.text}
                  </p>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-slate-300 group-hover:text-[#005FFF] shrink-0 transition-colors"
                  aria-hidden="true"
                />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import { ShieldCheck, X } from 'lucide-react';
import { useEffect } from 'react';
import { ShowcaseModule } from '../data/modules';

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
  module: ShowcaseModule;
}

export function HelpModal({ open, onClose, module }: HelpModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-[1px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Ayuda del entorno ShowCase Innovación Bci"
    >
      <div
        className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shrink-0">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Guía del Ambiente Sandbox
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                ShowCase Innovación Bci · {module.title}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ayuda"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#005FFF]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-[13px] leading-relaxed text-slate-600">
          <p>
            Este espacio presenta los módulos principales del ecosistema de
            innovación digital de Bci en un entorno aislado{' '}
            <span className="font-semibold text-slate-800">Sandbox</span>.
          </p>
          <p>
            Usa el panel izquierdo para alternar entre{' '}
            <span className="font-semibold text-slate-800">Instalar Plugin</span>,{' '}
            <span className="font-semibold text-slate-800">Conversación</span> y{' '}
            <span className="font-semibold text-slate-800">Simulación</span>, y
            revisa en el panel derecho las especificaciones técnicas y
            capacidades habilitadas para cada módulo.
          </p>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl text-xs text-slate-500">
          {module.complianceNote}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#005FFF] hover:bg-blue-700 text-white text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#005FFF] focus-visible:outline-offset-2"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

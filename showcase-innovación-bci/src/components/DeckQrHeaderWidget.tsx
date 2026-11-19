import { ExternalLink, FileText, QrCode, Sparkles, X } from 'lucide-react';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';

interface DeckQrHeaderWidgetProps {
  onOpenDeck: () => void;
}

export function DeckQrHeaderWidget({ onOpenDeck }: DeckQrHeaderWidgetProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate QR code pointing to ?view=deck on current host
    const targetUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}?view=deck`
        : 'https://ais-pre-6aflcjunpq5pvzlxl2lxtk-389738236695.us-east1.run.app?view=deck';

    QRCode.toDataURL(targetUrl, {
      width: 220,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error creating QR:', err));
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    }
    if (popoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [popoverOpen]);

  return (
    <div className="relative" ref={popoverRef}>
      {/* Botón QR en la cabecera superior derecha */}
      <button
        type="button"
        onClick={() => setPopoverOpen((prev) => !prev)}
        aria-expanded={popoverOpen}
        aria-haspopup="dialog"
        title="Escanear código QR para ver la presentación Plan 2026"
        className="group inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800 hover:border-[#005FFF]/40 transition-all shadow-2xs focus-visible:outline-2 focus-visible:outline-[#005FFF]"
      >
        <div className="w-7 h-7 rounded-lg bg-[#E7EFFD] group-hover:bg-[#005FFF] text-[#005FFF] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
          <QrCode className="w-4 h-4 stroke-[2.25]" aria-hidden="true" />
        </div>
        <div className="text-left flex flex-col leading-tight">
          <span className="text-[11px] font-bold text-slate-900 group-hover:text-[#005FFF] transition-colors whitespace-nowrap flex items-center gap-1">
            PPT Plan 2026
            <span className="w-1.5 h-1.5 rounded-full bg-[#59A80F]" />
          </span>
          <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
            Escanear QR
          </span>
        </div>
      </button>

      {/* Popover desplegable con el código QR */}
      {popoverOpen && (
        <div
          role="dialog"
          aria-label="Código QR Deck Gerencia Innovación Plan 2026"
          className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 z-40 animate-fade-in"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#005FFF]" />
              <h4 className="text-xs font-bold text-slate-900">
                Deck Innovación 2026
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setPopoverOpen(false)}
              aria-label="Cerrar ventana QR"
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-3 text-center space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 inline-block">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR para ver el Deck Plan 2026 en tu móvil"
                  className="w-44 h-44 mx-auto object-contain"
                />
              ) : (
                <div className="w-44 h-44 flex items-center justify-center text-xs text-slate-400">
                  Cargando QR...
                </div>
              )}
            </div>

            <p className="text-[11.5px] text-slate-600 leading-snug">
              Apunta con la cámara de tu teléfono para abrir el{' '}
              <strong className="text-slate-900">
                Plan 2026 Gerencia Innovación
              </strong>{' '}
              directamente en tu pantalla.
            </p>

            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setPopoverOpen(false);
                  onOpenDeck();
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-[#005FFF] hover:bg-blue-700 text-white transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                Ver PPT aquí
              </button>

              <a
                href="/assets/aistudio/DECK_GERENCIA_INNOVACION_2026.txt"
                download="DECK_GERENCIA_INNOVACION_2026.txt"
                className="inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                title="Descargar archivo completo"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

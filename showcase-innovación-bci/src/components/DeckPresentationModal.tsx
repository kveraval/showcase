import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  QrCode,
  Share2,
  X,
} from 'lucide-react';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { DECK_SLIDES, DeckSlide } from '../data/deckSlides';

interface DeckPresentationModalProps {
  open: boolean;
  onClose: () => void;
}

export function DeckPresentationModal({ open, onClose }: DeckPresentationModalProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  const currentSlide: DeckSlide = DECK_SLIDES[currentSlideIndex] ?? DECK_SLIDES[0];

  useEffect(() => {
    if (!open) return;

    // Generate QR code pointing to this deck
    const currentUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}?view=deck`
        : 'https://ais-pre-6aflcjunpq5pvzlxl2lxtk-389738236695.us-east1.run.app?view=deck';

    QRCode.toDataURL(currentUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR:', err));
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => (prev < DECK_SLIDES.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        if (showQrModal) {
          setShowQrModal(false);
        } else {
          onClose();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, showQrModal]);

  if (!open) return null;

  function handleCopyShareLink() {
    const url = `${window.location.origin}${window.location.pathname}?view=deck`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Presentación Deck Gerencia Innovación Plan 2026"
    >
      <div
        className={`w-full bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 border border-slate-200 ${
          isFullscreen
            ? 'fixed inset-3 max-w-none h-[calc(100vh-24px)]'
            : 'max-w-5xl h-[88vh] max-h-[820px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior modal */}
        <div className="h-14 px-5 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/80">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: currentSlide.tagColor }}
              aria-hidden="true"
            />
            <div className="min-w-0 flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                {currentSlide.category}
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-xs font-semibold text-slate-800 truncate">
                Deck Gerencia Innovación 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Botón QR */}
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
              title="Ver código QR para escanear en celular"
            >
              <QrCode className="w-3.5 h-3.5 text-[#005FFF]" aria-hidden="true" />
              <span className="hidden sm:inline">Código QR</span>
            </button>

            {/* Descargar texto PPT */}
            <a
              href="/assets/aistudio/DECK_GERENCIA_INNOVACION_2026.txt"
              download="DECK_GERENCIA_INNOVACION_2026.txt"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
              title="Descargar archivo del deck"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span className="hidden sm:inline">Descargar</span>
            </a>

            {/* Pantalla completa */}
            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Cerrar */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar presentación"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contenido de la diapositiva */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Badges y contador */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="px-2.5 py-1 rounded-md text-xs font-bold text-white shadow-2xs"
                  style={{ backgroundColor: currentSlide.tagColor }}
                >
                  Slide {currentSlide.id} de {DECK_SLIDES.length}
                </span>
                {currentSlide.badges?.map((badge, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <span className="text-xs font-medium text-slate-400 tabular-nums">
                {currentSlideIndex + 1} / {DECK_SLIDES.length}
              </span>
            </div>

            {/* Título y Subtítulo de la diapositiva */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-tight">
                {currentSlide.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium mt-1.5 leading-relaxed">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Métrica clave si existe */}
            {currentSlide.keyMetric && (
              <div className="rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 border border-blue-200/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#005FFF]">
                    {currentSlide.keyMetric.label}
                  </span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                    {currentSlide.keyMetric.value}
                  </p>
                </div>
                {currentSlide.keyMetric.detail && (
                  <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-md">
                    {currentSlide.keyMetric.detail}
                  </p>
                )}
              </div>
            )}

            {/* Puntos de contenido en grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {currentSlide.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:border-slate-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 rounded-md bg-[#EDF6E7] text-[#59A80F] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.75]" aria-hidden="true" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {pt.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-7">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Frase / Highlight de la diapositiva */}
            {currentSlide.highlight && (
              <div className="rounded-xl bg-amber-50/70 border border-amber-200/60 p-4 text-xs sm:text-sm font-medium text-amber-950 flex items-start gap-3">
                <span className="text-amber-600 font-bold text-base leading-none mt-0.5">“</span>
                <p className="italic leading-relaxed">{currentSlide.highlight}</p>
              </div>
            )}
          </div>
        </div>

        {/* Barra inferior de navegación */}
        <div className="h-16 px-5 border-t border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/90">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentSlideIndex === 0}
              onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              Anterior
            </button>

            <button
              type="button"
              disabled={currentSlideIndex === DECK_SLIDES.length - 1}
              onClick={() =>
                setCurrentSlideIndex((prev) => Math.min(DECK_SLIDES.length - 1, prev + 1))
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Indicadores de slides */}
          <div className="hidden md:flex items-center gap-1.5">
            {DECK_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`Ir a diapositiva ${s.id}`}
                className={`transition-all rounded-full ${
                  idx === currentSlideIndex
                    ? 'w-6 h-2 bg-[#005FFF]'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Compartir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal flotante de QR para escanear en celular */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-sm font-bold text-slate-900">
                Escanear Deck en Celular
              </h3>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 inline-block mx-auto">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Código QR para ver el Deck Plan 2026 en celular"
                  className="w-56 h-56 mx-auto object-contain"
                />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-xs text-slate-400">
                  Generando QR...
                </div>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Apunta con la cámara de tu smartphone para abrir la presentación ejecutiva del{' '}
              <strong className="text-slate-900 font-semibold">
                Plan 2026 de la Gerencia de Innovación
              </strong>
              .
            </p>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
            >
              Listo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { ExternalLink, Video } from 'lucide-react';

const DEFAULT_YOUTUBE_URL = 'https://youtu.be/6vna_iaRdoI';
const DEFAULT_EMBED_URL = 'https://www.youtube.com/embed/6vna_iaRdoI';

export function DemoChatGptShowcase() {
  return (
    <div className="mt-7 w-full max-w-4xl">
      <div className="w-full rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-4">
        {/* Cabecera del reproductor */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#FEF4DB] text-[#D99100] flex items-center justify-center shrink-0">
              <Video className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 truncate">
                Demo en ChatGPT · Video Oficial Bci
              </h3>
              <p className="text-xs text-slate-500 truncate">
                Reproducción de la experiencia en ChatGPT
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={DEFAULT_YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#B87D00] hover:text-[#966500] bg-[#FEF4DB] hover:bg-[#FCE9BA] px-3 py-1.5 rounded-lg border border-[#F9B316]/30 transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              Abrir en YouTube
            </a>
          </div>
        </div>

        {/* Contenedor del video incrustado */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-950">
          <iframe
            src={DEFAULT_EMBED_URL}
            title="Demo en chatGpt - Video YouTube"
            className="w-full h-full border-0 bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

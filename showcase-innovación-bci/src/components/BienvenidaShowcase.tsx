import { ArrowRight } from 'lucide-react';

interface BienvenidaShowcaseProps {
  onStartPlugin: () => void;
}

export function BienvenidaShowcase({ onStartPlugin }: BienvenidaShowcaseProps) {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center py-6 lg:py-10">
      <div className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/70 p-7 sm:p-10 lg:p-12 shadow-[0_8px_32px_rgba(15,23,42,0.05)]">
        {/* Bci 4-Color Signature Precision Rule + Editorial Kicker */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-1 w-5 rounded-full bg-[#F40034]" />
            <span className="h-1 w-5 rounded-full bg-[#F9B316]" />
            <span className="h-1 w-5 rounded-full bg-[#005FFF]" />
            <span className="h-1 w-5 rounded-full bg-[#59A80F]" />
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Innovación Bci</span>
            <span aria-hidden="true">·</span>
            <span>Experiencia en ChatGPT</span>
          </div>
        </div>

        {/* Central Quote Statement */}
        <blockquote className="mt-7 text-center">
          <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl lg:text-[27px] leading-[1.38] tracking-tight text-balance">
            <span className="text-slate-950 font-bold">
              ¿Cómo cambia la experiencia cuando es{' '}
              <span className="text-[#005FFF]">Bci</span> quien se suma a tu
              conversación en ChatGPT justo en el momento en que lo necesitas?
            </span>
          </p>
        </blockquote>

        {/* Hairline Divider & Primary Journey Action */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap">
            <span>Instalar Plugin</span>
            <span aria-hidden="true">·</span>
            <span>Conversación</span>
            <span aria-hidden="true">·</span>
            <span>Simulación</span>
            <span aria-hidden="true">·</span>
            <span>Demo</span>
          </div>

          <button
            type="button"
            onClick={onStartPlugin}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#005FFF] hover:bg-[#004ECC] text-white text-sm font-semibold shadow-xs transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#005FFF] focus-visible:outline-offset-2 cursor-pointer"
          >
            <span>Explorar Instalar Plugin</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { Check, Sparkles, TrendingUp } from 'lucide-react';
import { CapabilityItem, ShowcaseModule } from '../data/modules';

interface RightSpecsSidebarProps {
  module: ShowcaseModule;
}

function getCapabilityBadgeStyle(accent: CapabilityItem['accent']) {
  switch (accent) {
    case 'blue':
      return 'bg-[#E7EFFD] text-[#005FFF]';
    case 'green':
      return 'bg-[#EDF6E7] text-[#59A80F]';
    case 'amber':
      return 'bg-[#FAECC9] text-[#9A6700]';
  }
}

export function RightSpecsSidebar({ module }: RightSpecsSidebarProps) {
  return (
    <aside
      className="w-full lg:w-[400px] xl:w-[420px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200/80 bg-white p-4 xl:p-5 overflow-y-auto flex flex-col gap-3 xl:gap-3.5"
      data-purpose="module-specifications-sidebar"
    >
      {/* Module Title & Online Status */}
      <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-200/70 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{
              backgroundColor: module.theme.accentColor,
              boxShadow: `0 0 0 4px ${module.theme.ringColor}`,
            }}
            aria-hidden="true"
          />
          <h3 className="text-base xl:text-lg font-bold text-slate-950 tracking-tight truncate">
            {module.sidebarTitle}
          </h3>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EDF6E7] text-[#59A80F] border border-[#59A80F]/20 shrink-0 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#59A80F] mr-1.5" aria-hidden="true" />
          Online
        </span>
      </div>

      {/* Description Section */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <h4 className="text-[11px] xl:text-xs font-bold uppercase tracking-wider text-slate-600">
          ¿Qué hace?
        </h4>
        <div className="p-3 xl:p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/90 shadow-2xs">
          <p className="text-[13.5px] xl:text-sm font-medium text-slate-700 leading-snug xl:leading-relaxed">
            {module.descriptionPrefix}
            <strong className="font-bold text-slate-950">
              {module.descriptionHighlight}
            </strong>
            {module.descriptionSuffix}
          </p>
        </div>
      </div>

      {/* Key Capabilities Card */}
      {module.capabilities && module.capabilities.length > 0 && (
        <div
          className="flex flex-col gap-2 p-3 xl:p-3.5 rounded-xl bg-[#F8FAFF] border border-[#005FFF]/20 shadow-xs shrink-0"
          data-purpose="key-capabilities-card"
        >
          {/* Capabilities Header */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#E7EFFD] text-[#005FFF] flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-950">
                Capacidades Clave
              </h5>
            </div>
            <span className="text-[10px] font-bold text-[#005FFF] bg-white px-2 py-0.5 rounded border border-[#005FFF]/20 tabular-nums whitespace-nowrap">
              {module.capabilities.length} Activas
            </span>
          </div>

          {/* List of Key Capabilities */}
          <ul className="text-[13px] xl:text-[13.5px] text-slate-700 space-y-2 leading-snug pt-0.5">
            {module.capabilities.map((cap) => (
              <li key={cap.id} className="flex items-start gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${getCapabilityBadgeStyle(
                    cap.accent
                  )}`}
                >
                  <Check className="w-2.5 h-2.5 stroke-[2.75]" aria-hidden="true" />
                </div>
                <span className="leading-snug">
                  {cap.lead && (
                    <strong className="font-bold text-slate-950">{cap.lead} </strong>
                  )}
                  <span>{cap.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Advantages Card */}
      {module.advantages && module.advantages.length > 0 && (
        <div
          className="flex flex-col gap-2 p-3 xl:p-3.5 rounded-xl bg-[#F6FBF2] border border-[#59A80F]/25 shadow-xs shrink-0"
          data-purpose="advantages-card"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#EDF6E7] text-[#59A80F] flex items-center justify-center shrink-0">
                <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-950">
                Ventajas para el Usuario
              </h5>
            </div>
            <span className="text-[10px] font-bold text-[#59A80F] bg-white px-2 py-0.5 rounded border border-[#59A80F]/20 tabular-nums whitespace-nowrap">
              {module.advantages.length} Clave
            </span>
          </div>

          <ul className="text-[13px] xl:text-[13.5px] text-slate-700 space-y-2 leading-snug pt-0.5">
            {module.advantages.map((advantage, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-[#EDF6E7] text-[#59A80F] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[2.75]" aria-hidden="true" />
                </div>
                <span className="leading-snug">
                  {advantage.lead && (
                    <strong className="font-bold text-slate-950">{advantage.lead} </strong>
                  )}
                  <span>{advantage.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

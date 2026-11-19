import {
  ArrowUp,
  Check,
  Folder,
  Info,
  Library,
  Mail,
  Mic,
  Monitor,
  Play,
  Plus,
  RotateCcw,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text?: string;
  mentionPlugin?: boolean;
  showQuickConfirm?: boolean;
  showSimulator?: boolean;
}

interface ConversacionChatShowcaseProps {
  onOpenComplementos?: () => void;
  onOpenSimulacion?: () => void;
}

type ChatDemoPhase =
  | 'idle'
  | 'typing-user-1'
  | 'thinking-1'
  | 'bot-1'
  | 'typing-user-2'
  | 'thinking-2'
  | 'simulator'
  | 'manual';

const QUICK_PROMPTS = [
  '@Bci Hola, quiero saber de créditos',
  'Quiero hacer una simulación de crédito de consumo',
  'Consultar tasas y plazos disponibles en Bci',
];

function ConnectorGlyph() {
  return (
    <svg
      className="w-3.5 h-3.5 text-slate-600 shrink-0"
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

function BciInlineSimulator() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedPromo, setAcceptedPromo] = useState(false);
  const [acceptedShare, setAcceptedShare] = useState(false);

  const [amountInput, setAmountInput] = useState('');
  const [installmentsInput, setInstallmentsInput] = useState('');
  const [seguroDesgravamen, setSeguroDesgravamen] = useState(false);
  const [seguroCesantia, setSeguroCesantia] = useState(false);
  const [showInsuranceNote, setShowInsuranceNote] = useState(false);
  const [showTermsNote, setShowTermsNote] = useState(false);
  const [showNormativaNote, setShowNormativaNote] = useState(false);

  const canContinueStep1 =
    rut.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.trim().length > 0 &&
    acceptedPrivacy;

  const numericAmount = Number(amountInput.replace(/\D/g, '')) || 5000000;
  const numericInstallments = Number(installmentsInput.replace(/\D/g, '')) || 24;
  const canSimulateStep2 =
    amountInput.replace(/\D/g, '').length > 0 &&
    installmentsInput.replace(/\D/g, '').length > 0;

  const monthlyRate = 0.0166;
  const baseMonthly =
    (numericAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -numericInstallments));
  const desgravamenTotal = seguroDesgravamen
    ? Math.round(numericAmount * 0.00115 * numericInstallments)
    : 0;
  const cesantiaTotal = seguroCesantia
    ? Math.round(numericAmount * 0.00145 * numericInstallments)
    : 0;
  const totalInsurances = desgravamenTotal + cesantiaTotal;
  const monthlyPayment = Math.round(baseMonthly + totalInsurances / numericInstallments);
  const totalCreditCost = monthlyPayment * numericInstallments;
  const caePercent = seguroDesgravamen || seguroCesantia ? '21,85%' : '20,44%';

  const formatClp = (v: number) => `$${Math.round(v).toLocaleString('es-CL')}`;

  return (
    <div className="space-y-3">
      <div className="w-full rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        {(step === 1 || step === 2) && (
          <div className="flex items-center gap-3.5 mb-5">
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3.5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 20}
                  strokeDashoffset={step === 1 ? Math.PI * 20 : 0}
                  className="transition-all duration-300"
                />
              </svg>
              <span className="absolute text-sm font-semibold text-slate-800 tabular-nums">
                {step}/2
              </span>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-semibold text-slate-900 leading-tight">
                {step === 1 ? 'Ingresa tus datos personales' : 'Ingresa los datos de tu crédito'}
              </h4>
              {step === 1 && (
                <p className="text-xs text-slate-400 mt-0.5">
                  Siguiente: Datos de tu crédito
                </p>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1.5">
                ¿Cuál es tu RUT?
              </label>
              <input
                type="text"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder="11.111.111-1"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1.5">
                ¿Cuál es tu correo electrónico?
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@micorreo.com"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1.5">
                Número de contactos
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+569  12345678"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none"
              />
            </div>

            <div className="pt-1 space-y-2.5 text-xs text-slate-700">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedPrivacy}
                  onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span>Leí y entiendo la Política de Privacidad.</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedPromo}
                  onChange={(e) => setAcceptedPromo(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span>
                  Acepto recibir información{' '}
                  <strong className="font-semibold text-slate-900">
                    sobre productos, servicios o beneficios
                  </strong>{' '}
                  que Bci y MACHBANK tienen para ofrecer.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedShare}
                  onChange={(e) => setAcceptedShare(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span>
                  Acepto que Bci y MACHBANK compartan mis datos con otras empresas del grupo Bci
                  para recibir ofertas de productos y servicios.
                </span>
              </label>
            </div>

            {/* Caja informativa azul */}
            <div className="mt-2 rounded-lg border border-[#93C5FD] bg-[#EFF6FF] p-3.5 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                ¡No te preocupes! Solo harás una simulación que no implica un compromiso comercial.
                Si eres cliente Bci, te recomendamos simular el crédito en tu sesión de cuenta
                personal.
              </p>
            </div>

            {/* Botón Continuar */}
            <button
              type="button"
              onClick={() => setStep(2)}
              className={`w-full py-2.5 rounded-full text-[13px] font-medium text-white transition-colors ${
                canContinueStep1
                  ? 'bg-[#108A45] hover:bg-[#0D743A]'
                  : 'bg-[#A3D1B0] hover:bg-[#8EC49D]'
              }`}
            >
              Continuar
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1.5">
                ¿Cuánto quieres pedir?
              </label>
              <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3.5 py-2 focus-within:border-[#2563EB] transition-colors">
                <span className="text-[13px] font-medium text-slate-700 mr-2">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  placeholder="Ingresa el monto"
                  className="w-full text-[13px] text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1.5">
                ¿En cuántas cuotas?
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={installmentsInput}
                onChange={(e) => setInstallmentsInput(e.target.value)}
                placeholder="Ingrese número de cuotas"
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none tabular-nums"
              />
            </div>

            <div className="pt-1 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-800">
                  ¿Quieres contratarlo con un seguro asociado?
                </span>
                <button
                  type="button"
                  onClick={() => setShowInsuranceNote((prev) => !prev)}
                  aria-label="Información sobre seguros asociados"
                  className="w-4 h-4 rounded-full bg-[#2563EB] text-white text-[10px] font-bold flex items-center justify-center shrink-0 hover:bg-blue-700 transition-colors"
                >
                  !
                </button>
              </div>

              {showInsuranceNote && (
                <p className="text-[11px] text-slate-600 bg-[#EFF6FF] border border-[#93C5FD] rounded-lg px-3 py-2">
                  Los seguros de Desgravamen y Cesantía son opcionales y protegen el saldo o cuotas
                  de tu crédito según las coberturas contratadas.
                </p>
              )}

              <div className="flex items-center gap-8 text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={seguroDesgravamen}
                    onChange={(e) => setSeguroDesgravamen(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Desgravamen</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={seguroCesantia}
                    onChange={(e) => setSeguroCesantia(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Cesantía</span>
                </label>
              </div>
            </div>

            <div className="pt-1 space-y-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-2.5 rounded-full text-[13px] font-medium text-[#2563EB] border border-[#2563EB] bg-white hover:bg-[#EFF6FF] transition-colors"
              >
                Volver
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!amountInput.trim()) setAmountInput('5000000');
                  if (!installmentsInput.trim()) setInstallmentsInput('24');
                  setShowNormativaNote(false);
                  setStep(3);
                }}
                className={`w-full py-2.5 rounded-full text-[13px] font-medium text-white transition-colors ${
                  canSimulateStep2
                    ? 'bg-[#108A45] hover:bg-[#0D743A]'
                    : 'bg-[#A3D1B0] hover:bg-[#8EC49D]'
                }`}
              >
                Simular mi crédito
              </button>
            </div>

            <div className="rounded-lg border border-[#93C5FD] bg-[#EFF6FF] p-3.5 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                ¡No te preocupes! Solo harás una simulación que no implica un compromiso comercial.
                Si eres cliente Bci, te recomendamos hacerlo desde tu sesión personal. Al continuar,
                puedes{' '}
                <button
                  type="button"
                  onClick={() => setShowTermsNote((prev) => !prev)}
                  className="text-[#2563EB] hover:underline font-medium"
                >
                  leer los Términos y condiciones.
                </button>
              </p>
            </div>

            {showTermsNote && (
              <p className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                Simulación referencial sujeta a evaluación comercial y políticas vigentes de Banco
                Bci.
              </p>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 className="text-base font-medium text-slate-900 mb-3.5">
              Este es el resultado de tu simulación:
            </h4>

            <div className="space-y-1.5">
              <div className="rounded-lg bg-[#E9F5EA] py-3.5 px-4 text-center">
                <p className="text-xs font-medium text-slate-800">Cuota mensual</p>
                <p className="text-[22px] font-medium text-[#16843E] tabular-nums mt-0.5">
                  {formatClp(monthlyPayment)}
                </p>
              </div>

              <div className="rounded-lg bg-[#F3F4F6] py-3.5 px-4 text-center">
                <p className="text-xs font-medium text-slate-800">Monto a solicitar</p>
                <p className="text-[20px] font-medium text-[#16843E] tabular-nums mt-0.5">
                  {formatClp(numericAmount)}
                </p>
              </div>

              <div className="rounded-lg bg-[#F3F4F6] py-3.5 px-4 text-center">
                <p className="text-xs font-medium text-slate-800">Tasa de Interés</p>
                <p className="text-[20px] font-medium text-[#16843E] tabular-nums mt-0.5">
                  1,66%
                </p>
              </div>

              <div className="rounded-lg bg-[#F3F4F6] py-3.5 px-4 text-center">
                <p className="text-xs font-medium text-slate-800">
                  Costo Total del Crédito (CTC)
                </p>
                <p className="text-[20px] font-medium text-[#16843E] tabular-nums mt-0.5">
                  {formatClp(totalCreditCost)}
                </p>
              </div>
            </div>

            <div className="mt-4 divide-y divide-slate-200/80 border-b border-slate-200/80 text-xs">
              <div className="py-2.5 flex items-center justify-between gap-4">
                <span className="text-slate-500">Número de cuotas</span>
                <span className="text-slate-700 font-medium tabular-nums">
                  {numericInstallments}
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-4">
                <span className="text-slate-500">Fecha del primer pago</span>
                <span className="text-slate-700 font-medium tabular-nums">20/12/2026</span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-4">
                <span className="text-slate-500">Carga anual equivalente (CAE)</span>
                <span className="text-slate-700 font-medium tabular-nums">{caePercent}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-4">
                <span className="text-slate-500">Total seguros: Desgravamen + Cesantía</span>
                <span className="text-slate-700 font-medium tabular-nums">
                  {formatClp(totalInsurances)}
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-4">
                <span className="text-slate-500">Ver normativa de seguros</span>
                <button
                  type="button"
                  onClick={() => setShowNormativaNote((prev) => !prev)}
                  className="text-[#2563EB] hover:underline font-medium"
                >
                  Información
                </button>
              </div>
            </div>

            {showNormativaNote && (
              <p className="mt-3 text-[11px] text-slate-600 bg-[#EFF6FF] border border-[#93C5FD] rounded-lg px-3 py-2">
                Los seguros asociados de Desgravamen y Cesantía son voluntarios según normativa CMF
                vigente y su prima se incluye de forma referencial en la cuota simulada.
              </p>
            )}

            <div className="mt-4 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setStep(2);
                }}
                className="w-full py-2.5 rounded-full text-[13px] font-medium text-[#2563EB] border border-[#2563EB] bg-white hover:bg-[#EFF6FF] transition-colors"
              >
                Volver a simular
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-full py-2.5 rounded-full text-[13px] font-medium text-white bg-[#108A45] hover:bg-[#0D743A] transition-colors"
              >
                Me interesa el crédito
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="py-8 sm:py-10 px-2 flex flex-col items-center text-center">
            <div className="relative w-24 h-24 rounded-full bg-[#DCF7D8] flex items-center justify-center">
              <Mail className="w-8 h-8 text-slate-900" strokeWidth={1.8} aria-hidden="true" />
              <span className="absolute top-1 right-1 w-6 h-6 rounded-full bg-[#1C8E38] text-white border-2 border-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5" strokeWidth={2.75} aria-hidden="true" />
              </span>
            </div>

            <h4 className="mt-6 text-[20px] sm:text-[22px] font-medium text-slate-900 leading-snug">
              ¡Listo!
              <br />
              Ya hiciste tu simulación
            </h4>

            <p className="mt-3 text-xs sm:text-[13px] text-slate-500 max-w-md leading-relaxed">
              Dentro de 2 días, uno de nuestros ejecutivos Bci te contactará para explicarte los
              siguientes pasos y responder cualquier duda que tengas.
            </p>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setRut('');
                setEmail('');
                setPhone('');
                setAcceptedPrivacy(false);
                setAcceptedPromo(false);
                setAcceptedShare(false);
                setAmountInput('');
                setInstallmentsInput('');
                setSeguroDesgravamen(false);
                setSeguroCesantia(false);
                setShowInsuranceNote(false);
                setShowTermsNote(false);
                setShowNormativaNote(false);
              }}
              className="mt-7 w-full max-w-[300px] py-2.5 rounded-full text-[13px] font-medium text-white bg-[#1A9E39] hover:bg-[#158430] transition-colors"
            >
              Entendido
            </button>
          </div>
        )}

        {/* Pie del simulador */}
        <div className="mt-4 pt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
          <span>Un servicio de</span>
          <img
            src="/assets/aistudio/84_x_41_ecdae81c.png"
            alt="Logo Bci"
            className="h-4 w-auto object-contain"
          />
        </div>
      </div>

      {(step === 1 || step === 2) && (
        <p className="text-[13px] text-slate-800">
          Aquí tienes el simulador, ingresa tus datos a continuación.
        </p>
      )}
    </div>
  );
}

export function ConversacionChatShowcase({
  onOpenComplementos,
  onOpenSimulacion,
}: ConversacionChatShowcaseProps) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [effortLevel, setEffortLevel] = useState<'Bajo' | 'Medio' | 'Alto'>('Bajo');
  const [plusMenuOpen, setPlusMenuOpen] = useState(false);
  const [subNotice, setSubNotice] = useState<string | null>(null);
  const [bciMentionActive, setBciMentionActive] = useState(true);
  const [demoPhase, setDemoPhase] = useState<ChatDemoPhase>('idle');

  const timersRef = useRef<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const clearDemoTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const startDemoAnimation = useCallback(() => {
    clearDemoTimers();
    setMessages([]);
    setInputValue('');
    setPlusMenuOpen(false);
    setSubNotice(null);
    setBciMentionActive(false);
    setDemoPhase('idle');

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    const mentionText = '@Bci';
    const firstPrompt = 'Hola, quiero saber de créditos';
    const secondPrompt = 'Sí, quiero hacer una simulación';

    let t = 400;

    // 1. Escribe @Bci para invocar el complemento y activa la etiqueta @Bci
    schedule(() => setDemoPhase('typing-user-1'), t);
    t += 160;
    for (let i = 1; i <= mentionText.length; i++) {
      schedule(() => {
        setInputValue(mentionText.slice(0, i));
      }, t);
      t += 70;
    }
    t += 350;
    schedule(() => {
      setInputValue('');
      setBciMentionActive(true);
    }, t);

    // Pausa breve tras activar @Bci y escribe la consulta
    t += 550;
    for (let i = 1; i <= firstPrompt.length; i++) {
      schedule(() => {
        setInputValue(firstPrompt.slice(0, i));
      }, t);
      t += 38;
    }

    // Pausa de 2 segundos antes de enviar la consulta
    t += 2000;

    // 2. Envía la primera consulta invocando @Bci y muestra estado pensando
    schedule(() => {
      setInputValue('');
      setDemoPhase('thinking-1');
      setMessages([
        {
          id: 'demo-u1',
          role: 'user',
          mentionPlugin: true,
          text: firstPrompt,
        },
      ]);
    }, t);

    // 3. Pausa de 2 segundos y respuesta del asistente mencionando el simulador del Banco Bci
    t += 2000;
    schedule(() => {
      setDemoPhase('bot-1');
      setMessages((prev) => [
        ...prev,
        {
          id: 'demo-a1',
          role: 'assistant',
          text: '¡Hola! Tengo conectado el Simulador de Créditos del Banco Bci para ayudarte a revisar opciones, plazos y montos de forma rápida y sin compromiso. ¿Quieres hacer una simulación ahora?',
          showQuickConfirm: true,
        },
      ]);
    }, t);

    // 4. Pausa de 2 segundos antes de escribir confirmación para simular
    t += 2000;
    schedule(() => setDemoPhase('typing-user-2'), t);
    t += 220;
    for (let i = 1; i <= secondPrompt.length; i++) {
      schedule(() => {
        setInputValue(secondPrompt.slice(0, i));
      }, t);
      t += 34;
    }

    // Pausa de 2 segundos antes de enviar confirmación
    t += 2000;

    // 5. Envía confirmación y muestra conexión con el simulador
    schedule(() => {
      setInputValue('');
      setDemoPhase('thinking-2');
      setMessages((prev) => [
        ...prev.map((m) => ({ ...m, showQuickConfirm: false })),
        {
          id: 'demo-u2',
          role: 'user',
          text: secondPrompt,
        },
      ]);
    }, t);

    // 6. Pausa de 2 segundos y despliega la pantalla del simulador Bci
    t += 2000;
    schedule(() => {
      setDemoPhase('simulator');
      setMessages((prev) => [
        ...prev,
        {
          id: 'demo-a2',
          role: 'assistant',
          showSimulator: true,
        },
      ]);
    }, t);
  }, [clearDemoTimers]);

  useEffect(() => {
    startDemoAnimation();
    return () => clearDemoTimers();
  }, [startDemoAnimation, clearDemoTimers]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, demoPhase]);

  function stopDemoAndSetManual() {
    if (demoPhase !== 'manual') {
      clearDemoTimers();
      setDemoPhase('manual');
    }
  }

  function handleSend(textOverride?: string) {
    stopDemoAndSetManual();
    const rawText = (textOverride ?? inputValue).trim();
    if (!rawText) return;

    const hasExplicitMention = /^@bci\b/i.test(rawText);
    const cleanedText = rawText.replace(/^@bci\s*/i, '').trim() || rawText;
    const mentionPlugin = bciMentionActive || hasExplicitMention;

    const lower = cleanedText.toLowerCase();
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      mentionPlugin,
      text: cleanedText,
    };

    let botMsg: ChatMessage;
    if (
      lower.includes('sí') ||
      lower.includes('si') ||
      lower.includes('simular') ||
      lower.includes('simulación') ||
      lower.includes('simulacion')
    ) {
      botMsg = {
        id: `a-${Date.now() + 1}`,
        role: 'assistant',
        showSimulator: true,
      };
    } else if (lower.includes('crédito') || lower.includes('credito')) {
      botMsg = {
        id: `a-${Date.now() + 1}`,
        role: 'assistant',
        text: '¡Hola! Tengo conectado el Simulador de Créditos del Banco Bci para ayudarte a revisar opciones, plazos y montos sin compromiso. ¿Quieres hacer una simulación ahora?',
        showQuickConfirm: true,
      };
    } else {
      botMsg = {
        id: `a-${Date.now() + 1}`,
        role: 'assistant',
        text: `Consulta procesada con el complemento @Bci (${effortLevel}): "${cleanedText}". También puedo abrir el Simulador de Créditos de Banco Bci si deseas evaluar cuotas y montos.`,
        showQuickConfirm: true,
      };
    }

    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, showQuickConfirm: false })),
      userMsg,
      botMsg,
    ]);
    setInputValue('');
    setPlusMenuOpen(false);
    setSubNotice(null);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function cycleEffort() {
    setEffortLevel((prev) =>
      prev === 'Bajo' ? 'Medio' : prev === 'Medio' ? 'Alto' : 'Bajo'
    );
  }

  const isAutoPlaying =
    demoPhase !== 'manual' && demoPhase !== 'simulator' && demoPhase !== 'idle';

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6">
      <div className="w-full max-w-[760px] flex flex-col">
        {/* Barra superior de control de demostración */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <img
              src="/assets/aistudio/84_x_41_ecdae81c.png"
              alt="Logo Bci"
              className="h-4 w-auto object-contain"
            />
            <span className="font-medium text-slate-700">
              {messages.length > 0 ? 'Conversación con Bci' : 'Asistente Bci listo'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  stopDemoAndSetManual();
                  setMessages([]);
                  setInputValue('');
                  setSubNotice(null);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                Nueva conversación
              </button>
            )}

            <button
              type="button"
              onClick={startDemoAnimation}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F40034] hover:text-[#C8002B] bg-[#FFF0F3] hover:bg-[#FEE5EA] px-3 py-1.5 rounded-lg border border-[#F40034]/20 transition-colors whitespace-nowrap"
            >
              {isAutoPlaying ? (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  Reproduciendo demo...
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

        {/* Encabezado o historial de mensajes */}
        {messages.length === 0 ? (
          <h3 className="text-[26px] font-normal text-slate-900 text-center tracking-tight my-8">
            ¿En qué trabajamos?
          </h3>
        ) : (
          <div
            ref={scrollContainerRef}
            className="mb-5 space-y-4 max-h-[540px] overflow-y-auto pr-1"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'user' ? (
                    <div className="max-w-[82%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed bg-slate-900 text-white flex items-center gap-2 flex-wrap">
                      {msg.mentionPlugin && (
                        <span className="inline-flex items-center gap-1 bg-white text-[#1A73E8] font-semibold text-xs px-2 py-0.5 rounded-full shrink-0">
                          <img
                            src="/assets/aistudio/84_x_41_ecdae81c.png"
                            alt="Logo Bci"
                            className="h-3 w-auto object-contain"
                          />
                          <span>@Bci</span>
                        </span>
                      )}
                      <span>{msg.text}</span>
                    </div>
                  ) : msg.showSimulator ? (
                    <div className="w-full" onMouseDown={stopDemoAndSetManual}>
                      <BciInlineSimulator />
                    </div>
                  ) : (
                    <div className="max-w-[88%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed bg-slate-50 border border-slate-200/80 text-slate-700 space-y-2.5">
                      <div className="flex items-center gap-1.5">
                        <img
                          src="/assets/aistudio/84_x_41_ecdae81c.png"
                          alt="Logo Bci"
                          className="h-3.5 w-auto object-contain"
                        />
                        <span className="text-xs font-semibold text-[#005FFF]">Bci</span>
                      </div>
                      <p>{msg.text}</p>
                      {msg.showQuickConfirm && (
                        <div className="pt-1 flex items-center gap-2 flex-wrap">
                          <button
                            type="button"
                            onClick={() => handleSend('Sí, quiero hacer una simulación')}
                            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#1D63D8] hover:bg-[#1554BE] text-white transition-colors"
                          >
                            Sí, hacer simulación
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {(demoPhase === 'thinking-1' || demoPhase === 'thinking-2') && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-2.5 text-xs text-slate-500 bg-slate-50 border border-slate-200/80 flex items-center gap-2">
                  <img
                    src="/assets/aistudio/84_x_41_ecdae81c.png"
                    alt="Logo Bci"
                    className="h-3.5 w-auto object-contain"
                  />
                  <span>
                    {demoPhase === 'thinking-1'
                      ? 'Invocando complemento @Bci y preparando respuesta...'
                      : 'Bci está preparando la respuesta...'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Caja principal del chat */}
        <div className="relative">
          <div className="relative z-10 rounded-[26px] border border-slate-200/80 bg-white px-5 pt-4 pb-3.5 shadow-[0_6px_24px_rgba(15,23,42,0.06)]">
            <div className="min-h-[48px] flex flex-col gap-2">
              <div className="flex items-start gap-2 flex-wrap">
                {bciMentionActive && (
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1A73E8] bg-[#E7EFFD] border border-[#005FFF]/20 px-2.5 py-0.5 rounded-full select-none shrink-0 group">
                    <img
                      src="/assets/aistudio/84_x_41_ecdae81c.png"
                      alt="Logo Bci"
                      className="h-3.5 w-auto object-contain"
                    />
                    <span>@Bci</span>
                    <button
                      type="button"
                      onClick={() => setBciMentionActive(false)}
                      aria-label="Quitar complemento Bci"
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-slate-400 hover:text-slate-700 transition-opacity ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <textarea
                  rows={1}
                  value={inputValue}
                  onFocus={stopDemoAndSetManual}
                  onChange={(e) => {
                    stopDemoAndSetManual();
                    setInputValue(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    bciMentionActive
                      ? 'Escribe tu consulta para Bci...'
                      : 'Pregunta lo que quieras...'
                  }
                  aria-label="Mensaje para Bci"
                  className="flex-1 min-w-[200px] resize-none text-[14px] text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            {/* Barra inferior del compositor */}
            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="relative flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPlusMenuOpen((prev) => !prev)}
                  aria-label="Opciones y consultas rápidas"
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-[#005FFF]"
                >
                  <Plus className="w-5 h-5 stroke-[1.8]" />
                </button>

                {!bciMentionActive && (
                  <button
                    type="button"
                    onClick={() => setBciMentionActive(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1A73E8] bg-[#E7EFFD]/60 hover:bg-[#E7EFFD] px-2.5 py-1 rounded-full transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Activar Bci
                  </button>
                )}

                {plusMenuOpen && (
                  <div className="absolute left-0 bottom-11 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-30">
                    <p className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Consultas sugeridas con Bci
                    </p>
                    <div className="space-y-1">
                      {QUICK_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => handleSend(prompt)}
                          className="w-full text-left px-2.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={cycleEffort}
                  title="Cambiar nivel de respuesta"
                  className="flex items-center gap-1.5 text-[13px] px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="font-medium text-slate-800">GPT-6.1 Sol</span>
                  <span className="text-slate-400">{effortLevel}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    stopDemoAndSetManual();
                    setInputValue('Hola, quiero saber de créditos');
                  }}
                  aria-label="Dictado de voz"
                  title="Insertar consulta de demostración"
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-[#005FFF]"
                >
                  <Mic className="w-[18px] h-[18px] stroke-[1.8]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSend()}
                  aria-label="Enviar mensaje"
                  className="w-9 h-9 rounded-full bg-[#1D63D8] hover:bg-[#1554BE] text-white flex items-center justify-center transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-[#005FFF] focus-visible:outline-offset-2"
                >
                  <ArrowUp className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>
            </div>
          </div>

          {/* Barra secundaria acoplada debajo del compositor */}
          <div className="mx-3 -mt-2 pt-4 pb-2.5 px-4 rounded-b-2xl bg-[#F3F4F6] border-x border-b border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center flex-wrap gap-4">
              <button
                type="button"
                onClick={() =>
                  setSubNotice('Proyecto seleccionado: Innovación Bci · Ambiente Sandbox.')
                }
                className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors"
              >
                <Folder className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                <span>Seleccionar proyecto</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setSubNotice('Catálogo de archivos y políticas Bci conectado al chat.')
                }
                className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors"
              >
                <Library className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                <span>Archivos</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenComplementos?.()}
                className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors"
              >
                <ConnectorGlyph />
                <span>Complementos</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onOpenSimulacion) {
                  setSubNotice(
                    'Puedes continuar la prueba en el chat o abrir el módulo Simulación.'
                  );
                }
              }}
              className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors"
            >
              <Monitor className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span>Abrir aplicación de escritorio</span>
            </button>
          </div>
        </div>

        {/* Aviso contextual */}
        {subNotice && (
          <div className="mt-4 px-3.5 py-2.5 rounded-xl bg-[#F8FAFF] border border-[#005FFF]/20 text-xs text-slate-700 flex items-center justify-between gap-3">
            <span>{subNotice}</span>
            <div className="flex items-center gap-3 shrink-0">
              {onOpenSimulacion && subNotice.includes('Simulación') && (
                <button
                  type="button"
                  onClick={onOpenSimulacion}
                  className="font-semibold text-[#005FFF] hover:underline"
                >
                  Ir a Simulación
                </button>
              )}
              <button
                type="button"
                onClick={() => setSubNotice(null)}
                className="text-slate-400 hover:text-slate-700"
                aria-label="Cerrar aviso"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

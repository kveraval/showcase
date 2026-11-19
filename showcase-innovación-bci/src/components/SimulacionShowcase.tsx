import { Check, Info, Mail, Play, RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type SimDemoPhase =
  | 'idle'
  | 'typing-rut'
  | 'typing-email'
  | 'typing-phone'
  | 'checking-privacy'
  | 'ready-to-continue'
  | 'typing-amount'
  | 'typing-installments'
  | 'checking-insurances'
  | 'ready-to-simulate'
  | 'manual';

function formatClp(value: number): string {
  return `$${Math.round(value).toLocaleString('es-CL')}`;
}

export function SimulacionShowcase() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedPromo, setAcceptedPromo] = useState(false);
  const [acceptedShare, setAcceptedShare] = useState(false);
  const [demoPhase, setDemoPhase] = useState<SimDemoPhase>('idle');

  const [amountInput, setAmountInput] = useState('');
  const [installmentsInput, setInstallmentsInput] = useState('');
  const [seguroDesgravamen, setSeguroDesgravamen] = useState(false);
  const [seguroCesantia, setSeguroCesantia] = useState(false);
  const [showInsuranceNote, setShowInsuranceNote] = useState(false);
  const [showTermsNote, setShowTermsNote] = useState(false);
  const [showNormativaNote, setShowNormativaNote] = useState(false);

  const timersRef = useRef<number[]>([]);

  const clearDemoTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const startDemoAnimation = useCallback(() => {
    clearDemoTimers();
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
    setDemoPhase('idle');

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    const targetRut = '4663452-7';
    const targetEmail = 'test@bci.cl';
    const targetPhone = '987534012';

    let t = 250;

    // Paso 1/2: Llenar RUT 4663452-7
    schedule(() => setDemoPhase('typing-rut'), t);
    t += 160;
    for (let i = 1; i <= targetRut.length; i++) {
      schedule(() => setRut(targetRut.slice(0, i)), t);
      t += 45;
    }

    // Pausa de 2 segundos antes de llenar Correo test@bci.cl
    t += 2000;
    schedule(() => setDemoPhase('typing-email'), t);
    t += 180;
    for (let i = 1; i <= targetEmail.length; i++) {
      schedule(() => setEmail(targetEmail.slice(0, i)), t);
      t += 42;
    }

    // Pausa de 2 segundos antes de llenar Teléfono 987534012
    t += 2000;
    schedule(() => setDemoPhase('typing-phone'), t);
    t += 180;
    for (let i = 1; i <= targetPhone.length; i++) {
      schedule(() => setPhone(targetPhone.slice(0, i)), t);
      t += 45;
    }

    // Pausa de 2 segundos antes de aceptar Política de Privacidad
    t += 2000;
    schedule(() => setDemoPhase('checking-privacy'), t);
    t += 300;
    schedule(() => {
      setAcceptedPrivacy(true);
      setDemoPhase('ready-to-continue');
    }, t);
  }, [clearDemoTimers]);

  const startStep2Animation = useCallback(() => {
    clearDemoTimers();
    setStep(2);
    setAmountInput('');
    setInstallmentsInput('');
    setSeguroDesgravamen(false);
    setSeguroCesantia(false);
    setShowInsuranceNote(false);
    setShowTermsNote(false);
    setShowNormativaNote(false);
    setDemoPhase('typing-amount');

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    const targetAmount = '5000000';
    const targetInstallments = '24';

    let t = 320;

    // Paso 2/2: Llenar monto 5000000
    for (let i = 1; i <= targetAmount.length; i++) {
      schedule(() => setAmountInput(targetAmount.slice(0, i)), t);
      t += 65;
    }

    // Pausa de 2 segundos antes de llenar 24 cuotas
    t += 2000;
    schedule(() => setDemoPhase('typing-installments'), t);
    t += 200;
    for (let i = 1; i <= targetInstallments.length; i++) {
      schedule(() => setInstallmentsInput(targetInstallments.slice(0, i)), t);
      t += 85;
    }

    // Pausa de 2 segundos antes de marcar seguros (Desgravamen y Cesantía)
    t += 2000;
    schedule(() => setDemoPhase('checking-insurances'), t);
    t += 320;
    schedule(() => setSeguroDesgravamen(true), t);
    t += 320;
    schedule(() => setSeguroCesantia(true), t);

    // Pausa de 2 segundos y dejar botón Simular mi crédito resaltado
    t += 2000;
    schedule(() => setDemoPhase('ready-to-simulate'), t);
  }, [clearDemoTimers]);

  useEffect(() => {
    startDemoAnimation();
    return () => clearDemoTimers();
  }, [startDemoAnimation, clearDemoTimers]);

  function stopDemoAndSetManual() {
    if (demoPhase !== 'manual') {
      clearDemoTimers();
      setDemoPhase('manual');
    }
  }

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
  const caePercent =
    seguroDesgravamen || seguroCesantia ? '21,85%' : '20,44%';

  const insuranceSummaryLabel =
    seguroDesgravamen && seguroCesantia
      ? 'Total seguros: Desgravamen + Cesantía'
      : seguroDesgravamen
      ? 'Total seguros: Desgravamen'
      : seguroCesantia
      ? 'Total seguros: Cesantía'
      : 'Total seguros: Desgravamen + Cesantía';

  const isAnimating =
    demoPhase !== 'idle' &&
    demoPhase !== 'ready-to-continue' &&
    demoPhase !== 'ready-to-simulate' &&
    demoPhase !== 'manual';

  return (
    <div className="mt-7 w-full max-w-3xl space-y-4">
      {/* Barra superior de control de demostración */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-slate-500 font-medium">
          Simulador de Crédito de Consumo · Vista previa interactiva
        </span>

        <button
          type="button"
          onClick={startDemoAnimation}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#59A80F] hover:text-[#44840A] bg-[#EDF6E7] hover:bg-[#E1F1D6] px-3 py-1.5 rounded-lg border border-[#59A80F]/25 transition-colors whitespace-nowrap"
        >
          {isAnimating ? (
            <>
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
              Completando simulación...
            </>
          ) : (
            <>
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Repetir animación
            </>
          )}
        </button>
      </div>

      {/* Tarjeta del Simulador Bci */}
      <div className="w-full rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
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
              <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                {step === 1 ? 'Ingresa tus datos personales' : 'Ingresa los datos de tu crédito'}
              </h3>
              {step === 1 && (
                <p className="text-xs text-slate-400 mt-0.5">
                  Siguiente: Datos de tu crédito
                </p>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1.5">
                ¿Cuál es tu RUT?
              </label>
              <input
                type="text"
                value={rut}
                onFocus={stopDemoAndSetManual}
                onChange={(e) => {
                  stopDemoAndSetManual();
                  setRut(e.target.value);
                }}
                placeholder="11.111.111-1"
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all tabular-nums ${
                  demoPhase === 'typing-rut'
                    ? 'border-[#2563EB] ring-4 ring-[#2563EB]/10'
                    : 'border-slate-200 focus:border-[#2563EB]'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1.5">
                ¿Cuál es tu correo electrónico?
              </label>
              <input
                type="email"
                value={email}
                onFocus={stopDemoAndSetManual}
                onChange={(e) => {
                  stopDemoAndSetManual();
                  setEmail(e.target.value);
                }}
                placeholder="ejemplo@micorreo.com"
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all ${
                  demoPhase === 'typing-email'
                    ? 'border-[#2563EB] ring-4 ring-[#2563EB]/10'
                    : 'border-slate-200 focus:border-[#2563EB]'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1.5">
                Número de contactos
              </label>
              <input
                type="tel"
                value={phone}
                onFocus={stopDemoAndSetManual}
                onChange={(e) => {
                  stopDemoAndSetManual();
                  setPhone(e.target.value);
                }}
                placeholder="+569  12345678"
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all tabular-nums ${
                  demoPhase === 'typing-phone'
                    ? 'border-[#2563EB] ring-4 ring-[#2563EB]/10'
                    : 'border-slate-200 focus:border-[#2563EB]'
                }`}
              />
            </div>

            <div className="pt-1 space-y-3 text-xs text-slate-700">
              <label
                className={`flex items-start gap-2.5 cursor-pointer rounded-lg p-1.5 -m-1.5 transition-all ${
                  demoPhase === 'checking-privacy'
                    ? 'bg-[#EFF6FF] ring-2 ring-[#2563EB]/30'
                    : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={acceptedPrivacy}
                  onChange={(e) => {
                    stopDemoAndSetManual();
                    setAcceptedPrivacy(e.target.checked);
                  }}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span>Leí y entiendo la Política de Privacidad.</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedPromo}
                  onChange={(e) => {
                    stopDemoAndSetManual();
                    setAcceptedPromo(e.target.checked);
                  }}
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
                  onChange={(e) => {
                    stopDemoAndSetManual();
                    setAcceptedShare(e.target.checked);
                  }}
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
              onClick={() => {
                if (demoPhase === 'ready-to-continue') {
                  startStep2Animation();
                } else {
                  stopDemoAndSetManual();
                  if (!rut) setRut('4663452-7');
                  if (!email) setEmail('test@bci.cl');
                  if (!phone) setPhone('987534012');
                  setAcceptedPrivacy(true);
                  setStep(2);
                }
              }}
              className={`w-full py-2.5 rounded-full text-[13px] font-medium text-white transition-all duration-200 cursor-pointer ${
                demoPhase === 'ready-to-continue'
                  ? 'bg-[#108A45] hover:bg-[#0D743A] ring-4 ring-[#108A45]/25 shadow-xs'
                  : canContinueStep1
                  ? 'bg-[#108A45] hover:bg-[#0D743A] shadow-xs'
                  : 'bg-[#A3D1B0] hover:bg-[#8EC49D]'
              }`}
            >
              Continuar
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {/* ¿Cuánto quieres pedir? */}
            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1.5">
                ¿Cuánto quieres pedir?
              </label>
              <div
                className={`flex items-center rounded-lg border bg-white px-3.5 py-2.5 transition-all ${
                  demoPhase === 'typing-amount'
                    ? 'border-[#2563EB] ring-4 ring-[#2563EB]/10'
                    : 'border-slate-200 focus-within:border-[#2563EB]'
                }`}
              >
                <span className="text-[13px] font-medium text-slate-700 mr-2">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={amountInput}
                  onFocus={stopDemoAndSetManual}
                  onChange={(e) => {
                    stopDemoAndSetManual();
                    setAmountInput(e.target.value);
                  }}
                  placeholder="Ingresa el monto"
                  className="w-full text-[13px] text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none tabular-nums"
                />
              </div>
            </div>

            {/* ¿En cuántas cuotas? */}
            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1.5">
                ¿En cuántas cuotas?
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={installmentsInput}
                onFocus={stopDemoAndSetManual}
                onChange={(e) => {
                  stopDemoAndSetManual();
                  setInstallmentsInput(e.target.value);
                }}
                placeholder="Ingrese número de cuotas"
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all tabular-nums ${
                  demoPhase === 'typing-installments'
                    ? 'border-[#2563EB] ring-4 ring-[#2563EB]/10'
                    : 'border-slate-200 focus:border-[#2563EB]'
                }`}
              />
            </div>

            {/* Seguros asociados */}
            <div className="pt-1 space-y-3">
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

              <div
                className={`flex items-center gap-10 text-xs text-slate-700 rounded-lg p-1.5 -m-1.5 transition-all ${
                  demoPhase === 'checking-insurances'
                    ? 'bg-[#EFF6FF] ring-2 ring-[#2563EB]/30'
                    : ''
                }`}
              >
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={seguroDesgravamen}
                    onChange={(e) => {
                      stopDemoAndSetManual();
                      setSeguroDesgravamen(e.target.checked);
                    }}
                    className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Desgravamen</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={seguroCesantia}
                    onChange={(e) => {
                      stopDemoAndSetManual();
                      setSeguroCesantia(e.target.checked);
                    }}
                    className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>Cesantía</span>
                </label>
              </div>
            </div>

            {/* Botones Volver y Simular mi crédito */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  stopDemoAndSetManual();
                  setStep(1);
                }}
                className="w-full py-2.5 rounded-full text-[13px] font-medium text-[#2563EB] border border-[#2563EB] bg-white hover:bg-[#EFF6FF] transition-colors"
              >
                Volver
              </button>

              <button
                type="button"
                onClick={() => {
                  stopDemoAndSetManual();
                  if (!amountInput.trim()) setAmountInput('5000000');
                  if (!installmentsInput.trim()) setInstallmentsInput('24');
                  setShowNormativaNote(false);
                  setStep(3);
                }}
                className={`w-full py-2.5 rounded-full text-[13px] font-medium text-white transition-all duration-200 ${
                  demoPhase === 'ready-to-simulate'
                    ? 'bg-[#108A45] hover:bg-[#0D743A] ring-4 ring-[#108A45]/25 shadow-xs'
                    : canSimulateStep2
                    ? 'bg-[#108A45] hover:bg-[#0D743A]'
                    : 'bg-[#A3D1B0] hover:bg-[#8EC49D]'
                }`}
              >
                Simular mi crédito
              </button>
            </div>

            {/* Caja informativa azul */}
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
            <h3 className="text-base font-medium text-slate-900 mb-3.5">
              Este es el resultado de tu simulación:
            </h3>

            {/* Tarjetas resumen */}
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

            {/* Tabla de detalle */}
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
                <span className="text-slate-500">{insuranceSummaryLabel}</span>
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

            {/* Botones de acción finales */}
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
                onClick={() => {
                  stopDemoAndSetManual();
                  setStep(4);
                }}
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

            <h3 className="mt-6 text-[20px] sm:text-[22px] font-medium text-slate-900 leading-snug">
              ¡Listo!
              <br />
              Ya hiciste tu simulación
            </h3>

            <p className="mt-3 text-xs sm:text-[13px] text-slate-500 max-w-md leading-relaxed">
              Dentro de 2 días, uno de nuestros ejecutivos Bci te contactará para explicarte los
              siguientes pasos y responder cualquier duda que tengas.
            </p>

            <button
              type="button"
              onClick={() => {
                stopDemoAndSetManual();
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
        <div className="mt-5 pt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
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

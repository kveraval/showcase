export type ModuleId =
  | 'bienvenida'
  | 'plugin'
  | 'conversacion'
  | 'simulacion'
  | 'demo-chatgpt';

export interface CapabilityItem {
  id: string;
  lead?: string;
  text: string;
  accent: 'blue' | 'green' | 'amber';
}

export interface AdvantageItem {
  lead?: string;
  text: string;
}

export interface ModuleTheme {
  accentColor: string;
  iconBg: string;
  iconText: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
  ringColor: string;
}

export interface ShowcaseModule {
  id: ModuleId;
  navLabel: string;
  title: string;
  sidebarTitle: string;
  theme: ModuleTheme;
  descriptionPrefix: string;
  descriptionHighlight: string;
  descriptionSuffix: string;
  capabilities?: CapabilityItem[];
  advantages?: AdvantageItem[];
  complianceNote?: string;
}

export const SHOWCASE_MODULES: ShowcaseModule[] = [
  {
    id: 'bienvenida',
    navLabel: 'Bienvenida',
    title: 'Bienvenida',
    sidebarTitle: 'Visión del ShowCase',
    theme: {
      accentColor: '#0F172A',
      iconBg: 'bg-slate-100',
      iconText: 'text-slate-700',
      activeBg: 'bg-gradient-to-r from-slate-100 to-slate-50',
      activeBorder: 'border-slate-900/15',
      activeText: 'text-slate-900',
      ringColor: '#E2E8F0',
    },
    descriptionPrefix: 'Descubre cómo pasamos de buscar al banco a tener a ',
    descriptionHighlight: 'Bci dentro de ChatGPT',
    descriptionSuffix:
      ', acompañando al usuario con respuestas y simulaciones reales en el momento exacto en que las necesita.',
    capabilities: [
      {
        id: 'bien-instalar',
        lead: '1. Instala el complemento:',
        text: 'Conecta el plugin oficial de Bci en el directorio de ChatGPT en un clic.',
        accent: 'blue',
      },
      {
        id: 'bien-conversar',
        lead: '2. Invoca @Bci en el chat:',
        text: 'Resuelve dudas sobre montos, plazos y tasas sin salir de la conversación.',
        accent: 'green',
      },
      {
        id: 'bien-simular',
        lead: '3. Simula en tiempo real:',
        text: 'Calcula cuota mensual, CAE y CTC paso a paso dentro de la misma ventana.',
        accent: 'amber',
      },
    ],
    advantages: [
      {
        lead: 'Banca donde está el usuario:',
        text: 'Elimina el salto entre apps o sucursales al momento de evaluar un crédito.',
      },
      {
        lead: 'De la duda a la acción:',
        text: 'Conecta orientación conversacional con un simulador financiero transparente.',
      },
      {
        lead: 'Recorrido interactivo:',
        text: 'Explora cada etapa en vivo o mira la ejecución completa en video.',
      },
    ],
    complianceNote: 'Cumplimiento con estándares bancarios de seguridad Bci v2.4',
  },
  {
    id: 'plugin',
    navLabel: 'Instalar Plugin',
    title: 'Instalar Plugin',
    sidebarTitle: 'Instalador de Plugins',
    theme: {
      accentColor: '#005FFF',
      iconBg: 'bg-[#E7EFFD]',
      iconText: 'text-[#005FFF]',
      activeBg: 'bg-gradient-to-r from-[#E7EFFD] to-[#F3F7FF]',
      activeBorder: 'border-[#005FFF]/20',
      activeText: 'text-[#005FFF]',
      ringColor: '#E7EFFD',
    },
    descriptionPrefix: 'Conecta el ',
    descriptionHighlight: 'complemento oficial de Bci',
    descriptionSuffix:
      ' en ChatGPT en segundos y habilita simulaciones de Crédito de Consumo directo desde tu conversación.',
    capabilities: [
      {
        id: 'cap-busqueda',
        lead: 'Búsqueda inmediata:',
        text: 'Encuentra Bci en el directorio de complementos y revisa su ficha oficial.',
        accent: 'blue',
      },
      {
        id: 'cap-instalacion',
        lead: 'Conexión en 1 clic:',
        text: 'Instala o desconecta el complemento de forma segura cuando lo necesites.',
        accent: 'green',
      },
      {
        id: 'cap-simulacion-chat',
        lead: 'Listo para chatear:',
        text: 'Habilita @Bci en tus chats para iniciar simulaciones de crédito al instante.',
        accent: 'amber',
      },
    ],
    complianceNote: 'Cumplimiento con estándares bancarios de seguridad Bci v2.4',
  },
  {
    id: 'conversacion',
    navLabel: 'Conversación',
    title: 'Conversación',
    sidebarTitle: 'Simulador de Consumo',
    theme: {
      accentColor: '#F40034',
      iconBg: 'bg-[#FEE5EA]',
      iconText: 'text-[#F40034]',
      activeBg: 'bg-gradient-to-r from-[#FEE5EA] to-[#FFF0F2]',
      activeBorder: 'border-[#F40034]/20',
      activeText: 'text-[#F40034]',
      ringColor: '#FEE5EA',
    },
    descriptionPrefix: 'Solo escribe ',
    descriptionHighlight: '@Bci',
    descriptionSuffix:
      ' en ChatGPT para abrir el simulador de Crédito de Consumo dentro de la misma conversación, guiando tus dudas al instante.',
    capabilities: [
      {
        id: 'conv-invocacion',
        lead: 'Invocación directa:',
        text: 'Llama al simulador oficial usando @Bci sin salir de ChatGPT.',
        accent: 'blue',
      },
      {
        id: 'conv-orientacion',
        lead: 'Guía inteligente:',
        text: 'Interpreta tu consulta y te orienta en montos, plazos y tasas.',
        accent: 'green',
      },
      {
        id: 'conv-despliegue',
        lead: 'Flujo integrado:',
        text: 'Despliega el simulador interactivo paso a paso dentro del mismo chat.',
        accent: 'amber',
      },
    ],
    advantages: [
      {
        lead: 'Cero fricción:',
        text: 'Simula sin cambiar de pestaña ni navegar por menús externos.',
      },
      {
        lead: 'Rápido y sin compromiso:',
        text: 'Evalúa escenarios en segundos de forma libre y guiada.',
      },
      {
        lead: 'Decisión informada:',
        text: 'Revisa cuota, CAE y CTC, y solicita un ejecutivo Bci en un clic.',
      },
    ],
    complianceNote: 'Cumplimiento con estándares bancarios de seguridad Bci v2.4',
  },
  {
    id: 'simulacion',
    navLabel: 'Simulación',
    title: 'Simulación',
    sidebarTitle: 'Motor de Simulación',
    theme: {
      accentColor: '#59A80F',
      iconBg: 'bg-[#EDF6E7]',
      iconText: 'text-[#59A80F]',
      activeBg: 'bg-gradient-to-r from-[#EDF6E7] to-[#F6FBF2]',
      activeBorder: 'border-[#59A80F]/20',
      activeText: 'text-[#59A80F]',
      ringColor: '#EDF6E7',
    },
    descriptionPrefix: 'Simula tu Crédito de Consumo ',
    descriptionHighlight: 'como no cliente',
    descriptionSuffix:
      ', ajustando monto, cuotas y seguros (Desgravamen y Cesantía) para recibir el cálculo completo en tiempo real.',
    capabilities: [
      {
        id: 'sim-no-cliente',
        lead: 'Abierto a no clientes:',
        text: 'Simula solo con tus datos básicos, sin clave ni sesión bancaria.',
        accent: 'blue',
      },
      {
        id: 'sim-parametros',
        lead: 'A tu medida:',
        text: 'Configura monto, número de cuotas y seguros opcionales al instante.',
        accent: 'green',
      },
      {
        id: 'sim-tiempo-real',
        lead: 'Cálculo transparente:',
        text: 'Obtén cuota mensual, tasa, CAE y Costo Total del Crédito (CTC).',
        accent: 'amber',
      },
    ],
    advantages: [
      {
        lead: 'Sin compromiso:',
        text: 'Conoce tus condiciones reales antes de tomar cualquier decisión.',
      },
      {
        lead: 'Ajuste inmediato:',
        text: 'Vuelve a simular con otros montos, plazos o seguros al instante.',
      },
      {
        lead: 'Contacto directo:',
        text: 'Si te interesa el crédito, un ejecutivo Bci te contacta en 2 días.',
      },
    ],
    complianceNote: 'Cumplimiento con estándares bancarios de seguridad Bci v2.4',
  },
  {
    id: 'demo-chatgpt',
    navLabel: 'Demo en chatGpt',
    title: 'Demo en chatGpt',
    sidebarTitle: 'Video Demo en ChatGPT',
    theme: {
      accentColor: '#F9B316',
      iconBg: 'bg-[#FEF4DB]',
      iconText: 'text-[#C28100]',
      activeBg: 'bg-gradient-to-r from-[#FEF4DB] to-[#FFF9EB]',
      activeBorder: 'border-[#F9B316]/30',
      activeText: 'text-[#B87D00]',
      ringColor: '#FEF4DB',
    },
    descriptionPrefix: 'Mira en acción la ',
    descriptionHighlight: 'Demo en ChatGPT',
    descriptionSuffix:
      ' para ver el flujo real del complemento Bci ejecutando una simulación de crédito de principio a fin.',
  },
];

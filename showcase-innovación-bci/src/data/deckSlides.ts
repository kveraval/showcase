export interface DeckSlide {
  id: number;
  category: string;
  tagColor: string;
  title: string;
  subtitle: string;
  keyMetric?: { label: string; value: string; detail?: string };
  points: { title: string; desc: string }[];
  highlight?: string;
  badges?: string[];
}

export const DECK_SLIDES: DeckSlide[] = [
  {
    id: 1,
    category: 'Estrategia Corporativa',
    tagColor: '#005FFF',
    title: 'Gerencia Innovación · Plan 2026',
    subtitle: 'Visión, Cadena de Valor, Ecosistema y Despliegue de Capacidades Corporativas',
    highlight: 'Aspiramos a ser líderes regionales en Innovación, cercanía y experiencia de clientes, y ser reconocidos como el mejor lugar para trabajar y desarrollarse.',
    badges: ['Plan 2026', 'Data & Analytics', 'Liderazgo Regional'],
    points: [
      {
        title: 'Gestión Estratégica',
        desc: 'Portafolio transversal, Consejo de Innovación y Reconocimiento Anual de iniciativas de alto impacto.',
      },
      {
        title: '4 Etapas de Madurez',
        desc: 'Scouting de Tendencias (Etapa 1), Conexión Ecosistema (Etapa 2), Experimentación Ágil (Etapa 3) y Capacidades Corporativas (Etapa 4).',
      },
      {
        title: 'Ejes Prioritarios',
        desc: 'Ley Fintech, Gen AI, Open Banking, Conexión Fintechs, Big-Tech y Posicionamiento Regional.',
      },
    ],
  },
  {
    id: 2,
    category: 'Portafolio & Riesgo',
    tagColor: '#59A80F',
    title: 'Bci como Empresa Ambidiestra: Modelo 70/20/10',
    subtitle: 'Distribución equilibrada del portafolio de innovación para sostener el liderazgo',
    keyMetric: {
      value: '70 / 20 / 10',
      label: 'Mix Objetivo Google',
      detail: '70% Core · 20% Adyacente · 10% Transformacional',
    },
    highlight: 'Donde un 70% debe estar en proyectos que mejoren la experiencia de clientes actuales con capacidades existentes, 20% en evolución de productos adyacentes, y 10% en iniciativas transformacionales de alto impacto.',
    badges: ['Horizonte 1: Core', 'Horizonte 2: Adyacente', 'Horizonte 3: Transformacional'],
    points: [
      {
        title: '70% Incremental (Core)',
        desc: 'Defender y extender el negocio actual, optimizar costos, mejorar eficiencia y retención.',
      },
      {
        title: '20% Adyacente',
        desc: 'Evolución de propuestas de valor existentes, apertura a nuevos clientes con capacidades actuales.',
      },
      {
        title: '10% Transformacional',
        desc: 'Explorar modelos completamente nuevos, alta incertidumbre y captura de nuevos mercados.',
      },
    ],
  },
  {
    id: 3,
    category: 'Capacidades',
    tagColor: '#005FFF',
    title: '7 Capacidades Corporativas Desplegadas',
    subtitle: 'Músculo transversal desplegado a nivel banco para liderar en la región',
    badges: ['Ley Fintech', 'Tendencias', 'Transformación', 'Premios', 'Tokenización', 'Open Banking', 'Posicionamiento'],
    points: [
      {
        title: '1. Regulación & Ley Fintech',
        desc: 'Cumplimiento normativo SFA y generación de valor desde las finanzas abiertas.',
      },
      {
        title: '2. Incubación de Tendencias',
        desc: 'Desarrollo de las capacidades del futuro para el banco antes de su adopción masiva.',
      },
      {
        title: '3. Innovación Transformacional',
        desc: 'Creación ágil de nuevos negocios, modelos de monetización y mercados no explorados.',
      },
      {
        title: '4. Mapeo y Medición de Portafolio',
        desc: 'Seguimiento transversal a todas las iniciativas del banco y Premio Anual de Innovación.',
      },
      {
        title: '5. Tokenización & Stablecoins',
        desc: 'Despliegue de casos de uso reales de activos digitales en banca mayorista y personas.',
      },
      {
        title: '6. Open Banking (BaaS & Open Data)',
        desc: 'Traer datos del ecosistema y exponer capacidades bancarias hacia terceros.',
      },
      {
        title: '7. Posicionamiento Estratégico',
        desc: 'Orquestación de la presencia de Bci en mercados, fintechs, big techs y opinión pública.',
      },
    ],
  },
  {
    id: 4,
    category: 'Regulación',
    tagColor: '#F40034',
    title: 'Ley Fintech: Sistema de Finanzas Abiertas (SFA)',
    subtitle: 'Estrategia de cumplimiento, defensa activa y ataque comercial',
    keyMetric: {
      value: '2027 - 2030',
      label: 'Roadmap CMF',
      detail: 'Implementación gradual de APIs normativas',
    },
    badges: ['Normativo', 'Defensa', 'Ataque'],
    points: [
      {
        title: 'Normativo (Cumplimiento SFA)',
        desc: 'Desarrollar APIs normativas e integrar componentes del SFA según plazos CMF.',
      },
      {
        title: 'Defensa (Protección de Fuga)',
        desc: 'Reacción en tiempo real cuando proveedores externos consultan datos de clientes a Bci.',
      },
      {
        title: 'Ataque (First Movers Open Banking)',
        desc: 'Integrar soluciones basadas en datos abiertos para ampliar la oferta de productos Bci.',
      },
      {
        title: 'Onboarding Fintech',
        desc: 'POCs, acuerdos de conexión para marca y lista blanca, y APIs remuneradas no normativas.',
      },
    ],
  },
  {
    id: 5,
    category: 'Tendencias & I+D',
    tagColor: '#9A6700',
    title: 'Funnel de Tendencias Tecnológicas Globales',
    subtitle: 'Construir el músculo de investigación y adopción temprana para Bci',
    badges: ['Quantum', 'AI Agéntica', 'CBDC', 'ID Digital', 'DeFi', 'Silver Economy'],
    points: [
      {
        title: 'Fase Funnel',
        desc: 'Identificar → Entender → Converger → Validar → Escalar.',
      },
      {
        title: 'Tendencias Clave',
        desc: 'Computación Cuántica, Inteligencia Artificial Agente-Agente, CBDC, Stablecoins y KYM (Know Your Machine).',
      },
      {
        title: 'Cultura Interna',
        desc: 'Comunidad Líderes de Innovación, Charlas Futuro Fintechs y Podcast "En Modo Avión".',
      },
    ],
  },
  {
    id: 6,
    category: 'Deep Tech',
    tagColor: '#005FFF',
    title: 'Computación Cuántica: Oportunidad y Amenaza al 2030',
    subtitle: 'Pilotos activos en riesgo, ciberseguridad y modelos macroeconómicos',
    keyMetric: {
      value: '2 Pilotos',
      label: 'En Ejecución 2025-2026',
      detail: '2 más en etapa de diseño con beneficio Ley I+D Corfo 35%',
    },
    badges: ['PQC', 'Q-Day', 'BAM', 'Riesgo Crédito'],
    points: [
      {
        title: 'Perfilamiento de Riesgo',
        desc: 'Modelos de machine learning cuántico para predecir probabilidad de incumplimiento.',
      },
      {
        title: 'Suplantación de Identidad',
        desc: 'Algoritmos cuánticos para detectar anomalías y mejorar precisión en alertas.',
      },
      {
        title: 'Predicción Económica',
        desc: 'Distribución de carteras de inversión con variables macroeconómicas complejas.',
      },
      {
        title: 'Ciberseguridad Post-Cuántica (PQC)',
        desc: 'Mitigación de la amenaza "Harvest Now, Decrypt Later" y cumplimiento de nuevas regulaciones.',
      },
    ],
  },
  {
    id: 7,
    category: 'Activos Digitales',
    tagColor: '#F9B316',
    title: 'Estrategia de Activos Digitales & Stablecoins',
    subtitle: 'El volumen de stablecoins superó $35T USD en 2025, superando a Visa + Mastercard',
    keyMetric: {
      value: '$35T USD',
      label: 'Volumen Global 2025',
      detail: 'Crecimiento de +30% YoY en clientes PyME y Wholesale Bci',
    },
    badges: ['USDC', 'Stablecoins', 'Tokenización RWA', 'Cross-Border'],
    points: [
      {
        title: 'Adopción Institucional',
        desc: 'Respaldada por JP Morgan, Stripe, Visa, Western Union, BNY Mellon y avances regulatorios (Genius Act, MiCA, Ley Fintech).',
      },
      {
        title: 'Demanda de Clientes Bci',
        desc: 'Exportadores e importadores operan con stablecoins para sortear barreras de tipo de cambio y agilizar cobros.',
      },
      {
        title: 'Levantamiento Bci',
        desc: '+50 oportunidades mapeadas en todas las unidades de negocio del banco.',
      },
    ],
  },
  {
    id: 8,
    category: 'Pruebas de Concepto',
    tagColor: '#59A80F',
    title: 'POCs Prioritarias en Activos Digitales',
    subtitle: 'Pagos transfronterizos, UF digital, confirming y securitización',
    badges: ['Pagos X-Border', 'UF Digital', 'Confirming Tokenizado', 'Auto-Securitización'],
    points: [
      {
        title: 'Pagos Cross-Border B2B',
        desc: 'Recepción de pagos en USDC con liquidación automática a cuenta MONEX USD para clientes WSB.',
      },
      {
        title: 'UF Digital para Ahorro',
        desc: 'Stablecoin anclada a la UF que habilita productos de ahorro para personas.',
      },
      {
        title: 'Confirming Tokenizado',
        desc: 'Uso de facturas tokenizadas de grandes pagadores como medio de pago en la cadena de suministro.',
      },
      {
        title: 'Auto-Securitización Hipotecaria',
        desc: 'Ciclo de vida hipotecario en contratos digitales para optimizar liquidez y repo BCCh.',
      },
    ],
  },
  {
    id: 9,
    category: 'Expansión Internacional',
    tagColor: '#005FFF',
    title: 'Bci Miami + CNB Florida + Bci Securities',
    subtitle: 'Extensión natural en el nodo norte del corredor LatAm - Estados Unidos',
    badges: ['Bci Miami', 'CNB Florida', 'Bci Securities', 'FDIC Insured'],
    points: [
      {
        title: 'Cuenta en Dólares Digitales',
        desc: 'Cuenta operativa en USDC para multi-Latinas que exportan y operan en la región.',
      },
      {
        title: 'Depósitos Tokenizados 24/7',
        desc: 'Liquidación instantánea T+0 entre Chile, Perú y Miami reemplazando SWIFT.',
      },
      {
        title: 'Custodia Institucional HNW',
        desc: 'Servicio fiduciario para banca privada en activos digitales bajo marca Bci-CNB.',
      },
      {
        title: 'Banca Operativa para Fintechs',
        desc: 'Banco por defecto para fintechs del corredor LatAm-US con infraestructura regional.',
      },
    ],
  },
  {
    id: 10,
    category: 'Portafolio & Cultura',
    tagColor: '#F40034',
    title: 'Portafolio Corporativo de Innovación 2026',
    subtitle: 'Ciclo anual estructurado de enero a septiembre con Pitch Day y Premio Anual',
    keyMetric: {
      value: '367',
      label: 'Iniciativas Mapeadas',
      detail: 'Levantamiento transversal con todas las divisiones del banco',
    },
    badges: ['Mapeo', 'Caracterización', 'Consejo Q1-Q3', 'Pitch Day', 'Premio'],
    points: [
      {
        title: 'Mapeo Transversal (Ene - Mar)',
        desc: 'Involucra a todas las divisiones de negocio y habilitadores corporativos.',
      },
      {
        title: 'Caracterización Doblin (Mar)',
        desc: 'Evaluación por grado de innovación, horizonte (H1/H2/H3) y retorno esperado.',
      },
      {
        title: 'Consejos de Innovación (Q1, Q2, Q3)',
        desc: 'Gobernanza con líderes ejecutivos para profundizar en economics y alineamiento estratégico.',
      },
      {
        title: 'Pitch Day & Reconocimiento (Junio)',
        desc: '6 proyectos finalistas presentan ante jurado ejecutivo en la Ceremonia Anual.',
      },
    ],
  },
  {
    id: 11,
    category: 'Inteligencia Artificial',
    tagColor: '#005FFF',
    title: 'Adopción de IA Generativa en el Negocio',
    subtitle: '+90 iniciativas de IA Gen activas en el portafolio corporativo',
    keyMetric: {
      value: '24.5%',
      label: 'Del Portafolio',
      detail: '90 de 367 iniciativas declaran uso de Gen AI',
    },
    badges: ['Eficiencia Operativa (45%)', 'Productividad Colaborador (31%)', 'Experiencia & Growth (10%)'],
    points: [
      {
        title: 'Eficiencia Operativa (45%)',
        desc: 'Extracción de documentos masivos, validaciones de riesgos/legales, conciliaciones y compliance.',
      },
      {
        title: 'Productividad Colaborador (31%)',
        desc: 'Copilotos para ejecutivos y banqueros, asistentes de reuniones y gestión del conocimiento.',
      },
      {
        title: 'Experiencia & Growth (10%)',
        desc: 'Hiper-personalización, chats autónomos en MACH, y simuladores interactivos como ChatGPT Bci.',
      },
    ],
  },
  {
    id: 12,
    category: 'Casos de Éxito',
    tagColor: '#59A80F',
    title: 'Piloto Hiper-Personalización con Planda.AI',
    subtitle: 'Modelado conductual 1:1 en CRM y Wealth Management',
    keyMetric: {
      value: '+2X',
      label: 'Uplift de Conversión',
      detail: '+$6.100 MM aporte incremental en 18 días vs grupo de control',
    },
    badges: ['Behavioral Science', 'Clustering Dinámico', 'Salesforce Native'],
    points: [
      {
        title: 'Oportunidad',
        desc: 'Bci y MACH cuentan con 5.3M clientes; solo un 3.3% recibía personalización de inversiones.',
      },
      {
        title: 'Modelo Conductual Planda',
        desc: 'Identificación de drivers emocionales (Seguridad, Libertad, Crecimiento, Familia) para mensajes 1:1.',
      },
      {
        title: 'Resultados Comprobados',
        desc: '+10% Win Rate, +14% ticket promedio y +19% en simulaciones contra grupo de control.',
      },
    ],
  },
  {
    id: 13,
    category: 'Posicionamiento',
    tagColor: '#005FFF',
    title: 'Plan de Posicionamiento: 4 Audiencias Clave',
    subtitle: 'Relato y alianzas estratégicas para consolidar a Bci como líder regional',
    badges: ['Mercado Financiero', 'Fintechs & Startups', 'Big Techs', 'Líderes de Opinión'],
    points: [
      {
        title: 'Mercado Financiero (IR)',
        desc: 'Showcase de innovación con analistas e inversionistas, e Innovation Investor Day Latam.',
      },
      {
        title: 'Fintechs & Startups',
        desc: 'Fast-Track Onboarding, Bci Labs, fondo Venture Debt y casos de éxito compartidos.',
      },
      {
        title: 'Big Techs (Google, AWS, MSFT, Salesforce)',
        desc: 'Hackathons conjuntas, co-creación de productos y case studies de clase mundial.',
      },
      {
        title: 'Líderes de Opinión & Academia',
        desc: 'Centro NACE MUT, agenda ICARE IA y Datos, alianzas con Corfo, Cenia y universidades.',
      },
    ],
  },
  {
    id: 14,
    category: 'Visión 2026 - 2028',
    tagColor: '#9A6700',
    title: 'Innovation Strength Index (ISI) & Visión 2028',
    subtitle: 'Métrica integral y roadmap para estar en el podio regional',
    keyMetric: {
      value: 'Top 3 LATAM',
      label: 'Meta 2027',
      detail: 'Junto a Nubank y MercadoPago como los más innovadores de la región',
    },
    badges: ['2026: Hitos Financieros', '2027: Podio Regional', '2028: Caso Global HBS'],
    points: [
      {
        title: '2026 (Fundamentos)',
        desc: '2 analistas internacionales citan la estrategia tecnológica como factor de compra (Buy Rating). 50 fintechs integradas en <2 semanas.',
      },
      {
        title: '2027 (Podio Regional)',
        desc: 'Mejora de 150 pbs en Ratio de Eficiencia atribuible a GenAI. Entrada al ranking Most Innovative Companies.',
      },
      {
        title: '2028 (Caso de Estudio Global)',
        desc: 'Publicación de caso en Harvard Business School (HBS/Stanford). 15% de ingresos netos provenientes de nuevos modelos digitales.',
      },
    ],
  },
];

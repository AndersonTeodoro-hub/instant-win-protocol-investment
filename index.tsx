import React, { useState, useEffect, FormEvent } from "react";
import { createRoot } from "react-dom/client";
import { 
  Menu, X, ChevronDown, ArrowRight, ExternalLink, ShieldCheck, 
  Zap, Wallet, Percent, Coins, UserPlus, Vote, Lock, 
  TrendingUp, CheckCircle2, Twitter, Send, Github, Gift
} from "lucide-react";

// --- Types & Translations ---

type Locale = 'en' | 'pt' | 'es';

const translations = {
  en: {
    nav: {
      features: "Features",
      points: "IWP Points",
      seed: "Seed Round",
      faq: "FAQ",
      openApp: "Open App",
    },
    hero: {
      badge: "Live on Arbitrum",
      titleStart: "Instant Win",
      titleGradient: "Raffle Protocol",
      titleEnd: "",
      subtitle: "30-minute rounds on Arbitrum with USDC prizes. Transparent, non-custodial, and provably fair using Chainlink VRF.",
      ctaPrimary: "Enter Raffle",
      statTime: "30 Min Rounds",
      statPayout: "Instant Payout",
      statNetwork: "Arbitrum",
    },
    features: {
      title: "Why Instant Win?",
      subtitle: "Built for trust, speed, and efficiency.",
      f1Title: "Provably Fair",
      f1Desc: "Chainlink VRF ensures verifiable randomness that cannot be manipulated by anyone.",
      f2Title: "Fast Rounds",
      f2Desc: "30-minute rounds mean constant action and 48 chances to win every single day.",
      f3Title: "Non-Custodial",
      f3Desc: "Your funds stay in your wallet until you play. Smart contract manages the pot.",
      f4Title: "Low Fees",
      f4Desc: "Built on Arbitrum One for lightning-fast transactions and minimal gas costs.",
    },
    points: {
      badge: "Phase 1: Accumulation",
      title: "IWP Points Program",
      desc: "Instant Win Points (IWP) reward early adopters and active participants. While there is no token yet, points track your contribution to the protocol ecosystem.",
      earnTitle: "How to Earn",
      list1: "Participate in raffle rounds",
      list2: "Refer new players (soon)",
      list3: "Future conversion to governance/allocation",
    },
    seed: {
      title: "Protocol Shares: 2,000 Available",
      totalShares: "Total Shares: 2,000",
      priceShare: "Price per Share: 1,000 USDC",
      totalRaise: "Total Raise: $2,000,000",
      minInvest: "Min Ticket: $1,000 (1 share)",
      maxInvest: "Max Ticket: $10,000 (10 shares)",
      howItWorksTitle: "Automated Distribution",
      howItWorksDesc: "12.5% of every round is automatically distributed to share holders proportionally via smart contract. This rule is immutable.",
      potentialTitle: "The Numbers Behind It",
      potentialList1: "48 rounds per day (every 30 mins)",
      potentialList2: "336 rounds per week",
      potentialList3: "17,520 rounds per year",
      potentialList4: "Global protocol: 24/7/365",
      potentialList5: "Returns scale with protocol volume",
      mathTitle: "Scenario Example",
      mathExample: "If 100,000 USDC enters a round → 12,500 USDC distributed. Your 1 share (0.05%) earns 6.25 USDC per round. At 48 rounds/day, potential rewards accumulate rapidly.",
      mathDisclaimer: "Returns are proportional to protocol usage. This is not a guaranteed return investment. Smart contract distribution is immutable and transparent.",
      formTitle: "Join the Community Whitelist",
      formSubtitle: "Protocol shares are purchased directly on the App. Register here for future governance tokens and priority access to new features.",
      formName: "Full Name",
      formEmail: "Email Address",
      formMsg: "Message (Optional)",
      formSubmit: "Join Waitlist",
      buyButton: "Buy Shares on App"
    },
    faq: {
      title: "Frequently Asked Questions",
      q1: "How does the raffle work?",
      a1: "Users buy tickets with USDC on Arbitrum. The smart contract holds funds. Every 30 minutes, Chainlink VRF picks a winner. The prize is sent instantly to the winner's wallet.",
      q2: "How do Protocol Shares work?",
      a2: "There are 2,000 fixed shares. The smart contract takes 12.5% of every round's volume and splits it among share holders. If you own shares, you can claim your USDC rewards anytime.",
      q3: "What's the investment potential?",
      a3: "The protocol runs 48 times a day, every day, globally. As volume increases, the 12.5% distribution pool grows. Since the protocol runs 24/7/365, rewards are generated continuously.",
      q4: "Is this legal?",
      a4: "The protocol runs autonomously on the blockchain. Users are responsible for complying with their local laws regarding crypto assets and raffle participation.",
      q5: "What are IWP Points?",
      a5: "IWP are off-chain points tracking user activity. They serve as a reputation score and may be used for future governance weighting or whitelist access.",
      q6: "How are winners selected?",
      a6: "We use Chainlink VRF (Verifiable Random Function). This generates a random number on-chain that is cryptographically provable and tamper-proof.",
      q7: "When will the token launch?",
      a7: "There is no token at this stage. We are focusing on the protocol utility and the IWP points system first.",
    },
    footer: {
      rights: "All rights reserved.",
    }
  },
  pt: {
    nav: {
      features: "Recursos",
      points: "Pontos IWP",
      seed: "Seed Round",
      faq: "FAQ",
      openApp: "Abrir App",
    },
    hero: {
      badge: "Disponível na Arbitrum",
      titleStart: "Instant Win",
      titleGradient: "Protocolo de Rifa",
      titleEnd: "",
      subtitle: "Rodadas de 30 minutos no Arbitrum com prêmios em USDC. Transparente, não-custodial e comprovadamente justo usando Chainlink VRF.",
      ctaPrimary: "Jogar Agora",
      statTime: "Rodadas de 30min",
      statPayout: "Pagamento Instantâneo",
      statNetwork: "Arbitrum",
    },
    features: {
      title: "Por que Instant Win?",
      subtitle: "Construído para confiança, velocidade e eficiência.",
      f1Title: "Justiça Comprovável",
      f1Desc: "Chainlink VRF garante aleatoriedade verificável que não pode ser manipulada por ninguém.",
      f2Title: "Rodadas Rápidas",
      f2Desc: "Rodadas de 30 minutos significam ação constante e 48 chances de ganhar todos os dias.",
      f3Title: "Não-Custodial",
      f3Desc: "Seus fundos ficam na sua carteira até você jogar. O smart contract gerencia o pote.",
      f4Title: "Taxas Baixas",
      f4Desc: "Construído na Arbitrum One para transações ultra-rápidas e custos de gás mínimos.",
    },
    points: {
      badge: "Fase 1: Acumulação",
      title: "Programa de Pontos IWP",
      desc: "Instant Win Points (IWP) recompensam os primeiros usuários e participantes ativos. Embora ainda não haja token, os pontos rastreiam sua contribuição.",
      earnTitle: "Como Ganhar",
      list1: "Participe das rodadas de rifa",
      list2: "Indique novos jogadores (em breve)",
      list3: "Conversão futura para governança/alocação",
    },
    seed: {
      title: "Cotas do Protocolo: 2.000 Disponíveis",
      totalShares: "Total de Cotas: 2.000",
      priceShare: "Preço por Cota: 1.000 USDC",
      totalRaise: "Captação Total: $2.000.000",
      minInvest: "Ticket Mín: $1.000 (1 cota)",
      maxInvest: "Máx por Investidor: $10.000 (10 cotas)",
      howItWorksTitle: "Distribuição Automatizada",
      howItWorksDesc: "12,5% de cada rodada é automaticamente distribuído aos cotistas proporcionalmente via smart contract. Regra imutável.",
      potentialTitle: "Os Números por Trás",
      potentialList1: "48 rodadas por dia (a cada 30 min)",
      potentialList2: "336 rodadas por semana",
      potentialList3: "17.520 rodadas por ano",
      potentialList4: "Protocolo global: 24/7/365",
      potentialList5: "Retornos escalam com volume",
      mathTitle: "Cenário Exemplo",
      mathExample: "Se 100.000 USDC entrar na rodada → 12.500 USDC distribuídos. 1 cota (0,05%) recebe 6,25 USDC por rodada. Em 48 rodadas/dia, acumula rapidamente.",
      mathDisclaimer: "Retornos são proporcionais ao uso do protocolo. Não é investimento com retorno garantido. Distribuição via smart contract é imutável e transparente.",
      formTitle: "Lista de Benefícios Exclusivos",
      formSubtitle: "As cotas do protocolo são adquiridas diretamente no App. Cadastre-se aqui para futuros tokens de governança e prioridade em novos lançamentos.",
      formName: "Nome Completo",
      formEmail: "Endereço de Email",
      formMsg: "Mensagem (Opcional)",
      formSubmit: "Entrar na Lista",
      buyButton: "Comprar Cotas no App"
    },
    faq: {
      title: "Perguntas Frequentes",
      q1: "Como a rifa funciona?",
      a1: "Usuários compram bilhetes com USDC na Arbitrum. O contrato segura os fundos. A cada 30 minutos, Chainlink VRF escolhe um vencedor. O prêmio é enviado na hora.",
      q2: "Como funcionam as Cotas do Protocolo?",
      a2: "Existem 2.000 cotas fixas. O smart contract pega 12,5% do volume de cada rodada e divide entre os cotistas. Se você tem cotas, pode sacar seus USDC a qualquer momento.",
      q3: "Qual o potencial de investimento?",
      a3: "O protocolo roda 48 vezes por dia, globalmente. Conforme o volume aumenta, o pool de 12,5% cresce. Como roda 24/7, recompensas são geradas continuamente.",
      q4: "Isso é legal?",
      a4: "O protocolo roda de forma autônoma na blockchain. Usuários são responsáveis por cumprir suas leis locais sobre criptoativos e participação em rifas.",
      q5: "O que são Pontos IWP?",
      a5: "IWP são pontos off-chain que rastreiam atividade do usuário. Servem como reputação e podem ser usados para peso em governança futura.",
      q6: "Como os vencedores são escolhidos?",
      a6: "Usamos Chainlink VRF (Verifiable Random Function). Isso gera um número aleatório on-chain que é criptograficamente comprovável e à prova de adulteração.",
      q7: "Quando lança o token?",
      a7: "Não há token nesta fase. Estamos focando na utilidade do protocolo e no sistema de pontos IWP primeiro.",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    }
  },
  es: {
    nav: {
      features: "Características",
      points: "Puntos IWP",
      seed: "Seed Round",
      faq: "FAQ",
      openApp: "Abrir App",
    },
    hero: {
      badge: "Disponible en Arbitrum",
      titleStart: "Instant Win",
      titleGradient: "Protocolo de Sorteo",
      titleEnd: "",
      subtitle: "Rondas de 30 minutos en Arbitrum con premios en USDC. Transparente, no-custodial y demostrablemente justo usando Chainlink VRF.",
      ctaPrimary: "Jugar Ahora",
      statTime: "Rondas de 30 min",
      statPayout: "Pago Instantáneo",
      statNetwork: "Arbitrum",
    },
    features: {
      title: "¿Por qué Instant Win?",
      subtitle: "Construido para confianza, velocidad y eficiencia.",
      f1Title: "Equidad Demostrable",
      f1Desc: "Chainlink VRF asegura aleatoriedad verificable que no puede ser manipulada por nadie.",
      f2Title: "Rondas Rápidas",
      f2Desc: "Rondas de 30 minutos significam acción constante y 48 oportunidades de ganar cada día.",
      f3Title: "No-Custodial",
      f3Desc: "Tus fondos permanecen en tu billetera hasta que juegas. El smart contract gestiona el bote.",
      f4Title: "Bajas Tarifas",
      f4Desc: "Construido en Arbitrum One para transacciones ultrarrápidas y costos de gas mínimos.",
    },
    points: {
      badge: "Fase 1: Acumulación",
      title: "Programa de Puntos IWP",
      desc: "Instant Win Points (IWP) recompensam a los primeros usuarios y participantes activos. Aunque aún no hay token, los puntos rastrean tu contribución.",
      earnTitle: "Cómo Ganar",
      list1: "Participa en rondas de sorteo",
      list2: "Refiere nuevos jugadores (pronto)",
      list3: "Conversión futura a gobernanza/asignación",
    },
    seed: {
      title: "Cuotas del Protocolo: 2.000 Disponibles",
      totalShares: "Total de Cuotas: 2.000",
      priceShare: "Precio por Cuota: 1.000 USDC",
      totalRaise: "Recaudación Total: $2.000.000",
      minInvest: "Ticket Mín: $1.000 (1 cuota)",
      maxInvest: "Máx por Inversor: $10.000 (10 cuotas)",
      howItWorksTitle: "Distribución Automatizada",
      howItWorksDesc: "12.5% de cada ronda se distribuye automáticamente a los titulares de cuotas proporcionalmente vía smart contract. Inmutable.",
      potentialTitle: "Los Números Detrás",
      potentialList1: "48 rondas por día (cada 30 min)",
      potentialList2: "336 rondas por semana",
      potentialList3: "17.520 rondas por año",
      potentialList4: "Protocolo global: 24/7/365",
      potentialList5: "Retornos escalam con volumen",
      mathTitle: "Escenario de Ejemplo",
      mathExample: "Si 100.000 USDC entran en una ronda → 12.500 USDC distribuidos. 1 cuota (0.05%) recibe 6,25 USDC por ronda. En 48 rondas/día, se acumula rápidamente.",
      mathDisclaimer: "Los retornos son proporcionales al uso del protocolo. No es una inversión con retorno garantizado. La distribución vía smart contract es inmutable y transparente.",
      formTitle: "Lista de Benefícios Exclusivos",
      formSubtitle: "Las cuotas del protocolo se adquieren directamente en la App. Regístrate aquí para futuros tokens de gobernanza y prioridad en nuevos lanzamientos.",
      formName: "Nombre Completo",
      formEmail: "Correo Electrónico",
      formMsg: "Mensaje (Opcional)",
      formSubmit: "Unirse a la Lista",
      buyButton: "Comprar Cuotas en App"
    },
    faq: {
      title: "Preguntas Frecuentes",
      q1: "¿Cómo funciona el sorteo?",
      a1: "Los usuarios compran boletos con USDC en Arbitrum. El contrato retiene los fondos. Cada 30 minutos, Chainlink VRF elige un ganador. El premio se envía al instante.",
      q2: "¿Cómo funcionan las Cuotas del Protocolo?",
      a2: "Hay 2.000 cuotas fijas. El smart contract toma el 12.5% del volumen de cada ronda y lo divide entre los titulares. Si tienes cuotas, puedes reclamar tus USDC en cualquier momento.",
      q3: "¿Cuál es el potencial de inversión?",
      a3: "El protocolo funciona 48 veces al día, globalmente. A medida que aumenta el volumen, el pool del 12.5% crece. Al ser 24/7, las recompensas se generan continuamente.",
      q4: "¿Es esto legal?",
      a4: "El protocolo funciona de forma autónoma en la blockchain. Los usuarios son responsables de cumplir con sus leyes locales sobre criptoativos y participación en sorteos.",
      q5: "¿Qué son los Puntos IWP?",
      a5: "IWP son puntos off-chain que rastrean la actividad del usuario. Sirven como reputación y pueden usarse para peso en gobernanza futura.",
      q6: "¿Cómo se eligen los ganadores?",
      a6: "Usamos Chainlink VRF (Verifiable Random Function). Esto genera un número aleatorio on-chain que es criptográficamente demostrable e inmutable.",
      q7: "¿Cuándo se lanza el token?",
      a7: "No hay token en esta fase. Nos estamos centrando en la utilidad del protocolo y el sistema de puntos IWP primero.",
    },
    footer: {
      rights: "Todos los derechos reservados.",
    }
  },
};

// --- Components ---

const Logo = () => (
  <div 
    className="flex items-center gap-2 cursor-pointer group" 
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    {/* 
      PREMIUM SVG LOGO - NO EXTERNAL FILES NEEDED 
      Concept: A stylized Trophy Cup with a Lightning Bolt (Instant Win)
      Colors: Uses the 'primary' (Cyan) and 'accent' (Purple) gradients defined in Tailwind config
    */}
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform duration-300">
      <defs>
        <linearGradient id="logoGradient" x1="2" y1="10" x2="46" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="boltGradient" x1="20" y1="10" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>
      
      {/* Trophy Cup Shape */}
      <path d="M10 6H38C38 6 38 18 24 18C10 18 10 6 10 6Z" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 6L6 14C6 14 5 18 10 20" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M38 6L42 14C42 14 43 18 38 20" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 18V28" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 28H32" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Lightning Bolt Overlay (Winning/Instant) */}
      <path d="M26 4L18 14H24L20 24L30 12H24L26 4Z" fill="url(#boltGradient)" stroke="#050511" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
    
    <div className="flex flex-col">
        <span className="text-xl font-black tracking-tight text-white leading-none">
        Instant
        </span>
        <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent leading-none">
        Win
        </span>
    </div>
  </div>
);

const LanguageSwitcher = ({ currentLang, setLang }: { currentLang: Locale, setLang: (l: Locale) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];
  
  const currentFlag = languages.find(l => l.code === currentLang)?.flag;

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 transition-colors bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white"
      >
        <span className="text-lg">{currentFlag}</span>
        <span className="uppercase">{currentLang}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl glass-panel overflow-hidden py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLang(lang.code); setIsOpen(false); }}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left transition-colors hover:bg-white/10 ${
                currentLang === lang.code ? "text-accent font-bold bg-white/5" : "text-gray-300"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = ({ lang, setLang, t }: { lang: Locale, setLang: (l: Locale) => void, t: any }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "features", label: t.features },
    { id: "points", label: t.points },
    { id: "seed", label: t.seed },
    { id: "faq", label: t.faq },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? "bg-[#050511]/90 backdrop-blur-lg border-b border-white/10 py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Logo />
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher currentLang={lang} setLang={setLang} />
          <a href="https://instant-win-raffle-v2-1.vercel.app/#/" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition transform hover:scale-105">
            {t.openApp}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#050511] border-b border-white/10 p-6 flex flex-col gap-6">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-lg font-medium text-gray-300 hover:text-accent text-left">
              {item.label}
            </button>
          ))}
          <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
                <span className="text-gray-400">Language</span>
                <LanguageSwitcher currentLang={lang} setLang={setLang} />
            </div>
            <a href="https://instant-win-raffle-v2-1.vercel.app/#/" target="_blank" rel="noopener noreferrer" className="w-full text-center py-3 rounded-xl bg-primary text-white font-bold">
              {t.openApp}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = ({ t }: { t: any }) => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-blob" />
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-blob" />

    <div className="container mx-auto px-6 relative z-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        <span className="text-sm font-bold tracking-wide uppercase">{t.badge}</span>
      </div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
        {t.titleStart} <br className="hidden md:block" />
        <span className="text-gradient">{t.titleGradient}</span>
        {t.titleEnd && ` ${t.titleEnd}`}
      </h1>

      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        {t.subtitle}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <a href="https://instant-win-raffle-v2-1.vercel.app/#/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 text-white font-bold text-lg shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-105 transition-all flex items-center justify-center gap-2">
          {t.ctaPrimary} <ArrowRight size={20} />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {[
          { label: t.statTime, val: "30", icon: "⏱️" },
          { label: t.statPayout, val: "USDC", icon: "💰" },
          { label: "Provably Fair", val: "VRF", icon: "🎲" },
          { label: t.statNetwork, val: "L2", icon: "⚡" },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-4 rounded-2xl flex flex-col items-center hover:bg-white/5 transition-colors">
            <span className="text-2xl mb-1">{stat.icon}</span>
            <span className="text-xl font-bold text-white">{stat.val}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = ({ t }: { t: any }) => {
  const features = [
    { title: t.f1Title, desc: t.f1Desc, icon: <ShieldCheck className="w-8 h-8 text-primary" />, color: "from-primary/20 to-primary/5" },
    { title: t.f2Title, desc: t.f2Desc, icon: <Zap className="w-8 h-8 text-yellow-400" />, color: "from-yellow-400/20 to-yellow-400/5" },
    { title: t.f3Title, desc: t.f3Desc, icon: <Wallet className="w-8 h-8 text-accent" />, color: "from-accent/20 to-accent/5" },
    { title: t.f4Title, desc: t.f4Desc, icon: <Percent className="w-8 h-8 text-green-400" />, color: "from-green-400/20 to-green-400/5" },
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">{t.title}</h2>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="glass-card p-8 rounded-3xl group relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} blur-3xl rounded-full -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-100`} />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Points = ({ t }: { t: any }) => (
  <section id="points" className="py-32 relative">
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-1/2 bg-accent/10 blur-[100px]" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-bold text-sm mb-6 uppercase tracking-wider">
            {t.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">{t.title}</h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">{t.desc}</p>
          <div className="p-6 rounded-2xl border border-dashed border-white/20 bg-white/5">
              <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">!</div>
                  <p className="text-sm italic opacity-80">IWP tokens are currently off-chain points. Future utility will be announced.</p>
              </div>
          </div>
        </div>
        <div className="glass-panel p-1 rounded-3xl">
          <div className="bg-black/40 rounded-[22px] p-8 h-full">
            <h3 className="text-2xl font-bold mb-8 text-center">{t.earnTitle}</h3>
            <ul className="space-y-6">
              {[
                { text: t.list1, icon: <Coins className="text-primary" /> },
                { text: t.list2, icon: <UserPlus className="text-accent" /> },
                { text: t.list3, icon: <Vote className="text-success" /> },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <div className="p-3 rounded-lg bg-black/50">{item.icon}</div>
                  <span className="text-lg font-medium text-gray-200">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Seed = ({ t }: { t: any }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Whitelist Form Submitted");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="seed" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">{t.title}</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[t.totalRaise, t.minInvest, t.priceShare].map((item: string, i: number) => (
                <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-accent-500">{item}</span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-3xl border-l-4 border-l-primary">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Lock className="text-primary" size={24} /> {t.howItWorksTitle}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{t.howItWorksDesc}</p>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                 <a href="https://instant-win-raffle-v2-1.vercel.app/#/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-transform hover:scale-105">
                   {t.buyButton} <ExternalLink size={18} />
                 </a>
              </div>
            </div>
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="text-success" size={24} /> {t.potentialTitle}</h3>
              <ul className="space-y-3">
                {[t.potentialList1, t.potentialList2, t.potentialList3, t.potentialList4, t.potentialList5].map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400"><CheckCircle2 size={18} className="text-primary shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl">
                <h4 className="font-bold text-white mb-2">{t.mathTitle}</h4>
                <p className="text-sm text-gray-300 mb-4">{t.mathExample}</p>
                <p className="text-xs text-gray-500 uppercase font-semibold">{t.mathDisclaimer}</p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl shadow-2xl shadow-accent/10">
            <div className="flex justify-center mb-6">
               <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                 <Gift size={32} />
               </div>
            </div>
            <h3 className="text-3xl font-bold mb-2 text-center">{t.formTitle}</h3>
            <p className="text-gray-400 text-center mb-8 leading-relaxed text-sm">{t.formSubtitle}</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.formName}</label>
                    <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition" placeholder="John Doe" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.formEmail}</label>
                    <input required type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition" placeholder="john@example.com" />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.formMsg}</label>
                    <textarea rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition" />
                </div>
                <button type="submit" disabled={submitted} className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${submitted ? 'bg-success text-white' : 'bg-gradient-to-r from-accent-600 to-accent-500 text-white hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02]'}`}>
                    {submitted ? "You are on the list!" : t.formSubmit}
                </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = ({ t }: { t: any }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
    { q: t.q5, a: t.a5 },
    { q: t.q6, a: t.a6 },
    { q: t.q7, a: t.a7 },
  ];

  return (
    <section id="faq" className="py-32 bg-black/20">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">{t.title}</h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={idx} className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'border-accent/50 bg-white/5' : 'border-white/5'}`}>
              <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="text-lg font-bold text-gray-200">{item.q}</span>
                <ChevronDown className={`text-accent transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ t }: { t: any }) => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <footer className="py-20 border-t border-white/10 bg-black text-gray-400">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6"><Logo /></div>
            <p className="text-sm leading-relaxed mb-6">The fair, verifiable, and non-custodial raffle protocol built on Arbitrum.</p>
            <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition"><Twitter size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition"><Send size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition"><Github size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Protocol</h4>
            <ul className="space-y-4 text-sm">
                <li><button onClick={() => scrollTo('features')} className="hover:text-primary transition">Features</button></li>
                <li><button onClick={() => scrollTo('points')} className="hover:text-primary transition">IWP Points</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Invest</h4>
            <ul className="space-y-4 text-sm">
                <li><button onClick={() => scrollTo('seed')} className="hover:text-primary transition">Seed Round</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; {new Date().getFullYear()} Instant Win Protocol. {t.footer.rights}</p>
            <p className="mt-2 md:mt-0 opacity-50">Built on Arbitrum 💙🧡</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const App = () => {
  const [lang, setLang] = useState<Locale>('en');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#050511] text-white">
      <Header lang={lang} setLang={setLang} t={t.nav} />
      <Hero t={t.hero} />
      <Features t={t.features} />
      <Points t={t.points} />
      <Seed t={t.seed} />
      <FAQ t={t.faq} />
      <Footer t={t} />
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
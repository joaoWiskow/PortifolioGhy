import { useState, useEffect } from "react";
import foto from "./foto.png";
import foto2 from "./foto2.png";

/* ───────────── Dados (edite o conteúdo aqui) ───────────── */
const NAME = "Ghyovanna Alba";
const EMAIL = "albaghyovanna.med@gmail.com";
const PHONE = "+55 66 8131-3513";
const PHOTO_SOBRE = foto; // seção "Quem sou" — se ficar vazio, mostra as iniciais
const PHOTO_CONTATO = foto2; // seção "Contate-me"

const SECTIONS = [
  { id: "quem-sou", label: "Quem sou" },
  { id: "experiencia", label: "Experiência" },
  { id: "pesquisa", label: "Pesquisa" },
  { id: "atividades", label: "Atividades" },
  { id: "conquistas", label: "Conquistas" },
  { id: "contate-me", label: "Contate-me" },
];

type Item = { title: string; meta?: string; date?: string; text?: string };
type Pub = [date: string, title: string, venue: string];

const CLERKSHIPS: Item[] = [
  { title: "Neurologia", meta: "Hospital Geral de Santa Cruz · Santa Cruz, RS · Supervisor: Dr. Vilson Rogério Weige Marth", date: "Jul/2026 – atual", text: "Acompanhou consultas, prescrições, atendimentos de urgência e pacientes internados." },
  { title: "Cirurgia Vascular", meta: "Hospital Municipal Dr. José de Carvalho Florence · São José dos Campos, SP · Supervisora: Dra. Larissa Maldonado", date: "Set/2023", text: "Auxiliou em cirurgias, consultas, urgências e internações." },
];

const OBSERVERSHIPS: Item[] = [
  { title: "Neurocirurgia", meta: "Santa Casa de Porto Alegre · Supervisor: Dr. Paulo Valdeci Worm", date: "Dez/2024", text: "Observou cirurgias, consultas, urgências e internações." },
  { title: "Neurocirurgia Pediátrica", meta: "Santa Casa de Porto Alegre · Supervisor: Dr. Jorge Wladimir Junqueira Bizzi", date: "Dez/2024", text: "Observou cirurgias, consultas, urgências e internações." },
];

const RESEARCH: Item = {
  title: "Prevalência de bullying entre estudantes de medicina",
  meta: "ULBRA, Canoas/RS · Pesquisadora de graduação · Prof. Dr. Marcelo Guerra",
  date: "Ago/2026 – atual",
};

const POSTERS: Pub[] = [
  ["Out/2026", "Impact of Strict Hemodynamic Parameter Control on the Prevention of Hypotension and Hypoxia and Mortality in Severe Traumatic Brain Injury", "Trauma Brasil 2026 — XVIII Congresso Brasileiro da SBAIT e XXVIII Congresso Brasileiro de Ligas de Trauma"],
  ["Out/2026", "Epidemiological Profile of Hospitalizations Due to Poisoning in Brazil (2020–2025)", "46ª Semana Científica do Hospital de Clínicas de Porto Alegre"],
  ["Set/2025", "Prevalence of Hospitalizations Due to Dengue in the Most Populous Cities of Each Region of Rio Grande do Sul Between 2022 and 2024", "45ª Semana Científica do Hospital de Clínicas de Porto Alegre"],
  ["Abr/2024", "Incidence of Prostate Cancer Cases in the 2023–2025 Triennium: A Literature Review", "XV Congresso Internacional de Uro-Oncologia"],
  ["Abr/2024", "Epidemiological Analysis of Hospitalizations Due to Acute Myocardial Infarction in the Central-West Region of Brazil from 2013 to 2023 and Obesity", "3º Congresso Nacional de Emergência e Terapia Intensiva (CONAETI)"],
  ["Nov/2023", "Geographical Distribution of Mortality from Gastrointestinal Neoplasms in Brazil from 2017 to 2021", "II Congresso Brasileiro Online de Oncologia Clínico-Laboratorial (ONCOCLIL)"],
  ["Out/2023", "Maternal Mortality in Adolescence and Young Adulthood: An Analysis of the Brazilian Context (2009–2019)", "IX Congresso de Educação em Saúde da Amazônia"],
];

const ORALS: Pub[] = [
  ["Jun/2025", "Mortality Profile of Acute Myocardial Infarction in the Southern Brazilian States by Sex", "VIII Congresso Sul-Brasileiro de Cirurgia Cardiovascular"],
  ["Abr/2025", "Factors Associated with Neurological Deficits in Late Preterm Infants", "IX Encontro Internacional de Neonatologia e VII Simpósio Interdisciplinar de Cuidados ao Recém-Nascido Pré-Termo"],
  ["Nov/2024", "The Estimated Influence of Floods on the Incidence of H1N1 in Pregnant Women and Newborns in Rio Grande do Sul", "39ª Jornada Acadêmica Integrada (JAI), UFSM"],
];

const IN_PROGRESS: Pub[] = [
  ["2026", "Structural Anatomical Changes in the Neurodivergent Brain: A Literature Review", "Revista Eletrônica Acervo Científico"],
];

const PUB_TABS = [
  { label: "Pôsteres", items: POSTERS },
  { label: "Orais", items: ORALS },
  { label: "Em andamento", items: IN_PROGRESS },
];

const LEADERSHIP: Item[] = [
  { title: "REAME — Rede Emanuel de Afeto, Medicina e Escuta", meta: "Diretora científica e voluntária", date: "2026 – atual", text: "Coordena atividades científicas sobre saúde mental de estudantes de medicina e atua com o NAEM em redes de apoio e na prevenção de crises." },
  { title: "Liga Acadêmica de Anatomia", meta: "Diretora de marketing (membro ativa em 2025)", date: "2026", text: "Organiza e divulga eventos da liga e produz conteúdo e materiais de revisão de anatomia." },
  { title: "Liga Acadêmica de Neurologia e Neurocirurgia", meta: "Membro ativa", date: "2026 – atual", text: "Participa de reuniões, aulas e atividades de pesquisa em neurologia e neurocirurgia." },
  { title: "Monitoria de Anatomia Médica II — Neuroanatomia", meta: "Monitora", date: "2024 – 2025", text: "Apoiou estudantes na revisão de estruturas neuroanatômicas em aulas práticas e teóricas." },
];

const VOLUNTEER: Item[] = [
  { title: "Primeiros socorros em escolas", meta: "Voluntária · São José dos Campos, SP", date: "2023", text: "Ensino prático de primeiros socorros a crianças e adolescentes de escolas públicas e privadas." },
  { title: "Ação de saúde — Universidade Anhembi Morumbi", meta: "Monitora voluntária", date: "2023", text: "Treinou estudantes em curativos, sinais vitais e cuidados básicos e atendeu peregrinos a caminho do Santuário de Aparecida." },
];

const AWARDS: Item[] = [
  { title: "Prêmio Escolha do Público — II Mostra EtnoMed", meta: "São José dos Campos, SP", date: "Dez/2023", text: "Pelo documentário “Saúde de Pessoas em Situação de Rua”." },
];

const CERTS: Item[] = [
  { title: "Certificação de Primeiros Socorros", meta: "Canoas, RS", date: "Dez/2025", text: "RCP, controle de choque e hemorragias, trauma, fraturas, queimaduras, convulsões, exposições tóxicas e transporte seguro de feridos." },
  { title: "Treinamento de sutura", meta: "Curso de extensão · Canoas, RS", date: "Ago/2024", text: "Técnicas básicas de sutura, nós e manejo de instrumentais em modelos de simulação." },
];

const CONTACTS = [
  { icon: "📍", label: "Localização", text: "Canoas, RS — Brasil", color: "sky" },
  { icon: "📞", label: "Telefone", text: PHONE, color: "pink" },
  { icon: "✉️", label: "E-mail", text: EMAIL, color: "sky" },
] as const;

/* ───────────── Estilos por tom ───────────── */
type Tone = "sky" | "pink";
const TONE: Record<Tone, { bg: string; border: string; text: string }> = {
  sky: { bg: "rgba(224,242,254,0.75)", border: "1px solid rgba(125,211,252,0.3)", text: "#0369a1" },
  pink: { bg: "rgba(252,231,243,0.75)", border: "1px solid rgba(249,168,212,0.3)", text: "#be185d" },
};
const GLASS = {
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(186,230,253,0.5)",
};
const GRID = "max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-center";
const SECTION = "min-h-screen flex items-center justify-center px-6 md:px-8 py-24 scroll-mt-16";

/* ───────────── Componentes ───────────── */
function Nav({ active }: { active: string }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 py-4"
      style={{
        background: "rgba(240,249,255,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(186,230,253,0.4)",
      }}
    >
      <span className="font-serif text-xl hidden sm:block" style={{ color: "#0e4f7a" }}>
        {NAME}
      </span>
      <ul className="flex gap-4 md:gap-6 overflow-x-auto">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`nav-link text-xs md:text-sm whitespace-nowrap font-medium ${active === s.id ? "active" : ""}`}
              style={{ color: active === s.id ? "#0369a1" : "#4a7fa5" }}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function PhotoCenter({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="order-first md:order-none flex justify-center">
      <div className="relative w-[260px] h-[260px] md:w-[360px] md:h-[360px]">
        <div className="photo-ring absolute inset-0 rounded-full" />
        <div className="absolute inset-[6px] overflow-hidden rounded-full bg-sky-100 border-[6px] border-white flex items-center justify-center">
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
          ) : (
            <span className="font-serif text-7xl" style={{ color: "#7dd3fc" }}>
              GA
            </span>
          )}
        </div>
        <div
          className="absolute -top-5 -right-5 w-12 h-12 rounded-full opacity-40"
          style={{ background: "linear-gradient(135deg, #fbcfe8, #f9a8d4)" }}
        />
        <div
          className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full opacity-30"
          style={{ background: "linear-gradient(135deg, #bae6fd, #7dd3fc)" }}
        />
      </div>
    </div>
  );
}

function Heading({ eyebrow, eyebrowColor, children }: { eyebrow: string; eyebrowColor: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: eyebrowColor }}>
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl leading-tight" style={{ color: "#0e4f7a" }}>
        {children}
      </h2>
    </div>
  );
}

function Pill({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  const t = TONE[tone];
  return (
    <span className="inline-block rounded-full px-4 py-1.5 text-xs font-medium" style={{ background: t.bg, color: t.text, border: t.border }}>
      {children}
    </span>
  );
}

function Stat({ value, label, tone, size = "lg" }: { value: string; label: string; tone: Tone; size?: "lg" | "sm" }) {
  const t = TONE[tone];
  return (
    <div
      className={`card-hover text-center ${size === "lg" ? "rounded-2xl p-5" : "rounded-xl p-3"}`}
      style={{ background: t.bg, border: t.border }}
    >
      <p className={`font-serif ${size === "lg" ? "text-3xl" : "text-2xl"}`} style={{ color: t.text }}>
        {value}
      </p>
      <p className="text-xs mt-1" style={{ color: "#64a0c0" }}>
        {label}
      </p>
    </div>
  );
}

/* ───────────── Seções ───────────── */
function QuemSou() {
  return (
    <section id="quem-sou" className={SECTION}>
      <div className={GRID}>
        <div className="flex flex-col gap-6 items-center text-center md:items-end md:text-right">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#7dd3fc" }}>
              Estudante de Medicina & Pesquisadora
            </p>
            <h1 className="font-serif text-5xl leading-tight" style={{ color: "#0e4f7a" }}>
              Ghyovanna
              <br />
              <em>Alba</em>
            </h1>
          </div>
          <p className="text-base leading-relaxed max-w-[300px]" style={{ color: "#4a7fa5" }}>
            Estudante de medicina com interesse em neurologia e neurocirurgia, pesquisa epidemiológica e saúde mental na formação médica.
          </p>
          <div className="flex flex-col gap-3 items-center md:items-end">
            <Pill tone="sky">4º ano de Medicina — ULBRA</Pill>
            <Pill tone="pink">Formatura prevista: 2029</Pill>
            <Pill tone="sky">Inglês B2 · Português nativo</Pill>
          </div>
        </div>

        <PhotoCenter src={PHOTO_SOBRE} alt={NAME} />

        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <Stat value="10" label="Trabalhos apresentados" tone="sky" />
            <Stat value="4" label="Estágios e observações" tone="pink" />
          </div>
          <div className="rounded-2xl p-5" style={GLASS}>
            <p className="text-sm font-medium mb-1" style={{ color: "#0369a1" }}>
              Formação
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#4a7fa5" }}>
              Medicina — Universidade Luterana do Brasil (ULBRA), Canoas/RS, desde julho de 2023.
            </p>
          </div>
          <div className="rounded-2xl p-5" style={{ ...GLASS, background: "rgba(252,231,243,0.6)", border: TONE.pink.border }}>
            <p className="text-sm font-medium mb-1" style={{ color: "#be185d" }}>
              Saúde mental na graduação
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#9d4d79" }}>
              Diretora científica da REAME, rede de apoio e escuta para estudantes de medicina, em parceria com o NAEM.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Block({ id, eyebrow, eyebrowColor, title, children }: { id: string; eyebrow: string; eyebrowColor: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="flex justify-center px-6 md:px-8 py-20 scroll-mt-16">
      <div className="max-w-5xl w-full flex flex-col gap-10">
        <Heading eyebrow={eyebrow} eyebrowColor={eyebrowColor}>
          {title}
        </Heading>
        {children}
      </div>
    </section>
  );
}

function ItemCard({ item, tone }: { item: Item; tone: Tone }) {
  const t = TONE[tone];
  return (
    <div className="card-hover rounded-2xl p-5 flex flex-col gap-1" style={{ background: t.bg, border: t.border }}>
      {item.date && (
        <p className="text-xs font-mono font-semibold" style={{ color: t.text }}>
          {item.date}
        </p>
      )}
      <p className="font-semibold text-base" style={{ color: "#0e4f7a" }}>
        {item.title}
      </p>
      {item.meta && (
        <p className="text-xs leading-snug" style={{ color: "#64a0c0" }}>
          {item.meta}
        </p>
      )}
      {item.text && (
        <p className="text-sm leading-relaxed mt-2" style={{ color: "#4a7fa5" }}>
          {item.text}
        </p>
      )}
    </div>
  );
}

function Group({ label, items, tone }: { label: string; items: Item[]; tone: Tone }) {
  return (
    <div>
      <h3 className="font-serif text-2xl mb-4" style={{ color: "#0e4f7a" }}>
        {label}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((it) => (
          <ItemCard key={it.title} item={it} tone={tone} />
        ))}
      </div>
    </div>
  );
}

function Pesquisa() {
  const [tab, setTab] = useState(0);
  const items = PUB_TABS[tab].items;

  return (
    <Block id="pesquisa" eyebrow="Ciência" eyebrowColor="#f9a8d4" title={<>Pesquisa e <em>publicações</em></>}>
      <Group label="Pesquisa em andamento" items={[RESEARCH]} tone="sky" />
      <div>
        <h3 className="font-serif text-2xl mb-4" style={{ color: "#0e4f7a" }}>
          Apresentações em congressos
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {PUB_TABS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setTab(i)}
              className="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
              style={{
                background: tab === i ? "linear-gradient(135deg, #7dd3fc, #f9a8d4)" : "rgba(255,255,255,0.6)",
                color: tab === i ? "white" : "#4a7fa5",
                border: "1px solid rgba(186,230,253,0.6)",
              }}
            >
              {t.label} ({t.items.length})
            </button>
          ))}
        </div>
        <div className="rounded-2xl p-5" style={{ ...GLASS, background: "rgba(255,255,255,0.8)" }}>
          {items.map(([date, title, venue], i) => (
            <div key={title} className="flex gap-4 py-3" style={{ borderBottom: i < items.length - 1 ? "1px solid rgba(186,230,253,0.4)" : "none" }}>
              <span className="text-xs font-mono font-semibold flex-shrink-0 w-16 mt-0.5" style={{ color: "#7dd3fc" }}>
                {date}
              </span>
              <div>
                <p className="text-sm font-medium leading-snug" style={{ color: "#0e4f7a" }}>
                  {title}
                </p>
                <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>
                  {venue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Block>
  );
}

function Contateme() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  // Abre o WhatsApp com a mensagem pré-preenchida
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = PHONE.replace(/\D/g, "");
    const message = encodeURIComponent(`Olá! Meu nome é ${form.nome}.\n\nE-mail: ${form.email}\n\nMensagem: ${form.mensagem}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    setSent(true);
  };

  const field = "w-full rounded-xl px-4 py-3 text-sm";
  const fieldStyle = { background: "rgba(255,255,255,0.85)", border: "1px solid rgba(186,230,253,0.6)", color: "#0e4f7a" };
  const label = "text-xs font-medium block mb-1";

  return (
    <section id="contate-me" className={SECTION}>
      <div className={GRID}>
        <div>
          <div className="mb-6">
            <Heading eyebrow="Vamos conversar" eyebrowColor="#7dd3fc">
              Contate
              <br />
              <em>-me</em>
            </Heading>
          </div>

          {sent ? (
            <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(255,255,255,0.9)", border: TONE.pink.border }}>
              <div className="text-4xl mb-3">💌</div>
              <p className="font-semibold" style={{ color: "#0e4f7a" }}>
                Quase lá!
              </p>
              <p className="text-sm mt-1" style={{ color: "#64a0c0" }}>
                Seu WhatsApp foi aberto. É só enviar a mensagem por lá.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className={label} style={{ color: "#4a7fa5" }}>Seu nome</label>
                <input className={field} style={fieldStyle} required placeholder="Maria Silva" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              </div>
              <div>
                <label className={label} style={{ color: "#4a7fa5" }}>E-mail</label>
                <input className={field} style={fieldStyle} required type="email" placeholder="maria@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className={label} style={{ color: "#4a7fa5" }}>Mensagem</label>
                <textarea className={`${field} resize-none`} style={fieldStyle} required rows={4} placeholder="Como posso ajudar?" value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #7dd3fc, #f9a8d4)", color: "white" }}
              >
                Enviar mensagem
              </button>
            </form>
          )}
        </div>

        <PhotoCenter src={PHOTO_CONTATO} alt={`Contato — ${NAME}`} />

        <div className="flex flex-col gap-5">
          {CONTACTS.map((c) => (
            <div key={c.label} className="card-hover flex gap-4 rounded-2xl p-4" style={{ background: TONE[c.color].bg, border: TONE[c.color].border }}>
              <span className="text-2xl flex-shrink-0">{c.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: TONE[c.color].text }}>
                  {c.label}
                </p>
                <p className="text-sm mt-0.5 break-words" style={{ color: "#4a7fa5" }}>
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── App ───────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => entry.isIntersecting && setActiveSection(id), { threshold: 0.4 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div
      className="size-full overflow-y-auto overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg, #f0f9ff 0%, #fce7f3 25%, #fff0f6 50%, #fce7f3 75%, #e0f2fe 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <Nav active={activeSection} />
      <QuemSou />
      <Block id="experiencia" eyebrow="Prática clínica" eyebrowColor="#7dd3fc" title={<>Estágios e <em>observações</em></>}>
        <Group label="Estágios" items={CLERKSHIPS} tone="sky" />
        <Group label="Observações" items={OBSERVERSHIPS} tone="pink" />
      </Block>
      <Pesquisa />
      <Block id="atividades" eyebrow="Além da sala de aula" eyebrowColor="#f9a8d4" title={<>Liderança e <em>voluntariado</em></>}>
        <Group label="Liderança e atividades extracurriculares" items={LEADERSHIP} tone="pink" />
        <Group label="Voluntariado" items={VOLUNTEER} tone="sky" />
      </Block>
      <Block id="conquistas" eyebrow="Reconhecimentos" eyebrowColor="#7dd3fc" title={<>Prêmios e <em>certificados</em></>}>
        <Group label="Prêmio" items={AWARDS} tone="pink" />
        <Group label="Certificados" items={CERTS} tone="sky" />
      </Block>
      <Contateme />
      <footer className="text-center py-8 text-xs" style={{ color: "#94b4cc", borderTop: "1px solid rgba(186,230,253,0.3)" }}>
        © 2026 {NAME}
      </footer>
    </div>
  );
}
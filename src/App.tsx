import { useState, useEffect } from "react";

const DOCTOR_IMG =
  "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=600&h=800&fit=crop&auto=format";

const WORKS_IMG =
  "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=600&h=800&fit=crop&auto=format";

const CONTACT_IMG =
  "https://images.unsplash.com/photo-1673865641073-4479f93a7776?w=600&h=800&fit=crop&auto=format";

function Nav({ active }: { active: string }) {
  const sections = [
    { id: "quem-sou", label: "Quem sou" },
    { id: "meus-trabalhos", label: "Meus trabalhos" },
    { id: "contate-me", label: "Contate-me" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: "rgba(240, 249, 255, 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(186, 230, 253, 0.4)",
      }}
    >
      <span
        className="font-serif text-xl"
        style={{ color: "#0e4f7a", letterSpacing: "-0.01em" }}
      >
        Dra. Sofia Almeida
      </span>
      <ul className="flex gap-8">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`nav-link text-sm font-medium tracking-wide transition-colors ${
                active === s.id ? "active" : ""
              }`}
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
    <div className="flex flex-col items-center justify-center flex-shrink-0 relative">
      {/* Spinning gradient ring */}
      <div className="relative flex items-center justify-center">
        <div
          className="photo-ring absolute rounded-full"
          style={{ width: 360, height: 360, padding: 3, zIndex: 0 }}
        />
        <div
          className="relative overflow-hidden rounded-full bg-sky-100"
          style={{
            width: 348,
            height: 348,
            zIndex: 1,
            border: "6px solid white",
          }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-top"
          />
        </div>
        {/* Decorative dots */}
        <div
          className="absolute -top-6 -right-6 w-12 h-12 rounded-full opacity-40"
          style={{ background: "linear-gradient(135deg, #fbcfe8, #f9a8d4)" }}
        />
        <div
          className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full opacity-30"
          style={{ background: "linear-gradient(135deg, #bae6fd, #7dd3fc)" }}
        />
      </div>
    </div>
  );
}

/* ───────────── Quem sou ───────────── */
function QuemSou() {
  return (
    <section
      id="quem-sou"
      className="min-h-screen flex items-center justify-center px-8 pt-20"
      style={{
        background:
          "linear-gradient(160deg, #f0f9ff 0%, #fce7f3 40%, #e0f2fe 100%)",
      }}
    >
      <div className="max-w-6xl w-full grid grid-cols-3 gap-12 items-center">
        {/* Left */}
        <div className="flex flex-col gap-6 items-end text-right">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#7dd3fc" }}
            >
              Médica & Pesquisadora
            </p>
            <h1
              className="font-serif text-5xl leading-tight"
              style={{ color: "#0e4f7a" }}
            >
              Dra. Sofia
              <br />
              <em>Almeida</em>
            </h1>
          </div>

          <p
            className="text-base leading-relaxed"
            style={{ color: "#4a7fa5", maxWidth: 280 }}
          >
            Cuidar de pessoas é mais do que uma profissão — é um chamado.
            Acredito que saúde se constrói com escuta, ciência e afeto.
          </p>

          <div className="flex flex-col gap-3 items-end">
            <Pill color="sky">CRM/SP 123456</Pill>
            <Pill color="pink">Especialista em Clínica Médica</Pill>
            <Pill color="sky">Mestre em Saúde Coletiva — USP</Pill>
          </div>
        </div>

        {/* Center */}
        <PhotoCenter src={DOCTOR_IMG} alt="Dra. Sofia Almeida" />

        {/* Right */}
        <div className="flex flex-col gap-6">
          <StatCard
            number="12+"
            label="Anos de experiência"
            color="sky"
          />
          <StatCard number="4.800+" label="Pacientes atendidos" color="pink" />
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(186,230,253,0.5)" }}
          >
            <p className="text-sm font-medium mb-1" style={{ color: "#0369a1" }}>
              Formação
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#4a7fa5" }}>
              Medicina — FMUSP · Residência em Clínica Médica · Especialização
              em Medicina Preventiva · Pós-graduação em Nutrologia
            </p>
          </div>
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(252, 231, 243, 0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(249,168,212,0.3)" }}
          >
            <p className="text-sm font-medium mb-1" style={{ color: "#be185d" }}>
              Filosofia de cuidado
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#9d4d79" }}>
              Medicina centrada na pessoa — tratamentos personalizados que
              respeitam a história, os valores e o estilo de vida de cada
              paciente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Meus Trabalhos ───────────── */
function MeusTrabalhos() {
  const [active, setActive] = useState(0);

  const specialties = [
    {
      title: "Clínica Geral",
      desc: "Consultas de rotina, check-ups preventivos e manejo de condições crônicas com abordagem integrativa.",
      icon: "🩺",
    },
    {
      title: "Nutrologia",
      desc: "Programas de reeducação alimentar baseados em evidências científicas e individualização metabólica.",
      icon: "🥗",
    },
    {
      title: "Medicina Preventiva",
      desc: "Rastreamento de doenças, vacinas, saúde da mulher e promoção de longevidade com qualidade de vida.",
      icon: "🛡️",
    },
    {
      title: "Pesquisa Clínica",
      desc: "Publicações em revistas indexadas, participação em ensaios clínicos e docência universitária.",
      icon: "🔬",
    },
  ];

  return (
    <section
      id="meus-trabalhos"
      className="min-h-screen flex items-center justify-center px-8 py-24"
      style={{
        background:
          "linear-gradient(160deg, #fce7f3 0%, #f0f9ff 50%, #fdf2f8 100%)",
      }}
    >
      <div className="max-w-6xl w-full grid grid-cols-3 gap-12 items-center">
        {/* Left — specialties list */}
        <div className="flex flex-col gap-4">
          <div className="mb-2">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: "#f9a8d4" }}
            >
              Áreas de atuação
            </p>
            <h2
              className="font-serif text-4xl leading-tight"
              style={{ color: "#0e4f7a" }}
            >
              Meus
              <br />
              <em>trabalhos</em>
            </h2>
          </div>
          {specialties.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="card-hover text-left rounded-2xl p-4 transition-all"
              style={{
                background:
                  active === i
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.5)",
                border:
                  active === i
                    ? "1px solid rgba(125,211,252,0.6)"
                    : "1px solid rgba(186,230,253,0.3)",
                boxShadow:
                  active === i
                    ? "0 8px 32px rgba(125,211,252,0.2)"
                    : "none",
              }}
            >
              <span className="text-xl">{s.icon}</span>
              <p
                className="font-semibold text-sm mt-1"
                style={{
                  color: active === i ? "#0369a1" : "#4a7fa5",
                }}
              >
                {s.title}
              </p>
              {active === i && (
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "#64a0c0" }}>
                  {s.desc}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Center */}
        <PhotoCenter src={WORKS_IMG} alt="Dra. Sofia em consulta" />

        {/* Right — publications & achievements */}
        <div className="flex flex-col gap-5">
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(186,230,253,0.4)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#7dd3fc" }}>
              Publicações recentes
            </p>
            {[
              { year: "2024", title: "Impacto da nutrologia preventiva em pacientes metabólicos", journal: "Rev. Brasileira de Medicina" },
              { year: "2023", title: "Medicina centrada na pessoa: revisão sistemática", journal: "Lancet Regional Health" },
              { year: "2022", title: "Longevidade e saúde feminina após os 40", journal: "J. Women's Health" },
            ].map((p, i) => (
              <div
                key={i}
                className="flex gap-3 py-3"
                style={{ borderBottom: i < 2 ? "1px solid rgba(186,230,253,0.4)" : "none" }}
              >
                <span
                  className="text-xs font-mono font-semibold flex-shrink-0 mt-0.5"
                  style={{ color: "#7dd3fc" }}
                >
                  {p.year}
                </span>
                <div>
                  <p className="text-xs font-medium leading-snug" style={{ color: "#0e4f7a" }}>
                    {p.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                    {p.journal}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Artigos publicados" value="18" color="pink" />
            <MiniStat label="Congressos" value="31" color="sky" />
            <MiniStat label="Orientandos" value="7" color="sky" />
            <MiniStat label="Prêmios" value="5" color="pink" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Contate-me ───────────── */
function Contateme() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contate-me"
      className="min-h-screen flex items-center justify-center px-8 py-24"
      style={{
        background:
          "linear-gradient(160deg, #e0f2fe 0%, #fce7f3 60%, #e0f2fe 100%)",
      }}
    >
      <div className="max-w-6xl w-full grid grid-cols-3 gap-12 items-center">
        {/* Left — form */}
        <div>
          <div className="mb-6">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: "#7dd3fc" }}
            >
              Vamos conversar
            </p>
            <h2
              className="font-serif text-4xl leading-tight"
              style={{ color: "#0e4f7a" }}
            >
              Contate
              <br />
              <em>-me</em>
            </h2>
          </div>

          {sent ? (
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(249,168,212,0.4)" }}
            >
              <div className="text-4xl mb-3">💌</div>
              <p className="font-semibold" style={{ color: "#0e4f7a" }}>
                Mensagem enviada!
              </p>
              <p className="text-sm mt-1" style={{ color: "#64a0c0" }}>
                Retorno em até 24 horas úteis.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { key: "nome", label: "Seu nome", type: "text", placeholder: "Maria Silva" },
                { key: "email", label: "E-mail", type: "email", placeholder: "maria@email.com" },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    className="text-xs font-medium block mb-1"
                    style={{ color: "#4a7fa5" }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm({ ...form, [f.key]: e.target.value })
                    }
                    required
                    className="w-full rounded-xl px-4 py-3 text-sm transition-all"
                    style={{
                      background: "rgba(255,255,255,0.85)",
                      border: "1px solid rgba(186,230,253,0.6)",
                      color: "#0e4f7a",
                    }}
                  />
                </div>
              ))}
              <div>
                <label
                  className="text-xs font-medium block mb-1"
                  style={{ color: "#4a7fa5" }}
                >
                  Mensagem
                </label>
                <textarea
                  placeholder="Como posso ajudar?"
                  rows={4}
                  value={form.mensagem}
                  onChange={(e) =>
                    setForm({ ...form, mensagem: e.target.value })
                  }
                  required
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    border: "1px solid rgba(186,230,253,0.6)",
                    color: "#0e4f7a",
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl py-3 text-sm font-semibold transition-all"
                style={{
                  background: "linear-gradient(135deg, #7dd3fc, #f9a8d4)",
                  color: "white",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.opacity = "0.9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = "1")
                }
              >
                Enviar mensagem
              </button>
            </form>
          )}
        </div>

        {/* Center */}
        <PhotoCenter src={CONTACT_IMG} alt="Dra. Sofia disponível para contato" />

        {/* Right — info */}
        <div className="flex flex-col gap-5">
          {[
            {
              icon: "📍",
              label: "Endereço",
              text: "Rua das Flores, 742 — Sala 12\nJardins, São Paulo — SP",
              color: "sky",
            },
            {
              icon: "📞",
              label: "Telefone & WhatsApp",
              text: "(11) 9 8765-4321",
              color: "pink",
            },
            {
              icon: "🕐",
              label: "Horário de atendimento",
              text: "Segunda a Sexta · 8h – 18h\nSábado · 8h – 12h",
              color: "sky",
            },
            {
              icon: "✉️",
              label: "E-mail",
              text: "dra.sofia@clinicaalmeida.com.br",
              color: "pink",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="card-hover flex gap-4 rounded-2xl p-4"
              style={{
                background:
                  item.color === "sky"
                    ? "rgba(224,242,254,0.7)"
                    : "rgba(252,231,243,0.7)",
                border:
                  item.color === "sky"
                    ? "1px solid rgba(125,211,252,0.3)"
                    : "1px solid rgba(249,168,212,0.3)",
              }}
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color: item.color === "sky" ? "#0369a1" : "#be185d",
                  }}
                >
                  {item.label}
                </p>
                <p
                  className="text-sm mt-0.5 leading-relaxed whitespace-pre-line"
                  style={{ color: "#4a7fa5" }}
                >
                  {item.text}
                </p>
              </div>
            </div>
          ))}

          <div className="flex gap-3 mt-1">
            {["Instagram", "LinkedIn", "Lattes"].map((s) => (
              <a
                key={s}
                href="#"
                className="flex-1 text-center rounded-xl py-2.5 text-xs font-semibold transition-all card-hover"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(186,230,253,0.5)",
                  color: "#0369a1",
                }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Helpers ───────────── */
function Pill({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "sky" | "pink";
}) {
  return (
    <span
      className="inline-block rounded-full px-4 py-1.5 text-xs font-medium"
      style={{
        background:
          color === "sky"
            ? "rgba(186,230,253,0.5)"
            : "rgba(252,207,232,0.5)",
        color: color === "sky" ? "#0369a1" : "#be185d",
        border:
          color === "sky"
            ? "1px solid rgba(125,211,252,0.4)"
            : "1px solid rgba(249,168,212,0.4)",
      }}
    >
      {children}
    </span>
  );
}

function StatCard({
  number,
  label,
  color,
}: {
  number: string;
  label: string;
  color: "sky" | "pink";
}) {
  return (
    <div
      className="card-hover rounded-2xl p-5 text-center"
      style={{
        background:
          color === "sky"
            ? "rgba(224,242,254,0.8)"
            : "rgba(252,231,243,0.8)",
        border:
          color === "sky"
            ? "1px solid rgba(125,211,252,0.3)"
            : "1px solid rgba(249,168,212,0.3)",
      }}
    >
      <p
        className="font-serif text-3xl"
        style={{ color: color === "sky" ? "#0369a1" : "#be185d" }}
      >
        {number}
      </p>
      <p className="text-xs mt-1" style={{ color: "#64a0c0" }}>
        {label}
      </p>
    </div>
  );
}

function MiniStat({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: "sky" | "pink";
}) {
  return (
    <div
      className="card-hover rounded-xl p-3 text-center"
      style={{
        background:
          color === "sky"
            ? "rgba(224,242,254,0.7)"
            : "rgba(252,231,243,0.7)",
        border:
          color === "sky"
            ? "1px solid rgba(125,211,252,0.25)"
            : "1px solid rgba(249,168,212,0.25)",
      }}
    >
      <p
        className="font-serif text-2xl"
        style={{ color: color === "sky" ? "#0369a1" : "#be185d" }}
      >
        {value}
      </p>
      <p className="text-xs mt-0.5" style={{ color: "#64a0c0" }}>
        {label}
      </p>
    </div>
  );
}

/* ───────────── App ───────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState("quem-sou");

  useEffect(() => {
    const sections = ["quem-sou", "meus-trabalhos", "contate-me"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <Nav active={activeSection} />
      <QuemSou />
      <MeusTrabalhos />
      <Contateme />

      {/* Footer */}
      <footer
        className="text-center py-8 text-xs"
        style={{ color: "#94b4cc", borderTop: "1px solid rgba(186,230,253,0.3)", background: "#f0f9ff" }}
      >
        © 2026 Dra. Sofia Almeida · CRM/SP 123456 · Feito com cuidado ✦
      </footer>
    </div>
  );
}

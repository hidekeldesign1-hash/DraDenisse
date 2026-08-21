import Image from "next/image";
import { ArrowUpRight, Check, HeartHandshake, ShieldCheck, Star, UserRound } from "lucide-react";
import { BeforeAfterSlider } from "./before-after-slider";
import { RevealObserver } from "./reveal";

const whatsappNumber = "525547211684";
const whatsappHref =
  `https://wa.me/${whatsappNumber}?text=Hola%20Dra.%20Denisse%2C%20vi%20su%20p%C3%A1gina%20y%20quisiera%20agendar%20una%20valoraci%C3%B3n.`;
const whatsappOpenHref = `https://wa.me/${whatsappNumber}`;

const mapsPlaceHref = "https://maps.app.goo.gl/q7Roq5tQ1cKStUnt8";
const mapsDirectionsHref = "https://maps.app.goo.gl/q7Roq5tQ1cKStUnt8";
const mapsEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5786.237004325197!2d-99.15861450750748!3d19.309506473263728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce010038348d33%3A0xbb9d3e3b9a0f1428!2sDentista%20Dra.%20Denisse!5e0!3m2!1ses!2smx!4v1787333765273!5m2!1ses!2smx";

const RESULTADOS_LIST = [
  {
    slug: "limpieza-profunda",
    tratamiento: "Limpieza profunda",
    antes: "/limpieza-profunda-antes.png",
    despues: "/limpieza-profunda-despues.png",
  },
  {
    slug: "restauracion",
    tratamiento: "Restauración",
    antes: "/restauracion-dental-antes.png",
    despues: "/restauracion-dental-despues.png",
  },
  {
    slug: "odontopediatria",
    tratamiento: "Odontopediatría",
    antes: "/odontopediatria-caries-antes.png",
    despues: "/odontopediatria-caries-despues.png",
  },
  {
    slug: "endodoncia",
    tratamiento: "Endodoncia",
    antes: "/endodoncia-antes.png",
    despues: "/endodoncia-despues.png",
  },
] as const;

const TRATAMIENTOS_LIST = [
  {
    slug: "limpieza-dental",
    nombre: "Limpieza dental",
    descripcion: "Prevención y cuidado para mantener dientes y encías saludables.",
  },
  {
    slug: "restauraciones",
    nombre: "Restauraciones",
    descripcion: "Recupera la función, salud y apariencia de tus dientes con una atención cuidadosa.",
  },
  {
    slug: "atencion-infantil",
    nombre: "Atención infantil",
    descripcion: "Una consulta tranquila para que los más pequeños se sientan seguros y acompañados.",
  },
  {
    slug: "protesis-dental",
    nombre: "Prótesis dental",
    descripcion: "Reemplaza piezas ausentes o dañadas con estructuras fijas o removibles que devuelven la estética y función.",
  },
  {
    slug: "endodoncia",
    nombre: "Endodoncia",
    descripcion: "Tratamiento especializado para salvar piezas dentales con daño profundo, eliminando el dolor y protegiendo tu sonrisa.",
  },
  {
    slug: "valoracion-dental",
    nombre: "Valoración dental",
    descripcion: "Si no sabes qué necesitas, revisamos tu caso y te explicamos las alternativas adecuadas.",
    destacado: true,
  },
] as const;

function tratamientoWhatsAppHref(nombre: string) {
  const text = `Hola, me interesa obtener información sobre: ${nombre}`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

const reviews = [
  ["Osvaldo Huerta", "Excelente servicio por parte de la Dra., muy amable y explicativa a la hora de hacer su trabajo. Muy recomendado."],
  ["Carlos Rodríguez", "Te explica bien y te tiene paciencia."],
  ["Christopher Aparicio", "Explica cada procedimiento de forma clara, trabaja con mucho cuidado y profesionalismo."],
  ["Abraham Tavira", "Atención profesional, puntual e informativa; la doctora explica bien los tratamientos y a un precio accesible."],
];

const aboutPillars = [
  {
    icon: UserRound,
    title: "Atención 1 a 1",
    text: "La Dra. Denisse te acompaña de principio a fin. Sin rotación de pasantes desconocidos: una misma persona, un mismo criterio.",
  },
];

const aboutConsultaHref = (() => {
  const text =
    "Hola Dra. Denisse, me gustaría agendar una consulta directamente con usted. ¿Qué disponibilidad tiene?";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
})();

const GoogleStars = ({ className = "" }: { className?: string }) => (
  <span className={`google-stars ${className}`} aria-label="5 estrellas">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />
    ))}
  </span>
);

export default function Home() {
  return (
    <main>
      <RevealObserver />
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Dra. Denisse, inicio">
          <span className="brand-mark">D</span>
          <span>Dra. Denisse<small>Odontología</small></span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#tratamientos">Tratamientos</a>
          <a href="#experiencia">Tu consulta</a>
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#opiniones">Opiniones</a>
          <a href="#ubicacion">Ubicación</a>
        </nav>
        <details className="mobile-menu">
          <summary>Menú <span>＋</span></summary>
          <div>
            <a href="#tratamientos">Tratamientos</a>
            <a href="#experiencia">Tu consulta</a>
            <a href="#sobre-mi">Sobre mí</a>
            <a href="#opiniones">Opiniones</a>
            <a href="#ubicacion">Ubicación</a>
          </div>
        </details>
        <a className="button button-small" href={whatsappHref} target="_blank" rel="noreferrer">
          Agendar cita <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Odontología cercana en Coyoacán</p>
          <h1>Una sonrisa sana empieza con sentirte en <em>buenas manos.</em></h1>
          <p className="hero-lead">
            Atención dental profesional, cercana y sin complicaciones. Entiende tu tratamiento,
            resuelve tus dudas y recibe el cuidado que necesitas con claridad y confianza.
          </p>
          <div className="hero-actions">
            <a className="button" href={whatsappHref} target="_blank" rel="noreferrer">
              Agendar una cita <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </a>
            <a className="text-link" href="#tratamientos">Conocer tratamientos <span>↓</span></a>
          </div>
          <div className="hero-proof" aria-label="Reseñas de pacientes">
            <div className="rating"><GoogleStars /><strong>Google</strong></div>
            <p><strong>Pacientes que recomiendan su experiencia</strong><small>Atención profesional · Trato amable · Explicaciones claras</small></p>
          </div>
        </div>

        <div className="hero-visual" aria-label="Retrato profesional de la Dra. Denisse">
          <div className="portrait-art">
            <Image
              src="/dra-denisse.jpeg"
              alt="Dra. Denisse Gabriela Benítez Trejo, cirujano dentista y especialista en odontopediatría"
              fill
              sizes="(max-width: 900px) 90vw, 520px"
              className="portrait-photo"
              priority
            />
            <p>Atención profesional<br />sin perder el trato humano.</p>
          </div>
          <div className="floating-note">
            <span className="note-icon"><Check size={16} strokeWidth={2.4} aria-hidden="true" /></span>
            <p><strong>Aquí puedes preguntar</strong><small>Te explicamos cada paso con calma.</small></p>
          </div>
          <span className="image-caption">Dra. Denisse · Consultorio dental</span>
        </div>
      </section>

      <section className="trust-rail" aria-label="Principios de atención" data-reveal>
        <p>01 <strong>Te escuchamos</strong></p>
        <p>02 <strong>Te explicamos</strong></p>
        <p>03 <strong>Te cuidamos</strong></p>
        <a href="#experiencia">Conoce tu primera consulta <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
      </section>

      <section className="experience-block" id="experiencia">
        <div className="value-preview" data-reveal>
          <div className="value-preview-copy">
            <p className="section-kicker">Una experiencia diferente</p>
            <h2>Ir al dentista no debería generar más dudas de las que resuelve.</h2>
          </div>
          <p className="value-preview-lead">
            Tu consulta comienza escuchándote, evaluando lo que necesitas y explicándote con claridad las opciones para cuidar tu salud dental.
          </p>
        </div>

        <div className="assurance-grid" aria-label="Beneficios de la atención">
          {[
            ["01", "Sin tratamientos confusos.", "Conoce qué encontramos y qué opciones tienes antes de decidir."],
            ["02", "Sin sentirte apresurado.", "Pregunta con tranquilidad y recibe respuestas claras durante tu consulta."],
            ["03", "Con cuidado de principio a fin.", "Una atención profesional que prioriza tu comodidad en cada paso."],
          ].map(([num, title, text]) => (
            <article
              key={num}
              data-reveal
              className="assurance-card group rounded-2xl border border-stone-200/80 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="assurance-index" aria-hidden="true">{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="treatments section-shell" id="tratamientos">
        <div className="section-heading split-heading" data-reveal>
          <div><p className="section-kicker">Tratamientos</p><h2>Tu sonrisa merece atención profesional.</h2></div>
          <div>
            <p>Comienza por aquello que necesitas hoy. Si aún no lo sabes, una valoración es el mejor primer paso.</p>
            <a className="text-link" href={tratamientoWhatsAppHref("Valoración dental")} target="_blank" rel="noreferrer">
              Agendar valoración <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="treatment-list" role="list">
          {TRATAMIENTOS_LIST.map((tratamiento, index) => {
            const isCta = "destacado" in tratamiento && tratamiento.destacado;
            return (
              <a
                key={tratamiento.slug}
                role="listitem"
                data-reveal
                href={tratamientoWhatsAppHref(tratamiento.nombre)}
                target="_blank"
                rel="noreferrer"
                aria-label={`Consultar por WhatsApp: ${tratamiento.nombre}`}
                className={[
                  "treatment-card group grid grid-cols-[45px_1fr_auto] items-center gap-4 border-b border-stone-300/60 py-6 md:grid-cols-[0.5fr_1.2fr_1.7fr_auto] md:gap-8 md:py-8",
                  isCta ? "treatment-card--cta" : "",
                ].join(" ")}
              >
                <span className="treatment-index">{String(index + 1).padStart(2, "0")}</span>
                <h3 className={isCta ? "font-semibold tracking-tight" : undefined}>{tratamiento.nombre}</h3>
                <p className="col-span-2 md:col-span-1">{tratamiento.descripcion}</p>
                <span className="treatment-action" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </span>
              </a>
            );
          })}
        </div>
        <div className="treatment-footer" data-reveal>
          <p className="scope-note">Durante tu valoración se confirmará el tratamiento indicado para tu caso.</p>
          <a className="treatment-more" href={whatsappOpenHref} target="_blank" rel="noreferrer">
            ¿Buscas algo más? <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="results section-shell py-20" id="resultados" aria-labelledby="resultados-title">
        <div className="results-heading" data-reveal>
          <h2 id="resultados-title" className="results-title">Resultados que devuelven la confianza.</h2>
          <p className="results-lead">
            Casos clínicos reales atendidos en nuestro consultorio, donde la precisión y el cuidado marcan la diferencia.
          </p>
        </div>
        <div className="results-grid">
          {RESULTADOS_LIST.map((caso) => (
            <BeforeAfterSlider
              key={caso.slug}
              tratamiento={caso.tratamiento}
              antes={caso.antes}
              despues={caso.despues}
            />
          ))}
        </div>
        <p className="results-cta" data-reveal>
          <a href={tratamientoWhatsAppHref("Valoración dental")} target="_blank" rel="noreferrer">
            ¿Te gustaría ver resultados similares en tu caso? Agenda una valoración.
            <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </p>
      </section>

      <section className="process" aria-labelledby="process-title">
        <div className="process-intro" data-reveal>
          <p className="section-kicker">Tu primera consulta</p>
          <h2 id="process-title">Primero entendemos tu caso. Después hablamos del tratamiento.</h2>
          <a className="button light-button" href={whatsappHref} target="_blank" rel="noreferrer">Agendar mi cita <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
        </div>
        <ol className="steps">
          <li data-reveal><span>01</span><div><h3>Valoración</h3><p>Revisamos tu salud dental y escuchamos qué te preocupa.</p></div></li>
          <li data-reveal><span>02</span><div><h3>Explicación</h3><p>Conoce qué encontramos, tus alternativas y lo que implica cada opción.</p></div></li>
          <li data-reveal><span>03</span><div><h3>Tratamiento</h3><p>Realizamos el procedimiento con atención, cuidado y seguimiento profesional.</p></div></li>
        </ol>
      </section>

      <section className="reviews section-shell" id="opiniones">
        <div className="section-heading reviews-heading" data-reveal>
          <p className="section-kicker">Opiniones de pacientes</p>
          <h2>La confianza también se construye con experiencias reales.</h2>
          <div className="google-score"><GoogleStars /><strong>Opiniones en Google</strong><small>Experiencias públicas de pacientes</small></div>
        </div>
        <div className="review-grid">
          {reviews.map(([author, quote]) => (
            <figure className="review-card" data-reveal key={author}>
              <GoogleStars />
              <blockquote>{quote}</blockquote>
              <figcaption><strong>{author}</strong><small>Reseña de Google</small></figcaption>
            </figure>
          ))}
        </div>
        <a className="button outline-button" href={mapsPlaceHref} target="_blank" rel="noreferrer">Ver más reseñas en Google <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
      </section>

      <section className="about section-shell" id="sobre-mi">
        <div className="about-visual" data-reveal>
          <div className="about-portrait">
            <Image
              src="/dra-denisse.jpeg"
              alt="Dra. Denisse Gabriela Benítez Trejo, cirujano dentista y especialista en odontopediatría"
              fill
              sizes="(max-width: 900px) 90vw, 520px"
              className="about-portrait-photo"
              priority
            />
          </div>
          <div className="about-badge">
            Especialista en Odontopediatría · UNAM
          </div>
        </div>
        <div className="about-copy" data-reveal>
          <p className="section-kicker">Sobre la Dra. Denisse</p>
          <h2>Tu sonrisa, en buenas manos.</h2>
          <div className="credential-badge" aria-label="Credenciales profesionales">
            <p className="credential-badge-label">Credenciales</p>
            <p className="credential-name">Denisse Gabriela Benítez Trejo</p>
            <ul>
              <li>
                <ShieldCheck size={15} strokeWidth={1.75} aria-hidden="true" />
                <span>
                  Cirujano dentista · UNAM
                  <em>Cédula 11874778</em>
                </span>
              </li>
              <li>
                <ShieldCheck size={15} strokeWidth={1.75} aria-hidden="true" />
                <span>
                  Especialista en Odontopediatría · UNAM
                  <em>Cédula 14241725</em>
                </span>
              </li>
              <li>
                <HeartHandshake size={15} strokeWidth={1.75} aria-hidden="true" />
                <span>Enfoque clínico: Odontopediatría / Odontología Integral</span>
              </li>
            </ul>
          </div>
          <ul className="credentials-grid">
            {aboutPillars.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="credential-icon"><Icon size={18} strokeWidth={1.6} aria-hidden="true" /></span>
                <div>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </div>
              </li>
            ))}
          </ul>
          <a className="button" href={aboutConsultaHref} target="_blank" rel="noreferrer">
            Agenda una consulta <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="faq section-shell" id="faq">
        <div data-reveal><p className="section-kicker">Preguntas frecuentes</p><h2>¿Tienes alguna duda antes de agendar?</h2><p className="faq-intro">Si tu pregunta no está aquí, escríbenos. Queremos que llegues a tu consulta con tranquilidad.</p></div>
        <div className="faq-list" data-reveal>
          <details><summary>¿Necesito saber qué tratamiento requiero?<span>+</span></summary><p>No. Puedes comenzar con una valoración para revisar tu caso y conocer las opciones disponibles.</p></details>
          <details><summary>¿Cuánto cuesta la consulta inicial?<span>+</span></summary><p>La consulta inicial tiene un costo de $150. Este monto corresponde únicamente a la valoración; no incluye tratamientos.</p></details>
          <details><summary>¿Atienden niños?<span>+</span></summary><p>Sí. Se brinda atención dental infantil procurando una experiencia tranquila y cómoda.</p></details>
          <details><summary>¿Me explicarán el tratamiento antes de comenzar?<span>+</span></summary><p>Sí. Uno de los puntos principales de la consulta es que conozcas qué se realizará y puedas resolver tus dudas.</p></details>
          <details><summary>¿Cómo puedo agendar?<span>+</span></summary><p>Puedes solicitar tu cita por WhatsApp desde cualquier botón “Agendar cita” de esta página.</p></details>
        </div>
      </section>

      <section className="location" id="ubicacion">
        <iframe
          title="Ubicación del consultorio de la Dra. Denisse"
          src={mapsEmbedSrc}
          width={600}
          height={450}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <div className="location-card" data-reveal>
          <p className="section-kicker">Coyoacán, CDMX</p>
          <h2 className="location-title">Estamos cerca de ti.</h2>
          <address>Av. Sta. Úrsula 233<br />Pedregal de Sta. Úrsula<br />Coyoacán, 04600<br />Ciudad de México, CDMX</address>
          <a className="phone-link" href="tel:+525547211684">55 4721 1684</a>
          <div className="location-actions">
            <a className="button" href={mapsDirectionsHref} target="_blank" rel="noreferrer">Cómo llegar <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
            <a className="text-link" href={whatsappHref} target="_blank" rel="noreferrer">Agendar cita <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="final-cta" data-reveal>
        <div><p className="section-kicker">Tu primera cita</p><h2>Tu sonrisa, en buenas manos.</h2></div>
        <div><p>Atención profesional, explicaciones claras y un trato que te haga sentir tranquilo desde tu primera consulta.</p><a className="button light-button" href={whatsappHref} target="_blank" rel="noreferrer">Agendar mi cita <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a></div>
        <p className="final-proof"><GoogleStars /> Pacientes que recomiendan su experiencia</p>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark">D</span><p><strong>Dra. Denisse</strong><small>Consultorio dental</small></p></div>
        <div><small>Visítanos</small><p>Av. Sta. Úrsula 233<br />Pedregal de Sta. Úrsula<br />Coyoacán, CDMX</p></div>
        <div><small>Contacto</small><p><a href="tel:+525547211684">55 4721 1684</a><br /><a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a><br /><a href={mapsPlaceHref} target="_blank" rel="noreferrer">Google Maps</a></p></div>
        <div><small>Horarios</small><p>Consulta disponibilidad<br />directamente por WhatsApp.</p></div>
        <p className="footer-bottom">© 2026 Dra. Denisse <span id="privacidad">Tu información de contacto se utiliza únicamente para responder tu solicitud de cita.</span></p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          name: "Dra. Denisse",
          telephone: "+52 55 4721 1684",
          address: { "@type": "PostalAddress", streetAddress: "Av. Sta. Úrsula 233", addressLocality: "Coyoacán", addressRegion: "Ciudad de México", postalCode: "04600", addressCountry: "MX" },
          geo: { "@type": "GeoCoordinates", latitude: 19.3093995, longitude: -99.1554684 },
        }) }}
      />

      <a className="mobile-cta" href={whatsappHref} target="_blank" rel="noreferrer">Agendar cita <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>
    </main>
  );
}

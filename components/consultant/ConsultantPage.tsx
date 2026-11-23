import Link from "next/link";
import type { LocaleContent } from "@/lib/content";
import type { Locale } from "@/lib/dictionary";
import {
  consultantContent,
  consultantPath,
  developerPath,
  consultationEmail,
} from "@/lib/consultant-content";

const anchors = ["servicios", "proyectos", "proceso", "sobre-mi"];

function Icon({
  kind = "code",
}: {
  kind?: "code" | "person" | "mail" | "idea" | "chart";
}) {
  const paths = {
    code: "m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 20",
    person: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2Z",
    mail: "M3 5h18v14H3ZM3 5l9 8 9-8",
    idea: "M9 18h6m-6 3h6M8 14a6 6 0 1 1 8 0l-1 2H9Z",
    chart: "M3 3v18h18M7 15l4-5 4 3 6-8",
  };
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[kind]} />
    </svg>
  );
}

export function ConsultantPage({
  lang,
  portfolio,
}: {
  lang: Locale;
  portfolio: LocaleContent;
}) {
  const c = consultantContent[lang];
  const email = consultationEmail(
    lang === "es" ? "Consulta sobre proyecto" : "Project consultation",
  );
  const roles = portfolio.home.experience.roles.slice(0, 2);
  return (
    <>
      <a className="consultant-skip" href="#contenido">
        {c.skip}
      </a>
      <header className="consultant-header">
        <div className="consultant-container consultant-header-row">
          <Link
            className="consultant-brand"
            href={consultantPath(lang)}
            aria-label={`Julio Ortiz Pol — ${c.home}`}
          >
            <span className="consultant-mark" aria-hidden="true">
              JOP
            </span>
            <span>
              <strong>Julio Ortiz Pol</strong>
              <small>{c.descriptor}</small>
            </span>
          </Link>
          <nav
            className="consultant-nav"
            aria-label={
              lang === "es" ? "Navegación principal" : "Main navigation"
            }
          >
            {anchors.map((id, index) => (
              <a href={`#${id}`} key={id}>
                <span className="consultant-nav-icon">
                  <Icon
                    kind={(["idea", "code", "chart", "person"] as const)[index]}
                  />
                </span>
                {c.nav[index]}
              </a>
            ))}
          </nav>
          <div className="consultant-header-actions">
            <div
              className="consultant-languages"
              aria-label={lang === "es" ? "Idioma" : "Language"}
            >
              {(["es", "en"] as const).map((locale) => (
                <Link
                  key={locale}
                  href={consultantPath(locale)}
                  hrefLang={locale}
                  lang={locale}
                  aria-current={locale === lang ? "page" : undefined}
                  aria-label={locale === "es" ? "Español" : "English"}
                >
                  {locale.toUpperCase()}
                </Link>
              ))}
            </div>
            <a
              className="consultant-button consultant-header-cta"
              href="#contacto"
            >
              {c.talk}
            </a>
            <Link
              className="consultant-profile-link"
              href={developerPath(lang)}
              aria-label={c.developer}
              title={c.developer}
            >
              <Icon kind="person" />
            </Link>
          </div>
        </div>
      </header>

      <main id="contenido" tabIndex={-1}>
        <section
          className="consultant-container consultant-hero"
          aria-labelledby="consultant-title"
        >
          <div>
            <p className="consultant-eyebrow consultant-badge">
              {c.descriptor}
            </p>
            <h1 id="consultant-title">{c.heading}</h1>
            <p className="consultant-lead">{c.intro}</p>
            <div className="consultant-actions">
              <a className="consultant-button" href={email}>
                {c.cta}
              </a>
              <a
                className="consultant-button consultant-button-secondary"
                href="#servicios"
              >
                {c.explore}
              </a>
            </div>
            <p className="consultant-evidence">
              <span aria-hidden="true">◎</span>
              {c.evidence}
            </p>
          </div>
          <div className="consultant-diagram">
            <div className="consultant-diagram-heading">
              <span className="consultant-eyebrow">{c.method}</span>
              <span>{c.phases}</span>
            </div>
            <ol>
              {c.diagram.map(([title, context, description], index) => (
                <li key={title}>
                  <div>
                    <strong>
                      <span className="consultant-step-number">
                        0{index + 1}.
                      </span>{" "}
                      {title}
                    </strong>
                    <span className="consultant-step-context">{context}</span>
                  </div>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
            <div className="consultant-diagram-footer">
              <span>{c.rigor}</span>
              <span>{c.iteration}</span>
            </div>
          </div>
        </section>

        <section
          className="consultant-section consultant-band"
          id="servicios"
          aria-labelledby="services-title"
        >
          <div className="consultant-container">
            <div className="consultant-section-intro">
              <p className="consultant-eyebrow">{c.servicesLabel}</p>
              <h2 id="services-title">{c.servicesTitle}</h2>
              <p>{c.servicesIntro}</p>
            </div>
            <div className="consultant-services">
              {c.services.map((service, index) => (
                <article className="consultant-service" key={service.title}>
                  <div className="consultant-service-intro">
                    <div className="consultant-service-top">
                      <span className="consultant-number" aria-hidden="true">
                        0{index + 1}
                      </span>
                      <span className="consultant-service-phase">
                        {service.phase}
                      </span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="consultant-service-details">
                    <p className="consultant-eyebrow">{c.deliverables}</p>
                    <ul>
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <a
                      className="consultant-button consultant-button-secondary"
                      href={consultationEmail(service.title)}
                    >
                      {service.cta}
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="consultant-note">
              <p>
                <span aria-hidden="true">ⓘ </span>
                {c.promise}
              </p>
              <a href={email}>{c.initial}</a>
            </div>
          </div>
        </section>

        <section
          className="consultant-section"
          id="proceso"
          aria-labelledby="process-title"
        >
          <div className="consultant-container">
            <div className="consultant-split-heading">
              <div>
                <p className="consultant-eyebrow">{c.processLabel}</p>
                <h2 id="process-title">{c.processTitle}</h2>
              </div>
              <p>{c.processIntro}</p>
            </div>
            <ol className="consultant-process">
              {c.process.map(([title, description], index) => (
                <li key={title}>
                  <span className="consultant-eyebrow">
                    {c.phase} 0{index + 1}
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="consultant-section consultant-band"
          id="proyectos"
          aria-labelledby="projects-title"
        >
          <div className="consultant-container">
            <div className="consultant-section-intro">
              <p className="consultant-eyebrow">{c.projectsLabel}</p>
              <h2 id="projects-title">{c.projectsTitle}</h2>
              <p>{c.projectsIntro}</p>
            </div>
            <div className="consultant-projects">
              {roles.map((role, index) => (
                <article className="consultant-project" key={role.company}>
                  <div className="consultant-project-art" aria-hidden="true">
                    <span>{c.employment}</span>
                    <Icon kind={index === 0 ? "chart" : "code"} />
                    {index === 0 ? (
                      <div className="consultant-bars">
                        {[35, 65, 45, 100, 70, 50, 80, 55, 90, 40].map(
                          (height, i) => (
                            <i key={i} style={{ height: `${height}%` }} />
                          ),
                        )}
                      </div>
                    ) : (
                      <div className="consultant-wireframe">
                        <div />
                        <div />
                        <div />
                        <div />
                      </div>
                    )}
                  </div>
                  <div className="consultant-project-copy">
                    <p className="consultant-eyebrow">{role.title}</p>
                    <h3>{role.company}</h3>
                    <h4>{c.contribution}</h4>
                    <p>{role.description}</p>
                    <ul className="consultant-tags" aria-label={c.technologies}>
                      {role.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <div className="consultant-note">
              <p>{c.transparency}</p>
            </div>
          </div>
        </section>

        <section
          className="consultant-section"
          id="sobre-mi"
          aria-labelledby="about-title"
        >
          <div className="consultant-container consultant-about">
            <div className="consultant-signature-card">
              <p className="consultant-eyebrow">{c.independent}</p>
              <div className="consultant-signature" aria-hidden="true">
                JOP
                <span />
              </div>
              <p>{c.signature}</p>
            </div>
            <div>
              <p className="consultant-eyebrow">{c.aboutLabel}</p>
              <h2 id="about-title">{c.aboutTitle}</h2>
              <p className="consultant-lead">{c.aboutIntro}</p>
              <p>{c.aboutText}</p>
              <div className="consultant-credentials">
                <p className="consultant-eyebrow">{c.experience}</p>
                <div>
                  {roles.map((role) => (
                    <div key={role.company}>
                      <strong>{role.company}</strong>
                      <p>{role.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="consultant-text-links">
                <Link href={`${developerPath(lang)}#experience`}>
                  {c.profile}
                </Link>
                <a href="https://linkedin.com/in/jaop">LinkedIn</a>
                <a href={portfolio.nav.actions.resumeHref}>{c.resume}</a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="consultant-section consultant-band"
          aria-labelledby="writing-title"
        >
          <div className="consultant-container consultant-split-heading">
            <div>
              <p className="consultant-eyebrow">{c.writingLabel}</p>
              <h2 id="writing-title">{c.writingTitle}</h2>
            </div>
            <div>
              <p>{c.writingText}</p>
              <div className="consultant-text-links">
                <a href="https://linkedin.com/in/jaop">{c.follow}</a>
                <a href="https://github.com/juliaoortizpol">{c.code}</a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="consultant-section"
          id="contacto"
          aria-labelledby="contact-title"
        >
          <div className="consultant-container">
            <div className="consultant-contact">
              <p className="consultant-eyebrow">{c.contactLabel}</p>
              <h2 id="contact-title">{c.contactTitle}</h2>
              <p className="consultant-lead">{c.contactText}</p>
              <div className="consultant-actions">
                <a className="consultant-button" href={email}>
                  <Icon kind="mail" />
                  {c.cta}
                </a>
                <a
                  className="consultant-email"
                  href="mailto:julioortizpol@gmail.com"
                  aria-label={`${c.emailLabel}: julioortizpol@gmail.com`}
                >
                  julioortizpol@gmail.com
                </a>
              </div>
              <p className="consultant-evidence">{c.direct}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="consultant-footer">
        <div className="consultant-container">
          <div className="consultant-footer-top">
            <div>
              <p>
                <span className="consultant-mark">JOP</span> Julio Ortiz Pol
              </p>
              <p>{c.descriptor}</p>
            </div>
            <div className="consultant-text-links">
              <a href="https://linkedin.com/in/jaop">LinkedIn</a>
              <a href="https://github.com/juliaoortizpol">GitHub</a>
              <Link href={developerPath(lang)}>{c.developer}</Link>
            </div>
          </div>
          <p className="consultant-copyright">
            © {new Date().getFullYear()} Julio Ortiz Pol. {c.rights}
          </p>
        </div>
      </footer>
    </>
  );
}

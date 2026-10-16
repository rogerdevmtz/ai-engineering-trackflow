import ActionLink from './ActionLink'

const container = 'mx-auto w-[calc(100%_-_40px)] max-w-[1440px] min-[761px]:w-[calc(100%_-_64px)] min-[1101px]:w-[calc(100%_-_112px)]'
const footerLink = 'inline-flex min-h-11 items-center text-[13px] leading-relaxed text-[#d9d9d9] underline-offset-4 hover:text-white hover:underline hover:decoration-[#FD430B]'

function SiteFooter() {
  return (
    <footer className="mt-20 bg-black lg:mt-28">
      <section id="contacto" aria-labelledby="contacto-titulo" tabIndex={-1} className={`${container} scroll-mt-24 border-t border-white/15 py-12 lg:py-16`}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20 xl:gap-28">
          <div>
            <h2 id="contacto-titulo" className="max-w-[13ch] text-balance font-[family-name:var(--font-display)] text-[44px] leading-[1.04] font-medium tracking-[-.02em] text-white sm:text-[56px]">Hablemos de tu logística.</h2>
            <ActionLink className="button button-primary mt-6" href="/application.html" label="Solicitar información" />
          </div>
          <address className="min-w-0 not-italic">
            {[
              { title: 'Email comercial', value: 'comercial@trackflow.com', href: 'mailto:comercial@trackflow.com' },
              { title: 'Los Ángeles', value: '+1 213 555 0147', href: 'tel:+12135550147' },
              { title: 'Zaragoza', value: '+34 976 123 456', href: 'tel:+34976123456' },
            ].map((contact, index) => (
              <a key={contact.href} href={contact.href} className="group relative grid min-w-0 grid-cols-[24px_minmax(0,1fr)_32px] items-center gap-x-4 border-t border-white/15 py-5 outline-offset-4 before:absolute before:-top-px before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[#FD430B] before:transition-transform before:duration-[240ms] before:content-[''] hover:before:scale-x-100 focus-visible:outline-2 focus-visible:outline-[#ff9a73] focus-visible:before:scale-x-100 sm:grid-cols-[32px_minmax(0,1fr)_36px] sm:gap-x-5 sm:py-6 motion-reduce:before:transition-none">
                <span aria-hidden="true" className="self-start pt-1 font-[family-name:var(--font-display)] text-lg leading-tight text-[#FD430B] sm:text-xl">{String(index + 1).padStart(2, '0')}</span>
                <span className="min-w-0">
                  <span className="block font-[family-name:var(--font-display)] text-[26px] leading-tight font-medium text-white sm:text-[30px]">{contact.title}</span>
                  <span className="mt-2 block text-[13px] leading-relaxed text-[#bdbdbd] tabular-nums min-[380px]:text-sm">{contact.value}</span>
                </span>
                <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-[220ms] group-hover:border-[#FD430B] group-hover:bg-[#FD430B] group-hover:text-black group-focus-visible:border-[#FD430B] group-focus-visible:bg-[#FD430B] group-focus-visible:text-black sm:size-9 motion-reduce:transition-none">
                  <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="square" strokeLinejoin="miter"><path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" /></svg>
                </span>
              </a>
            ))}
          </address>
        </div>
      </section>
      <div className="relative isolate overflow-hidden pt-12 pb-8">
        <picture>
          <source media="(max-width: 760px)" srcSet="/footer-logistics-mobile-v1.webp" />
          <img className="absolute inset-0 -z-20 size-full object-cover object-bottom" src="/footer-logistics-v1.webp" width="1672" height="941"
            alt="Imagen ilustrativa generada con IA: camión naranja visto desde atrás saliendo de un almacén de noche, con un discreto símbolo en el remolque"
            loading="lazy" decoding="async" />
        </picture>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#000_0%,#000000e6_24%,#000000a6_46%,#00000026_76%,transparent_100%)] max-[760px]:bg-[linear-gradient(180deg,#000_0%,#000000eb_28%,#000000c7_46%,#00000033_76%,transparent_100%)]" />
        <div className={`${container} grid items-start gap-6 md:grid-cols-[1fr_2fr] md:gap-12`}>
          <a className="inline-flex min-h-11 w-fit items-center" href="#inicio" aria-label="TrackFlow, inicio">
            <img className="h-auto w-[164px] md:w-[210px]" src="/brand/trackflow-logo.svg" alt="" width="760" height="154" />
          </a>
          <nav aria-labelledby="footer-services-title">
            <h2 id="footer-services-title" className="mb-2 text-[11px] font-medium tracking-[.12em] text-[#a8a8a8] uppercase">Servicios</h2>
            <ul className="grid list-none grid-cols-2 gap-x-5 p-0 lg:grid-cols-3">
              <li><a className={footerLink} href="#almacenamiento">Gestión de almacenes</a></li>
              <li><a className={footerLink} href="#envios">Entregas de última milla</a></li>
              <li><a className={footerLink} href="#devoluciones">Logística inversa</a></li>
            </ul>
          </nav>
        </div>
        <div className={`${container} pt-20 md:pt-16`} aria-hidden="true">
          <img className="block h-auto w-full opacity-[.92]" src="/brand/trackflow-wordmark.svg" alt="" width="568" height="96" />
        </div>
        <div className={`${container} mt-6 flex flex-col items-start justify-between gap-2 border-t border-white/20 pt-4 text-xs text-white sm:flex-row sm:items-center`}>
          <p>© 2026 TrackFlow. Todos los derechos reservados.</p>
          <a className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline hover:decoration-[#FD430B]" href="https://linkedin.com/company/trackflow" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de TrackFlow (abre en una pestaña nueva)">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter

import SiteFooter from './components/SiteFooter'
import SectionHeading from './components/SectionHeading'
import SiteHeader from './components/SiteHeader'
import PresenceGlobe from './components/PresenceGlobe'
import ScrollWords from './components/ScrollWords'
import CarrierStrip from './components/CarrierStrip'
import ActionLink from './components/ActionLink'
import ServiceJourney from './components/ServiceJourney'
import FutureExplorer from './components/FutureExplorer'
import './App.css'

function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <SiteHeader />

      <main id="contenido" tabIndex={-1}>
        <section className="hero" id="inicio" aria-labelledby="inicio-titulo" tabIndex={-1}>
          <picture>
            <source media="(max-width: 520px)" srcSet="/hero-logistics-clean-mobile-v2.webp" />
            <img
              className="hero-scene"
              src="/hero-logistics-clean-v2.webp"
              alt="Imagen ilustrativa generada con IA: camión naranja de noche con el símbolo de TrackFlow y la rotulación Dos mercados. Una empresa. Los Ángeles / Zaragoza en el remolque"
              width="1672"
              height="941"
              fetchPriority="high"
            />
          </picture>
          <div className="hero-copy content-width">
            <h1 id="inicio-titulo">
              <span className="hero-title-line"><span>Tu logística.</span></span>{' '}
              <span className="hero-title-line"><span>De principio</span></span>{' '}
              <span className="hero-title-line hero-title-accent"><span>a fin.</span></span>
            </h1>
          </div>
          <div className="hero-editorial content-width">
            <div className="hero-summary">
              <p className="hero-description">
                <span className="text-bright">Almacenamos inventario,</span> preparamos pedidos, coordinamos envíos
                y gestionamos devoluciones para marcas de comercio electrónico.
              </p>
              <div className="hero-actions">
                <ActionLink className="button button-primary" href="#servicios" label="Explorar servicios" />
                <ActionLink className="button button-secondary" href="#operacion" label="Conoce nuestra operación" />
              </div>
            </div>
          </div>
          <div className="hero-bottom content-width">
            <a href="#servicios" aria-label="Descubre el recorrido"><span className="scroll-indicator" aria-hidden="true" /></a>
          </div>
        </section>

        <CarrierStrip />

        <section className="services-section section-pad" id="servicios" aria-labelledby="servicios-titulo" tabIndex={-1}>
          <div className="content-width">
            <ServiceJourney>
            <div className="section-intro">
              <SectionHeading
                id="servicios-titulo"
                eyebrow="LO QUE HACEMOS HOY"
                title="Cada pedido. Todo el recorrido."
              />
              <p>
                Una operación logística para acompañar <span className="text-bright">el recorrido completo</span>{' '}
                de los pedidos de e-commerce.
              </p>
            </div>

            </ServiceJourney>
          </div>
        </section>

        <section className="operations-section section-pad" id="operacion" aria-labelledby="operacion-titulo" tabIndex={-1}>
          <div className="content-width">
            <div className="section-intro operation-intro">
              <SectionHeading
                id="operacion-titulo"
                eyebrow="DOS MERCADOS · DOS ALMACENES"
                title="Presencia a ambos lados del Atlántico."
              />
              <p>
                Operaciones en <span className="text-bright">Estados Unidos y España,</span> con almacenes en
                Los Ángeles y Zaragoza.
              </p>
            </div>

            <div className="location-connection">
              <PresenceGlobe />
              <p className="connection-label"><span className="eyebrow-mark" aria-hidden="true" />PRESENCIA INTERNACIONAL</p>
              <p className="connection-caption">Dos orígenes.<br /><span>Una misma visión logística.</span></p>
              <div className="location-grid">
              <article className="location-card location-card-la" id="los-angeles" tabIndex={-1}>
                <div className="location-topline">
                  <span className="location-country">ESTADOS UNIDOS</span>
                  <span className="location-code" aria-hidden="true">US</span>
                </div>
                <div className="location-content">
                  <h3><ScrollWords text="Los Ángeles" /></h3>
                  <p>Almacén y operaciones en Estados Unidos.</p>
                </div>
              </article>
              <article className="location-card location-card-zaragoza" id="zaragoza" tabIndex={-1}>
                <div className="location-topline">
                  <span className="location-country">ESPAÑA</span>
                  <span className="location-code" aria-hidden="true">ES</span>
                </div>
                <div className="location-content">
                  <h3><ScrollWords text="Zaragoza" /></h3>
                  <p>Almacén y oficina tecnológica en España.</p>
                </div>
              </article>
              </div>
            </div>
          </div>
        </section>

        <section className="future-section section-pad" id="evolucion" aria-labelledby="evolucion-titulo" tabIndex={-1}>
          <div className="content-width">
            <div className="future-heading-row">
              <SectionHeading
                id="evolucion-titulo"
                eyebrow="LO QUE VIENE · NO DISPONIBLE TODAVÍA"
                title="Una operación más conectada."
              />
              <p>
                Capacidades previstas para <span className="text-bright">una evolución futura</span> de la
                plataforma logística de TrackFlow.
              </p>
            </div>

            <FutureExplorer />
            <p className="future-disclaimer">
              Estas capacidades están previstas y todavía no están disponibles.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}

export default App

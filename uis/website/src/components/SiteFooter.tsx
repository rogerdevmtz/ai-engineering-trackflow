function SiteFooter() {
  return (
    <footer className="site-footer">
      <picture>
        <source media="(max-width: 760px)" srcSet="/footer-logistics-mobile-v1.webp" />
        <img className="footer-scene" src="/footer-logistics-v1.webp" width="1672" height="941"
          alt="Imagen ilustrativa generada con IA: camión naranja visto desde atrás saliendo de un almacén de noche, con un discreto símbolo en el remolque"
          loading="lazy" decoding="async" />
      </picture>
      <div className="site-footer-inner content-width">
        <a className="footer-brand" href="#inicio" aria-label="TrackFlow, inicio">
          <img className="brand-logo" src="/brand/trackflow-logo.svg" alt="" width="760" height="154" />
        </a>
        <nav className="footer-services" aria-labelledby="footer-services-title">
          <h2 id="footer-services-title">Servicios</h2>
          <ul>
            <li><a href="#almacenamiento">Almacenamiento</a></li>
            <li><a href="#preparacion">Preparación de pedidos</a></li>
            <li><a href="#envios">Gestión de envíos</a></li>
            <li><a href="#devoluciones">Devoluciones</a></li>
          </ul>
        </nav>
        <nav className="footer-locations" aria-labelledby="footer-locations-title">
          <h2 id="footer-locations-title">Almacenes</h2>
          <ul>
            <li><a href="#los-angeles">Los Ángeles<span>Estados Unidos</span></a></li>
            <li><a href="#zaragoza">Zaragoza<span>España</span></a></li>
          </ul>
        </nav>
      </div>
      <div className="footer-wordmark content-width" aria-hidden="true">
        <img src="/brand/trackflow-wordmark.svg" alt="" width="568" height="96" />
      </div>
    </footer>
  )
}

export default SiteFooter

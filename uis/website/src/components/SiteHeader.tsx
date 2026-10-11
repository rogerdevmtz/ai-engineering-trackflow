import { useEffect, useRef, useState } from 'react'
import RollingLabel from './RollingLabel'
import ActionLink from './ActionLink'

const ctaLabel = 'Explorar servicios'

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isMenuOpen) navRef.current?.querySelector('a')?.focus()
  }, [isMenuOpen])

  function closeMenu() {
    setIsMenuOpen(false)
    if (window.matchMedia('(max-width: 760px)').matches) {
      menuButtonRef.current?.focus()
    }
  }

  return (
    <header
      className="site-header"
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsMenuOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isMenuOpen) {
          closeMenu()
        }
      }}
    >
      <div className="site-header-inner">
        <a className="brand" href="#inicio" aria-label="TrackFlow, inicio" onClick={() => setIsMenuOpen(false)}>
          <img className="brand-logo" src="/brand/trackflow-logo.svg" alt="" width="760" height="154" />
        </a>

        <nav
          className="primary-nav"
          id="primary-navigation"
          aria-label="Navegación principal"
          data-open={isMenuOpen}
          ref={navRef}
        >
          <ul>
            <li><a href="#servicios" aria-label="Servicios" onClick={() => setIsMenuOpen(false)}><RollingLabel text="Servicios" /></a></li>
            <li><a href="#operacion" aria-label="Operación" onClick={() => setIsMenuOpen(false)}><RollingLabel text="Operación" /></a></li>
            <li><a href="#evolucion" aria-label="Evolución" onClick={() => setIsMenuOpen(false)}><RollingLabel text="Evolución" /></a></li>
          </ul>
        </nav>

        <ActionLink className="header-cta" href="#servicios" label={ctaLabel} onClick={() => setIsMenuOpen(false)} />

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          ref={menuButtonRef}
        >
          <span className="menu-toggle-icon" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="menu-toggle-label">Menú</span>
        </button>
      </div>
    </header>
  )
}

export default SiteHeader

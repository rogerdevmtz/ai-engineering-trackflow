import { useEffect, useState, type ReactNode } from 'react'
import logo from '../../../website/public/brand/trackflow-logo.svg?url'
import mark from '../../../website/public/brand/trackflow-mark.svg?url'

import Icon, { type IconName } from './Icon'
const sections: { id: string; label: string; icon: IconName }[] = [
  { id: 'resumen', label: 'Resumen', icon: 'overview' },
  { id: 'pedidos', label: 'Pedidos', icon: 'orders' },
  { id: 'almacenes', label: 'Almacenes', icon: 'warehouse' },
]
export default function BackofficeLayout({ children, toolbar, heading }: { children: ReactNode; toolbar?: ReactNode; heading?: ReactNode }) {
  const [active, setActive] = useState('resumen')
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    const desktop = window.matchMedia('(min-width:761px)')
    let observer: IntersectionObserver
    function observeSections() {
      observer?.disconnect()
      const root = desktop.matches ? document.querySelector<HTMLElement>('.office-workspace') : null
      observer = new IntersectionObserver(entries => {
        if ((root ? root.scrollTop : window.scrollY) < 24) { setActive('resumen'); return }
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      }, { root, rootMargin: '-10% 0px -50% 0px' })
      sections.forEach(section => { const element = document.getElementById(section.id); if (element && (!root || root.contains(element))) observer.observe(element) })
    }
    observeSections()
    desktop.addEventListener('change', observeSections)
    return () => { observer.disconnect(); desktop.removeEventListener('change', observeSections) }
  }, [])
  return <div className="office-shell" data-nav-collapsed={collapsed}>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <aside className="office-sidebar">
      <div className="sidebar-brand-row">
        <a className="office-brand" href="#resumen" aria-label="TrackFlow, resumen de operaciones"><img className="brand-wordmark" src={logo} alt="TrackFlow" width="144" height="30" /><img className="brand-mark" src={mark} alt="" width="28" height="28" /></a>
        <button className="sidebar-toggle" type="button" aria-label={collapsed ? 'Expandir navegación' : 'Contraer navegación'} aria-expanded={!collapsed} aria-controls="office-navigation" onClick={() => setCollapsed(value => !value)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="3" /><path d="M9 5v14" /><path className="toggle-chevron" d="m15 9-3 3 3 3" /></svg>
        </button>
      </div>
      <nav id="office-navigation" aria-label="Secciones del backoffice">{sections.map(section => <a key={section.id} href={`#${section.id}`} aria-label={section.label} title={collapsed ? section.label : undefined} aria-current={active === section.id ? 'location' : undefined} onClick={() => {
        setActive(section.id)
        if (section.id === 'resumen' && window.matchMedia('(min-width:761px)').matches) document.querySelector('.office-workspace')?.scrollTo({ top:0, behavior:'instant' })
      }}><span className="nav-icon"><Icon name={section.icon} /></span><span className="nav-label">{section.label}</span></a>)}</nav>

    </aside>
    <div className="office-workspace">
      <header className="office-topbar"><div className="workspace-heading">{heading}</div><div className="topbar-tools">{toolbar}</div></header>
      <main id="contenido" tabIndex={-1}>{children}</main>
    </div>
  </div>
}

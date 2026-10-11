import RollingLabel from './RollingLabel'

type ActionLinkProps = {
  href: string
  label: string
  className?: string
  onClick?: () => void
}

function ActionLink({ href, label, className = '', onClick }: ActionLinkProps) {
  return (
    <a className={`action-link ${className}`} href={href} aria-label={label} onClick={onClick}>
      <RollingLabel text={label} />
      <span className="action-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16"><path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" /></svg>
      </span>
    </a>
  )
}

export default ActionLink

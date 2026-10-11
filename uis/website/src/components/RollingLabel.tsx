/** Decorative copies share one accessible name on the containing link. */
function RollingLabel({ text }: { text: string }) {
  return (
    <span className="rolling-label" aria-hidden="true">
      {Array.from(text).map((character, index) => (
        <span className="rolling-char" key={index}>
          <span style={{ transitionDelay: `${Math.min(index * 3, 48)}ms` }}>{character === ' ' ? '\u00a0' : character}</span>
          <span style={{ transitionDelay: `${Math.min(index * 3, 48)}ms` }}>{character === ' ' ? '\u00a0' : character}</span>
        </span>
      ))}
    </span>
  )
}

export default RollingLabel

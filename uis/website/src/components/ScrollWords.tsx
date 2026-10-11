import { Fragment, useEffect, useRef } from 'react'

/** All words remain in the DOM; scrolling changes emphasis, never layout or copy. */
function ScrollWords({ text }: { text: string }) {
  const root = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = root.current
    if (!element) return
    const words = element.querySelectorAll<HTMLElement>('.scroll-word')
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let active = false
    let progress = 1

    const paint = () => {
      frame = 0
      if (preference.matches) return
      const rect = element.getBoundingClientRect()
      // The reading window follows the heading's actual height on every viewport.
      progress = Math.min(1, Math.max(0, (innerHeight * .88 - rect.top) / (rect.height + innerHeight * .24)))
      for (let i = 0; i < words.length; i++) {
        const local = Math.min(1, Math.max(0, progress * (words.length + 1) - i))
        words[i].style.opacity = String(.42 + .58 * local)
      }
    }
    const schedule = () => {
      if (active && !frame && !preference.matches) frame = requestAnimationFrame(paint)
    }
    const reset = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      for (const word of words) word.style.removeProperty('opacity')
      if (!preference.matches) paint()
    }
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      if (active) schedule()
    }, { rootMargin: '80px 0px' })
    observer.observe(element)
    paint()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    preference.addEventListener('change', reset)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      preference.removeEventListener('change', reset)
    }
  }, [text])

  return (
    <span className="scroll-copy" ref={root}>
      {text.split(' ').map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          {index > 0 && ' '}<span className="scroll-word">{word}</span>
        </Fragment>
      ))}
    </span>
  )
}

export default ScrollWords

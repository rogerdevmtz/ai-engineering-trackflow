import ScrollWords from './ScrollWords'

type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: string
}

function SectionHeading({ id, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}><ScrollWords text={title} /></h2>
    </div>
  )
}

export default SectionHeading

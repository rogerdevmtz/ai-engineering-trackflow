export type IconName = 'overview' | 'orders' | 'warehouse' | 'search' | 'box' | 'truck' | 'return' | 'review'
const paths: Record<IconName, string> = {
  overview: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  orders: 'M7 3h10v4H7z M7 5H4v16h16V5h-3 M8 12h8 M8 16h5',
  warehouse: 'M3 21V8l9-5 9 5v13 M7 21V11h10v10 M7 15h10 M7 18h10',
  search: 'M20 20l-5-5 M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  box: 'M3 7l9-4 9 4v10l-9 4-9-4z M3 7l9 5 9-5 M12 12v9 M7 5l10 5',
  truck: 'M3 5h11v12H3z M14 9h4l3 4v4h-7 M8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0 M20 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
  return: 'M9 4L4 9l5 5 M4 9h10a6 6 0 0 1 0 12h-3',
  review: 'M7 3h10v4H7z M7 5H4v16h7 M17 5h3v6 M8 11h4 M8 15h2 M20 16a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M19 19l3 3',
}
export default function Icon({ name }: { name: IconName }) {
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>
}

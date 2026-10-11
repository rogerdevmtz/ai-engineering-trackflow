import type { IconName } from './components/Icon'
import type { Stage } from './data'

export const statusIcons: Record<Stage, IconName> = {
  'Preparación': 'box',
  'En tránsito': 'truck',
  'Revisión de devolución': 'review',
}

import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export { services, siteTitle, siteDescription } from './siteContent'

export function render() {
  return renderToString(<StrictMode><App /></StrictMode>)
}

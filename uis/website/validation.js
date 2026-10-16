const choices = {
  country: ['Estados Unidos', 'España', 'Ambos', 'Otro'],
  product: ['Moda', 'Electrónica', 'Cosmética', 'Alimentación', 'Otro'],
  volume: ['0-100', '101-500', '501-2000', '2000+', 'No estoy seguro'],
  services: ['Almacenaje', 'Última milla', 'Logística inversa'],
  provider: ['Sí', 'No', 'Estoy evaluando opciones'],
}

/** Shared by the actual form and the Node regression checks. Never transmits data. */
export function validateApplication(values) {
  const text = name => String(values[name] ?? '').trim()
  const errors = {}
  if (text('company').length < 2) errors.company = 'El nombre de la empresa debe tener al menos 2 caracteres'
  const names = text('contact').split(/\s+/)
  if (names.length < 2 || names.some(name => !/\p{L}/u.test(name))) errors.contact = 'Ingresa nombre y apellido del contacto'
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(text('email'))) errors.email = 'Ingresa un email corporativo válido (ejemplo: nombre@empresa.com)'
  const phone = text('phone')
  const digits = phone.replace(/\D/g, '')
  if (!/^\+[1-9][\d ()-]+$/.test(phone) || digits.length < 7 || digits.length > 15) errors.phone = 'El teléfono debe incluir código de país (ejemplo: +1 213 555 0147)'
  if (text('website')) {
    try {
      const url = new URL(text('website'))
      if (!/^https?:\/\//i.test(text('website')) || !['http:', 'https:'].includes(url.protocol) || !url.hostname) throw new Error('Invalid URL')
    } catch {
      errors.website = 'Si incluyes sitio web, debe ser una URL válida'
    }
  }
  if (!choices.country.includes(text('country'))) errors.country = 'Selecciona el país de operación principal'
  if (!choices.product.includes(text('product'))) errors.product = 'Selecciona el tipo de producto que manejas'
  if (!choices.volume.includes(text('volume'))) errors.volume = 'Selecciona el volumen mensual estimado'
  if (!Array.isArray(values.services) || !values.services.length || values.services.some(service => !choices.services.includes(service))) errors.services = 'Selecciona al menos un servicio de interés'
  if (!choices.provider.includes(text('provider'))) errors.provider = 'Indica si actualmente trabajas con otro proveedor logístico'
  const remaining = 500 - String(values.comments ?? '').length
  if (remaining < 0) errors.comments = `Los comentarios no pueden exceder 500 caracteres (quedan ${remaining})`
  if (values.privacy !== true) errors.privacy = 'Debes aceptar la política de privacidad para continuar'
  return errors
}

export function needsVolumeWarning(values) {
  return values.volume === '0-100' && choices.product.includes(values.product)
}

export const stepFields = [
  ['company', 'contact', 'email', 'phone', 'website'],
  ['country', 'product', 'volume', 'services', 'provider'],
  ['comments', 'privacy'],
]

export function validateStep(values, step) {
  const errors = validateApplication(values)
  return Object.fromEntries(Object.entries(errors).filter(([name]) => stepFields[step].includes(name)))
}

function setRollingLabel(element, text) {
  element.replaceChildren()
  element.setAttribute('aria-hidden', 'true')
  for (const [index, character] of Array.from(text).entries()) {
    const wrapper = document.createElement('span')
    wrapper.className = 'rolling-char'
    for (let copy = 0; copy < 2; copy++) {
      const letter = document.createElement('span')
      letter.textContent = character === ' ' ? '\u00a0' : character
      letter.style.transitionDelay = `${Math.min(index * 3, 48)}ms`
      wrapper.append(letter)
    }
    element.append(wrapper)
  }
}

function initializeForm(form) {
  const summary = document.getElementById('error-summary')
  const summaryTitle = document.getElementById('error-summary-title')
  const firstErrorLink = document.getElementById('first-error-link')
  const status = document.getElementById('form-status')
  const warning = document.getElementById('volume-warning')
  const confirmVolume = document.getElementById('confirm-volume')
  const success = document.getElementById('application-success')
  const fieldNames = stepFields.flat()
  const panels = Array.from(form.querySelectorAll('[data-step-panel]'))
  const stepButtons = Array.from(form.querySelectorAll('[data-step-target]'))
  const previous = document.getElementById('previous-step')
  const submit = document.getElementById('submit-application')
  const actions = form.querySelector('.application-actions')
  const mobile = window.matchMedia('(max-width: 639px)')
  const viewport = window.visualViewport
  let viewportWidth = window.innerWidth
  let closedViewportHeight = viewport?.height ?? window.innerHeight
  let keyboardOpen = false

  function updateKeyboard() {
    const height = viewport?.height ?? window.innerHeight
    const editing = document.activeElement?.matches('textarea, input:is([type="text"], [type="email"], [type="tel"], [type="url"], [type="search"], [type="number"], [type="password"])')
    if (Math.abs(window.innerWidth - viewportWidth) > 1) {
      viewportWidth = window.innerWidth
      closedViewportHeight = window.innerHeight
      keyboardOpen = false
    }
    if (!editing && !keyboardOpen) closedViewportHeight = Math.max(closedViewportHeight, height)
    const reduced = closedViewportHeight - height > 120
    const touchFallback = !viewport && window.matchMedia('(pointer: coarse)').matches && editing
    keyboardOpen = mobile.matches && ((reduced && (editing || keyboardOpen)) || touchFallback)
    form.toggleAttribute('data-keyboard-open', keyboardOpen)
  }

  form.addEventListener('focusin', updateKeyboard)
  form.addEventListener('focusout', updateKeyboard)
  window.addEventListener('resize', updateKeyboard)
  viewport?.addEventListener('resize', updateKeyboard)
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => {
      const height = Math.ceil(actions.getBoundingClientRect().height)
      if (height > 0) document.documentElement.style.setProperty('--application-actions-height', `${height}px`)
    }).observe(actions)
  }
  const touched = new Set()
  const attempted = new Set()
  let currentStep = 0
  let furthestStep = 0
  let volumeConfirmed = false
  let summarySignature = ''
  let editingReview = false
  let pointerInteraction = false
  let entrance

  form.addEventListener('pointerdown', () => { pointerInteraction = true })
  form.addEventListener('keydown', () => { pointerInteraction = false })

  function enterPanel(element, direction = 1) {
    entrance?.cancel()
    if (!pointerInteraction || !element.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    entrance = element.animate([
      { opacity: 0, transform: `translateX(${direction * 8}px)` },
      { opacity: 1, transform: 'translateX(0)' },
    ], { duration: 180, easing: getComputedStyle(document.documentElement).getPropertyValue('--ease-out').trim() })
  }

  function focusStep(heading, anchor) {
    heading.focus({ preventScroll: true })
    const bounds = anchor.getBoundingClientRect()
    if (bounds.top < 108 || bounds.bottom > window.innerHeight) anchor.scrollIntoView({ block: 'start' })
  }

  const controls = name => Array.from(form.querySelectorAll(`[name="${name}"]`))
  function readValues() {
    const data = new FormData(form)
    const values = { ...Object.fromEntries(data), services: data.getAll('services'), privacy: data.has('privacy') }
    // Native required represents the group only while no service is selected.
    // Selecting any service satisfies the requirement; Almacenaje is not mandatory.
    controls('services')[0].required = values.services.length === 0
    return values
  }

  function renderField(name, message = '') {
    document.getElementById(`${name}-error`).textContent = message
    if (name === 'services') document.getElementById('services-help').hidden = Boolean(message)
    for (const control of controls(name)) {
      if (message) control.setAttribute('aria-invalid', 'true')
      else control.removeAttribute('aria-invalid')
    }
  }

  function renderSummary(errors) {
    const signature = JSON.stringify(errors)
    if (signature === summarySignature) return
    summarySignature = signature
    const names = Object.keys(errors)
    summary.hidden = !names.length
    summaryTitle.textContent = names.length === 1 ? 'Revisa 1 campo para continuar' : `Revisa ${names.length} campos para continuar`
    if (names.length) firstErrorLink.href = `#${controls(names[0])[0].id}`
    else firstErrorLink.removeAttribute('href')
  }

  firstErrorLink.addEventListener('click', event => {
    event.preventDefault()
    const target = document.getElementById(firstErrorLink.hash.slice(1))
    target?.focus()
  })

  function updateVolumeWarning(values, changedName) {
    if (changedName === 'product' || changedName === 'volume') volumeConfirmed = false
    warning.hidden = !needsVolumeWarning(values)
    confirmVolume.setAttribute('aria-pressed', String(volumeConfirmed))
    confirmVolume.textContent = volumeConfirmed ? 'Volumen confirmado' : 'Continuar con este volumen'
  }

  function renderReview() {
    const values = readValues()
    document.getElementById('review-contact').textContent = [
      `${values.company} · ${values.contact}`,
      `${values.email} · ${values.phone}`,
      values.website,
    ].filter(Boolean).join('\n')
    document.getElementById('review-operation').textContent = [
      `${values.country} · ${values.product} · ${values.volume === 'No estoy seguro' ? 'Volumen por definir' : `${values.volume} envíos / mes`}`,
      values.services.join(', '),
      `Proveedor 3PL actual: ${values.provider}`,
    ].join('\n')
  }

  function showStep(step, focus = true) {
    const direction = step < currentStep ? -1 : 1
    currentStep = step
    if (step === 2) editingReview = false
    const values = readValues()
    for (const [index, panel] of panels.entries()) panel.hidden = index !== step
    for (const [index, button] of stepButtons.entries()) {
      button.disabled = index > furthestStep
      if (index === step) button.setAttribute('aria-current', 'step')
      else button.removeAttribute('aria-current')
      button.querySelector('.application-step-number').textContent = index < step && !Object.keys(validateStep(values, index)).length ? '✓' : `0${index + 1}`
    }
    previous.hidden = step === 0
    const label = step === 2 ? 'Enviar solicitud' : editingReview ? 'Guardar' : 'Continuar'
    submit.setAttribute('aria-label', editingReview ? 'Guardar cambios y volver al resumen' : label)
    setRollingLabel(document.getElementById('submit-label'), label)
    const heading = document.getElementById('step-heading-title')
    heading.textContent = document.getElementById(`step-title-${step}`).textContent
    renderSummary({})
    status.textContent = ''
    if (step === 2) renderReview()
    if (focus) {
      focusStep(heading, form.querySelector('[aria-label="Pasos de la solicitud"]'))
      enterPanel(panels[step], direction)
    }
  }

  function reportErrors(errors) {
    for (const name of stepFields[currentStep]) renderField(name, errors[name])
    renderSummary(errors)
    status.textContent = ''
    if (window.matchMedia('(max-width: 639px)').matches) controls(Object.keys(errors)[0])[0].focus()
    else summary.focus()
  }

  function confirmLowVolume(values) {
    if (!needsVolumeWarning(values) || volumeConfirmed) return true
    updateVolumeWarning(values)
    confirmVolume.focus()
    return false
  }

  function handleEdit(event) {
    const control = event.target
    const name = control.name
    if (!fieldNames.includes(name)) return
    const values = readValues()
    const errors = validateApplication(values)
    // Text fields validate on blur, then continuously; selections validate immediately.
    if (control.matches('select, [type="checkbox"], [type="radio"]')) touched.add(name)
    if (attempted.has(currentStep) || touched.has(name)) renderField(name, errors[name])
    if (attempted.has(currentStep)) renderSummary(validateStep(values, currentStep))
    if (name === 'comments') document.getElementById('comments-count').textContent = `${control.value.length} / 500 caracteres`
    updateVolumeWarning(values, name)
    status.textContent = ''
  }

  form.addEventListener('input', handleEdit)
  form.addEventListener('change', handleEdit)
  form.addEventListener('focusout', event => {
    const name = event.target.name
    if (!fieldNames.includes(name)) return
    if (event.target.closest('[data-step-panel]')?.hidden) return
    // Moving between controls in the same group does not announce an error prematurely.
    if (event.relatedTarget?.name === name) return
    touched.add(name)
    const message = validateApplication(readValues())[name]
    renderField(name, message)
  })

  confirmVolume.addEventListener('click', () => {
    volumeConfirmed = true
    updateVolumeWarning(readValues())
  })

  previous.addEventListener('click', () => showStep(currentStep - 1))
  for (const button of form.querySelectorAll('[data-edit-step]')) {
    button.addEventListener('click', () => {
      editingReview = true
      showStep(Number(button.dataset.editStep))
    })
  }
  for (const button of stepButtons) {
    button.addEventListener('click', () => {
      const target = Number(button.dataset.stepTarget)
      if (target === currentStep) return
      if (target > currentStep) {
        const values = readValues()
        for (let step = 0; step < target; step++) {
          const errors = validateStep(values, step)
          if (Object.keys(errors).length) {
            showStep(step)
            attempted.add(step)
            reportErrors(errors)
            return
          }
        }
        if (target === 2 && needsVolumeWarning(values) && !volumeConfirmed) {
          showStep(1)
          confirmLowVolume(values)
          return
        }
      }
      showStep(target)
    })
  }

  form.addEventListener('submit', event => {
    event.preventDefault()
    attempted.add(currentStep)
    const values = readValues()
    const errors = currentStep === 2 ? validateApplication(values) : validateStep(values, currentStep)
    if (Object.keys(errors).length) {
      const firstField = Object.keys(errors)[0]
      const firstStep = stepFields.findIndex(fields => fields.includes(firstField))
      if (firstStep !== currentStep) showStep(firstStep)
      attempted.add(currentStep)
      reportErrors(validateStep(values, currentStep))
      return
    }
    if (currentStep >= 1 && needsVolumeWarning(values) && !volumeConfirmed) {
      if (currentStep === 2) showStep(1)
      confirmLowVolume(values)
      return
    }
    if (currentStep < 2) {
      if (editingReview) {
        for (let step = 0; step < 2; step++) {
          const pending = validateStep(values, step)
          if (Object.keys(pending).length) {
            showStep(step)
            attempted.add(step)
            reportErrors(pending)
            return
          }
        }
        if (!confirmLowVolume(values)) {
          showStep(1)
          confirmVolume.focus()
          return
        }
        showStep(2)
        return
      }
      furthestStep = Math.max(furthestStep, currentStep + 1)
      showStep(currentStep + 1)
      return
    }
    form.hidden = true
    success.hidden = false
    focusStep(document.getElementById('success-title'), success)
    enterPanel(success)
  })

  form.addEventListener('reset', () => {
    touched.clear()
    attempted.clear()
    furthestStep = 0
    editingReview = false
    entrance?.cancel()
    volumeConfirmed = false
    for (const name of fieldNames) renderField(name)
    renderSummary({})
    warning.hidden = true
    confirmVolume.setAttribute('aria-pressed', 'false')
    confirmVolume.textContent = 'Continuar con este volumen'
    document.getElementById('comments-count').textContent = '0 / 500 caracteres'
    success.hidden = true
    form.hidden = false
    showStep(0, false)
    // The reset event runs before native values clear; keep the empty group required.
    controls('services')[0].required = true
    status.textContent = 'Formulario limpio. Puedes empezar de nuevo.'
    controls('company')[0].focus()
  })

  document.getElementById('new-application').addEventListener('click', () => form.reset())
  for (const label of document.querySelectorAll('[data-rolling-label]')) setRollingLabel(label, label.dataset.rollingLabel)
  showStep(0, false)
  submit.disabled = false
}

// Keep the module importable by Node tests; the browser runs exactly the same rules.
if (typeof document !== 'undefined') {
  const form = document.getElementById('application-form')
  if (form) initializeForm(form)
}

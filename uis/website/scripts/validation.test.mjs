import test from 'node:test'
import assert from 'node:assert/strict'
import { validateApplication, needsVolumeWarning, validateStep, stepFields } from '../validation.js'

const valid = {
  company: 'Marca Demo', contact: 'Ana García', email: 'ana@example.com', phone: '+34 976 123 456',
  website: '', country: 'España', product: 'Moda', volume: '101-500',
  services: ['Almacenaje'], provider: 'Estoy evaluando opciones', comments: '', privacy: true,
}

test('accepts a complete application with optional fields empty and multiple services', () => {
  assert.deepEqual(validateApplication(valid), {})
  assert.deepEqual(validateApplication({ ...valid, website: 'https://example.com/shop', services: ['Almacenaje', 'Última milla'], comments: 'a'.repeat(500) }), {})
})

test('empty application reports all ten mandatory field groups', () => {
  assert.deepEqual(Object.keys(validateApplication({})), ['company', 'contact', 'email', 'phone', 'country', 'product', 'volume', 'services', 'provider', 'privacy'])
})

test('rejects invalid data in every field without accepting whitespace or foreign options', () => {
  const invalid = {
    company: ' a ', contact: 'Ana', email: 'ana@', phone: '976 123 456', website: 'ftp://example.com',
    country: 'Francia', product: 'Inventado', volume: '5000', services: ['Tracking'],
    provider: 'Quizá', comments: 'x'.repeat(501), privacy: false,
  }
  assert.equal(Object.keys(validateApplication(invalid)).length, 12)
  assert.match(validateApplication(invalid).comments, /quedan -1/)
  assert.ok(validateApplication({ ...valid, company: '  ', contact: '   ' }).company)
  assert.ok(validateApplication({ ...valid, contact: 'Ana 123' }).contact)
})

test('accepts international contact formats and rejects malformed phone, email and URL', () => {
  assert.deepEqual(validateApplication({ ...valid, contact: 'María del Mar', phone: '+1 (213) 555-0147', website: 'http://example.com' }), {})
  for (const phone of ['+34 abcdefg', '+0 976123456', '+34', '+1234567890123456']) assert.ok(validateApplication({ ...valid, phone }).phone)
  for (const email of ['ana @example.com', 'ana@example..com', 'ana@@example.com', 'ana<@example.com', 'ana@-example.com']) assert.ok(validateApplication({ ...valid, email }).email)
  for (const website of ['example.com', 'javascript:alert(1)', 'https://', 'https:example.com']) assert.ok(validateApplication({ ...valid, website }).website)
})

test('requires a real service selection and boolean privacy acceptance', () => {
  for (const services of [[], 'Almacenaje', ['Almacenaje', 'otro']]) assert.ok(validateApplication({ ...valid, services }).services)
  assert.ok(validateApplication({ ...valid, privacy: 'false' }).privacy)
})

test('warns only for the lowest range with a selected product, including Otro', () => {
  assert.equal(needsVolumeWarning({ ...valid, volume: '0-100' }), true)
  assert.equal(needsVolumeWarning({ ...valid, volume: '0-100', product: 'Otro' }), true)
  assert.equal(needsVolumeWarning({ ...valid, volume: '0-100', product: '' }), false)
  assert.equal(needsVolumeWarning(valid), false)
})

test('each step validates its own fields without blocking on later steps', () => {
  assert.deepEqual(validateStep({ ...valid, privacy: false, country: '' }, 0), {})
  assert.deepEqual(Object.keys(validateStep({}, 0)), ['company', 'contact', 'email', 'phone'])
  assert.deepEqual(Object.keys(validateStep({}, 1)), ['country', 'product', 'volume', 'services', 'provider'])
  assert.deepEqual(Object.keys(validateStep({}, 2)), ['privacy'])
  assert.equal(new Set(stepFields.flat()).size, 12)
})

test('matches the specific error messages required by the official TrackFlow context', () => {
  assert.deepEqual(validateApplication({ website: 'ftp://example.com', comments: 'x'.repeat(501) }), {
    company: 'El nombre de la empresa debe tener al menos 2 caracteres',
    contact: 'Ingresa nombre y apellido del contacto',
    email: 'Ingresa un email corporativo válido (ejemplo: nombre@empresa.com)',
    phone: 'El teléfono debe incluir código de país (ejemplo: +1 213 555 0147)',
    website: 'Si incluyes sitio web, debe ser una URL válida',
    country: 'Selecciona el país de operación principal',
    product: 'Selecciona el tipo de producto que manejas',
    volume: 'Selecciona el volumen mensual estimado',
    services: 'Selecciona al menos un servicio de interés',
    provider: 'Indica si actualmente trabajas con otro proveedor logístico',
    comments: 'Los comentarios no pueden exceder 500 caracteres (quedan -1)',
    privacy: 'Debes aceptar la política de privacidad para continuar',
  })
})

test('accepts every domain option required by the official TrackFlow context', () => {
  const options = {
    country: ['Estados Unidos', 'España', 'Ambos', 'Otro'],
    product: ['Moda', 'Electrónica', 'Cosmética', 'Alimentación', 'Otro'],
    volume: ['0-100', '101-500', '501-2000', '2000+', 'No estoy seguro'],
    provider: ['Sí', 'No', 'Estoy evaluando opciones'],
    services: ['Almacenaje', 'Última milla', 'Logística inversa'],
  }
  for (const [field, values] of Object.entries(options)) {
    for (const value of values) {
      assert.deepEqual(validateApplication({ ...valid, [field]: field === 'services' ? [value] : value }), {}, `${field}: ${value}`)
    }
  }
})

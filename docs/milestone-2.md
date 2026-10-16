# Segundo hito — revisión actual de requisitos

Revisión local del 16/10/2026. El módulo oficial se titula «Hito — Sitio Web
Público de tu Empresa»; aquí es el segundo hito de trabajo tras la entrega de
infraestructura. Este documento sustituye el diagnóstico inicial, ya desactualizado.

## Fuentes contrastadas

- [Enunciado oficial completo](https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/projects/ai-eng-milestone-web-fundamentals/README.es.md): inicio, trabajo, evaluación y entrega.
- [Contexto oficial del formulario y landing de TrackFlow](https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/contexts/01-web-fundamentals/CONTEXT-trackflow.es.md): campos, opciones, mensajes, advertencia, éxito y Schema.org.
- CONTEXT.md local, instrucciones, memoria, código de ambas páginas y salida del build.

El campus devolvió una excepción de cliente en la revisión inicial. Se utilizó su
fuente oficial en GitHub, no una copia de terceros. No se cambió CONTEXT.md.
PR anterior #1 comprobada fusionada y cerrada en GitHub el 16/10/2026.
Esto no acredita la entrega de los cambios locales del segundo hito.

## Resultado

El formulario cumple el contrato funcional del contexto: 12 campos, opciones,
tipos, obligatoriedad, validación, mensajes, restricción de volumen, limpieza
y confirmación. Se comprobó su funcionamiento en navegador y con pruebas.
Esto no acredita una aprobación del docente ni conformidad completa de
accesibilidad/Tailwind del sitio. El hito completo todavía tiene pendientes.

El enunciado requiere simular el envío; no exige avisos visibles de «demo».
Su retirada fue una decisión expresa del estudiante y no se revierte.
No existe backend, persistencia, envío de emails ni una política legal real.

## Estado para cerrar la entrega — revisión posterior

**Todavía no está todo cerrado.** La base funcional local está implementada:
landing y formulario separado, 12 campos con validación, cobertura, cuatro
beneficios, contacto dentro del footer y Schema. Lint, 14 pruebas y build
correctos en esta revisión. Objetivo elevado por el estudiante a rendimiento
mínimo 95, conservando calidad visual y animaciones. Lighthouse CLI final:
landing 95 móvil / 100 escritorio; formulario 100 / 100; accesibilidad automática
100 en los cuatro perfiles y CLS 0. Tres mediciones consecutivas de landing
móvil dieron 95, con FCP 1,5 s y LCP 2,8 s.
Informes actuales fuera del repositorio: carpeta temporal
`trackflow-lighthouse-20261016`, archivos `target95-final-*.report.{json,html}`.

Revisados nuevamente enunciado y contexto oficiales completos, fuentes de
servicios/beneficios, estilos heredados y validación. Los tres archivos exigidos
están en `uis/website`; no se necesitan copias de relleno en la raíz. El build
contiene Organization y tres Service; ningún control con ID del formulario
carece de label asociado en la fuente HTML. Se ejecutaron build, lint y las
14 pruebas. La revisión posterior mobile-first repitió además el recorrido
completo del formulario en navegador móvil y escritorio.

| Pendiente real | Motivo / siguiente acción |
| --- | --- |
| Resolver contenido contradictorio | El módulo pide inventario en tiempo real, seguimiento unificado, carriers certificados e integración con ventas. El briefing local no los acredita como servicios actuales. Aclarar con estudiante/docente antes de anunciarlos. |
| Resolver beneficios literales | Exclusividad binacional y visibilidad total no acreditadas por briefing local; se usan afirmaciones prudentes. Cifra aproximada ~130 en vez de +130. |
| Accesibilidad fuera del alcance verificado | Revisión local de teclado, foco, ARIA, errores, movimiento reducido y colores forzados completada. Lector de pantalla real, contraste exhaustivo de imágenes y móvil físico pendientes. Carrusel sin pausa conserva la limitación WCAG 2.2.2 por decisión expresa. |
| Evidencia de evaluación | CLI local: 95 móvil / 100 escritorio. Falta ejecutar primero PageSpeed Insights sobre la URL pública de Codespaces y guardar las capturas. Solo si PageSpeed no alcanza Codespaces, usar Lighthouse de Chrome DevTools o su extensión. |
| Publicación y entrega | PR #1 integrada en main (f0d6d9c). Rama local codex/hito-2-web-publica creada desde main actualizado, conservando todos los cambios. Lint, 14 pruebas y build correctos. Segundo hito todavía sin commit/push ni sincronización con Codespaces. Pendientes subida revisada, URL pública y PR con captura. |

Tailwind: convencionales migrados; permanecen excepciones técnicas documentadas
para movimiento/gráficos/foco. Verificar su justificación si el docente exige
una interpretación más estricta; no hay una migración convencional abierta.
Copyright 2026 frente al 2025 del ejemplo es una adaptación al año actual,
registrada como diferencia menor. Segundo idioma opcional; backend y envío real
no son requisitos de este hito. CONTEXT.md permanece intacto.

Decisión de diseño ratificada por el estudiante: conservar el recorrido original
de servicios para mejorar el flujo de la web. No hay una tarea local abierta
para sustituirlo por columnas. La diferencia literal con «Servicios (3 columnas)»
se documentará en la entrega, sin atribuir aceptación al docente.

Revisión mobile-first local completada: hero, navegación, controles, transportistas,
cobertura e introducción/barra del formulario parten de móvil y amplían mediante
variantes min-width. Se conservan rangos técnicos de imagen/movimiento y poca altura.
Comparación de estilos calculados en siete anchos de landing y seis de formulario,
más recorridos por teclado/móvil; no se cambió la composición aprobada.
Medición anterior a optimizar la carga: landing 83/99 y formulario 94/99 (móvil/escritorio),
accesibilidad automática 100 en los cuatro perfiles. Informes temporales
`trackflow-lighthouse-20261016/mobile-first-{landing,form}-{mobile,desktop}`.
Build, lint y 14 pruebas correctos. Confirmación enlaza ahora su correo con mailto.

Optimización posterior: mismos WOFF2 servidos localmente con preload y OFL,
globo/canvas/geografía cargados al acercarse a cobertura, fotos de servicios
preparadas 400px antes de entrar con prioridad para la activa. Se mantiene la
última foto disponible hasta que cargue la siguiente y hay fallback sin JS.
No se han recomprimido ni redimensionado imágenes, ni cambiado tiempos de
animación. Preservados scroll reversible, fundidos, teclado y movimiento reducido.
Capturas locales de revisión: `lighthouse-cli-final-mobile-95.png` y
`lighthouse-cli-final-desktop-100.png` en la carpeta de visualizaciones de esta
sesión; no añadidas al repositorio como evidencias DevTools.

## Resolución propuesta de diferencias entre contextos

Comparación documental: el briefing general protegido describe la situación
operativa actual; el contexto web del módulo añade el contrato del formulario,
datos de contacto, Schema y contenido comercial. Son compatibles en parte,
pero no se puede garantizar cumplimiento literal de ambos mientras el módulo
presente como disponibles capacidades que el briefing mantiene pendientes.
No se declara que una fuente oficial esté equivocada ni que el docente haya
aceptado las adaptaciones. Las siguientes son propuestas, no cambios aprobados.

| Punto del módulo | Contraste con CONTEXT.md local | Redacción propuesta sin capacidades inventadas |
| --- | --- | --- |
| Inventario en tiempo real | Niega visibilidad global en tiempo real y describe dos SGA separados; no permite inferir disponibilidad global al cliente. | Gestión de inventario, almacenamiento, picking y packing en ambos almacenes. |
| Seguimiento unificado | Se consultan portales separados y el agregador figura como necesidad futura. | Nuestro equipo gestiona el seguimiento de envíos y las incidencias. |
| Carriers certificados | Identifica transportistas, sin documentar certificaciones concretas. No equivale a afirmar que carecen de ellas. | Red de transportistas en Estados Unidos y España; conservar los nombres contrastados. |
| Integración con plataforma de ventas | Describe ingesta manual por email e integraciones internas fragmentadas; no acredita esa integración comercial. | Gestión de devoluciones, inspección y decisiones de reacondicionamiento. |
| Exclusividad e infraestructura propia | Dos almacenes operados, sin evidencia de exclusividad en el mercado ni del régimen de propiedad. | Operación binacional, con almacenes en Los Ángeles y Zaragoza. |
| Tecnología para visibilidad total | Sí acredita equipo tecnológico, pero niega inventario global compartido. | Equipo tecnológico propio en Zaragoza que desarrolla y mantiene herramientas para la operación. |
| Más de 130 profesionales | Local indica unos 130; la introducción del propio módulo también es aproximada. | Unos 130 profesionales / ~130. |

El texto actual de la landing ya sigue, en esencia, estas formulaciones
prudentes. La integración con ventas y las certificaciones son afirmaciones
no acreditadas, no ausencias demostradas. Inventario global/seguimiento unificado
sí encuentran una contradicción expresa en el briefing. No recuperar una sección
de futuros ni disfrazar estas capacidades de actuales para cubrir palabras clave.

Datos complementarios del módulo compatibles y utilizables: sectores de clientes,
email y teléfonos del escenario, LinkedIn, alcance de cobertura, campos/opciones,
mensajes, restricción de volumen y Schema. Los servicios tradicionales, las sedes,
fundación y escala de empresa coinciden. La web no debe implementar inventario,
tracking ni integraciones reales para este hito; el envío del formulario es simulado.

Diferencias de presentación, separadas de las capacidades:

- Para seguir literalmente «Servicios (3 columnas)», adaptar esa sección a tres
  columnas en escritorio y apilar en móvil, conservando fotos, marca y Tailwind.
  Si se conserva el recorrido dinámico aprobado por el estudiante, confirmar la
  aceptación docente; no añadir una segunda copia redundante de los servicios.
- Contacto dentro del footer conserva los datos y el enlace al formulario
  separado; cumple el requisito general de footer con contacto. Mantener su ancla.
- Copyright 2026 es la actualización al año vigente del ejemplo 2025, sin efecto
  sobre capacidades. Segundo idioma sigue siendo opcional.
- El nombre del CEO es contradictorio dentro del propio CONTEXT.md (Thomas Harry
  y Daniel Espinoza); ya estaba registrado. No usarlo en página ni Schema hasta
  aclaración. No corregir el archivo protegido por cuenta propia.

Camino recomendado: conservar el contrato funcional del módulo y los hechos
compatibles, mantener estas sustituciones comerciales veraces, documentar las
excepciones en la entrega y pedir confirmación docente sobre el contenido en
conflicto. Una nota en la PR aporta trazabilidad; por sí sola no garantiza que
el docente acepte apartarse del texto solicitado. No se ha contactado a nadie.

Borrador de consulta, listo para que el estudiante lo revise y envíe si procede:

> El contexto general de TrackFlow describe inventario global y tracking
> unificado como pendientes, mientras el contexto web los presenta como
> servicios disponibles. ¿Podemos mantener los campos, validaciones, Schema y
> estructura del hito y sustituir esas promesas por descripciones del servicio
> actual, conservando CONTEXT.md sin cambios? También necesitamos confirmar si
> se acepta el recorrido dinámico de servicios frente a las tres columnas.

## Formulario: contraste campo por campo

| Campo oficial | Evidencia comprobada | Resultado |
| --- | --- | --- |
| Empresa | text, required, mínimo 2 tras trim; error específico | Cumple |
| Contacto | text, required, nombre y apellido; error específico | Cumple |
| Email corporativo | email, required, formato validado; sin bloquear dominios gratuitos arbitrariamente | Cumple |
| Teléfono | tel, required, prefijo + y código; formato internacional admitido | Cumple |
| Sitio web | url opcional; vacío permitido, http/https validados | Cumple |
| País | Select obligatorio con las cuatro opciones oficiales | Cumple |
| Producto | Select obligatorio con las cinco opciones oficiales | Cumple |
| Volumen | Select obligatorio con los cinco rangos/opciones oficiales | Cumple |
| Servicios | Tres checkboxes oficiales; cualquier selección individual o varias satisfacen el grupo | Cumple |
| Proveedor 3PL | Tres radios oficiales, grupo obligatorio | Cumple |
| Comentarios | Opcional, maxlength 500, contador; 501 rechazados por JS y 500 aceptados | Cumple |
| Privacidad | Checkbox required; envío bloqueado sin aceptar | Cumple |

Las 20 opciones de dominio están cubiertas en la prueba nueva. Las opciones
renderizadas también se contrastaron en DOM. Los 12 mensajes se comparan
exactamente en la suite, incluido el contador negativo cuando se supera el
máximo; el email del ejemplo se compara como texto visible, sin sintaxis Markdown.

## Matriz de los 60 criterios del enunciado

Estados: **Sí** = código/comprobación suficiente para ese punto funcional;
**Parcial** = hay base pero falta adaptación o verificación completa;
**Pendiente** = no terminado/evidenciado. La matriz no es una nota del docente.

### Trabajo: landing (15)

| ID | Criterio | Estado y evidencia |
| --- | --- | --- |
| L01 | index.html semántico | Sí: entrada Vite, prerender de componentes semánticos |
| L02 | Arranque npx compatible | Sí local: comando desde raíz documentado y ejecutado; Codespaces no se arrancó |
| L03 | Header y navegación | Sí: Inicio, Servicios, Cobertura y Contacto con destinos funcionales |
| L04 | Hero y propuesta de valor | Sí: titular y subtítulo completos del módulo, conservando diseño |
| L05 | Dos secciones adicionales | Sí: servicios, cobertura, beneficios y contacto; evolución retirada por decisión del estudiante |
| L06 | Footer con contacto | SiteFooter integra #contacto con email, ambos teléfonos y CTA; conserva derechos y LinkedIn |
| L07 | Enlace al formulario | Sí: CTA de header y hero; navegación real comprobada |
| L08 | Utilidades Tailwind | Estilos convencionales convertidos a utilidades/@apply; CSS técnico excepcional documentado |
| L09 | Responsive | Revisados 320/390/768/1440px y poca altura, sin overflow observado; otros motores/dispositivos pendientes |
| L10 | Mobile-first | Revisión local completada: base móvil y variantes min-width en landing y formulario; rangos técnicos de imagen/movimiento y poca altura documentados |
| L11 | Alt de imágenes | Sí: informativas descritas; decorativas con alt vacío |
| L12 | Etiquetas semánticas | Sí: header/nav/main/section/article/footer |
| L13 | ARIA apropiada | Parcial: existe, falta cierre de auditoría completa |
| L14 | Schema.org | Completado en build/preview: Organization del contexto y tres Service enlazados |
| L15 | URL pública Codespaces | Pendiente de autorización y preparación de entrega; nada publicado |

### Trabajo: formulario (15)

| ID | Criterio | Estado y evidencia |
| --- | --- | --- |
| F01 | application.html separado | Sí: archivo real y entrada de build |
| F02 | Campos del contexto | Sí: los 12 grupos contrastados |
| F03 | Tipos apropiados | Sí: text/email/tel/url/select/checkbox/radio/textarea |
| F04 | Labels asociados | Sí: no hay controles sin label for/id en DOM |
| F05 | Fieldset y legend | Sí: grupos de pasos, servicios y 3PL |
| F06 | Required | Sí: campos obligatorios y grupo de servicios gestionado con JS; reset lo restablece |
| F07 | Responsive | Sí en vistas revisadas 320/390/768/1440; ver límites de dispositivos abajo |
| F08 | Estilos Tailwind | Utilidades y @apply; excepciones técnicas de foco, gráficos, estados y normalización documentadas |
| F09 | Enviar y limpiar | Sí: acciones por pasos y reset secundario fuera de barra móvil |
| F10 | validation.js completo | Sí: reglas compartidas entre navegador y pruebas |
| F11 | Validación en vivo/blur | Sí: blur, edición tras tocar campo y selecciones inmediatas |
| F12 | Mensajes específicos | Sí: comparación exacta de los 12 mensajes |
| F13 | Errores visibles | Sí: mensaje local, borde, aria-invalid, resumen sin repetición |
| F14 | Bloquear envío inválido | Sí: por paso y validación completa antes de confirmar |
| F15 | Éxito simulado | Sí: texto oficial, sin red/almacenamiento; cierre centrado y reinicio |

### Evaluación (30)

| ID | Criterio | Estado y evidencia |
| --- | --- | --- |
| E01 | HTML semántico | Sí: L01/L12/F05 |
| E02 | Alt descriptivos | Sí: L11 |
| E03 | Labels correctos | Sí: F04 |
| E04 | Schema correcto/completo | Contrato comprobado con pruebas y JSON-LD servido; ver L14 |
| E05 | Jerarquía lógica | Revisada en DOM; confirmación corregida a h1, uno visible por estado; lector de pantalla pendiente |
| E06 | Responsive completo | Vistas principales revisadas tras ajustes, sin overflow; otros motores/dispositivos pendientes |
| E07 | Comando npx documentado | Sí local: README del website, desde raíz, sin instalar dependencias nuevas |
| E08 | Mobile-first | Completado y comprobado en local: L10 |
| E09 | Todos los estilos en utilidades | Convencionales migrados; CSS técnico imprescindible conservado y documentado |
| E10 | Breakpoints Tailwind | Presentes en HTML y @apply de estructura; media queries específicas conservadas |
| E11 | Sin CSS innecesario | Sin bloques convencionales pendientes; CSS técnico restante revisado y documentado en README |
| E12 | Coherencia profesional | Base existente y revisada; valoración visual final del docente |
| E13 | Rendimiento mínimo 80 | Superado también el objetivo 95 del estudiante: landing 95 móvil / 100 escritorio (móvil repetido tres veces), formulario 100 / 100. Evidencia pública/formato DevTools pendientes |
| E14 | Teclado en todos los controles | Salto, menú/Escape, servicios, pestañas de beneficios y recorrido de formulario comprobados; sin certificación exhaustiva |
| E15 | ARIA accesible | Parcial: asociaciones sin referencias rotas; lector de pantalla pendiente |
| E16 | Contraste mínimo | Borde de campos corregido a 3,12:1 y placeholder 5,37:1; auditoría completa de imágenes pendiente |
| E17 | Navegación predecible | Menú, foco, destinos, pasos, reinicio y regreso comprobados |
| E18 | Anuncios de error | Implementados con aria-live/aria-describedby; lector de pantalla real pendiente |
| E19 | Todos los campos presentes | Sí: F02 |
| E20 | Tipos de campo | Sí: F03 |
| E21 | Validar todos los campos | Sí: F10/F14 |
| E22 | Mensajes útiles | Sí: F12/F13 |
| E23 | Bloquear datos incorrectos | Sí: F14 |
| E24 | Foco/error/éxito claros | Sí en el formulario y vistas revisadas |
| E25 | Limpiar funciona | Sí: valores, grupos, errores, contador, advertencia, éxito y progreso se reinician |
| E26 | Landing fiel al sector | Sí en actividad/mercados; adaptación al contenido exacto del módulo pendiente |
| E27 | Experiencia y ventajas | Cuatro beneficios en pestañas accesibles y visuales propios con Tailwind; textos de exclusividad/visibilidad pendientes de aclaración |
| E28 | Campos exactos del contexto | Sí: F02 y opciones contrastadas |
| E29 | Restricción de dominio | Sí: 0-100 y producto seleccionado, incluido Otro; confirmación revocada al cambiar selección |
| E30 | Tono de empresa establecida | Base coherente; resolver discrepancias de capacidades y completar contenido |

## Diferencias concretas que faltan en la landing

1. Navegación adaptada en local: Inicio, Servicios, Cobertura y Contacto.
   Cobertura conserva `#operacion`; Contacto lleva a su sección con email/teléfonos. CTA funcional.
2. Hero adaptado en local: titular/subtítulo completos del contexto del módulo.
3. Servicios: tres servicios implementados en local, con picking/packing dentro
   de gestión de almacenes y enlaces del footer actualizados. Por petición de
   conservar diseño se mantiene el recorrido visual, no las tres columnas
   estáticas del enunciado. Siguen pendientes de aclaración inventario en tiempo
   real, seguimiento unificado, carriers certificados e integración con ventas:
   el briefing local no acredita esas capacidades como actuales.
4. Cobertura completada en local: Los Ángeles, cobertura nacional y UPS/FedEx/DHL;
   Zaragoza, cobertura peninsular e islas y MRW/SEUR/DHL. Dos columnas en escritorio
   y sedes apiladas en móvil, conservando el globo y las anclas.
5. Beneficios: sección implementada en local con cuatro ventajas y diseño
   responsive. «Unos 130» respeta la cifra aproximada del briefing; operación
   binacional sin exclusividad y tecnología propia como equipo/herramientas,
   sin anunciar visibilidad total del inventario. Estas diferencias respecto
   al texto literal del módulo siguen pendientes de aclaración.
6. Contacto integrado al inicio del footer en local: email y teléfonos del
   escenario, CTA al formulario separado y ancla #contacto. El pie conserva
   LinkedIn, derechos y foto/firma; se retiran lista de sedes repetida y autoenlace.
   Layout compacto en Tailwind. Copyright 2026, coherente con el año
   actual y el formulario; el ejemplo del módulo indica 2025.
7. Schema.org completado en local: foundingDate, address con regiones,
   contactPoint, sameAs y URL empresarial del escenario. Se conservan países,
   sedes y tres servicios relacionados. URL empresarial separada de la canonical
   del despliegue; preview continúa noindex sin canonical/sitemap ficticios.
8. Tailwind: estilos convencionales restantes de acciones, transportistas,
   tipografía y formulario convertidos a utilidades/@apply; explorador retirado.
   README documenta excepciones de gráficos, cristal, movimiento, foco,
   normalización y compatibilidad. Medidas/colores/tipografías muestreados
   conservados en comparación de estilos calculados y revisión visual.
   Accesibilidad: revisión DOM/teclado y correcciones realizadas; carrusel sin
   pausa conservado por decisión expresa, sin certificar conformidad completa.

El módulo presenta capacidades tecnológicas y exclusividad que el briefing local
no acredita como actuales. Mantener esas discrepancias explícitas y resolver
con estudiante/docente antes de anunciarlas como hechos. El contenido del
CONTEXT.md protegido no se sustituye ni modifica como parte de esta revisión.

## Evidencias y límites de esta revisión

- Lint, 14/14 pruebas y build correctos; nueve pruebas de formulario y cinco SEO.
- Mensajes exactos y todas las opciones del contexto cubiertos por pruebas.
- DOM del formulario: 12 grupos, labels presentes, fieldsets con legend y sin
  referencias aria-describedby rotas. Required y tipos revisados en código/DOM.
- Navegador: contacto vacío/incorrecto/corregido, campos opcionales vacíos,
  operación incompleta, cualquier servicio, aviso de volumen y revocación,
  comentarios 501/500, privacidad, éxito y limpieza completa.
- Recorrido móvil con edición y datos conservados; estados finales a 320/768px,
  formulario a 390/1440px y arranque de desarrollo npx comprobado en navegador.
- Landing leída en navegador: CTA funcional, contenido y JSON-LD contrastados.
- Sin errores de consola observados. Capturas exploratorias anteriores no son
  evidencia de Lighthouse ni acreditan por sí solas contraste o WCAG completo.
- Pendientes lector de pantalla, contraste completo, teclado virtual/área segura
  en móvil físico y otros motores. Carrusel móvil sin pausa conserva la limitación
  WCAG 2.2.2 ya documentada; no se certifica accesibilidad completa.
- Lighthouse CLI 13.5.0, Chrome headless 155, 16/10/2026, build servido en
  `http://127.0.0.1:4173/`: landing 83 móvil / 99 escritorio; formulario
  `/application.html` 94 móvil / 98 escritorio. Configuración estándar móvil
  (412×823, red y CPU simuladas ×4) y preset desktop; caché reiniciada,
  sin bloquear recursos ni desactivar animaciones para la auditoría.
  Landing antes de optimizar: 66 / 91. LCP móvil de landing: 11,1 → 4,1 s;
  CLS 0. Informes HTML/JSON fuera del repositorio, en
  `C:/Users/roger/AppData/Local/Temp/trackflow-lighthouse-20261016`.
  Se comprimen los dos hero y tres servicios existentes, conservando dimensiones.
  Estas mediciones locales no sustituyen la captura pública exigida para entregar.
  Tras retirar evolución y su código exclusivo, nueva medición de landing
  mantiene 83 móvil / 99 escritorio, LCP 4,0 / 0,8 s y CLS 0 en ambos perfiles.
  Con el nuevo panel de beneficios en Tailwind, medición repetida: 83 móvil /
  99 escritorio, LCP 4,1 / 0,8 s y CLS 0. Informes benefits-tabs-final-mobile/
  desktop fuera del repositorio; no sustituyen la evidencia pública de entrega.

## Entrega que sigue pendiente

- Con aprobación del estudiante, publicar el código de este hito mediante PR.
- Preparar URL pública de Codespaces y ejecutar primero PageSpeed Insights.
  Si no puede acceder, utilizar Lighthouse de Chrome DevTools o su extensión.
  Guardar captura con mínimo 80 según el hito; objetivo del estudiante: 95.
  No existe todavía esa evidencia pública.
- Incluir URL/captura en la descripción y entregar la URL del repositorio.
- Tras aprobación del PR, realizar el merge requerido por el procedimiento docente.
- Mantener index.html, application.html y validation.js reales dentro de
  uis/website, de acuerdo con el monorepositorio. CONTEXT.md permanece intacto.
- Incorporar solo recursos usados y evidencias seleccionadas: no subir capturas
  exploratorias, PNG originales, dist, node_modules, caches ni archivos ajenos.

Nada se subió, publicó, comiteó ni sincronizó con Codespaces durante la revisión.

## Orden recomendado para cerrar el hito

1. Aclarar las discrepancias de servicios y beneficios entre contextos.
2. Schema completado en local; conservar su contrato durante los ajustes restantes.
3. Tailwind convencional convertido; mantener las excepciones técnicas y completar
   las comprobaciones de accesibilidad pendientes respetando decisiones del estudiante.
4. Rendimiento local ≥80 verificado; repetir sobre la URL pública autorizada
   y preparar las evidencias seleccionadas de evaluación.
5. Tras revisión y autorización, preparar PR, Codespaces público y entrega.

## Preparación de rama — 16/10/2026

Por autorización expresa, se integraron únicamente los dos commits de la entrega
anterior en main mediante avance directo a f0d6d9c. GitHub confirma PR #1
fusionada y cerrada. La rama codex/hito-2-web-publica parte de ese mismo commit;
los cambios del segundo hito se conservaron sin commit ni push.

Revisión de nuevos archivos: formulario y validation.js conectados por Vite;
dos imágenes referenciadas por picture; BenefitsShowcase importado por App;
pruebas incluidas en pnpm test; dos WOFF2 precargados y usados en @font-face,
con sus licencias OFL; regla enlazada en AGENTS y diagnóstico de entrega vigente.
No hay referencias de código a FutureExplorer ni service-packing retirados.
Dist y node_modules están ignorados; informes y capturas exploratorias quedan
fuera del repositorio. CONTEXT.md y demás archivos protegidos intactos.

Esta tarea repitió lint, las 14 pruebas y build correctamente. No repitió la
revisión visual ni Lighthouse: se conservan sus resultados anteriores fechados.

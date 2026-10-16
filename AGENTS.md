# Instrucciones para el agente de desarrollo

## Inicio de cada sesión

Antes de proponer o realizar cambios, leer:

1. memory-bank/projectbrief.md
2. memory-bank/techContext.md
3. memory-bank/progress.md

Consultar CONTEXT.md para verificar información de TrackFlow
y los README relevantes para la tarea.

Si falta información, no inventar decisiones ni presentar
funcionalidades futuras como implementadas.

Leer y aplicar .agents/rules/company-content.md en cada sesión.
Su alcance es siempre, según lo definido en la propia regla.

Para trabajo de interfaz, aplicar `.agents/rules/visual-identity.md`
y consultar `uis/STYLE_GUIDE.md`, que documenta la identidad y el
comportamiento actuales aprobados de la web.

## Forma de colaboración

Explicar con claridad qué vamos haciendo y el propósito de cada cambio.
No crear copias de respaldo.

Realizar únicamente el trabajo correspondiente a la tarea actual.

Trabajar y revisar en local. No hacer commit, push ni sincronizar cambios
con Codespaces hasta que el estudiante apruebe los cambios y autorice su subida.

Aplicar siempre `.agents/rules/repository-hygiene.md`: incorporar únicamente
archivos necesarios y con uso comprobado. Esta misma regla debe mantenerse
al sincronizar el repositorio entre local y Codespaces, tras la aprobación.

## Estructura del proyecto

- Web corporativa en uis/website.
- Backoffice en uis/backoffice.
- Backend, si se necesita, en services.
- Memoria del proyecto en memory-bank.
- Reglas del agente de desarrollo en .agents/rules.
- Skills del agente de desarrollo en .agents/skills.

Consultar los README antes de crear carpetas o aplicaciones.
Evitar duplicaciones y dependencias innecesarias.

## Mantenimiento de la memoria

Actualizar los archivos cuando cambie su información:

- projectbrief.md: objetivos y alcance.
- techContext.md: stack, arquitectura, restricciones y comandos.
- progress.md: trabajo completado, pendientes y próximo paso.

No marcar tareas como terminadas sin verificar su resultado.
Distinguir entre comprobaciones realizadas y pendientes.

## Procedimiento obligatorio antes de cada commit

Seguir estos pasos en orden:

1. Revisar git status y git diff para identificar los cambios,
   comprobar su alcance y detectar archivos no relacionados.

2. Ejecutar las comprobaciones pertinentes al cambio.
   Para código, utilizar los comandos disponibles de lint,
   pruebas o compilación según corresponda. Para documentación,
   revisar contenido, rutas y coherencia. Si una comprobación
   no puede ejecutarse, registrar el motivo.

3. Si se han modificado las aplicaciones, comprobar su arranque
   y revisar las pantallas afectadas. Verificar que el contenido
   corresponde a TrackFlow y que los datos de demostración
   están identificados.

4. Actualizar memory-bank con las decisiones, los resultados
   comprobados y las tareas pendientes.

5. Revisar el diff final, incluidos los archivos nuevos,
   y ejecutar git diff --check. Comprobar que no se incluyen
   secretos, dependencias instaladas ni archivos generados
   innecesarios. Justificar el uso de cada archivo añadido según
   `.agents/rules/repository-hygiene.md` y excluir los que no se utilicen.

6. Preparar únicamente los archivos de la tarea, revisar
   git diff --cached y realizar el commit con un mensaje
   que describa el cambio, cuando el usuario lo haya solicitado
   o autorizado.

No ignorar fallos de las comprobaciones ni afirmar que pasaron
si no se ejecutaron.

## Archivos y carpetas protegidos

No modificar, eliminar ni renombrar los siguientes elementos
sin confirmación explícita del desarrollador para ese cambio:

- CONTEXT.md: briefing oficial de la empresa.
- company-choice.md: entrega de elección de empresa.
- .devcontainer/: configuración del entorno de desarrollo.

Si una tarea requiere cambiar alguno de estos elementos,
explicar el cambio necesario y solicitar confirmación antes
de ejecutarlo.

## Información y credenciales

No guardar credenciales ni secretos en el repositorio.

Verificar las afirmaciones sobre la empresa con CONTEXT.md.
Si se encuentra una contradicción, registrarla como pendiente
de aclaración.

## Skill de mantenimiento de memoria

Al cerrar una tarea o registrar una decisión que afecte a la memoria,
consultar y aplicar .agents/skills/update-project-memory/SKILL.md.

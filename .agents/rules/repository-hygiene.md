# Archivos necesarios y revisión antes de subir

## Alcance

Siempre: al crear archivos, preparar entregas, hacer commits o sincronizar
este repositorio en local, Codespaces o cualquier otro entorno.

## Regla

- Añadir solo archivos necesarios para la tarea y con uso comprobable:
  importación, enlace, configuración activa, comando de prueba documentado,
  documentación vigente o evidencia solicitada para la entrega.
- No incorporar recursos sin referencias, variantes descartadas, copias,
  respaldos, descargas originales innecesarias, scripts temporales, informes
  de herramientas ni capturas exploratorias. Guardar los temporales fuera
  del repositorio; las evidencias de entrega deben ser las seleccionadas.
- No subir dependencias instaladas, builds, caches, logs ni secretos.
  `.gitignore` ayuda a excluir generados; no demuestra que un archivo sea útil.
- No crear archivos de relleno para cumplir un nombre exigido: deben estar
  conectados al flujo real y comprobarse en desarrollo y build cuando proceda.
- No borrar la plantilla, archivos ajenos ni trabajo del estudiante solo
  porque no tengan importaciones: documentación, configuración y pruebas
  pueden tener usos distintos. Limitar la limpieza al alcance autorizado.

## Comprobación obligatoria

1. Revisar `git status --short`, el diff y cada archivo nuevo sin seguimiento.
2. Para cada archivo añadido, identificar quién lo usa y comprobar su ruta,
   importación, enlace o comando. Si no hay uso justificado, no incluirlo.
3. Revisar recursos y dependencias añadidos, sin duplicar los ya existentes.
4. Ejecutar las comprobaciones pertinentes y `git diff --check`.
5. Tras la aprobación del estudiante para subir: preparar rutas explícitas
   (sin `git add .` ni `git add -A`), revisar `git diff --cached --name-status`
   y `git diff --cached`, y confirmar que la lista coincide con lo aprobado.
6. Mantener esta regla y AGENTS.md coherentes en ambos entornos mediante la
   sincronización aprobada. No editar ni publicar remotamente por anticipado.

Los cambios permanecen en local hasta la aprobación y autorización de subida.

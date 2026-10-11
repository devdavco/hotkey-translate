# Pruebas manuales

Lista de comprobación antes de publicar una versión. Usa Chrome 116 o superior.

## Instalación

- [ ] Cargar sin empaquetar: en `chrome://extensions`, con el modo desarrollador activado, "Cargar descomprimida" y elegir la carpeta del repo. La extensión carga sin errores y aparece el icono.
- [ ] En "Inspeccionar vistas: service worker" la consola no muestra errores al cargar.

## Atajos

- [ ] `Ctrl+Shift+1` (`Command+Shift+1` en Mac) con texto seleccionado: se abre Google Translate en una pestaña nueva con el texto y los idiomas configurados, y aparece el aviso en la página.
- [ ] `Ctrl+Shift+2` (`Command+Shift+2` en Mac) con texto seleccionado: se oye la pronunciación sin que se abra ninguna pestaña.
- [ ] Respaldo de audio: con el audio de Google bloqueado (por ejemplo, en DevTools del offscreen document, "Network request blocking" con `translate_tts`), `Ctrl+Shift+2` usa la voz del sistema.
- [ ] Sin texto seleccionado: cada atajo muestra el aviso "No hay texto seleccionado" / "No text selected" y no hace nada más.
- [ ] Texto seleccionado dentro de un `<input>` y de un `<textarea>`: ambos atajos usan solo la parte seleccionada.
- [ ] Página `chrome://extensions`, Chrome Web Store y página de nueva pestaña: aparece "!" en el icono, desaparece a los 2 segundos y la consola del service worker no muestra errores sin capturar.
- [ ] Texto largo (más de 200 caracteres): el audio se reproduce y el aviso dice que el texto se recortó a 200 caracteres.
- [ ] Detener durante la reproducción: pulsar `Ctrl+Shift+2` mientras suena el audio lo detiene y aparece "Audio detenido" / "Audio stopped". Probarlo con la voz de Google y con la voz del sistema (respaldo).
- [ ] Detener sin selección: mientras suena el audio, quitar la selección y pulsar `Ctrl+Shift+2`. El audio se detiene igual y no aparece "No hay texto seleccionado".
- [ ] Pulsar cuando el audio ya terminó: `Ctrl+Shift+2` funciona como siempre (reproduce de nuevo si hay texto seleccionado o muestra "No hay texto seleccionado").

## Popup

- [ ] Idioma automático: con origen "Detectar automáticamente", la traducción abre Google Translate con `sl=auto` y el idioma se detecta bien.
- [ ] Cada select se guarda al cambiarlo (aparece "Guardado"), y al cerrar y abrir el popup se mantiene.
- [ ] Intercambio de idiomas: el botón invierte origen y destino y lo guarda. Está deshabilitado cuando el origen es "Detectar automáticamente".
- [ ] Cambio de atajos: el enlace "Cambiar atajos" abre `chrome://extensions/shortcuts`. Tras asignar otra combinación, el popup muestra la nueva y la combinación funciona. Si se quita un atajo, aparece "Sin asignar" / "Not set".

## Idioma y apariencia

- [ ] Interfaz en inglés: con Chrome en inglés, el nombre, el popup, los nombres de idiomas, los avisos y las descripciones de los atajos están en inglés.
- [ ] Interfaz en español: igual, con Chrome en español (o iniciando Chrome con `--lang=es`).
- [ ] Modo oscuro: con el tema oscuro del sistema, el popup usa colores oscuros y todo se lee bien.

## Limitación conocida

- [ ] Texto seleccionado dentro de un iframe (por ejemplo, un editor incrustado): no se detecta y aparece "No hay texto seleccionado". Es lo esperado: el script se inyecta solo en la página principal, y leer iframes de otros orígenes exigiría permisos de host, que evitamos al usar solo `activeTab`.

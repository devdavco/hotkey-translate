# Hotkey Translate

> Una extensión ligera para traducir texto seleccionado y escuchar pronunciación directamente en tu navegador.

## 📖 Descripción
<div align="center">
<img width="640" height="400" alt="Screenshot 2026-05-28 at 10 31 00" src="https://github.com/user-attachments/assets/2e4f3c85-752c-4a98-9534-38b97653548c" />
</div>
**Hotkey Translate** es una extensión de navegador diseñada para Vivaldi, Chrome, Edge y Opera. Permite traducir cualquier texto seleccionado con un atajo de teclado, abriendo automáticamente Google Translate en una nueva pestaña. También incluye una función para escuchar la pronunciación del texto seleccionado sin salir de la página.

### ✨ Características

- **Traducción Instantánea:** Abre Google Translate con el texto seleccionado en una nueva pestaña.
- **Audio TTS:** Escucha la pronunciación del texto seleccionado. Pulsa el atajo otra vez para detenerla.
- **Atajos de Teclado:** Configurables para un flujo de trabajo rápido.
- **Multi-idioma:** Soporte para múltiples idiomas de origen y destino.
- **Configuración Persistente:** Guarda tus preferencias de idioma automáticamente.
- **Privacidad:** Solo guarda tus preferencias de idioma (`chrome.storage.sync`); el texto seleccionado se envía a Google únicamente cuando usas un atajo.

---

## 📋 Requisitos

- **Navegador:** Chrome 116 o superior (también otros basados en Chromium, como Edge, Opera o Vivaldi).
- **Soporte:** Manifest V3.
- **Internet:** Conexión activa requerida para acceder a Google Translate.

---

## 📥 Instalación

### 1. Descargar el Código

Clona este repositorio o descarga el archivo ZIP y extrae la carpeta.

```bash
git clone https://github.com/devdavco/simple-translate.git
cd simple-translate
```

### 2. Cargar en el Navegador

1. Abre Chrome y navega a `chrome://extensions`.
2. Activa el interruptor **"Modo desarrollador"** (Developer mode) en la esquina superior derecha.
3. Haz clic en el botón **"Cargar sin firmar"** (Load unpacked).
4. Selecciona la carpeta `simple-translate` que acabas de descargar.
5. ¡Listo! El icono de la extensión aparecerá en tu barra de herramientas.


## 🎮 Uso

### Atajos de Teclado (Por Defecto)

| Acción | Windows / Linux | macOS |
| :--- | :--- | :--- |
| **Traducir Selección** | `Ctrl` + `Shift` + `1` | `Cmd` + `Shift` + `1` |
| **Escuchar Audio** | `Ctrl` + `Shift` + `2` | `Cmd` + `Shift` + `2` |

> **Detener el audio:** Si pulsas el atajo de audio mientras suena una pronunciación, se detiene (aunque ya no haya texto seleccionado).

> **Nota:** Si los atajos no funcionan, ve a `chrome://extensions/shortcuts` y reasigna las combinaciones manualmente.

### Configurar Idiomas

1. Haz clic en el **icono de la extensión** en la barra de herramientas.
2. Selecciona tus idiomas preferidos en el menú desplegable:
   - **Origen:** Idioma del texto seleccionado.
   - **Destino:** Idioma al que quieres traducir.
   - **Audio:** Voz para la pronunciación.
3. Los cambios se guardan automáticamente. El botón de intercambio invierte origen y destino.

## 📁 Estructura del Proyecto

```text
simple-translate/
├── manifest.json          # Configuración principal (Manifest V3)
├── background.js          # Service Worker (atajos, selección, toasts y audio)
├── settings.js            # Valores por defecto de los idiomas
├── offscreen.html/.js     # Documento oculto que reproduce el audio
├── popup.html             # Interfaz de configuración (Popup)
├── popup.js               # Lógica del popup
├── _locales/              # Textos en inglés y español
├── TESTING.md             # Pruebas manuales
└── README.md              # Documentación
```

## 🔐 Permisos

| Permiso | Para qué se usa |
| :--- | :--- |
| `activeTab` | Acceso temporal solo a la pestaña activa, y solo cuando pulsas un atajo. Sustituye al acceso a todas las webs (`<all_urls>`). |
| `scripting` | Leer el texto seleccionado y mostrar el aviso (toast) en esa pestaña con `chrome.scripting.executeScript`. |
| `storage` | Guardar tus preferencias de idioma y sincronizarlas entre dispositivos. |
| `offscreen` | Crear un documento oculto que reproduce el audio de Google Translate sin abrir pestañas. |
| `tts` | Voz del sistema como respaldo si el audio de Google no se puede reproducir. |

## 🔧 Personalización

### Cambiar Atajos de Teclado

1. Navega a `chrome://extensions/shortcuts`.
2. Busca "Hotkey Translate".
3. Haz clic en el campo del atajo y presiona la nueva combinación deseada.

### Modificar Idiomas por Defecto

Edita el archivo `settings.js` y modifica el objeto `DEFAULT_SETTINGS`:

```javascript
export const DEFAULT_SETTINGS = {
  sourceLang: 'en',      // Idioma origen por defecto
  targetLang: 'es',      // Idioma destino por defecto
  ttsLang: 'en-US'       // Idioma de audio por defecto
};
```

### Agregar Más Idiomas

Abre `popup.html` y agrega nuevas opciones dentro de las etiquetas `<select>`, y añade su nombre en `_locales/en/messages.json` y `_locales/es/messages.json`:

```html
<option value="ko" data-i18n="langKo">Korean</option>
```

## 🐛 Solución de Problemas

| Problema | Solución Sugerida |
| :--- | :--- |
| **Los atajos no responden** | Verifica que estén configurados en `chrome://extensions/shortcuts`. |
| **Aparece un "!" en el icono** | La página no permite extensiones (`chrome://`, Chrome Web Store, nueva pestaña). Prueba en una página web normal. |
| **El audio no suena** | Verifica que el volumen del sistema no esté silenciado. Si Google no responde, se usa la voz del sistema. |
| **La extensión no carga** | Ve a `chrome://extensions` y haz clic en el icono de recargar junto a la extensión. |

### Depuración

Para ver errores en tiempo real:
1. Ve a `chrome://extensions`.
2. Haz clic en **"Inspect views"** (Inspeccionar vistas) bajo "Hotkey Translate".
3. Revisa la pestaña **Console** en la ventana que se abre.

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Si deseas mejorar esta extensión:

1. Haz un **fork** del repositorio.
2. Crea una rama para tu característica: `git checkout -b feature/nueva-funcionalidad`.
3. Haz **commit** de tus cambios: `git commit -m 'Agrega nueva funcionalidad'`.
4. Haz **push** a la rama: `git push origin feature/nueva-funcionalidad`.
5. Abre un **Pull Request**.

## 🙏 Reconocimientos

- **Google Translate:** Por el servicio de traducción y síntesis de voz.
- **Equipo de Vivaldi/Chromium:** Por la plataforma del navegador.

## 📞 Contacto

- **Autor:** David Corrales
- **GitHub:** [Devdavco](https://github.com/devdavco)
- **Email:** [devdavco@pm.me](mailto:devdavco@pm.me)

---

<div align="center">

**Hecho con ❤️ para facilitar la traducción diaria**

⭐ ¡No olvides dejar una estrella si te resulta útil!

</div>

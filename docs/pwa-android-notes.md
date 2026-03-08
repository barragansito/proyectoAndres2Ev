# PWA y Android (Defensa Rapida)

## Fase 1 - PWA

- Se ha integrado `vite-plugin-pwa` en `vite.config.js`.
- Se genera `manifest.webmanifest` automaticamente con:
  - `name`, `short_name`, `theme_color`, `background_color`.
  - `display: standalone`.
  - iconos en `public/pwa-icons/`.
- Se registra el Service Worker en `src/main.jsx` con `registerSW({ immediate: true })`.
- El Service Worker cachea recursos estaticos y permite carga offline basica de la SPA.

Comando:

```bash
npm run pwa:build
```

## Fase 2 - Android (Capacitor)

- Se ha inicializado Capacitor:
  - `capacitor.config.json` con `appId`, `appName`, `webDir`.
- Se ha agregado plataforma Android en carpeta `android/`.
- Se compilan assets web y se sincronizan al proyecto nativo Android.

Comandos:

```bash
npm run android:sync
npm run android:open
```

## Que explicar al profesor

1. **No se rehace la app**: se reutiliza la SPA React como base.
2. **PWA**: instalable, con manifest y service worker para cache/offline.
3. **Android**: wrapper nativo con Capacitor, compilable en Android Studio a APK/AAB.
4. **Mantenibilidad**: un solo codigo fuente (`src/`) para web + app movil.

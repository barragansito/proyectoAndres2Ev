import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

function normalizeBasePath(basePath) {
  if (!basePath || basePath === '/') return '/'
  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const defaultBasePath = mode === 'android' ? '/' : '/proyectoAndres2Ev/'
  const appBasePath = normalizeBasePath(env.VITE_APP_BASE ?? defaultBasePath)

  return {
    base: appBasePath,
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['vite.svg'],
        manifest: {
          name: 'Pip-Boy New Vegas Web',
          short_name: 'NewVegasPipBoy',
          description: 'Interfaz web estilo Pip-Boy de Fallout New Vegas con React',
          theme_color: '#120c02',
          background_color: '#120c02',
          display: 'standalone',
          start_url: appBasePath,
          scope: appBasePath,
          icons: [
            {
              src: 'pwa-icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa-icons/icon-512-maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,svg,webp}'],
          navigateFallback: `${appBasePath}index.html`,
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.destination === 'audio',
              handler: 'CacheFirst',
              options: {
                cacheName: 'audio-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
          ],
        },
      }),
    ],
  }
})

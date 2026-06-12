import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: false,

            pwaAssets: {
                disabled: false,
                config: true,
            },

            manifest: {
                name: 'ToDoz',
                short_name: 'ToDoz',
                description: 'Create personalized tasks',
                theme_color: '#682860',
                background_color: '#f8f8ff',
                display: 'standalone',
                icons: [
                    {
                        src: '/pwa-72x72.png',
                        sizes: '72x72',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: '/pwa-96x96.png',
                        sizes: '96x96',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: '/pwa-128x128.png',
                        sizes: '128x128',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: '/144x144.png',
                        sizes: '144x144',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: '/pwa-152x152.png',
                        sizes: '152x152',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },

            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
            },

            devOptions: {
                enabled: false,
                navigateFallback: 'index.html',
                suppressWarnings: true,
                type: 'module',
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});

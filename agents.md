# Reglas del Proyecto: Web del equipo de cohetería universitario CRATER (Costa Rican Aerospace

## Identidad Visual
- *Paleta de colores:* Celeste: #BFD7F5, Azul #003052, Azul oscuro #00143D, verde claro #145200, verde oscuro #003D00, beige claro #FFF8D6, amarillo #CD9700, Rojo #A30000
- *Estilo:* Moderno, aeroespacial, limpio, tipografías tegnológicas pero priorizando que sean legibles
- *Logo: Usar el archivo '/public/logo.jpeg'


## Restricciones
- Para la merch solamente integrar un catálogo, no integrar pasarelas de pago (ni Stripe, ni Paypal)

## Desarrollo y verificación
- Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS 4 y contenido validado con Zod en `src/data/*.json`.
- Instalación reproducible: `npm ci`. Desarrollo: `npm run dev`. Producción: `npm run build` y `npm start`.
- Verificar con `npm run validate:data`, `npm run lint`, `npm run typecheck`, `npm test` y `npm run test:e2e` (Chromium: `npx playwright install chromium`).
- Las pruebas de navegador deben usar `http://localhost:3000`, no `127.0.0.1`: Next.js bloquea el origen alternativo para HMR. No relajar las protecciones de origen para solucionar esto.
- Para vistas previas mediante proxy, servir la compilación de producción (`npm run build` y `npm start -- --port 3001`): el proxy de la vista previa bloquea HMR e impide la hidratación en desarrollo. Mantener el desarrollo directo en localhost:3000.
- Mantener ESLint 9 mientras los plugins incluidos en eslint-config-next no sean compatibles con ESLint 10. La actualización aislada a ESLint 10 falla en react/display-name.
- El logo original es `public/Logo.jpeg` (L mayúscula); `next.config.ts` conserva compatibilidad con `/logo.jpeg`.
- `MANUAL.md` documenta el mantenimiento por JSON. Mantener `modoDemo: true` hasta sustituir los datos ficticios; no inventar datos de contacto ni patrocinadores.

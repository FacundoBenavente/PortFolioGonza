# Instrucciones para agentes de IA

Antes de modificar este proyecto, leé **[PORTFOLIO.md](./PORTFOLIO.md)**. Ahí están el diseño de origen en Figma, la estructura, los tokens de diseño, las reglas, las recetas paso a paso y la checklist de verificación.

Resumen mínimo:

- Astro 5 + Tailwind CSS 4, sitio estático de una página, sin JavaScript en el cliente.
- Modo oscuro, una sola fuente (Inter). Usá los tokens de color de `src/styles/global.css` (`bg-night`, `text-mist`, `text-teal`…), nunca hex sueltos.
- Flechas → y ↗ con `<Flecha />` (la Inter web no las trae).
- Contenido dentro de `src/components/sections/*.astro`; orden de secciones en `src/pages/index.astro`.
- Verificá con `npm run build` y revisando a 1440px y 375px.
- No actualices Astro a v7 sin actualizar Node (requiere ≥ 22.23.4). Astro 5 no tiene `astro dev --background`.
- Si cambiás estructura, tokens o recetas, actualizá `PORTFOLIO.md`.

Documentación de Astro: https://docs.astro.build

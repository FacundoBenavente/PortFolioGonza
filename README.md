# Portfolio — Gonzalo Rey Balmaceda

Portfolio personal: análisis de datos, diseño UX/UI, 3D y front-end. Sitio estático de una sola página, hecho con **Astro 5** y **Tailwind CSS 4**, en modo oscuro.

Secciones: presentación, sobre mí, proyectos (CaveDepths, Sea of the Lost y TCGCheck), disciplinas, trayectoria, videojuegos y contacto.

## Comandos

Requiere Node 18.20.8 o superior (recomendado: 22).

| Comando           | Qué hace                                      |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Instala las dependencias                      |
| `npm run dev`     | Servidor local en `localhost:4321`            |
| `npm run build`   | Genera el sitio estático en `dist/`           |
| `npm run preview` | Sirve `dist/` para revisarlo antes de publicar |

## Publicar

Se publica en **Vercel**: en [vercel.com/new](https://vercel.com/new), importá este repositorio de GitHub. Vercel detecta Astro solo (comando `npm run build`, carpeta `dist`), así que no hace falta configurar nada. Después, cada push a `main` publica una versión nueva, y cada push a otra rama genera una vista previa con su propio link.

La URL canónica se toma del dominio de producción de Vercel. Si conectás un dominio propio y querés forzarlo, definí la variable `SITE_URL` (por ejemplo, `https://gonzalo.dev`).

## Para editar

La guía completa (diseño en Figma, reglas, tokens, componentes y recetas) está en [PORTFOLIO.md](./PORTFOLIO.md). El contenido está dentro de cada sección, en `src/components/sections/`.

# Guía del portfolio — Gonzalo Rey Balmaceda

Esta es la guía para modificar el portfolio, pensada para una persona o para una IA. Explica qué es el sitio, de dónde sale el diseño, cómo está organizado, qué reglas seguir y cómo hacer los cambios más comunes paso a paso.

> **Si sos una IA:** leé esta guía completa antes de editar. Respetá las reglas de la sección 3 y verificá cada cambio con la checklist de la sección 9. Si un pedido contradice esta guía (por ejemplo, un color fuera de la paleta), avisá antes de hacerlo. Si cambiás algo que esta guía describe (archivos, tokens, recetas), actualizá también esta guía.

---

## 1. Resumen rápido

- Es un **sitio de una sola página**, estático, hecho con **Astro 5 + Tailwind CSS 4**.
- Replica el frame **"Portfolio personal — Gonzalo"** de Figma (ver sección 2).
- Tiene **7 secciones**, y cada una es un componente en `src/components/sections/`.
- El contenido (textos, proyectos, cifras) está **escrito dentro de cada componente**, la mayoría en arrays al principio del archivo. No hay CMS ni base de datos.
- No hay JavaScript en el navegador: todo es HTML y CSS.

```bash
npm install        # instalar dependencias (una vez)
npm run dev        # servidor local en http://localhost:4321 (recarga sola)
npm run build      # genera el sitio final en dist/ — usalo para verificar que no hay errores
npm run preview    # sirve dist/ localmente
```

---

## 2. Diseño de origen (Figma)

| Dato | Valor |
|---|---|
| Archivo | `Landing Page - TCGCheck` (file key `wUNcTIjnvfx73XhnEAujgI`) |
| Página | `TP 5 - MoodBoard` (node `70:2`) |
| Frame | `Portfolio personal — Gonzalo` (node `113:1986`, 1440 × 5065 px) |
| Link | https://www.figma.com/design/wUNcTIjnvfx73XhnEAujgI/Landing-Page---TCGCheck?node-id=113-1986 |

| # | Sección en Figma | Node | Alto | Componente | Ancla | Fondo |
|---|---|---|---|---|---|---|
| — | Presentación y navegación | `113:1987` | 885 | `Hero.astro` | `#top` | `stone` |
| 01 | Manifiesto personal | `113:2025` | 455 | `Manifiesto.astro` | `#sobre-mi` | `paper` |
| 02 | Proyectos destacados | `113:2042` | 978 | `Proyectos.astro` | `#proyectos` | blanco |
| 03 | Capacidades y cruce de disciplinas | `113:2099` | 918 | `Disciplinas.astro` | `#disciplinas` | `ink` |
| 04 | Trayectoria y formación | `113:2135` | 586 | `Trayectoria.astro` | `#trayectoria` | `paper` |
| 05 | Matemática y videojuegos | `113:2163` | 734 | `Juego.astro` | — | `stone` |
| 06 | Contacto y pie de página | `113:2194` | 509 | `Contacto.astro` | `#contacto` | `ink` |

**Figma es la referencia visual.** Si el diseño cambia en Figma, el sitio se actualiza para que coincida con Figma, no al revés. Una IA con acceso a Figma (MCP) puede leer cada sección con su node id.

Hay otros frames en la misma página de Figma ("Portfolio principal — Tu nombre", "Proyecto personal 01/02/03 — Detalle", "Entrada — Consola de bienvenida") que **no están implementados**. Si se pide crear páginas de detalle de proyectos, ese es el punto de partida (ver receta 7.6).

---

## 3. Reglas (leer antes de editar)

1. **Usá los tokens, no valores sueltos.** Los colores se escriben como `bg-ink`, `text-muted`, `border-line`, etc. (sección 5). No uses hex sueltos (`text-[#0a0d10]`). Si hace falta un color nuevo, agregalo primero al bloque `@theme` de `global.css` y a la tabla de la sección 5.
2. **Hay dos tipografías:** `font-display` (Space Grotesk) para titulares y texto, y `font-mono` (Roboto Mono) para etiquetas, navegación, botones y datos. No agregues otras.
3. **Las etiquetas pequeñas van en mayúsculas y monoespaciadas**, con la utilidad `label` (11px, mono). Ejemplos: "DOCUMENTACIÓN PENDIENTE", "2019 / 2020 / 2024".
4. **Cada sección numerada empieza con `<SectionIndex number="0X" label="…" />`**. En fondo oscuro se agrega `dark`. Los números son correlativos (01, 02, 03…); si agregás o sacás una sección, renumerá.
5. **El contenedor de cada sección es `container-page`**: ancho máximo de 1440px, centrado, con márgenes laterales de 20, 40 y 64px según el tamaño de pantalla. No lo reemplaces por paddings a mano.
6. **El layout es mobile-first:** en pantallas chicas todo se apila y desde `lg:` (≥1024px) se arma en columnas como en Figma. Los anchos fijos del diseño (`lg:w-[430px]`, etc.) llevan siempre el prefijo `lg:`.
7. **Los titulares grandes usan `clamp()`** para escalar, por ejemplo `text-[clamp(40px,4.5vw,64px)]`: el último valor es el tamaño de Figma a 1440px.
8. **El interlineado por defecto es `normal`**, como en Figma (lo fija `global.css`). Si el diseño indica otro valor, agregá `leading-[…]` explícito.
9. **El texto está en español rioplatense** ("deslizá", "conocerme"), con tono reflexivo y en primera persona. Mantené ese estilo.
10. **Accesibilidad:** cada `<img>` lleva un `alt` descriptivo, y los elementos decorativos (cuadraditos de color, cintas, el cursor) llevan `aria-hidden="true"`. Hay un solo `<h1>` (CURIOSIDAD); cada sección usa `<h2>` y los ítems internos `<h3>`.
11. **Las animaciones van detrás de `motion-safe:`**, para respetar a quien prefiere movimiento reducido.
12. **No agregues dependencias sin necesidad.** El sitio no usa React ni otro framework, ni JavaScript en el cliente.
13. **Astro está fijado en la versión 5** (ver sección 10). No lo actualices sin actualizar Node primero.

---

## 4. Estructura de archivos

```
PortFolioGonza/
├── PORTFOLIO.md                # esta guía
├── AGENTS.md                   # puntero a esta guía para herramientas de IA
├── astro.config.mjs            # integra Tailwind como plugin de Vite
├── package.json
├── public/
│   ├── favicon.ico / favicon.svg
│   └── images/                 # fotos (sección 6)
└── src/
    ├── pages/index.astro       # ORDEN de las secciones en la página
    ├── layouts/Layout.astro    # <html>, <head>, título y descripción de la pestaña
    ├── styles/global.css       # Tailwind + tokens + utilidades propias
    └── components/
        ├── SectionIndex.astro  # índice "01 ─── SOBRE MÍ / MANIFIESTO"
        ├── Collage.astro       # collage de fotos con cinta y etiquetas
        ├── collage.ts          # tipo TypeScript de los elementos del collage
        └── sections/           # una sección por archivo (tabla de la sección 2)
```

Componentes compartidos:

- **`SectionIndex`** (props: `number`, `label`, `dark?`) dibuja número, línea cyan y etiqueta.
- **`Collage`** (props: `width`, `height`, `items`, `class?`) arma el collage. `width` y `height` son el tamaño del lienzo en Figma, e `items` es una lista de elementos (sección 8).

---

## 5. Tokens de diseño

Están definidos en el bloque `@theme` de `src/styles/global.css`.

### Colores

| Token | Hex | Uso |
|---|---|---|
| `ink` | `#0a0d10` | texto principal, fondos oscuros, botón "Hablemos" |
| `paper` | `#f5f5f1` | fondo general, texto sobre fondo oscuro |
| `stone` | `#d0cece` | fondo de la portada y de la sección 05 |
| `muted` | `#5e6264` | texto secundario sobre fondo claro |
| `line` | `#b5b6b2` | separadores sobre fondo claro |
| `graphite` | `#373b3d` | separadores sobre fondo oscuro |
| `fog` | `#b8bebd` | texto secundario sobre fondo oscuro |
| `tape` | `#e5e7de` | cinta de papel de los collages |
| `cyan` | `#00d7f3` | acento principal: datos, CTA, índices |
| `magenta` | `#bd42bf` | acento: diseño |
| `lime` | `#74f59a` | acento: juego, código, cursor |

Los tres acentos (cyan, magenta y lime) representan las tres disciplinas (datos, diseño y código/juego) y aparecen siempre juntos en ese orden.

### Otros tokens y utilidades

| Nombre | Qué es |
|---|---|
| `font-display` | Space Grotesk |
| `font-mono` | Roboto Mono |
| `shadow-photo` | sombra de los marcos de fotos |
| `animate-blink` | parpadeo del cursor del pie |
| `container-page` | contenedor de sección (regla 5) |
| `label` | etiqueta mono de 11px (regla 3) |

### Tamaños de texto de referencia (Figma a 1440px)

| Elemento | Tamaño | Fuente |
|---|---|---|
| CURIOSIDAD | 166px bold | display |
| Titulares de sección | 64px medium (sección 05: 70px bold, contacto: 84px) | display |
| Subtítulo de la portada | 52px medium | display |
| Titular del manifiesto | 49px regular | display |
| Cifras | 54–58px regular | display |
| Títulos de tarjetas e ítems | 30–32px medium | display |
| Párrafos | 16–18px | display |
| Navegación y botones | 12px | mono |
| Etiquetas | 10–11px | mono |

---

## 6. Imágenes

Están en `public/images/` y se referencian como `/images/archivo.ext`.

| Archivo | Dónde | Node Figma |
|---|---|---|
| `hero-tierra.jpg` | collage de la portada, foto grande | `113:2014` |
| `hero-portatil.jpg` | collage de la portada, foto chica | `113:2017` |
| `proyecto-01.jpg` | tarjeta del Proyecto 01 | `113:2055` |
| `proyecto-02.jpg` | tarjeta del Proyecto 02 | `113:2070` |
| `proyecto-03.png` | tarjeta del Proyecto 03 | `113:2085` |
| `juego-ecuaciones.jpg` | collage de la sección 05, arriba | `113:2184` |
| `juego-videojuegos.png` | collage de la sección 05, abajo | `113:2187` |

Las fotos de los proyectos son **imágenes de referencia del moodboard, no capturas reales** (lo aclara una leyenda en la sección). Cuando haya imágenes reales de cada proyecto, reemplazalas y borrá esa leyenda (receta 7.2).

---

## 7. Recetas

### 7.1 Cambiar un texto
1. Buscá el texto en `src/components/sections/` (por ejemplo, buscando la frase exacta).
2. Editalo ahí mismo. Si está en un array al principio del archivo (`proyectos`, `disciplinas`, `hitos`, `navLinks`), editá el array.

### 7.2 Completar un proyecto real (en `Proyectos.astro`)
1. Copiá la imagen a `public/images/` (sugerido: `proyecto-01.jpg`, ~1200px de ancho).
2. En el array `proyectos`, actualizá `titulo`, `imagen`, `alt` y `referencia` (la etiqueta negra sobre la foto).
3. Hoy la descripción ("Nombre, contexto y proceso…"), "DOCUMENTACIÓN PENDIENTE" y "FICHA POR COMPLETAR…" son iguales para los tres proyectos y están escritas en el `map`. Para textos propios, agregá campos al array (por ejemplo `descripcion`, `estado`, `pie`) y usalos en el `map` en lugar del texto fijo.
4. Si el proyecto tiene un link (repo, demo o página de detalle), agregá el campo `href` y envolvé la tarjeta en un `<a>`, de modo que el `[+]` funcione como indicador de link.
5. Cuando todos los proyectos sean reales, actualizá "3 PROYECTOS PRODUCIDOS" y el texto "Tres espacios reservados…", y borrá la leyenda "↳ Imágenes del universo visual personal…".

### 7.3 Agregar o quitar un proyecto
Agregá o quitá un objeto del array `proyectos`. La grilla se adapta sola: 1 columna en celular, 2 en tablet y 3 en escritorio. Actualizá el contador "3 PROYECTOS PRODUCIDOS".

### 7.4 Cambiar el email y los datos personales
- Email: la constante `email` en `Contacto.astro`. Borrá también "CONTACTO DE EJEMPLO / REEMPLAZAR" y "Esta dirección es ilustrativa…".
- Pie: reemplazá "Tu nombre © 2026" por el nombre real.
- Para sumar redes (LinkedIn, GitHub), agregalas en `Contacto.astro` con el mismo estilo que el email (texto `cyan` y borde inferior) o como links `font-mono text-[11px]` en el pie.
- Título y descripción de la pestaña: las props por defecto en `Layout.astro`.

### 7.5 Agregar una sección nueva
1. Creá `src/components/sections/NuevaSeccion.astro` con esta base:
   ```astro
   ---
   import SectionIndex from '../SectionIndex.astro';
   ---

   <section id="ancla" class="scroll-mt-4 bg-paper">
     <div class="container-page flex flex-col gap-12 py-16 lg:py-20">
       <SectionIndex number="0X" label="TEMA / SUBTEMA" />
       <!-- contenido: en lg, columna izquierda lg:w-[430px] lg:shrink-0 + columna flex-1, gap-20 -->
     </div>
   </section>
   ```
2. Importala y ubicala en `src/pages/index.astro`.
3. Renumerá los `SectionIndex` posteriores.
4. Si va en el menú, agregala a `navLinks` en `Hero.astro` con su ancla.
5. Alterná el fondo con las secciones vecinas (`paper`, blanco, `stone`, `ink`) para que no queden dos iguales seguidas.
6. Agregala a la tabla de la sección 2 de esta guía.

### 7.6 Crear páginas de detalle de proyecto
1. Los diseños están en Figma: "Proyecto personal 01/02/03 — Detalle" (nodes `124:6702`, `124:6876`, `124:7005`).
2. Creá `src/pages/proyectos/[slug].astro` o una página por proyecto (`src/pages/proyectos/proyecto-01.astro`) usando `Layout`.
3. Extraé la navegación de `Hero.astro` a un componente `Nav.astro` para reutilizarla, y el pie de `Contacto.astro` a `Footer.astro`.
4. Si hay muchos proyectos, conviene una content collection de Astro (`src/content/`) en lugar de arrays.
5. Linkeá las tarjetas de `Proyectos.astro` a esas páginas (receta 7.2, paso 4).

### 7.7 Cambiar colores o tipografía
- Color: cambiá el valor en `@theme` (`global.css`) y se aplica en todo el sitio. Actualizá la tabla de la sección 5.
- Tipografía: instalá el paquete `@fontsource-variable/<fuente>`, importalo en `global.css` y cambiá `--font-display` o `--font-mono`.

### 7.8 Reemplazar o reacomodar fotos del collage
- Reemplazar una foto: pisá el archivo en `public/images/` o cambiá `src` en el array `collage` (en `Hero.astro` o `Juego.astro`).
- Mover o rotar: cambiá `left`, `top` o `rotate` del elemento (sección 8).

### 7.9 Actualizar desde Figma
1. Leé la sección cambiada con su node id (sección 2).
2. Compará textos, tamaños, colores y espaciados con el componente.
3. Mapeá los colores a tokens (si aparece uno nuevo, regla 1).
4. Si hay fotos nuevas, descargalas a `public/images/` y actualizá la tabla de la sección 6.
5. Verificá con la sección 9.

---

## 8. Cómo funciona el collage

`Collage.astro` posiciona cada elemento en **porcentajes del lienzo original de Figma** y escala los textos con unidades de contenedor (`cqw`), así todo el collage se achica proporcionalmente en pantallas chicas.

| Collage | Archivo | Lienzo (`width` × `height`) |
|---|---|---|
| Portada | `Hero.astro` | 783 × 445 |
| Sección 05 | `Juego.astro` | 668 × 492 |

Los elementos se dibujan en el orden del array: los últimos quedan encima.

| `kind` | Campos | Qué es |
|---|---|---|
| `photo` | `src, alt, left, top, width, height, rotate` | foto con marco blanco y sombra |
| `tape` | `left, top, width, height, rotate, opacity?` | cinta de papel |
| `chip` | `text, cx, cy, rotate, color, fontPx, padXPx, padYPx` | etiqueta de color (`cyan` o `magenta`) |
| `note` | `text, left, top, fontPx` | texto suelto gris |

- `left`, `top`, `width`, `height`, `cx` y `cy` están en **% del lienzo**, y `rotate` en grados.
- En `chip`, `cx` y `cy` son el **centro** de la etiqueta.
- `fontPx`, `padXPx` y `padYPx` son **px del diseño original**: el componente los convierte para que escalen.
- Para pasar coordenadas de Figma (posición del elemento sin rotar respecto del lienzo): `left = x / anchoLienzo × 100` y `top = y / altoLienzo × 100`.

---

## 9. Checklist de verificación (después de cada cambio)

1. `npm run build` termina sin errores.
2. `npm run dev`: revisá la página a **1440px** (debe coincidir con Figma), a **~768px** (tablet) y a **~375px** (celular).
3. No hay scroll horizontal en celular.
4. Los links del menú llevan a su sección, "Volver arriba" sube al inicio y el email abre el cliente de correo.
5. Todas las imágenes cargan y tienen `alt`.
6. No quedaron colores en hex sueltos (buscá `#` dentro de `class=` en los componentes).
7. Si cambiaste estructura, tokens o recetas, actualizaste esta guía.

---

## 10. Notas técnicas y trampas conocidas

- **Versión de Node:** Astro 7 exige Node ≥ 22.23.4. La máquina original tiene Node 22.17, por eso Astro está fijado en 5.18. Para actualizar: subí Node a la última LTS y después corré `npm install astro@latest`. Revisá la guía de migración de Astro.
- **Astro 5 no tiene `astro dev --background`.** Para correr el servidor en segundo plano, usá la herramienta de tu entorno.
- **Tipos en componentes `.astro`:** exportar tipos con uniones de varias líneas desde el frontmatter rompe el build. Por eso el tipo del collage vive en `collage.ts`.
- **Tamaños de texto a medida e interlineado:** `text-[20px]` no define interlineado, así que hereda el `normal` del `html`. Si un texto necesita otro, agregá `leading-[…]`.
- **Navegador headless:** Chrome y Edge en modo headless no bajan de ~500px de ancho. Para probar el ancho de celular, usá las herramientas de desarrollador (modo dispositivo) o un iframe de 375px.

---

## 11. Pendientes de contenido

Son los textos de ejemplo que vienen del diseño y faltan reemplazar:

- [ ] Email real (`hola@ejemplo.com`) y quitar "CONTACTO DE EJEMPLO / REEMPLAZAR" y la aclaración de dirección ilustrativa.
- [ ] Pie: "Tu nombre © 2026" → nombre real.
- [ ] Proyectos 01–03: nombre, descripción, imagen real y link (receta 7.2).
- [ ] Trayectoria: "Nombres de cursos e instituciones: por incorporar."
- [ ] Opcional: redes sociales en contacto (receta 7.4).
- [ ] Opcional: páginas de detalle de proyectos (receta 7.6).

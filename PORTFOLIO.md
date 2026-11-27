# Guía del portfolio — Gonzalo Rey Balmaceda

Esta es la guía para modificar el portfolio, pensada para una persona o para una IA. Explica qué es el sitio, de dónde sale el diseño, cómo está organizado, qué reglas seguir y cómo hacer los cambios más comunes paso a paso.

> **Si sos una IA:** leé esta guía completa antes de editar. Respetá las reglas de la sección 3 y verificá cada cambio con la checklist de la sección 9. Si un pedido contradice esta guía (por ejemplo, un color fuera de la paleta), avisá antes de hacerlo. Si cambiás algo que esta guía describe (archivos, tokens, recetas), actualizá también esta guía.

---

## 1. Resumen rápido

- Es un **sitio de una sola página**, estático, hecho con **Astro 5 + Tailwind CSS 4**, en **modo oscuro**.
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
| Frame | `Portfolio personal — Gonzalo` (node `113:1986`, 1440 × 4963 px) |
| Link | https://www.figma.com/design/wUNcTIjnvfx73XhnEAujgI/Landing-Page---TCGCheck?node-id=113-1986 |
| Exportación local | `Diseños/` (SVG + PDF del frame y capturas de los proyectos; versión oscura del 2026-11-26) |

| # | Sección en Figma | Node | Alto | Componente | Ancla | Fondo |
|---|---|---|---|---|---|---|
| — | Presentación y navegación | `113:1987` | 885 | `Hero.astro` | `#top` | `night` |
| 01 | Manifiesto personal | `113:2025` | 455 | `Manifiesto.astro` | `#sobre-mi` | `surface` |
| 02 | Proyectos destacados | `113:2042` | 875 | `Proyectos.astro` | `#proyectos` | `night` |
| 03 | Capacidades y cruce de disciplinas | `113:2099` | 906 | `Disciplinas.astro` | `#disciplinas` | `surface` |
| 04 | Trayectoria y formación | `113:2135` | 583 | `Trayectoria.astro` | `#trayectoria` | `night` |
| 05 | Matemática y videojuegos | `113:2163` | 734 | `Juego.astro` | — | `surface` |
| 06 | Contacto y pie de página | `113:2194` | 525 | `Contacto.astro` | `#contacto` | `night` |

**Figma es la referencia visual.** Si el diseño cambia en Figma, el sitio se actualiza para que coincida con Figma, no al revés. Una IA con acceso a Figma (MCP) puede leer cada sección con su node id.

### Cómo leer la exportación (si el MCP de Figma no está disponible)

El plan Starter de Figma limita las llamadas del MCP. La alternativa es exportar el frame a `Diseños/` como **SVG + PDF**:

- **SVG:** formas, colores, rotaciones e imágenes embebidas en resolución completa. Aunque se destilde "Outline text", el texto sale como trazos.
- **PDF:** textos con posición y tamaño (se leen con PyMuPDF). Las fuentes salen como "Type3", sin nombre ni color: la fuente se identifica comparando un recorte con renders de prueba y el color se toma del render.
- Escala 1:1: 1pt del PDF equivale a 1px de Figma.

---

## 3. Reglas (leer antes de editar)

1. **Usá los tokens, no valores sueltos.** Los colores se escriben como `bg-night`, `text-mist`, `border-line`, etc. (sección 5). No uses hex sueltos (`text-[#090d14]`). Si hace falta un color nuevo, agregalo primero al bloque `@theme` de `global.css` y a la tabla de la sección 5.
2. **Hay una sola tipografía: Inter** (`font-sans`, la de todo el sitio). Peso 400 para titulares y texto; 700 en CURIOSIDAD, JUGAR TAMBIÉN, el nombre del pie y los botones; 600 en la etiqueta "DATOS → DECISIONES" y el número de la primera tarjeta. No agregues otras fuentes.
3. **Las etiquetas en mayúsculas de 11px** usan la utilidad `label` (Inter 11px, espaciado 0.06em), por ejemplo "PORTFOLIO PERSONAL / PERFIL EN FORMACIÓN". En Figma algunas etiquetas no llevan espaciado ("DESLIZÁ PARA CONOCERME ↓", "FICHA POR COMPLETAR…", "VOLVER ARRIBA ↑"): esas van con `text-[11px]` solo.
4. **Cada sección numerada empieza con `<SectionIndex number="0X" label="…" />`**. Los números son correlativos (01, 02, 03…); si agregás o sacás una sección, renumerá.
5. **El contenedor de cada sección es `container-page`**: ancho máximo de 1440px, centrado, con márgenes laterales de 20, 40 y 64px según el tamaño de pantalla. No lo reemplaces por paddings a mano.
6. **El layout es mobile-first:** en pantallas chicas todo se apila y desde `lg:` (≥1024px) se arma en columnas como en Figma. Los anchos fijos del diseño (`lg:w-[430px]`, etc.) llevan siempre el prefijo `lg:`.
7. **Los titulares grandes usan `clamp()`** para escalar, por ejemplo `text-[clamp(40px,4.5vw,64px)]`: el último valor es el tamaño de Figma a 1440px. Revisá que el valor del medio llegue al máximo a 1440px (84px ÷ 1440 = 5.84vw).
8. **El interlineado por defecto es `normal`**, como en Figma (lo fija `global.css`). Si el diseño indica otro valor, agregá `leading-[…]` explícito.
9. **Los acentos de color dentro de un titular** (una palabra en `teal` o `pink`) van con `<span class="text-pink">…</span>`. Hay que respetar qué palabra lleva color en Figma.
10. **El texto está en español rioplatense** ("deslizá", "tenés"), con tono reflexivo y en primera persona. Mantené ese estilo.
11. **Accesibilidad:** cada `<img>` lleva un `alt` descriptivo, y los elementos decorativos (cuadraditos de color, flechas, el cursor) llevan `aria-hidden="true"`. Hay un solo `<h1>` (CURIOSIDAD); cada sección usa `<h2>` y los ítems internos `<h3>`.
12. **Las animaciones van detrás de `motion-safe:`**, para respetar a quien prefiere movimiento reducido.
13. **Flechas → y ↗:** usá `<Flecha direccion="derecha | diagonal" />`, no el carácter. La versión web de Inter no los trae (↑ y ↓ sí).
14. **No agregues dependencias sin necesidad.** El sitio no usa React ni otro framework, ni JavaScript en el cliente.
15. **Astro está fijado en la versión 5** (ver sección 10). No lo actualices sin actualizar Node primero.

---

## 4. Estructura de archivos

```
PortFolioGonza/
├── PORTFOLIO.md                # esta guía
├── AGENTS.md                   # puntero a esta guía para herramientas de IA
├── Diseños/                    # exportación de Figma (SVG + PDF) y capturas originales de los proyectos
├── astro.config.mjs            # integra Tailwind como plugin de Vite
├── package.json
├── public/
│   ├── favicon.ico / favicon.svg
│   └── images/                 # fotos (sección 6)
└── src/
    ├── pages/index.astro       # ORDEN de las secciones en la página
    ├── layouts/Layout.astro    # <html>, <head>, título y descripción de la pestaña
    ├── styles/global.css       # Tailwind + Inter + tokens + utilidades propias
    └── components/
        ├── SectionIndex.astro  # índice "01 ─── SOBRE MÍ"
        ├── Collage.astro       # collage de fotos con marco y etiquetas
        ├── collage.ts          # tipo TypeScript de los elementos del collage
        ├── Flecha.astro        # flechas → y ↗ en SVG (regla 13)
        └── sections/           # una sección por archivo (tabla de la sección 2)
```

Componentes compartidos:

- **`SectionIndex`** (props: `number`, `label`) dibuja número y línea en `teal` y la etiqueta en `mist`.
- **`Collage`** (props: `width`, `height`, `items`, `class?`) arma el collage. `width` y `height` son el tamaño del lienzo en Figma, e `items` es una lista de elementos (sección 8).
- **`Flecha`** (props: `direccion`, `grosor?`, `class?`): mide 1em y toma el color del texto.

---

## 5. Tokens de diseño

Están definidos en el bloque `@theme` de `src/styles/global.css`.

### Colores

| Token | Hex | Uso |
|---|---|---|
| `night` | `#090d14` | fondo principal (portada, proyectos, trayectoria, contacto) |
| `surface` | `#121b28` | fondo alternado (secciones 01, 03, 05), botones, marcos de fotos, etiquetas |
| `snow` | `#eff5ff` | texto principal |
| `mist` | `#a8b6c8` | texto secundario, navegación, etiquetas |
| `line` | `#30435a` | separadores y bordes |
| `teal` | `#32f5d0` | acento principal: CURIOSIDAD, índices, cifras, botón de proyectos, email |
| `pink` | `#ff63c7` | acento secundario: palabras destacadas de los titulares, botón Contacto, `[+]` |

Los dos acentos se alternan: los cuadraditos y el esquema de disciplinas van `teal · pink · teal`.

### Otros tokens y utilidades

| Nombre | Qué es |
|---|---|
| `font-sans` | Inter (variable) |
| `shadow-photo` | sombra de los marcos de fotos |
| `animate-blink` | parpadeo del cursor del pie |
| `container-page` | contenedor de sección (regla 5) |
| `label` | etiqueta de 11px con espaciado 0.06em (regla 3) |

### Tamaños de texto de referencia (Figma a 1440px)

| Elemento | Tamaño | Peso |
|---|---|---|
| CURIOSIDAD | 166px | 700 |
| Titulares de sección | 64px (sección 05: 64px bold; contacto: 84px) | 400 |
| Subtítulo de la portada | 52px | 400 |
| Titular del manifiesto | 49px | 400 |
| Cifras | 54–58px | 400 |
| Títulos de tarjetas e ítems | 23–32px | 400 |
| Párrafos | 16–18px | 400 |
| Navegación y botones | 12px | 400 / 700 |
| Etiquetas | 10–11px | 400 |

---

## 6. Imágenes

Están en `public/images/` y se referencian como `/images/archivo.ext`. Las de los proyectos se sacaron del SVG de Figma, que las trae en resolución completa, y se achicaron a 960px de ancho. Las de `Diseños/` están en tamaño 1x (422px).

| Archivo | Dónde |
|---|---|
| `hero-dashboard.jpg` | collage de la portada, foto grande (con el recorte de Figma, sección 8) |
| `hero-hologramas.png` | collage de la portada, foto chica |
| `proyecto-cavedepths.png` | tarjeta de CaveDepths |
| `proyecto-sotl.png` | tarjeta de Sea of the Lost |
| `proyecto-tcgcheck.png` | tarjeta de TCGCheck (alineada a la izquierda, como en Figma) |
| `juego-ecuaciones.jpg` | collage de la sección 05, arriba |
| `juego-videojuegos.png` | collage de la sección 05, abajo |

---

## 7. Recetas

### 7.1 Cambiar un texto
1. Buscá el texto en `src/components/sections/` (por ejemplo, buscando la frase exacta).
2. Editalo ahí mismo. Si está en un array al principio del archivo (`proyectos`, `disciplinas`, `hitos`, `navLinks`), editá el array.

### 7.2 Editar un proyecto (en `Proyectos.astro`)
1. Cada proyecto del array `proyectos` tiene `numero`, `anio` (etiqueta "3ER AÑO - 2024"), `titulo`, `imagen`, `alt`, `descripcion` y, opcional, `posicion` (clase `object-*` para alinear la imagen).
2. Imagen nueva: copiala a `public/images/` (sugerido: ~960px de ancho, proporción 16:9) y actualizá `imagen` y `alt`.
3. Si el proyecto tiene un link (repo, demo o página de detalle), agregá el campo `href` y envolvé la tarjeta en un `<a>`, así el `[+]` funciona como indicador de link. Cuando haya caso publicado, cambiá "FICHA POR COMPLETAR / SIN CASO PUBLICADO".
4. En Figma, el número ("01") solo aparece sobre la primera imagen. Para mostrarlo en todas, sacá la condición `i === 0`.

### 7.3 Agregar o quitar un proyecto
Agregá o quitá un objeto del array `proyectos`. La grilla se adapta sola: 1 columna en celular, 2 en tablet y 3 en escritorio. Actualizá el contador "3 PROYECTOS PRODUCIDOS".

### 7.4 Cambiar el email y los datos personales
- Email: la constante `email` en `Contacto.astro`.
- Para sumar redes (LinkedIn, GitHub), agregalas en `Contacto.astro` con el mismo estilo que el email (texto `teal` y borde inferior `line`) o como links `text-[11px] text-mist` en el pie.
- Título y descripción de la pestaña: las props por defecto en `Layout.astro`.

### 7.5 Agregar una sección nueva
1. Creá `src/components/sections/NuevaSeccion.astro` con esta base:
   ```astro
   ---
   import SectionIndex from '../SectionIndex.astro';
   ---

   <section id="ancla" class="scroll-mt-4 bg-surface">
     <div class="container-page flex flex-col gap-12 py-16 lg:py-20">
       <SectionIndex number="0X" label="TEMA / SUBTEMA" />
       <!-- contenido: en lg, columna izquierda lg:w-[430px] lg:shrink-0 + columna flex-1, gap-20 -->
     </div>
   </section>
   ```
2. Importala y ubicala en `src/pages/index.astro`.
3. Renumerá los `SectionIndex` posteriores.
4. Si va en el menú, agregala a `navLinks` en `Hero.astro` con su ancla.
5. Alterná el fondo con las secciones vecinas (`night` y `surface`) para que no queden dos iguales seguidas.
6. Agregala a la tabla de la sección 2 de esta guía.

### 7.6 Crear páginas de detalle de proyecto
1. No hay diseño de detalle para Gonzalo en Figma: los frames "Proyecto personal 01–04 — Detalle" son del portfolio de Facundo y se pueden usar como referencia de estructura.
2. Creá una página por proyecto (`src/pages/proyectos/cavedepths.astro`) usando `Layout`.
3. Extraé la navegación de `Hero.astro` a un componente `Nav.astro` para reutilizarla, y el pie de `Contacto.astro` a `Footer.astro`.
4. Linkeá las tarjetas de `Proyectos.astro` a esas páginas (receta 7.2, paso 3).

### 7.7 Cambiar colores o tipografía
- Color: cambiá el valor en `@theme` (`global.css`) y se aplica en todo el sitio. Actualizá la tabla de la sección 5.
- Tipografía: instalá el paquete `@fontsource-variable/<fuente>`, importalo en `global.css` y cambiá `--font-sans`.

### 7.8 Reemplazar o reacomodar fotos del collage
- Reemplazar una foto: pisá el archivo en `public/images/` o cambiá `src` en el array `collage` (en `Hero.astro` o `Juego.astro`).
- Mover o rotar: cambiá `left`, `top` o `rotate` del elemento (sección 8).

### 7.9 Actualizar desde Figma
1. Leé la sección cambiada con su node id (sección 2), o exportá el frame a `Diseños/`.
2. Compará textos, tamaños, colores y espaciados con el componente.
3. Mapeá los colores a tokens (si aparece uno nuevo, regla 1).
4. Si hay fotos nuevas, sacalas del SVG o descargalas a `public/images/` y actualizá la tabla de la sección 6.
5. Verificá con la sección 9.

---

## 8. Cómo funciona el collage

`Collage.astro` posiciona cada elemento en **porcentajes del lienzo original de Figma** y escala los textos con unidades de contenedor (`cqw`), así todo el collage se achica proporcionalmente en pantallas chicas.

| Collage | Archivo | Lienzo (`width` × `height`) | Origen en el frame de Figma |
|---|---|---|---|
| Portada | `Hero.astro` | 783 × 445 | x 597, y 364 |
| Sección 05 | `Juego.astro` | 668 × 503 | x 700, y 3829 |

Los elementos se dibujan en el orden del array: los últimos quedan encima.

| `kind` | Campos | Qué es |
|---|---|---|
| `photo` | `src, alt, left, top, width, height, rotate, recorte?` | foto con marco `surface` de 8px y sombra |
| `chip` | `text, cx, cy, rotate, color, widthPx, heightPx, fontPx, weight` | etiqueta con fondo `surface` y borde y texto `teal` o `pink`; " → " en el texto se dibuja con `Flecha` |
| `note` | `text, left, top, fontPx` | texto suelto en `mist` |

- `left`, `top`, `width`, `height`, `cx` y `cy` están en **% del lienzo**, y `rotate` en grados. `left` y `top` son la caja **sin rotar** (CSS rota sobre el centro).
- En `chip`, `cx` y `cy` son el **centro** de la etiqueta; `widthPx`, `heightPx` y `fontPx` son **px del diseño original** y el componente los convierte para que escalen.
- `recorte` reproduce el "Crop" de Figma: tamaño y posición de la imagen respecto del área visible del marco, en fracciones (`{ x: -0.05, y: -0.4, w: 1.19, h: 1.4 }`). Se calcula desde la matriz del `pattern` del SVG exportado. Sin recorte, la imagen cubre el marco centrada.
- Para pasar coordenadas de Figma: Figma rota sobre la esquina superior izquierda, así que primero se calcula el centro del rectángulo rotado y después `left = (centroX − ancho/2 − origenX) / anchoLienzo × 100` (igual con `top`).

---

## 9. Checklist de verificación (después de cada cambio)

1. `npm run build` termina sin errores.
2. `npm run dev`: revisá la página a **1440px** (debe coincidir con Figma o con el PDF de `Diseños/`), a **~768px** (tablet) y a **~375px** (celular).
3. No hay scroll horizontal en celular.
4. Los links del menú llevan a su sección, "Volver arriba" sube al inicio y el email abre el cliente de correo.
5. Todas las imágenes cargan y tienen `alt`.
6. No quedaron colores en hex sueltos (buscá `#` dentro de `class=` en los componentes).
7. Si cambiaste estructura, tokens o recetas, actualizaste esta guía.

Verificación realizada (2026-11-26): a 1440px, las alturas de sección quedan a 5px o menos de Figma, salvo la 05 (+5px). El build no da errores.

---

## 10. Notas técnicas y trampas conocidas

- **Versión de Node:** Astro 7 exige Node ≥ 22.23.4. La máquina original tiene Node 22.17, por eso Astro está fijado en 5.18. Para actualizar: subí Node a la última LTS y después corré `npm install astro@latest`. Revisá la guía de migración de Astro.
- **Astro 5 no tiene `astro dev --background`.** Para correr el servidor en segundo plano, usá la herramienta de tu entorno.
- **Tipos en componentes `.astro`:** exportar tipos con uniones de varias líneas desde el frontmatter rompe el build. Por eso el tipo del collage vive en `collage.ts`.
- **Tamaños de texto a medida e interlineado:** `text-[20px]` no define interlineado, así que hereda el `normal` del `html`. Si un texto necesita otro, agregá `leading-[…]`.
- **Flechas:** el subconjunto "latin" de `@fontsource-variable/inter` incluye ↑ y ↓ pero no → ni ↗ (regla 13).
- **Navegador headless:** Chrome y Edge en modo headless no bajan de ~500px de ancho. Para probar el ancho de celular, usá las herramientas de desarrollador (modo dispositivo) o un iframe de 375px.

---

## 11. Pendientes de contenido

- [ ] Proyectos: link a cada caso (repo, demo o página de detalle) y reemplazar "FICHA POR COMPLETAR / SIN CASO PUBLICADO" (receta 7.2).
- [ ] Opcional: redes sociales en contacto (receta 7.4).
- [ ] Opcional: páginas de detalle de proyectos (receta 7.6).

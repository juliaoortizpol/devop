> Actualización de color (21 de noviembre de 2026): la pantalla vigente es `b6755f047d3c45cb8513902fdeb5fa1f`, Carbón & Turquesa. Sustituye la simplificación de cinco colores documentada en la implementación inicial. Referencias exactas: `stitch/desktop-turquoise.html`, `stitch/desktop-turquoise.png` y `stitch/colors-turquoise.json`.
>
> Se copiaron los roles del HTML: fondo #121416; secciones #1A1C1E; tarjetas #1E2022; superficies altas #282A2C y #333537; footer #0C0E10; títulos #F0F1F5; texto #E2E2E5 y #C5C6CA; texto secundario #C4C6CA y #8F9194; acento #00C4B4 y hover #00A89A. Se conservaron las transparencias originales 95%, 60% y 40% en sus superficies correspondientes. Se usa el mismo mapa de colores en móvil. /dev conserva sus estilos.
>
> Verificación: compilación de producción correcta y estilos calculados del navegador contrastados con los valores del HTML de Stitch (14 selectores). Vista móvil de 390 px sin desbordamiento horizontal. Modern Web Guidance `color`: se conservan foco visible y colores de sistema para el modo de alto contraste; no se usa el color como único indicador de idioma. La variante de foco conserva subrayado y outline.
# Consultoría: diseño y verificación

## Alcance

Implementación de las pantallas de Stitch del proyecto `7688747715865627429`:
- Escritorio: `e46c849e62034411917d9cb817fdc76d`.
- Móvil: `d423945850e047bc9b35f767def4b698`.

HTML e imágenes originales descargados con el MCP de Stitch en `stitch/desktop.html`, `stitch/mobile.html` y sus PNG. Son referencias de diseño, no páginas servidas por la aplicación. No ejecutar sus scripts CDN como parte de producción.

## Rutas

| URL | Comportamiento |
| --- | --- |
| `/` | Redirección permanente 308 a `/consultor`; conserva query string. |
| `/consultor` | Consultoría en español; rewrite interno a `/consultor/es`. |
| `/consultor/en` | Consultoría en inglés. |
| `/dev` | Portafolio existente en español; rewrite interno a `/dev/es`. |
| `/dev/en` | Portafolio existente en inglés. |
| `/es`, `/en` | Redirecciones permanentes a `/dev` y `/dev/en`. |
| `/consultor/es`, `/dev/es` | Redirecciones a los equivalentes canónicos sin idioma. |
| `/admin`, `/api/*` | Conservan rutas y protección existentes. |

Los enlaces antiguos con fragmentos conservan su ancla mediante el comportamiento del navegador al redirigir sin un nuevo fragmento. Español es el idioma de las entradas nuevas; la preferencia del navegador ya no cambia el destino de `/`.

## Identidad aplicada

Fuente: identidad gráfica de contenido JOP v1.0.0 aprobada el 20 de noviembre de 2026 (`editorial/brand/visual-tokens.json` del proyecto Content creation).

- Carbón `#121416`: fondo principal.
- Grafito `#202427`: superficies y secciones alternas.
- Plata perla `#D3D5D9`: énfasis y botones.
- Blanco suave `#F5F6F7`: texto principal.
- Gris medio `#A3A8AF`: texto secundario sobre oscuro.
- Inter local con `next/font/local`, `display: swap`, licencia OFL incluida en `app/fonts/`.

Los estilos de consultoría se cargan en su layout raíz independiente. El portafolio de desarrollador conserva sus componentes, contenido, Geist y paleta anterior. Se actualizaron sus enlaces de idioma, logo y canonical a `/dev`.

## Adaptación de Stitch

Se conservaron cabecera, diagrama de cuatro fases, tarjetas de servicios, proceso, casos, perfil y contacto. En móvil el mismo árbol de navegación pasa al borde inferior, y el diagrama se compacta. Los CTAs de servicio abren el correo con un asunto específico.

Las pantallas de referencia difieren en texto y contienen afirmaciones sin respaldo. No se publicaron el retrato generado como foto de Julio, proyectos/logística o métricas inventadas, más de una década de experiencia, respuesta garantizada en 24 horas, presupuestos fijos ni promesas de NDA. Los casos utilizan la experiencia laboral existente de Qik y Baires Dev, rotulada como tal. Un tratamiento tipográfico JOP ocupa el espacio de la foto; las publicaciones se enlazan a canales reales en lugar de artículos ficticios. No se alteró el JSON original del portafolio.

El contenido comercial nuevo está en `lib/consultant-content.ts`. `/admin` sigue editando el contenido profesional existente; no incorpora un editor de los nuevos servicios.

## Modern Web Guidance aplicada

Consulta mediante `modern-web-guidance@latest`, búsqueda `responsive page layout`, guías `responsive-design`, `navbar` y `performance`.

- `responsive-design`: “combine viewport-relative and font-relative units in `clamp()`”. Tipografía con límites en rem, rejillas que se apilan y espacio reservado para la firma con `aspect-ratio`.
- `navbar`: “Use one `<nav>` landmark for narrow and wide layouts”. Mismo conjunto de enlaces, sin roles de menú de aplicación; navegación inferior persistente en móvil según Stitch. No necesita popover, posicionamiento anchor ni polyfills. Indicadores de foco, enlace de salto, área segura móvil y alternativa para colores forzados.
- `performance`: “DO self-host critical third-party dependencies”. Inter se sirve localmente; contenido renderizado en servidor, iconos SVG y diagramas CSS. Sin CDN de Tailwind, fuentes de iconos, scripts de animación o listeners de scroll del HTML de referencia. Movimiento suave solo con `prefers-reduced-motion: no-preference`.

Grid, flex, fuentes locales y media queries son la base. `text-wrap: balance` es una mejora opcional: el ajuste de texto normal permanece cuando no está disponible. No se introdujeron APIs nuevas que requieran un polyfill.

## Comprobaciones realizadas

- `npm run build`: compilación de producción correcta (Next.js 16.2.9).
- `npm run lint`: correcto.
- `npx tsc --noEmit`: correcto tras regenerar los tipos de rutas.
- `git diff --check`: correcto.
- `node scripts/check-routes.mjs`: 18 verificaciones correctas con el servidor en puerto 3210; redirecciones, query strings, idiomas, contenido, canonical, anclas, imágenes OG, 404 y 401 de admin.
- Navegador integrado: escritorio 1440×1000, móvil 390×844 y 320×740; sin desbordamiento horizontal en consultoría. Inter y fondo carbón comprobados mediante estilos calculados.
- Navegación a servicios: destino visible por debajo de la cabecera; cambio ES/EN y acceso a `/dev/en` comprobados.
- Capturas: `consultor-desktop.jpg`, `consultor-mobile.jpg`.

Para repetir las comprobaciones HTTP: `npm run build`, `npm run start -- --port 3210`, y en otra terminal `node scripts/check-routes.mjs`. Puede configurar otra dirección con `TEST_BASE_URL`.

No se ha desplegado a producción. No se realizó una auditoría Lighthouse, ni una matriz de navegadores Safari/Firefox, ni envío de correos reales.

## Extensión a /dev — 21 de noviembre de 2026

Por solicitud de Julio, /dev y /dev/en adoptan la misma paleta exacta de consultoría. El tema está aislado en app/dev/dev.css; no modifica el tema del administrador. Se sustituyeron acentos lavanda/dorados y brillos violeta por carbón, superficies Stitch y turquesa #00C4B4 (hover #00A89A). Se actualizaron también el icono específico de dev y su imagen social. Contenido, tipografía y estructura del portafolio se conservan. Guía color: foco visible con alternativa Highlight en colores forzados.
Comprobación dev: build y TypeScript correctos; navegador a 1440 y 390 px, fondo rgb(18,20,22), CTA rgb(0,196,180), tarjetas rgb(30,32,34) y títulos rgb(240,241,245). Sin desbordamiento horizontal en móvil.
Menú dev: enlace Consultoría / Consulting con destino por idioma. Visible en escritorio y fila compacta móvil. Build correcto y navegación /dev a /consultor comprobada en navegador. Guía navbar: enlace nativo, sin roles de menú de aplicación.

## Reparación del menú responsive — 23 de noviembre de 2026

Se restauraron las cinco opciones de dev en todos los tamaños: dos filas bajo 640 px y una fila entre 640 y 1023 px; escritorio conserva los enlaces en la cabecera. Se reserva espacio para la navegación fija y sus destinos mediante scroll-padding-top.
Guía aplicada: modern-web-guidance, búsqueda responsive navigation links; navbar y responsive-design. Un solo nav, enlaces nativos accesibles por teclado, áreas táctiles de 44 px y layout CSS sin JavaScript adicional.
Verificación: build de producción y git diff --check correctos. Navegador integrado en español a 390 y 768 px e inglés a 320 px: las cinco opciones dentro del ancho visible, sin desbordamiento horizontal. Habilidades lleva a #arsenal y deja el destino bajo la cabecera (120 px frente a 100 px); Consultoría lleva a /consultor. Captura: dev-menu-responsive.jpg. Proyectos y Blog conservan sus enlaces preexistentes; sus secciones no están actualmente renderizadas en el portafolio.

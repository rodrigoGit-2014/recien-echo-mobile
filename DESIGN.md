# Design Handoff: ReciénEcho

## Overview

ReciénEcho es una app móvil que funciona como **radar vivo del barrio**: muestra en un mapa los
alimentos que negocios y emprendedores locales acaban de hacer (pan, empanadas, sopaipillas, tortas,
etc.). Cada publicación permanece visible **30 minutos**. No hay reservas ni pagos — la app solo conecta
el antojo del vecino con lo que está saliendo del horno cerca de él.

Tres roles: **Vecino** (descubre y va a buscar), **Negocio/administrador** (registra el negocio, obtiene
un código único, publica y gestiona colaboradores) y **Colaborador** (se une a un negocio con su código
y publica a su nombre).

## Sobre los archivos de diseño

Los archivos de este proyecto (`ReciénEcho.html` + los `.jsx` que carga) son un **prototipo de referencia
en HTML/React** construido para validar la experiencia — no es código de producción para copiar tal cual.
La tarea es **recrear este diseño** en el entorno del proyecto destino (React Native/Expo, Flutter, iOS
nativo, etc., según lo que ya use el codebase, o el framework más adecuado si no existe ninguno aún),
respetando exactamente la estética, los flujos y los comportamientos descritos abajo.

## Fidelidad

**Alta fidelidad (hifi).** Colores, tipografía, espaciado e interacciones están definidos y deben
recrearse con precisión — no es un wireframe. Los valores exactos (hex, px, pesos de fuente) están
en la sección de Tokens.

---

## 1. Sistema de diseño

### 1.1 Paleta (tema oscuro cálido)

| Token | Valor | Uso |
|---|---|---|
| `bg` | `#14140F` | Fondo principal (casi negro cálido) |
| `surface` | `#1F1F1A` | Tarjetas, inputs, chips inactivos |
| `line` | `rgba(247,246,241,0.10)` | Bordes y divisores |
| `text` | `#F7F6F1` | Texto principal (blanco cálido) |
| `text-dim` | `#93928A` | Texto secundario |
| `accent` | `#FFE03D` | Amarillo vivo — color protagonista (marca, CTA primario, estados activos) |
| `fresh` | `#4ADE80` | Verde "frescura" — en vivo, éxito, confirmaciones |
| error | `#FF7A6B` (borde) / `#FF8A7B` (texto) | Validación de formularios |
| urgencia | `#FF7A45` | Estado de frescura "último" (< 8 min) |

Texto sobre `accent` → `#1a1700`. Texto sobre `fresh` → `#06281A`.

Fondo de body (detrás del marco del teléfono): `radial-gradient(120% 80% at 50% 0%, #1c1c17 0%, #0c0c0a 60%)`.

### 1.2 Estados de frescura (sobre ventana de 30 min = 1800s)

| Estado | Umbral (segundos restantes) | Color |
|---|---|---|
| `fresco` | > 1080 (18 min) | `--fresh` |
| `tibio` | 480–1080 (8–18 min) | `--accent` |
| `ultimo` | < 480 (8 min) | `#FF7A45` |

### 1.3 Tipografía

- **Display** (títulos, números destacados, botones): **Cabinet Grotesk**, pesos 700/800,
  `letter-spacing: -0.02em` en títulos grandes.
- **Cuerpo** (texto, labels, inputs): **Manrope**, pesos 400/500/600/700.
- **Mono** (tiempos, códigos de negocio): **Space Mono**, peso 700.

Escala usada en el prototipo:
- Título de pantalla (h1): 24–32px, peso 800.
- Título de tarjeta/pin: 15–19px, peso 700–800.
- Cuerpo/párrafo: 13–17px, peso 400–600.
- Números destacados (contadores, precios, timers): 22–44px, peso 800.
- Nunca menor a 12px.

### 1.4 Categorías (tinte + ícono de línea)

| id | Label | Tinte | Ícono (línea, trazo 2px, redondeado) |
|---|---|---|---|
| `pan` | Pan | `#E8A23D` | Hogaza con cortes |
| `empanadas` | Empanadas | `#E5673B` | Media luna con repulgue |
| `pizza` | Pizza | `#D94C3D` | Porción triangular con toppings |
| `cafe` | Café | `#B07A4F` | Taza con vapor |
| `pasteles` | Pasteles | `#E86B9E` | Cupcake |
| `sopaipillas` | Sopaipillas | `#CC8A3C` | Disco frito con hoyos |
| `tortas` | Tortas | `#9B7BD4` | Torta en capas con cereza |

### 1.5 Componentes base

**Botón primario**
- Alto 56px, radio 18px, sin borde.
- Fondo `accent` (variante `primary`) o `fresh` (variante `fresh`, para acciones de "publicar").
- Variante `ghost`/`dark`: fondo `surface`, borde 1px `line`.
- Tipografía display 700 17px, `letter-spacing: -0.01em`, `white-space: nowrap`.
- Al presionar: `transform: scale(0.97)`, transición 120ms.
- Estado disabled: opacity 0.4.

**Botón social** (Google / Apple / correo)
- Alto 54px, radio 16px.
- Google/Apple: fondo blanco, texto oscuro, ícono de marca a la izquierda.
- Correo: fondo `surface`, borde `line`.

**Input de texto**
- Alto 54px, radio 16px, fondo `surface`, borde 1px `line`.
- Foco: borde `accent`. Error: borde `#FF7A6B` + texto de error debajo con ícono de alerta, color `#FF8A7B`, 12.5px.
- Campo contraseña: ícono de ojo a la derecha (toggle mostrar/ocultar), padding derecho 50px.
- Medidor de fuerza de contraseña: 4 barras de 4px alto, colorean progresivamente rojo → amarillo → verde,
  con etiqueta ("Muy débil"…"Fuerte").

**Marca**
- `BrandMark`: 3 arcos concéntricos amarillos (efecto "eco"/pulso) + punto central sólido, todo en `accent`.
- `Wordmark`: "Recién" en color texto + "Echo" en `accent`, mismo peso 800.

**TopBar**
- Alto 56px. Botón atrás: 42×42px, radio 14px, fondo `surface`, borde `line`, ícono flecha izquierda.
- Título centrado opcional, peso 700, 16px. Slot derecho opcional (acción secundaria).

**Bottom sheet**
- Radio superior 26–28px, borde 1px `line` (sin borde inferior), fondo `bg` sólido.
- Handle: barra 40×5px, radio 3px, color `line`, centrada.
- Backdrop (cuando es modal, ej. hoja de colaborador): `rgba(0,0,0,0.6)` sólido — no debe depender de una
  animación para hacerse opaco (ver regla de animación abajo).

**Chip de filtro/categoría**
- Alto 38–40px, radio 19–20px, padding horizontal 14–15px.
- Inactivo: fondo `rgba(20,20,16,0.8)` + borde `line` + backdrop-blur.
- Activo: fondo del tinte de la categoría (o `accent` para "Todos"), texto `#1a1700`, sin borde.

### 1.6 Marco del dispositivo

- Diseño para **390×844px** (iPhone). Marco con gradiente `linear-gradient(150deg, #2a2a26, #0c0c0a)`,
  radio 56px, isla dinámica simulada (118×34px, negra, centrada arriba) e indicador home (134×5px) simulado.
- Barra de estado simulada con hora, señal, wifi y batería.

### 1.7 Movimiento y regla crítica de animación

- Transición entre pantallas: deslizamiento horizontal 16–18px + fade, 320–340ms, `cubic-bezier(.3,.7,.2,1)`.
- Pines y elementos que entran: "pop" de escala desde ~0.85 hasta 1, 350–450ms.
- **Regla no negociable:** el **estado de reposo** de cualquier elemento animado debe ser el estado
  **final/visible** (opacity: 1). La animación debe partir de un offset sutil (escala, translateX/Y pequeño)
  y terminar en el estado normal — nunca al revés. Si el motor de animación se pausa o no llega a
  completarse (backgrounding, hidratación tardía, reduced motion), el contenido debe seguir siendo visible
  y usable. Esto aplica especialmente a listas de pines, hojas modales y transiciones de pantalla.
- Respetar `prefers-reduced-motion: reduce` (duración casi nula).
- Loops decorativos (anillos "sonar") están bien para ambientación, pero nunca deben ocultar contenido.

---

## 2. Mapa de pantallas y flujos

Router de una sola pila con back/forward; **ningún callejón sin salida**. 21 pantallas:

1. **Splash** → 2. **Selección de modo** (Vecino / Negocio / Colaborador)

### Flujo Vecino
3. Registro (Google/Apple/correo) → 4. Permiso de ubicación → 5. **Radar** (pantalla principal) →
6. Detalle de producto

### Flujo Negocio (administrador)
7. Crear cuenta (correo+contraseña con validación, o Google/Apple) → 8. Configurar negocio
(nombre, categoría, ubicación, descripción, logo) → 9. Verificar correo (Google se lo salta) →
10. Cuenta verificada (se genera código `XXX-0000`) → 11. **Dashboard** (código, métricas, accesos) →
12. Colaboradores (añadir/editar/activar-desactivar) → 13. Configuración del negocio (pantalla 8 en modo edición)

### Flujo Colaborador
14. Unirse con código → 15. Confirmar negocio encontrado

### Publicar (compartido admin/colaborador)
16. Publicar producto (foto, producto, cantidad) → 17. Confirmación (pin en vivo, reloj 30:00)

### Recuperación de contraseña (negocio)
18. Iniciar sesión → 19. Olvidé mi contraseña → 20. Nueva contraseña (código + password) →
21. Contraseña actualizada

### Detalle por pantalla

**1. Splash** — Marca + wordmark centrados, anillos sonar ambientales (decorativos, amarillos, loop).
Tagline: *"El radar vivo de tu barrio. Descubre lo que está recién hecho cerca de ti, ahora mismo."*
CTA primario **Empezar** → Selección de modo. Link secundario **Iniciar sesión** → entra directo al Radar.

**2. Selección de modo** — 3 tarjetas apiladas, cada una: ícono en círculo de color (tinte propio),
título 18–19px, descripción 13.5–14px, chevron derecho. Vecino = `accent`, Negocio = `fresh`,
Colaborador = `#E5673B`.

**5. Radar** (ver sección 3 — pantalla más importante).

**6. Detalle de producto** — Foto hero 300px alto, gradiente tintado por categoría de la publicación
con el ícono de categoría gigante y semitransparente de fondo. Badge de frescura flotante
(punto + label + tiempo). Debajo: nombre del producto (h1), negocio con ícono de categoría,
grid de 3 stats (distancia / minutos a pie / hace cuánto se publicó), tarjeta de dirección con
ícono de pin, nota de confianza ("Sin reservas, sin pagos…"), CTA **Cómo llegar** (cambia a
"Ruta iniciada" en verde al tocar).

**7. Crear cuenta (negocio)** — títulos + botones sociales, separador "o con tu correo", campos
correo/contraseña con validación en vivo (formato, duplicado, fuerza), CTA **Crear cuenta**,
link a iniciar sesión.

**8. Configurar negocio** — barra de progreso (3 segmentos), selector de logo circular (72px, opcional),
campo nombre, grid 3 columnas de categorías (ícono + label, seleccionable), campo ubicación con
mini-mapa decorativo debajo (92px alto, calles esquemáticas + pin), textarea de descripción opcional.
CTA **Crear negocio** (o **Guardar cambios** en modo edición).

**9. Verificar correo** — ícono de sobre en círculo, mensaje con el correo en negrita, CTA
**Ya verifiqué mi correo**, link **Reenviar** con cuenta regresiva de 30s.

**10. Cuenta verificada** — check verde grande con anillos, mensaje de éxito, CTA **Ir a publicar** / **Ir al panel**.

**11. Dashboard (admin)** — header con logo+nombre truncado del negocio y botón cerrar sesión.
Tarjeta destacada (gradiente sutil amarillo) con el **código de negocio** en mono grande.
Grid 3 columnas de métricas (publicado hoy / vistas hoy / colaboradores). Dos filas de navegación
(Colaboradores, Configuración) con ícono + título + subtítulo + chevron. CTA fija abajo **¡Recién hecho!** (verde).

**12. Colaboradores** — tarjeta de código de invitación con botones regenerar/compartir.
Encabezado "Equipo · N activos" + botón **Añadir**. Lista de filas: avatar circular con inicial,
nombre, cargo + estado, botón editar (lápiz) y botón activar/desactivar. Estado vacío con mensaje.
**Hoja (bottom sheet)** de añadir/editar: campo nombre + chips de cargo, CTA **Añadir al equipo**/**Guardar cambios**.

**14. Unirse con código** — ícono de tarjeta/badge, campo de código (formato `ABC-1234`, mayúsculas
automáticas), hint de código de demo, CTA **Buscar negocio**.

**15. Confirmar negocio** — ícono grande del negocio encontrado (tinte de su categoría), nombre,
código en mono, texto explicativo, CTA **Unirme a [negocio]**.

**16. Publicar producto** — título "¿Qué hiciste hoy?", aviso de ventana de 30 min, selector de foto
(rectángulo 132px, dashed si vacío), chips de producto según categoría del negocio, stepper de
cantidad (− / número grande / +), CTA **¡Recién hecho!** (verde, ícono de rayo).

**17. Confirmación de publicación** — check verde con anillos, mensaje "¡Estás en el radar!",
tarjeta de vista previa del pin (anillo de progreso, ícono, producto, negocio+cantidad, reloj 30:00
en mono verde), CTA **Ver mi pin en el radar** / link **Publicar algo más**.

**18–21. Iniciar sesión / recuperar contraseña** — mismos patrones de formulario que el registro;
banner de error rojo suave para credenciales inválidas o cuenta no verificada; recuperación en 3 pasos
(correo → código de 4 dígitos + nueva contraseña con medidor y confirmación → pantalla de éxito).

---

## 3. Pantalla Radar — especificación detallada

Es la pantalla más importante del producto.

### 3.1 Mapa (fondo)
- Estilo Google Maps en modo oscuro: base `#21252B`/`#23272E`.
- Manzanas sutiles (líneas repetidas casi invisibles), 2–3 parques (verde apagado `#2C3A2E`, esquinas
  redondeadas), un cuerpo de agua (azul apagado `#2A4A57`), red de calles secundarias diagonales,
  avenidas principales más anchas y grises, **una avenida resaltada en amarillo** (`#E6B645`, opacity 0.85),
  etiquetas de calle/parque en gris tenue.
- Marcador de usuario: punto azul `#4285F4` 18px, borde blanco 3px, halo translúcido 120px y anillo
  "sonar" animado en loop.
- Botón flotante **centrar ubicación**: 48×48px, radio 15px, esquina inferior derecha, sube su posición
  cuando el bottom sheet se expande.

### 3.2 Pines de publicación
- Forma de gota (teardrop): 50×50px, `border-radius: 50% 50% 50% 0`, rotado 45°, color = tinte de
  categoría, borde blanco 2.5px, ícono de categoría 24px centrado (contrarrotado), sombra de caída.
- Cápsula de tiempo debajo del pin: fondo blanco, texto oscuro, mono 700 11px, punto de color de
  frescura, contenido = **tiempo transcurrido** desde publicación (ej. "2 min", "recién") —
  no cuenta regresiva.
- Pin seleccionado: escala ×1.12 + halo del color de frescura.
- Reposo siempre a opacidad 1 (ver regla de animación); pines fuera del filtro activo se atenúan a 0.22.

### 3.3 Clustering
- Publicaciones dentro de un radio de proximidad se agrupan en un pin de **clúster**: círculo amarillo
  56px, borde blanco 3px, número de publicaciones en el centro (display 800, 22px), cápsula "aquí cerca".
- Al tocar el clúster, sus pines se despliegan en abanico alrededor del punto central (radio ~11% del
  contenedor, ángulos distribuidos uniformemente).

### 3.4 Overlay superior
- Top bar translúcida (fondo `rgba(20,20,16,0.82)` + blur en sus chips): logo (30px) + wordmark (20px)
  a la izquierda; a la derecha, botón de **notificaciones** (con punto naranja de aviso) y botón de
  **perfil/modo** (42×42px cada uno, radio 13px, borde `line`).
- Debajo, **carrusel de categorías** horizontal con scroll: "Todos" + las 7 categorías. Filtra pines y
  lista al instante.

### 3.5 Bottom sheet "Cerca de ti"
- Alto colapsado ~188px, expandido ~64% de la pantalla; transición de alto 340ms `cubic-bezier(.3,.8,.3,1)`.
- Handle + encabezado tocable: título "Cerca de ti" (display 800 19px) + contador "N recién hechos"
  (13px, dim) + chevron que rota 180° al expandir.
- Lista ordenada por **distancia ascendente**. Cada tarjeta: miniatura 62×62px (radio 14px, gradiente
  tintado por categoría + ícono), producto (700 15.5px, trunca), negocio (13px dim, trunca), fila de
  meta (punto+tiempo transcurrido coloreado por frescura, distancia), chevron derecho. Tarjeta activa
  resaltada con fondo/borde amarillo tenue.
- Estado vacío: mensaje centrado contextual al filtro activo.
- Tocar una tarjeta abre el Detalle de producto y marca su pin como activo en el mapa.

### 3.6 Comportamiento temporal
- Cada publicación tiene TTL de 1800s (30 min); su tiempo transcurrido sube cada segundo/minuto y al
  llegar a 0 restante desaparece del radar automáticamente.
- Nuevas publicaciones pueden aparecer mientras el usuario navega (spawn), para transmitir que el radar
  "respira" en tiempo real.

---

## 4. Reglas de negocio

- TTL fijo de **30 minutos** por publicación; sin excepciones ni extensión manual en el prototipo.
- El **código de negocio** (`XXX-0000`, prefijo derivado de la categoría) es la llave para que
  colaboradores se unan; el administrador puede **regenerarlo** en cualquier momento (invalida el anterior).
- El **cargo** de un colaborador es descriptivo únicamente — **todos los colaboradores activos pueden
  publicar igual**, no hay niveles de permiso.
- **Privacidad:** el vecino nunca ve qué colaborador individual publicó, solo el nombre del negocio.
- Sin reservas, sin pagos, sin inventario — la app **solo informa** disponibilidad puntual.

## 5. Tono y copy

- Español de Chile, cálido y directo, de barrio: "recién hecho", "tu barrio", "a pocos pasos".
- Microcopy honesto sobre privacidad de ubicación.
- Nombres de producto realistas por categoría (ej. sopaipillas pasadas/recién fritas, torta de tres
  leches, empanadas de pino).
- Evitar jerga corporativa; frases cortas.

---

## 6. Assets

- No hay imágenes de fotografía real: las "fotos" de producto son **placeholders con gradiente tintado**
  por color de categoría + ícono de línea superpuesto en baja opacidad. Un desarrollador de producción
  debe sustituirlos por fotos reales subidas por cada negocio.
- Íconos: todos son SVG de línea dibujados a mano (trazo 2px, redondeado), no de una librería externa —
  ver `data.jsx` → `CatIcon` para las 7 formas exactas si se necesita referencia geométrica.
- Fuentes: Cabinet Grotesk (vía Fontshare), Manrope y Space Mono (vía Google Fonts).

## 7. Archivos de referencia en este proyecto

- `ReciénEcho.html` — shell, tokens CSS, keyframes, carga de scripts.
- `data.jsx` — categorías, íconos, datos mock, helpers de formato de tiempo/distancia, generador de código de negocio.
- `components.jsx` — primitivas compartidas (marco de teléfono, botones, marca, barra superior, botones sociales).
- `radar.jsx` — pantalla Radar completa (mapa, pines, clustering, bottom sheet).
- `screens-vecino.jsx` — splash, registro vecino, permiso de ubicación, detalle de producto.
- `screens-vendor-auth.jsx` — autenticación completa de negocio (crear cuenta, verificar, iniciar sesión, recuperar contraseña).
- `screens-business.jsx` — dashboard, colaboradores, unirse como colaborador, confirmar negocio.
- `screens-emprendedor.jsx` — selección de modo, publicar producto, confirmación de publicación.
- `app.jsx` — router central y estado global (pines en vivo, sesión, código de negocio, colaboradores).

Abrir `ReciénEcho.html` en un navegador reproduce el prototipo completo y navegable — úsalo como
referencia visual e interactiva junto con este documento.

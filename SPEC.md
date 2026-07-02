# ReciénEcho

## Idea general

Diseñar un prototipo móvil de alta fidelidad para validar una hipótesis de negocio utilizando principios de Design Thinking y el proceso Double Diamond.

La aplicación busca conectar a vecinos que desean disfrutar alimentos recién preparados con negocios locales que los elaboran, mediante un radar vivo del barrio que muestra en tiempo real aquellos productos que acaban de estar listos para ser disfrutados.

No es un marketplace ni una aplicación de delivery.

ReciénEcho es un radar que elimina la incertidumbre y permite que los vecinos sepan exactamente cuándo vale la pena salir de casa porque aquello que necesitan o se les antoja está recién hecho y disponible cerca de ellos.

---

# Idea en una frase

> "Porque las mejores cosas se disfrutan recién hechas, ReciénEcho te ayuda a encontrarlas en el momento perfecto."

---

# Contexto del problema

Existen negocios locales y pequeños emprendimientos que elaboran alimentos como pan, empanadas, tortas, pasteles, pizzas, sopaipillas y otros productos cuyo valor aumenta significativamente cuando se disfrutan recién preparados.

Sin embargo, para los vecinos que desean comprarlos, encontrar estos productos en su momento perfecto sigue siendo, en gran medida, una cuestión de suerte.

Hoy, una persona puede salir de su casa con ganas de comprar pan caliente para la once, empanadas recién horneadas para compartir en familia o sopaipillas recién hechas para una tarde fría, sin tener certeza de si realmente encontrará aquello que busca en su mejor momento.

Como consecuencia:

* Depende del azar para encontrar productos recién hechos.
* Realiza desplazamientos innecesarios.
* Experimenta frustración al llegar demasiado temprano o demasiado tarde.
* Termina conformándose con una experiencia inferior.
* Pierde oportunidades de disfrutar productos en su punto máximo de frescura.

Por otro lado, los negocios locales no cuentan con una forma simple e inmediata de avisar a su comunidad que una nueva tanda de productos acaba de estar lista.

Además, en muchos negocios quien prepara el producto no es necesariamente quien administra el negocio. Por ejemplo:

* Un dueño administra la panadería.
* Uno o más panaderos elaboran el pan.
* Un vendedor atiende a los clientes.

La persona que termina una nueva tanda debe poder avisar rápidamente a los vecinos sin depender de las credenciales personales del dueño.

---

# Usuarios

## Usuario vecino

Personas que valoran disfrutar alimentos recién preparados y desean saber cuándo están disponibles cerca de ellos.

### Problema

No sabe cuándo los productos que le gustan están recién hechos.

---

## Administrador del negocio

Persona que registra y configura el negocio en ReciénEcho.

Ejemplos:

* Dueño de panadería.
* Dueño de cafetería.
* Administrador de local gastronómico.
* Emprendedor individual.

### Problema

Necesita una forma simple de informar que sus productos están recién hechos.

---

## Colaborador

Persona autorizada por un negocio para publicar productos recién hechos.

Ejemplos:

* Panadero.
* Pastelero.
* Cocinero.
* Vendedor.

### Problema

Necesita publicar rápidamente cuando una nueva tanda está lista sin depender del administrador.

---

# Trabajo a realizar (JTBD)

## Vecino

> "Cuando quiero comprar algo rico para comer o llevar a mi casa, necesito saber cuándo estará recién hecho para salir justo en el momento indicado."

## Negocio

> "Cuando una nueva tanda de productos está lista, quiero avisar rápidamente a los vecinos cercanos para que sepan que pueden venir mientras aún está en su mejor momento."

---

# Hipótesis a validar

> "Un radar vivo que permita a los vecinos saber cuándo vale la pena salir de casa porque aquello que necesitan o se les antoja está recién hecho, genera visitas recurrentes."

---

# Restricciones del MVP

NO incluir:

* Pagos.
* Delivery.
* Reservas.
* Chat.
* Programas de fidelización.
* Inteligencia artificial.
* Inventarios complejos.
* Recomendaciones avanzadas.
* Perfiles detallados.

El radar debe ser la propuesta de valor principal.

---

# Historias Must

## Historia 1: Registro de vecino

**Como** vecino
**Quiero** registrarme rápidamente
**Para** acceder al radar del barrio

### Criterios de aceptación

* Registro con Google.
* Registro con correo electrónico.
* Proceso inferior a 30 segundos.

---

## Historia 2: Permitir acceso a ubicación

**Como** vecino
**Quiero** otorgar acceso a mi ubicación
**Para** visualizar productos cercanos

### Criterios de aceptación

* Explicar por qué se solicita ubicación.
* Centrar automáticamente el radar.

---

## Historia 3: Explorar radar del barrio

**Como** vecino
**Quiero** visualizar productos recién hechos cercanos
**Para** decidir si vale la pena salir de casa

### Criterios de aceptación

* Mostrar ubicación actual.
* Mostrar pines cercanos.
* Mostrar categorías.
* Mostrar tiempo transcurrido desde publicación.
* Actualización automática.
* Eliminación automática de publicaciones expiradas.

---

## Historia 4: Ver detalle del producto

**Como** vecino
**Quiero** ver más información del producto
**Para** decidir si quiero ir a buscarlo

### Debe mostrar

* Fotografía.
* Nombre del negocio.
* Dirección.
* Distancia.
* Tiempo desde publicación.
* Botón "Cómo llegar".

---

# Gestión del negocio

## Historia 5: Registro de negocio (Sign Up)

**Como** administrador
**Quiero** registrar mi negocio
**Para** comenzar a publicar productos recién hechos

### Métodos de registro

* Google.
* Correo electrónico y contraseña.

### Datos obligatorios

* Nombre comercial.
* Dirección.
* Categoría principal.

### Datos opcionales

* Descripción.
* Fotografía o logo.

### Resultado

* El negocio queda configurado.
* Se crea automáticamente un código único de negocio.

Ejemplo:

```text
PAN-4821
```

---

## Historia 5.1: Inicio de sesión

**Como** administrador
**Quiero** iniciar sesión
**Para** administrar mi negocio

### Criterios

* Login con Google.
* Login con correo y contraseña.
* Recordar sesión.
* Cerrar sesión.
* Recuperación de contraseña.

---

## Historia 5.2: Recuperar contraseña

**Como** administrador
**Quiero** recuperar mi contraseña
**Para** volver a acceder a mi cuenta

### Criterios

* Solicitar correo.
* Enviar código o enlace.
* Permitir definir nueva contraseña.
* Confirmar cambio exitoso.

---

## Historia 5.3: Gestionar colaboradores

**Como** administrador

**Quiero** incorporar y administrar colaboradores

**Para** que puedan publicar productos recién hechos en representación del negocio.

### Criterios de aceptación

* Sección "Colaboradores".
* Generar invitación para colaborador.
* Registrar nombre del colaborador.
* Registrar cargo o función dentro del negocio.
* Visualizar colaboradores activos.
* Editar información de colaboradores.
* Desactivar colaboradores.

### Datos del colaborador

* Nombre
* Correo electrónico (opcional para el MVP)
* Cargo o función

### Ejemplos de cargos

* Panadero
* Pastelero
* Cocinero
* Vendedor
* Barista
* Maestro pizzero
* Encargado de producción

### Resultado

Cada colaborador queda identificado dentro del negocio mediante su nombre y cargo.

El cargo tiene fines administrativos y no modifica permisos dentro del MVP.

---

## Historia 5.4: Unirse a un negocio

**Como** colaborador
**Quiero** asociarme a un negocio mediante un código
**Para** poder publicar productos

### Criterios

* Opción "Soy colaborador".
* Ingreso de código de negocio.
* Asociación automática.
* Proceso inferior a 30 segundos.

### Resultado

* El colaborador puede publicar inmediatamente.

---
## Historia 5.5: Identificación del colaborador

**Como** administrador

**Quiero** identificar a cada colaborador mediante su nombre y cargo

**Para** saber quién realiza publicaciones dentro del negocio.

### Criterios de aceptación

* El administrador puede visualizar el listado de colaboradores.
* Cada colaborador muestra:

  * Nombre.
  * Cargo.
  * Estado (Activo / Inactivo).
* El administrador puede modificar el cargo.
* El administrador puede desactivar colaboradores.

### Importante

Los cargos son descriptivos y no representan permisos.

Todos los colaboradores poseen las mismas capacidades dentro del MVP.

---
# Modelo de permisos

## Administrador

Puede:

* Configurar negocio.
* Editar negocio.
* Gestionar colaboradores.
* Publicar productos.
* Ver métricas básicas.

---

## Colaborador

Persona autorizada por un negocio para publicar productos recién hechos en representación del negocio.

Cada colaborador posee una función o cargo dentro del negocio que permite al administrador identificar quién es quién dentro del equipo.

### Ejemplos de cargos

* Panadero
* Pastelero
* Cocinero
* Vendedor
* Barista
* Maestro pizzero
* Encargado de producción

### Problema

Necesita publicar rápidamente cuando una nueva tanda está lista sin depender del administrador.

### Importante

El cargo del colaborador es visible únicamente para el administrador del negocio.

Los vecinos nunca visualizan información sobre colaboradores ni sus cargos.

---

# Historia 6: Compartir algo recién hecho

**Como** administrador o colaborador
**Quiero** informar rápidamente que un producto está listo
**Para** que los vecinos sepan que pueden venir

### Criterios de aceptación

* Seleccionar producto.
* Fotografía opcional.
* Cantidad aproximada opcional.
* Botón principal:

```text
¡RECIÉN HECHO!
```

* Completar publicación en menos de 10 segundos.

### Importante

* La publicación queda asociada al negocio.
* El vecino nunca ve qué colaborador realizó la publicación.

---

# Historia 7: Expiración automática

**Como** vecino
**Quiero** ver únicamente publicaciones recientes
**Para** confiar en la información

### Criterios

* Duración de 30 minutos.
* Contador dinámico.
* Eliminación automática.

---

# Comportamiento del radar

## Mapa principal

El radar debe utilizar un mapa real estilo Google Maps.

### Características

* Mostrar ubicación actual del usuario.
* Utilizar geolocalización real.
* Mostrar el punto azul tradicional con halo de ubicación.
* Centrar automáticamente el mapa en la ubicación del usuario.
* Permitir zoom y desplazamiento natural.
* Mantener una experiencia similar a Google Maps.

## Publicaciones en el mapa

Cada publicación recién hecha debe aparecer como un pin visual.

### Características de los pines

* Utilizar un pin circular moderno.
* Mostrar un icono grande del producto en el centro.
* Mostrar debajo una cápsula con el tiempo transcurrido desde la publicación.
* Utilizar colores distintos según categoría.
* Aplicar sombras suaves.
* Bordes redondeados.
* Diseño similar a Uber Eats, Google Maps y Airbnb.
* Deben ser reconocibles sin necesidad de abrir el detalle.

Ejemplo visual:

[Icono Pan]
    ↓
 [ 5 min ]

[Icono Pizza]
    ↓
 [ 2 min ]

### Ejemplos

* Pan → icono de pan.
* Empanadas → icono de empanada.
* Pizza → icono de pizza.
* Café → icono de taza.
* Pasteles → icono de torta.
* Sopaipillas → icono representativo.

## Carrusel de categorías

Sobre el mapa debe existir un carrusel horizontal de categorías.

### Características

* Desplazamiento horizontal.
* Scroll hacia izquierda y derecha.
* Cada categoría incluye icono y nombre.
* La categoría seleccionada se destaca visualmente.

### Categorías iniciales

* Todos
* Pan
* Empanadas
* Pizza
* Café
* Pasteles
* Sopaipillas
* Tortas

### Comportamiento

Al seleccionar una categoría:

* El radar filtra inmediatamente las publicaciones.
* Solo se muestran los pines asociados a dicha categoría.

Al seleccionar "Todos":

* Se muestran todas las publicaciones.

## Escalabilidad

Si múltiples publicaciones se superponen en una misma zona:

* Agrupar publicaciones mediante clustering.
* Mostrar contador de publicaciones.
* Expandir automáticamente al realizar zoom.

## Actualización en tiempo real

* Nuevas publicaciones aparecen automáticamente.
* No requiere refresco manual.
* Publicaciones expiradas desaparecen automáticamente.
* Actualizaciones fluidas.
* Sensación de barrio vivo.
* Información en tiempo real.
---

# Flujos principales

## Vecino

1. Abrir aplicación.
2. Registrarse o iniciar sesión.
3. Otorgar ubicación.
4. Acceder al radar.
5. Explorar publicaciones.
6. Ver detalle.
7. Presionar "Cómo llegar".

---
## Administrador

1. Abrir aplicación.
2. Registrarse.
3. Configurar negocio.
4. Obtener código de negocio.
5. Incorporar colaboradores.
6. Definir nombre y cargo de cada colaborador.
7. Gestionar colaboradores.
8. Publicar productos.

---

## Colaborador

1. Abrir aplicación.
2. Seleccionar "Soy colaborador".
3. Ingresar código del negocio.
4. Confirmar asociación.
5. Acceder a pantalla de publicación.
6. Presionar "¡Recién hecho!".

---
# Diseño de la pantalla Radar

La pantalla Radar es el corazón de la aplicación y debe ocupar la mayor parte del esfuerzo de diseño.

## Jerarquía visual

1. Mapa geolocalizado.
2. Pines de publicaciones.
3. Carrusel de categorías.
4. Bandeja de productos cercanos.

## Estructura visual

### Parte superior

* Logo ReciénEcho.
* Notificaciones.
* Carrusel horizontal de categorías.

### Zona central

* Mapa real estilo Google Maps.
* Ubicación actual del usuario.
* Pines de productos recién hechos.
* Botón para centrar ubicación.

### Parte inferior

Bottom Sheet deslizable.

Título:

"Cerca de ti"

Mostrar:

* Fotografía.
* Nombre del producto.
* Nombre del negocio.
* Tiempo desde publicación.
* Distancia.

Al seleccionar una tarjeta:

* Centrar el mapa.
* Abrir detalle del producto.

## Sensaciones que debe transmitir

* Frescura.
* Cercanía.
* Descubrimiento.
* Tiempo real.
* Vida de barrio.
* Simplicidad.

---
# Pantallas requeridas

## Vecino

* Bienvenida.
* Registro.
* Inicio de sesión.
* Permisos de ubicación.
* Radar con mapa geolocalizado.
* Detalle del producto.

## Administrador

* Registro de negocio.
* Inicio de sesión.
* Recuperación de contraseña.
* Dashboard.
* Configuración del negocio.
* Gestión de colaboradores.
* Generación de código.

## Colaborador

* Ingreso mediante código.
* Confirmación de asociación.
* Pantalla de publicación rápida.

---

# Métricas del experimento

## Vecinos

* Registros.
* Aperturas del radar.
* Visualizaciones de publicaciones.
* Aperturas de detalle.
* Clics en "Cómo llegar".
* Retorno semanal.

## Negocios

* Registros de negocios.
* Negocios activos.
* Publicaciones realizadas.
* Publicaciones recurrentes.

## Colaboradores

* Invitaciones generadas.
* Colaboradores incorporados.
* Colaboradores activos.
* Publicaciones realizadas por colaboradores.
* Negocios con múltiples colaboradores.
* Distribución de colaboradores por cargo.
---

# Criterios para evaluar la hipótesis

Responder:

* ¿Los vecinos vuelven a consultar el radar?
* ¿Cuántas veces regresan?
* ¿Los negocios publican repetidamente?
* ¿Los colaboradores utilizan la aplicación?
* ¿Los vecinos usan "Cómo llegar"?
* ¿La aplicación reduce la incertidumbre sobre cuándo salir de casa?

---

# Navegación del prototipo

* Todas las pantallas conectadas.
* Posibilidad de avanzar y retroceder.
* Transiciones implementadas.
* Navegación completamente funcional.
* Apto para pruebas de usabilidad.

---

# Estilo y tono

* Mobile first.
* Diseño cálido y cercano.
* Inspirado en la vida de barrio.
* Inspirado en productos artesanales.
* Sensación de frescura.
* Sensación de descubrimiento.
* Baja carga cognitiva.
* Una acción principal por pantalla.

---

# Inspiraciones visuales

* Google Maps (mapa y geolocalización).
* Airbnb (tarjetas y navegación).
* Too Good To Go (descubrimiento de alimentos).
* Uber Eats (carruseles y categorías).
* Waze (mapa vivo y ubicación).

> El radar debe ser el centro de toda la experiencia. ReciénEcho existe para ayudar a los vecinos a encontrar productos recién hechos exactamente en el momento perfecto.

# CRUD de productos en DynamoDB con Express

El sistema debe permitir la gestión de productos en una tienda en línea. Los productos tienen un nombre, precio, stock y categoría. Los nombres de productos no pueden ser duplicados y los precios no pueden ser negativos. El sistema debe registrar estos productos en DynamoDB y exponer una API REST para su consulta y manipulación.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Implementación de CRUD de productos con Express y DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Implementación de la funcionalidad básica de CRUD

**Objetivo:** Implementar las operaciones básicas de CRUD para productos en DynamoDB.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Diseña y crea las rutas de la API REST para crear, leer, actualizar y eliminar productos.
- Implementa la lógica para validar que los nombres de productos no sean duplicados y que los precios no sean negativos.
- Crea las pruebas unitarias para cubrir estas operaciones.

**Entregable:** API REST funcional con las operaciones CRUD básicas y pruebas unitarias.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo estructurar la tabla DynamoDB para optimizar las consultas.
- Piensa en cómo manejar los errores de validación.

</details>

### Fase 2: Implementación de validaciones y manejo de errores

**Objetivo:** Implementar las validaciones adicionales y el manejo de errores para las operaciones CRUD.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Agrega validaciones para asegurar que el stock sea un número entero positivo.
- Implementa el manejo de errores para las operaciones CRUD, incluyendo errores de red y de DynamoDB.
- Actualiza las pruebas unitarias para cubrir estos nuevos casos.

**Entregable:** API REST con validaciones adicionales y manejo de errores, y pruebas unitarias actualizadas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo comunicar los errores al usuario de la API.
- Piensa en cómo manejar los errores de red y de DynamoDB de manera robusta.

</details>

### Fase 3: Optimización y decisiones de diseño

**Objetivo:** Optimizar la implementación y tomar decisiones de diseño basadas en trade-offs.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Analiza el rendimiento de la API y considera optimizaciones para mejorarlo.
- Evalúa diferentes estrategias para manejar la consistencia y disponibilidad de los datos.
- Documenta las decisiones de diseño tomadas y sus consecuencias.

**Entregable:** API REST optimizada con decisiones de diseño documentadas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de índices en DynamoDB para mejorar el rendimiento.
- Piensa en cómo balancear la consistencia y la disponibilidad de los datos.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una operación CRUD y cómo se implementa en una API REST?
- **paraQueSirve**: ¿Para qué sirve validar los datos en una API REST y cómo se implementa?
- **comoSeUsa**: ¿Cómo se usa DynamoDB para almacenar y recuperar datos en una API REST?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar una API REST y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones de diseño implica la implementación de una API REST y cómo se documentan?

## Criterios de Evaluacion

- Implementación de las operaciones CRUD básicas.
- Validación de nombres de productos y precios.
- Manejo de errores en las operaciones CRUD.
- Optimización del rendimiento de la API.
- Documentación de las decisiones de diseño.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | (raiz) | practice, chapter | server | Node | Express, DynamoDB, Jest |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*

# Single-Page Portfolio — Design Spec

**Date:** 2026-04-13

## Objetivo

Consolidar todo el portafolio en una sola página (`app/page.tsx`) con un layout de dos columnas: 35% izquierda fija con el contenido del home, 65% derecha con la lista de proyectos scrolleable.

---

## Layout

```
┌─────────────────────┬──────────────────────────────────┐
│   35% — FIJO        │   65% — SCROLLEABLE              │
│                     │                                  │
│  [logo] Esteban     │  [thumb] QXENITH                 │
│  Great Software Dev │  [thumb] KOENIGSEGG CC850        │
│                     │  [thumb] ...                     │
│  tabs + descripción │                                  │
│                     │                                  │
│  🎲  😊 🐦 💼      │                                  │
│  [About]            │                                  │
└─────────────────────┴──────────────────────────────────┘
```

- `GridBackground` (Three.js) permanece detrás de todo, pantalla completa
- Layout: `h-screen`, sin scroll en la página raíz

---

## Panel Izquierdo (35%)

- Fijo, sin scroll
- Contenido actual del home: logo SVG, nombre, título, tabs de audiencia, descripción
- **Beliefs:** botón 🎲 que navega a `/beliefs`
- **Sociales/Connect:** iconos emoji enlazados (GitHub 🐙 o similar, LinkedIn, etc.) — sin página `/connect` en el nav
- **About:** botón de texto pequeño en la esquina inferior izquierda del panel
- El panel tiene el mismo estilo glassmorphism actual (border púrpura, backdrop-blur)

---

## Panel Derecho (65%)

- Scrolleable verticalmente
- Lista de thumbnails de proyectos, más pequeños que los actuales en `/work`
  - Tamaño sugerido: ~180-200px de ancho, aspect ratio 16/10
  - Al hacer hover: escala sutil + borde activo
  - Al hacer click: navega a la URL del proyecto (`project.link`) o a su página de detalle
- Sin panel expandible de detalle (a diferencia de `/work`)
- Sin navbar superior

---

## Navegación

- El navbar actual desaparece del home
- Las páginas `/work`, `/about`, `/beliefs`, `/connect` permanecen en el repo pero no son accesibles desde el nav principal
- About: botón esquina inferior izquierda del panel izquierdo
- Beliefs: botón 🎲 en el panel izquierdo
- Connect: eliminado del nav, reemplazado por emojis sociales inline

---

## Archivos afectados

- `app/page.tsx` — reescritura completa
- `components/navbar.tsx` — ya no se usa en home (se puede mantener para sub-páginas)
- `components/footer.tsx` — se puede mantener o simplificar

---

## Lo que NO cambia

- `lib/projects.ts` — fuente de verdad de proyectos, sin cambios
- `app/qxenith/page.tsx` y `app/koenigsegg-cc850/page.tsx` — páginas de detalle intactas
- `GridBackground` — mismo componente, misma configuración
- Paleta de colores y tipografía

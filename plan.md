# Plan: INGENIERIA DE PROMPT (HTML5)

> **Categoría:** IA / Manuales de Referencia  
> **Estado:** 🟢 Completado — SPA HTML5 vanilla implementada y funcional  
> **Tipo:** SPA HTML5 vanilla (estático, autocontenido, sin backend)  

---

## 📌 Resumen Ejecutivo

Manual interactivo SPA (Single Page Application) en HTML5 vanilla que explica, demuestra y enseña las **técnicas de Prompt Engineering** (Ingeniería de Prompts) para optimizar la interacción con modelos de lenguaje (LLMs): Zero-Shot, Few-Shot, Chain-of-Thought (CoT), Tree of Thoughts (ToT), Directional Stimulus, ReAct y metaprompting.

---

## 🎯 Objetivos

- [x] Crear estructura base SPA (index.html + css/styles.css + js/app.js).
- [x] Implementar sistema de navegación lateral y routing por hash.
- [x] Desarrollar sección de fundamentos de Prompt Engineering.
- [x] Documentar técnicas principales (Zero-Shot, Few-Shot, CoT, etc.).
- [x] Implementar demo interactiva: playground de comparación de prompts.
- [x] Añadir sección de patrones avanzados (ReAct, ToT, RAG-aware prompting).
- [x] Incluir galería de ejemplos prácticos por caso de uso.
- [x] Buscador en tiempo real de técnicas dentro del manual.
- [x] Diseño dark mode premium con glassmorphism y paleta HSL.

---

## 🏗️ Arquitectura

- **Patrón**: SPA monolítica estática vanilla con enrutador hash y playground de pruebas.

`	ext
INGENIERIA-DE-PROMPT/
├── index.html        # SPA completa con guías y comparador de prompts
├── css/
│   └── styles.css    # Variables CSS HSL, layout dark glassmorphism
├── js/
│   └── app.js        # Lógica interactiva, playground y buscador
├── README.md         # Documentación de uso
└── plan.md           # Plan de desarrollo y bitácora
`

---

## 🧠 Paradigma de Programación

- **Híbrido: Declarativo + Event-Driven**
- Vistas declarativas y reactividad por eventos DOM para la manipulación y comparación en vivo de prompts.

---

## 🌐 Propósito de Visibilidad y Destino Remoto

- **Visibilidad**: Público (Open Source / Portafolio).
- **Plataforma Remota Asignada**: GitHub.
- **Plataforma de Despliegue CI/CD**: GitHub Pages / Cloudflare Pages.
- **Justificación**: Guía interactiva y playground de experimentación de técnicas de Prompt Engineering para LLMs sin servidor; perfecto para GitHub Pages.

---

## 📊 Estado Actual

🟢 **Completado** — Entregable funcional y verificado.

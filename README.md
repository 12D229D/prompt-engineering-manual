# Manual y Guía de Ingeniería de Prompts

> Una guía completa, interactiva y estructurada para dominar el arte y la ciencia de comunicarse con Modelos de Lenguaje (LLMs).

## 📌 Resumen

Este proyecto es un **manual interactivo SPA (Single Page Application)** en HTML5 vanilla que explica, demuestra y enseña las **técnicas de Prompt Engineering** (Ingeniería de Prompts) para optimizar la interacción con modelos de lenguaje (LLMs).

El manual cubre desde conceptos básicos hasta técnicas avanzadas, con demos interactivas que permiten al usuario experimentar con las técnicas directamente en el navegador.

## 🛠️ Tecnologías Utilizadas

- **HTML5** (semántico, con etiquetas `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- **CSS3** (vanilla, con glassmorphism, paleta HSL, dark mode, transiciones y microinteracciones)
- **JavaScript ES6+** (vanilla, sin frameworks, con routing por hash)
- **Google Fonts** (*Inter* o *Outfit* para tipografía moderna)
- **Sin dependencias npm** (proyecto estático autocontenido)
- **Sin backend** (todo el contenido y demos se ejecutan en el navegador)

## 📂 Estructura del Proyecto

```
INGENIERIA-DE-PROMPT/
├── README.md            # Este archivo (instrucciones de ejecución)
├── index.html           # Estructura SPA, único <h1>, etiquetas semánticas
├── css/
│   └── styles.css        # Estilos premium (glassmorphism, HSL, dark mode)
└── js/
    └── app.js           # Lógica SPA: routing, contenido, demos interactivas
```

## 🚀 Instrucciones de Ejecución

### 1. Opción Recomendada: Servidor Estático

```bash
# Instala Live Server (opcional, pero recomendado)
npm install -g live-server

# Ejecuta el servidor en el directorio del proyecto
live-server
```

### 2. Alternativa: Servidor Estático con Node.js

```bash
# Usa el módulo 'serve' de npm
npx serve
```

### 3. Alternativa: Abrir Directamente en Navegador

Simplemente abre el archivo `index.html` directamente en tu navegador favorito.

## 🎨 Características Principales

- **Navegación lateral** con routing por hash
- **Buscador en tiempo real** de técnicas
- **Indicador de progreso** de lectura
- **Demo interactiva** de comparación de prompts
- **Modo oscuro/claro** con preferencia guardada
- **Diseño premium** con glassmorphism, paleta HSL y microinteracciones
- **Accesibilidad** mejorada (ARIA, semántica, contraste)
- **Sin dependencias** (100% cliente estático)

## 📚 Contenido del Manual

1. **Fundamentos de Prompt Engineering**
   - Anatomía de un prompt perfecto
   - Tokens, ventana de contexto y limitaciones

2. **Técnicas Principales**
   - Zero-shot prompting
   - Few-shot prompting
   - Chain-of-Thought (CoT)
   - Role prompting
   - Formato e instrucciones

3. **Patrones Avanzados**
   - ReAct (Reasoning + Acting)
   - Tree of Thoughts (ToT)
   - Self-Consistency
   - Prompt Chaining
   - RAG-aware prompting

4. **Mejores Prácticas**
   - Reglas de oro para optimizar prompts

5. **Galería de Ejemplos**
   - Plantillas listas para usar en desarrollo de software, análisis de datos y redacción

6. **Demo Interactiva**
   - Playground comparativo de prompts ingenuos vs optimizados

## 🎯 Objetivo del Proyecto

Este manual busca ser una **referencia práctica y visual** para desarrolladores, científicos de datos y cualquier persona interesada en optimizar su interacción con modelos de lenguaje. El enfoque es **aprender haciendo**, con ejemplos concretos y una demo interactiva que permite experimentar en tiempo real.

## 📝 Notas Adicionales

- **Proyecto consistente** con los manuales hermanos del portafolio: `EMBEDDINGS`, `FINE-TUNING`, `RAG`, `INGENIERIA-DE-CONTEXTO`.
- La demo interactiva **no** requiere conexión a un LLM real; simula la salida con plantillas predefinidas para evitar dependencias externas y claves API.
- El contenido debe ser bilingüe o en español, consistente con el resto del portafolio.
- Priorizar claridad, ejemplos visuales y diagramas explicativos.

## 📅 Historial de Cambios

- **2026-08-03**: Versión inicial del manual.

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

## 📝 Contacto

Para preguntas o sugerencias, contactar a [IGD](mailto:igdelgado@outlook.com).

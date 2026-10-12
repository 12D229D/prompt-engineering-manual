/**
 * Manual y Guía de Ingeniería de Prompts - Script Principal
 *
 * Módulos:
 *   initTheme, initNavigation, initSearch, initCodeCopy,
 *   initProgressTracking, initPromptDemo (simulación de prompts), initMobileMenu
 *
 * Convenciones de localStorage:
 *   prompt_guide_theme       -> 'dark' | 'light'
 *   prompt_read_sections -> ["fundamentos", ...]
 *
 * Aviso de seguridad: ninguna función abre sockets ni lanza procesos stdio.
 * El wizard simula la generación de prompts y comparación de resultados.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initSearch();
    initCodeCopy();
    initProgressTracking();
    initPromptDemo();
    initMobileMenu();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    const savedTheme = localStorage.getItem('prompt_guide_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('prompt_guide_theme', newTheme);
            updateThemeUI(newTheme);
        });
    }

    function updateThemeUI(theme) {
        if (themeIcon && themeText) {
            if (theme === 'dark') {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Modo Oscuro';
            } else {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Modo Claro';
            }
        }
    }
}

/* ==========================================================================
   2. Navigation & SPA Routing via Hash
   ========================================================================== */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.doc-section');
    const currentCrumb = document.getElementById('current-crumb');

    function activateSection(targetId, updateHash = true) {
        if (!targetId) targetId = 'inicio';

        sections.forEach(sec => sec.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));

        const targetSection = document.getElementById(targetId);
        const targetNavItem = document.querySelector(`.nav-item[data-target="${targetId}"]`);

        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (targetNavItem) {
                targetNavItem.classList.add('active');
                if (currentCrumb) {
                    currentCrumb.textContent = targetNavItem.querySelector('.nav-text')?.textContent || targetId;
                }
            }

            if (updateHash) {
                history.pushState(null, null, `#${targetId}`);
            }

            // Track reading progress
            saveProgress(targetId);
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            activateSection(target);
            document.querySelector('.sidebar')?.classList.remove('mobile-open');
        });
    });

    window.addEventListener('popstate', () => {
        const hash = window.location.hash.replace('#', '');
        activateSection(hash || 'inicio', false);
    });

    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
        activateSection(initialHash, false);
    } else {
        activateSection('inicio', false);
    }
}

/* ==========================================================================
   3. Real-time Search Filter
   ========================================================================== */
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const navGroups = document.querySelectorAll('.nav-group');
    const navItems = document.querySelectorAll('.nav-item');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        navItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(query);
            item.style.display = matches ? 'flex' : 'none';
        });

        navGroups.forEach(group => {
            const visibleChildren = group.querySelectorAll('.nav-item');
            const hasVisible = Array.from(visibleChildren).some(child => child.style.display !== 'none');
            group.style.display = hasVisible ? 'block' : 'none';
        });
    });
}

/* ==========================================================================
   4. Code Copy to Clipboard
   ========================================================================== */
function initCodeCopy() {
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const wrapper = btn.closest('.code-wrapper');
            const codeBlock = wrapper ? wrapper.querySelector('code') : null;

            if (codeBlock) {
                try {
                    await navigator.clipboard.writeText(codeBlock.innerText);
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '✓ ¡Copiado!';
                    btn.style.backgroundColor = 'var(--accent-primary)';
                    btn.style.color = '#fff';

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                    }, 2000);
                } catch (err) {
                    btn.textContent = '❌ Error';
                }
            }
        });
    });
}

/* ==========================================================================
   5. Reading Progress Tracking
   ========================================================================== */
const TOTAL_SECTIONS = 9; // sin contar inicio ni el wizard demo

function saveProgress(sectionId) {
    if (sectionId === 'inicio' || sectionId === 'demo') return;

    let readSections = JSON.parse(localStorage.getItem('prompt_read_sections')) || [];
    if (!readSections.includes(sectionId)) {
        readSections.push(sectionId);
        localStorage.setItem('prompt_read_sections', JSON.stringify(readSections));
    }
    updateProgressUI(readSections);
}

function initProgressTracking() {
    const readSections = JSON.parse(localStorage.getItem('prompt_read_sections')) || [];
    updateProgressUI(readSections);

    const completionBtns = document.querySelectorAll('.completion-btn');
    completionBtns.forEach(btn => {
        const sectionId = btn.getAttribute('data-section');
        if (readSections.includes(sectionId)) {
            setBtnCompleted(btn);
        }

        btn.addEventListener('click', () => {
            let currentRead = JSON.parse(localStorage.getItem('prompt_read_sections')) || [];
            if (!currentRead.includes(sectionId)) {
                currentRead.push(sectionId);
                localStorage.setItem('prompt_read_sections', JSON.stringify(currentRead));
                setBtnCompleted(btn);
                updateProgressUI(currentRead);
            }
        });
    });
}

function setBtnCompleted(btn) {
    btn.classList.add('completed');
    btn.innerHTML = '✓ Sección Leída y Completada';
}

function updateProgressUI(readSections) {
    const valElem = document.getElementById('progress-val');
    const fillElem = document.getElementById('progress-fill');

    if (valElem && fillElem) {
        const percent = Math.min(Math.round((readSections.length / TOTAL_SECTIONS) * 100), 100);
        valElem.textContent = `${percent}%`;
        fillElem.style.width = `${percent}%`;
    }
}

/* ==========================================================================
   6. Interactive Demo «Playground Comparativo»
      Simula la comparación de prompts ingenuos vs optimizados.
      Sin red ni dependencias.
   ========================================================================== */
function initPromptDemo() {
    const runBtn = document.getElementById('run-comparison-btn');
    const templateSelect = document.getElementById('template-select');
    const naiveInput = document.getElementById('naive-prompt-input');
    const optimizedInput = document.getElementById('optimized-prompt-input');
    const naiveOutput = document.getElementById('naive-result-output');
    const optimizedOutput = document.getElementById('optimized-result-output');

    // Plantillas de prueba predefinidas
    const templates = {
        math: {
            naive: "Resuelve este problema matemático:\n\nPregunta: Roger tiene 5 pelotas de tenis. Compra 2 latas más de pelotas de tenis. Cada lata tiene 3 pelotas de tenis. ¿Cuántas pelotas de tenis tiene ahora?\nRespuesta:",
            optimized: "Resuelve este problema matemático. Razona paso a paso antes de responder:\n\nPregunta: Roger tiene 5 pelotas de tenis. Compra 2 latas más de pelotas de tenis. Cada lata tiene 3 pelotas de tenis. ¿Cuántas pelotas de tenis tiene ahora?\nRazonamiento:",
            naiveResult: "Roger tiene 5 pelotas. Compra 2 latas × 3 pelotas = 6 pelotas. Total: 5 + 6 = 11 pelotas.",
            optimizedResult: "Roger tiene 5 pelotas. Compra 2 latas × 3 pelotas = 6 pelotas. Total: 5 + 6 = 11 pelotas.\n\nRespuesta: Roger tiene 11 pelotas de tenis."
        },
        code: {
            naive: "Revisa este código Python y detecta vulnerabilidades:\n\n```python\ndef login(username, password):\n    if username == 'admin' and password == '12345':\n        return True\n    return False\n```",
            optimized: "Actúa como Senior Code Reviewer. Revisa este código Python para vulnerabilidades de seguridad, rendimiento y elegancia:\n\n```python\ndef login(username, password):\n    if username == 'admin' and password == '12345':\n        return True\n    return False\n```",
            naiveResult: "El código verifica credenciales fijas. No hay manejo de errores ni hashing de contraseñas.",
            optimizedResult: "Vulnerabilidades:\n1. Credenciales fijas (admin/12345) - Vulnerabilidad de autenticación\n2. Falta hashing de contraseñas - Vulnerabilidad de almacenamiento\n3. Falta manejo de errores - Vulnerabilidad de disponibilidad\n\nRecomendaciones:\n1. Usar almacenamiento seguro para credenciales\n2. Implementar hashing de contraseñas (bcrypt, Argon2)\n3. Añadir manejo de errores\n4. Usar variables de entorno para credenciales"
        },
        json: {
            naive: "Extrae los datos de contacto del siguiente texto:\n\nTexto: \"Hola, soy María García, mi correo es maria@empresa.com. No tengo teléfono actualmente.\"",
            optimized: "Extrae los datos de contacto del siguiente texto. Responde ÚNICAMENTE en formato JSON válido según este esquema:\n\n{\n  \"nombre\": string,\n  \"email\": string,\n  \"telefono\": string | null\n}\n\nTexto: \"Hola, soy María García, mi correo es maria@empresa.com. No tengo teléfono actualmente.\"",
            naiveResult: "Nombre: María García\nEmail: maria@empresa.com\nTeléfono: No tiene",
            optimizedResult: "{\n  \"nombre\": \"María García\",\n  \"email\": \"maria@empresa.com\",\n  \"telefono\": null\n}"
        }
    };

    // Cargar plantilla inicial
    function loadTemplate(key) {
        const tpl = templates[key];
        if (!tpl) return;
        if (naiveInput) naiveInput.value = tpl.naive;
        if (optimizedInput) optimizedInput.value = tpl.optimized;
        if (naiveOutput) naiveOutput.innerHTML = '<p class="demo-results-empty">Haz clic en "Ejecutar Comparativa" para ver el resultado ingenuo.</p>';
        if (optimizedOutput) optimizedOutput.innerHTML = '<p class="demo-results-empty">Haz clic en "Ejecutar Comparativa" para ver el resultado optimizado.</p>';
    }

    // Cargar plantilla por defecto al iniciar
    if (templateSelect) {
        loadTemplate(templateSelect.value);
        templateSelect.addEventListener('change', (e) => {
            loadTemplate(e.target.value);
        });
    }

    // Ejecutar comparativa simulada
    if (runBtn) {
        runBtn.addEventListener('click', () => {
            const key = templateSelect ? templateSelect.value : 'math';
            const tpl = templates[key];
            if (!tpl) return;

            // Simular "pensando" con un pequeño delay visual
            runBtn.textContent = '⏳ Procesando...';
            runBtn.disabled = true;

            setTimeout(() => {
                runBtn.innerHTML = '⚡ Ejecutar Comparativa Simulada';
                runBtn.disabled = false;

                // Renderizar resultado ingenuo
                if (naiveOutput) {
                    naiveOutput.innerHTML = `
                        <div class="demo-result-item">
                            <div class="demo-result-text">${tpl.naiveResult.replace(/\n/g, '<br>')}</div>
                            <div class="demo-result-score" style="color: var(--accent-amber);">⚠️ Resultado básico sin estructura</div>
                        </div>`;
                }

                // Renderizar resultado optimizado
                if (optimizedOutput) {
                    optimizedOutput.innerHTML = `
                        <div class="demo-result-item">
                            <div class="demo-result-text">${tpl.optimizedResult.replace(/\n/g, '<br>')}</div>
                            <div class="demo-result-score" style="color: var(--accent-emerald);">✓ Resultado estructurado y preciso</div>
                        </div>`;
                }
            }, 800);
        });
    }
}

/* ==========================================================================
   7. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const sidebar = document.querySelector('.sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }
}
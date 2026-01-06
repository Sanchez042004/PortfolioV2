# 💼 Andrés Sánchez - Portfolio Profesional

![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![i18next](https://img.shields.io/badge/i18next-26A69A?style=flat-square&logo=i18next&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![SEO](https://img.shields.io/badge/SEO-Optimized-success?style=flat-square)

**Portfolio Profesional y Demostración Técnica.**

Este proyecto no es solo una presentación de mi experiencia, sino una demostración robusta de desarrollo frontend moderno utilizando **Vanilla JavaScript** puro. Sin frameworks pesados (como React o Vue) para el renderizado, este portafolio logra una arquitectura reactiva, modular y altamente performante, demostrando un dominio profundo de los fundamentos de la web.

## ✨ Características Técnicas

*   **🏗️ Arquitectura SPA (Single Page Application):** Navegación fluida sin recargas, manejada con un router personalizado en Vanilla JS.
*   **🌍 Internacionalización (i18n) Profunda:**
    *   Soporte completo para **Español, Inglés y Portugués**.
    *   Gestión de contenido dinámica: Textos, Habilidades Técnicas y Soft Skills se cargan desde archivos JSON, permitiendo actualizaciones sin tocar el código.
*   **🎨 Sistema de Temas Avanzado:**
    *   Modo Claro / Oscuro / Sistema.
    *   Persistencia de preferencias y detección automática.
*   **📱 Diseño Ultra-Responsive:**
    *   Adaptación pixel-perfect desde móviles pequeños (320px) hasta pantallas 4K.
    *   Menú móvil interactivo con animaciones suaves y lógica de bloqueo de scroll.
*   **🧩 CSS Modular y Escalable:**
    *   Abandono de hojas de estilo monolíticas en favor de archivos CSS dedicados por componente (`hero.css`, `contact.css`, etc.), facilitando el mantenimiento y la escalabilidad.
*   **🚀 Optimización y SEO:**
    *   Lazy loading de imágenes y assets.
    *   Estructura semántica, metadatos Open Graph, Twitter Cards y Sitemap XML para máxima visibilidad.
*   **🔒 Seguridad y Formularios:**
    *   Integración segura con EmailJS.
    *   Protección anti-spam con reCAPTCHA v2 y rate-limiting en el cliente.
    *   Validaciones de entrada robustas y sanitización de datos.

## 📂 Organización del Código (Refactorizado)

El proyecto sigue una estructura limpia y predecible:

### CSS (Estilos)
| Archivo | Responsabilidad |
| :--- | :--- |
| `variables.css` | Design Tokens: Colores, fuentes, espaciados y temas. |
| `layout.css` | Estructura global: Header, Footer y contenedores. |
| `components.css` | Componentes UI reutilizables (Botones, Badges, Modales). |
| `hero.css` | Estilos específicos para la sección de introducción. |
| `experience.css` | Líneas de tiempo y tarjetas de experiencia. |
| `education.css` | Layout de grillas para educación y certificaciones. |
| `contact.css` | Formularios y grid de contacto responsive. |
| `forms.css` | Estilos base para inputs y validaciones. |

### JS (Lógica)
*   `src/core/`: Lógica central (Router, Event Bus, Interacciones).
*   `src/components/`: Renderizado de secciones HTML.
*   `src/services/`: Integraciones externas (i18n, EmailJS, Theme).
*   `src/locales/`: Archivos JSON de traducción.

## 🛠️ Tecnologías

*   **Core:** HTML5, CSS3, JavaScript (ES6+).
*   **Build Tool:** Vite.
*   **Librerías:** `i18next` (i18n), `emailjs-com` (Formularios).
*   **Iconos:** Material Symbols & SVGs personalizados.

## 🚀 Instalación y Despliegue

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Sanchez042004/PortfolioV2.git
    cd PortfolioV2
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Desarrollo local:**
    ```bash
    npm run dev
    ```

4.  **Compilar para producción:**
    ```bash
    npm run build
    ```

## 👤 Autor

**Andrés Sánchez**
*Ingeniero de Sistemas | Junior Software Engineer*

Construyendo soluciones eficientes y escalables.

*   💼 **LinkedIn:** [Andrés Sánchez](https://www.linkedin.com/in/andres-sanchez04/)
*   🌐 **Web:** [asanchez-cv.vercel.app](https://asanchez-cv.vercel.app/)
*   🐙 **GitHub:** [@Sanchez042004](https://github.com/Sanchez042004)

---
<div align="center">
    &copy; 2026 Andrés Sánchez. Hecho con ❤️.
</div>
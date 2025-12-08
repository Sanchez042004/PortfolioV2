# 💼 Portfolio Personal - Andrés Sánchez

[![Vite](https://img.shields.io/badge/Vite-7.2.6-646CFF?logo=vite)](https://vitejs.dev/)
[![i18next](https://img.shields.io/badge/i18next-23.7.0-26A69A?logo=i18next)](https://www.i18next.com/)
[![License](https://img.shields.io/badge/License-Personal-blue.svg)](LICENSE)
[![CSS](https://img.shields.io/badge/Style-Modular_CSS-1572B6?logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)

Portfolio profesional multi-idioma con sistema de temas, formulario de contacto seguro y una arquitectura de código moderna y modular.

## ✨ Características Principales

- 🌍 **Multi-idioma** - Español, Inglés y Portugués con i18next
- 🎨 **Temas Dinámicos** - Claro, Oscuro y Sistema (auto-detección)
- 🧩 **Arquitectura Modular** - CSS dividido por responsabilidades y componentes JS aislados
- 📱 **Responsive Design** - Interfaz totalmente adaptada a móvil con menús nativos y formularios optimizados
- 📧 **Formulario Seguro** - EmailJS + reCAPTCHA v3 + Rate Limiting
- 🎯 **Active Navigation** - Scroll spy con animaciones suaves
- 🚀 **Optimizado** - Build ligero y rápido
- ♿ **Accesible** - Navegación por teclado y atributos ARIA

## 🚀 Tecnologías

| Tecnología | Uso |
|------------|-----|
| **Vite** | Build tool ultra-rápido |
| **i18next** | Internacionalización |
| **EmailJS** | Servicio de envío de emails |
| **Vanilla JavaScript** | Lógica de componentes sin frameworks pesados |
| **Modular CSS** | Estilos organizados en capas (ITCSS methodology inspired) |
| **CSS Variables** | Sistema de diseño y temas centralizado |

## 🏗️ Arquitectura y Modularidad

Este proyecto ha sido refactorizado para garantizar escalabilidad y mantenibilidad.

### 🎨 Modularización de CSS
En lugar de una hoja de estilos monolítica, los estilos se dividen en capas lógicas dentro de `src/styles/`:

- **`variables.css`**: Design tokens, variables de colores, tipografía y configuración de temas (Claro/Oscuro).
- **`reset.css`**: Normalización de estilos base y configuración de fuentes.
- **`layout.css`**: Estructura principal, Header, Footer y sistema de navegación móvil.
- **`components.css`**: Estilos de componentes UI reutilizables (Botones, Cards, Modals, Toast, Dropdowns).
- **`sections.css`**: Estilos específicos para cada sección (Hero, Skills, Proyectos, Contacto).
- **`utilities.css`**: Clases utilitarias globales, animaciones y helpers de layout.

### 🖼️ Centralización de Assets
- **`src/utils/icons.js`**: Todos los iconos SVG (Banderas, Redes Sociales, UI) están centralizados en un único archivo como constantes, eliminando código duplicado en los componentes y facilitando cambios globales.

## 📁 Estructura del Proyecto

```
portfolio/
├── public/                  # Assets estáticos (PDFs, favicon)
├── src/
│   ├── components/          # Componentes JS
│   │   ├── Layout/          # Header (con lógica de menú móvil), Footer
│   │   ├── Sections/        # Secciones de contenido (Hero, Contact...)
│   │   └── UI/              # Componentes de interfaz (Toast)
│   ├── locales/             # Traducciones JSON (es, en, pt)
│   ├── services/            # Servicios (i18n, Theme, ContactForm)
│   ├── styles/              # 🎨 ESTILOS MODULARES
│   │   ├── variables.css    # Variables globales y temas
│   │   ├── reset.css        # Base styles
│   │   ├── layout.css       # Header/Footer/Nav
│   │   ├── components.css   # Botones, Cards, Inputs
│   │   ├── sections.css     # Estilos de secciones
│   │   └── utilities.css    # Utilidades
│   ├── utils/
│   │   ├── icons.js         # 🖼️ Iconos SVG centralizados
│   │   └── scrollSpy.js     # Lógica de navegación
│   ├── data.js              # Datos del portfolio (proyectos, skills)
│   └── main.js              # Punto de entrada
├── index.html
└── ...
```

## 📋 Requisitos Previos

- Node.js 16+ 
- npm o yarn

## 🛠️ Instalación y Uso

### 1. Clonar e Instalar
```bash
git clone https://github.com/Sanchez042004/PortfolioV2.git
cd PortfolioV2
npm install
```

### 2. Configurar Entorno
Crea un archivo `.env` basado en `.env.example` con tus credenciales de EmailJS y reCAPTCHA.

### 3. Desarrollo
```bash
npm run dev
```

### 4. Producción
```bash
npm run build
```

## 🖌️ Personalización

### Modificar Colores y Temas
Todo el sistema de colores se gestiona en **`src/styles/variables.css`**. Cambia los valores de las variables CSS para actualizar la paleta de colores de toda la aplicación.

### Actualizar Datos
Edita **`src/data.js`** para cambiar tu información de perfil, redes sociales, habilidades y enlaces. Los textos de contenido están en **`src/locales/`**.

## 👤 Autor

**Andrés Sánchez**  
Ingeniero de Sistemas | Desarrollador | Analista de Datos

- 🌐 Portfolio: [asanchez-cv.vercel.app](https://asanchez-cv.vercel.app/)
- 💼 LinkedIn: [@andres-sanchez04](https://www.linkedin.com/in/andres-sanchez04/)
- 🐙 GitHub: [@Sanchez042004](https://github.com/Sanchez042004)

---
<div align="center">
Hecho con ❤️ y código limpio
</div>

# 💼 Portfolio Personal - Andrés Sánchez

[![Vite](https://img.shields.io/badge/Vite-7.2.6-646CFF?logo=vite)](https://vitejs.dev/)
[![i18next](https://img.shields.io/badge/i18next-23.7.0-26A69A?logo=i18next)](https://www.i18next.com/)
[![License](https://img.shields.io/badge/License-Personal-blue.svg)](LICENSE)

Portfolio profesional multi-idioma con sistema de temas, formulario de contacto seguro y navegación activa.

## ✨ Características Principales

- 🌍 **Multi-idioma** - Español, Inglés y Portugués con i18next
- 🎨 **Temas Dinámicos** - Claro, Oscuro y Sistema (auto-detección)
- 📱 **Responsive Design** - Optimizado para móvil, tablet y desktop
- 📧 **Formulario Seguro** - EmailJS + reCAPTCHA v3 + Rate Limiting
- 🎯 **Active Navigation** - Scroll spy con animaciones suaves
- 📄 **Visualizador PDF** - Modal para certificados
- 🚀 **Optimizado** - Build de 54 KB (gzip: 13.44 KB)
- ♿ **Accesible** - Navegación por teclado y ARIA labels
- 🔒 **Seguro** - Validación, sanitización y protección anti-spam

## 🚀 Tecnologías

| Tecnología | Uso |
|------------|-----|
| **Vite 7.2.6** | Build tool ultra-rápido |
| **i18next 23.7.0** | Internacionalización |
| **EmailJS** | Servicio de envío de emails |
| **reCAPTCHA v3** | Protección anti-spam invisible |
| **Vanilla JavaScript** | Sin frameworks, código puro |
| **CSS3 Variables** | Temas dinámicos |
| **Intersection Observer** | Scroll spy eficiente |

## 📋 Requisitos Previos

- Node.js 16+ 
- npm o yarn
- Cuenta de [EmailJS](https://www.emailjs.com/) (gratis)
- Claves de [Google reCAPTCHA v3](https://www.google.com/recaptcha/admin) (gratis)

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Sanchez042004/portfolio.git
cd portfolio
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Edita `.env` y agrega tus credenciales:

```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id

# Google reCAPTCHA v3
VITE_RECAPTCHA_SITE_KEY=tu_recaptcha_site_key
```

> [!IMPORTANT]
> **Cómo obtener las credenciales:**
> 
> **EmailJS:**
> 1. Crea cuenta en [EmailJS](https://www.emailjs.com/)
> 2. Crea un servicio de email (Gmail, Outlook, etc.)
> 3. Crea un template con campos: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{sent_at}}`, `{{recaptcha_token}}`
> 4. Obtén tu Public Key desde Account → API Keys
> 
> **reCAPTCHA v3:**
> 1. Ve a [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
> 2. Registra un nuevo sitio con reCAPTCHA v3
> 3. Agrega tu dominio (o `localhost` para desarrollo)
> 4. Copia la Site Key (la Secret Key va en el backend de EmailJS)

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo con hot reload
npm run build    # Build optimizado para producción
npm run preview  # Preview del build de producción
```

## 📁 Estructura del Proyecto

```
portfolio/
├── public/
│   ├── certificates/          # Certificados PDF
│   │   ├── Certificado Power BI.pdf
│   │   ├── Certificado Linux.pdf
│   │   └── EF SET Certificate.pdf
│   └── iconAndres.ico        # Favicon
├── src/
│   ├── locales/              # Traducciones i18next
│   │   ├── es.json          # 🇨🇴 Español
│   │   ├── en.json          # 🇺🇸 Inglés
│   │   └── pt.json          # 🇧🇷 Portugués
│   ├── data.js              # Datos estáticos (nav, skills, social)
│   ├── main.js              # Lógica de la aplicación
│   └── style.css            # Estilos globales + temas
├── index.html               # HTML principal
├── .env                     # Variables de entorno
├── .env.example             # Plantilla de variables
├── .gitignore              # Archivos ignorados
├── package.json            # Dependencias
└── README.md               # Este archivo
```

## � Personalización

### Cambiar Información Personal

Edita `src/data.js`:

```javascript
export const data = {
    profile: {
        name: 'Tu Nombre',
        location: 'Tu Ciudad',
        phone: '+XX XXXXXXXXXX',
        social: {
            email: 'mailto:tu@email.com',
            github: 'https://github.com/tu-usuario',
            linkedin: 'https://linkedin.com/in/tu-usuario',
            twitter: 'https://twitter.com/tu-usuario'
        }
    },
    skills: ['HTML', 'CSS', 'JavaScript', '...']
}
```

### Agregar/Editar Contenido

Edita los archivos de traducción en `src/locales/`:

- **Experiencia:** `experience.items[]`
- **Educación:** `education.items[]`
- **Certificados:** `certifications.items[]`
- **Proyectos:** `projects.items[]`

### Agregar Nuevo Idioma

1. Crea `src/locales/fr.json` (ejemplo: francés)
2. Copia la estructura de `es.json`
3. Traduce todos los textos
4. Importa en `main.js`:
   ```javascript
   import frTranslations from './locales/fr.json' with { type: 'json' }
   ```
5. Agrega a i18next:
   ```javascript
   resources: {
       es: { translation: esTranslations },
       en: { translation: enTranslations },
       pt: { translation: ptTranslations },
       fr: { translation: frTranslations } // Nuevo
   }
   ```
6. Agrega opción en el selector de idiomas (componente `Header`)

### Personalizar Colores

Edita las CSS variables en `src/style.css`:

```css
[data-theme="dark"] {
    --color-primary: #2563EB;        /* Color principal */
    --color-primary-hover: #1D4ED8;  /* Hover del primario */
    --color-bg: #0F172A;             /* Fondo */
    --color-surface: #1E293B;        /* Superficies (cards) */
    --color-text: #F8FAFC;           /* Texto principal */
    /* ... más variables */
}
```

## 🔒 Seguridad

El portfolio implementa múltiples capas de seguridad:

- ✅ **reCAPTCHA v3** - Protección invisible anti-spam
- ✅ **Rate Limiting** - 1 envío por minuto
- ✅ **Validación Client-Side** - Campos requeridos, formato de email
- ✅ **Sanitización de Inputs** - Prevención de XSS
- ✅ **Variables de Entorno** - Credenciales no expuestas en código
- ✅ **Longitud de Campos** - Límites min/max para prevenir abusos

> [!WARNING]
> **NUNCA** subas el archivo `.env` a Git. Está incluido en `.gitignore` por seguridad.

## 🐛 Solución de Problemas

### Formulario no envía emails

**Síntomas:** El formulario se envía pero no llegan emails

**Soluciones:**
1. Verifica variables de entorno en `.env`
2. Revisa Console (F12) para errores
3. Verifica template de EmailJS tenga los campos correctos
4. Confirma que el servicio de EmailJS esté activo

### reCAPTCHA no funciona

**Síntomas:** Badge de reCAPTCHA no aparece o da error

**Soluciones:**
1. Verifica `VITE_RECAPTCHA_SITE_KEY` en `.env`
2. Agrega tu dominio en Google reCAPTCHA Admin Console
3. Para desarrollo local, agrega `localhost` como dominio permitido

### Idiomas no cambian

**Síntomas:** Al cambiar idioma, el contenido no se actualiza

**Soluciones:**
1. Verifica que los archivos JSON en `src/locales/` sean válidos
2. Revisa Console para errores de i18next
3. Limpia localStorage: `localStorage.clear()`

### Build falla

**Síntomas:** `npm run build` da error

**Soluciones:**
```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📊 Rendimiento

- ⚡ **Lighthouse Score:** 95+ en todas las categorías
- 🚀 **First Contentful Paint:** < 1s
- 📦 **Total Bundle Size:** 54 KB (gzip)
- 🎯 **Time to Interactive:** < 2s

## 🌟 Características Avanzadas

### Scroll Spy

Navegación activa que resalta el enlace del menú según la sección visible:

- Detección automática con Intersection Observer
- Animación suave de la línea de subrayado
- Excluye Hero de la activación
- Funciona en desktop y móvil

### Temas Dinámicos

Sistema de temas con 3 modos:

- **Claro:** Diseño luminoso para ambientes bien iluminados
- **Oscuro:** Reduce fatiga visual en ambientes oscuros
- **Sistema:** Detecta automáticamente la preferencia del SO

## 📝 Licencia

Este proyecto es de uso personal. Todos los derechos reservados © 2025 Andrés Sánchez.

## 👤 Autor

**Andrés Sánchez**  
Ingeniero de Sistemas | Desarrollador | Analista de Datos

- 🌐 Portfolio: [tu-portfolio.vercel.app](https://tu-portfolio.vercel.app)
- 💼 LinkedIn: [@andres-sanchez04](https://www.linkedin.com/in/andres-sanchez04/)
- 🐙 GitHub: [@Sanchez042004](https://github.com/Sanchez042004)
- 🐦 Twitter: [@AndresS97279239](https://twitter.com/AndresS97279239)
- 📧 Email: afsarias2004@gmail.com

---

<div align="center">

Hecho con ❤️ por [Andrés Sánchez](https://github.com/Sanchez042004)

</div>

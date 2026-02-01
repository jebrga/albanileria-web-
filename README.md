# 🏗️ Construcciones Pro - Aplicación Web de Servicios de Albañilería

Aplicación web moderna y profesional para cálculo de presupuestos de servicios de albañilería. Desarrollada con Next.js 14, React 18 y CSS vanilla.

![Homepage](https://via.placeholder.com/800x400/FF6B35/FFFFFF?text=Construcciones+Pro)

## 🌟 Características Principales

### ✅ Calculadora de Presupuestos Inteligente
- Selección de múltiples servicios de construcción
- Opciones personalizables por servicio
- **Cálculo en tiempo real** con vista previa
- Desglose detallado de materiales y mano de obra
- Total automático con múltiples servicios

### 💾 Gestión de Presupuestos
- Guardado local de presupuestos
- Nombrar y organizar cotizaciones
- **Modo de comparación** entre presupuestos
- Persistencia con LocalStorage

### 💬 Integración con WhatsApp
- Botón flotante siempre visible
- Envío de presupuestos formateados
- Contacto directo desde cualquier página

### 🎨 Diseño Profesional
- Paleta de colores de construcción
- Animaciones y transiciones suaves
- **100% Responsive** (móvil, tablet, desktop)
- Iconografía moderna con emojis

### 🔧 Panel Administrativo
- Autenticación por contraseña
- Vista de servicios y precios
- Dashboard informativo

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar o navegar al directorio del proyecto
cd /home/jesus/.gemini/antigravity/scratch/albanileria-web

# Instalar dependencias (si aún no están instaladas)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
albanileria-web/
├── app/                    # Páginas y rutas (App Router)
│   ├── page.js            # Página principal
│   ├── calculadora/       # Calculadora de presupuestos
│   ├── mis-presupuestos/  # Presupuestos guardados
│   ├── contacto/          # Formulario de contacto
│   └── admin/             # Panel administrativo
├── components/            # Componentes reutilizables
│   ├── Header.js         # Navegación principal
│   ├── Footer.js         # Pie de página
│   ├── ServiceCard.js    # Tarjeta de servicio
│   └── WhatsAppButton.js # Botón flotante
├── lib/                   # Lógica de negocio
│   ├── calculations.js   # Cálculos de presupuestos
│   ├── storage.js        # Gestión LocalStorage
│   ├── services.js       # Servicios disponibles
│   └── whatsapp.js       # Integración WhatsApp
├── data/                  # Datos y configuración
│   ├── services.json     # Catálogo de servicios
│   └── config.json       # Configuración general
└── styles/               # Estilos CSS
    └── variables.css     # Variables de diseño
```

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Estilos**: CSS Modules + CSS vanilla
- **Tipografía**: Google Fonts (Inter, Roboto)
- **Almacenamiento**: LocalStorage (migrable a DB)
- **Deployment Ready**: Vercel, Netlify, etc.

## 📊 Servicios Disponibles

1. 🏗️ **Contrapiso** - $15.000/m²
   - Opciones: Espesor, Calidad

2. 🔨 **Colocación de Cerámica** - $12.000/m²
   - Opciones: Tipo, Calidad

3. 🧱 **Revoques** - $10.000/m²
   - Opciones: Tipo, Ubicación

4. 🚪 **Instalación de Aberturas** - $25.000/unidad
   - Opciones: Tipo, Material

5. ⚡ **Encadenamiento** - $18.000/metro lineal
   - Opciones: Ubicación, Sección

6. 🧱 **Colocación de Paredes** - $14.000/m²
   - Opciones: Material, Espesor

## 🎯 Uso de la Aplicación

### Para Clientes

1. **Calcular Presupuesto**
   - Ir a la Calculadora
   - Seleccionar servicio y cantidad
   - Elegir opciones personalizadas
   - Ver cálculo en tiempo real
   - Agregar al presupuesto

2. **Guardar y Compartir**
   - Guardar presupuesto con nombre
   - Ver en "Mis Presupuestos"
   - Enviar por WhatsApp
   - Comparar múltiples opciones

### Para Administradores

1. Acceder a `/admin`
2. Contraseña por defecto: `admin123`
3. Ver dashboard y gestionar sistema

## ⚙️ Configuración

### Actualizar Datos de la Empresa

Editar `data/config.json`:

```json
{
  "company": {
    "name": "Tu Empresa",
    "phone": "5491112345678",
    "email": "info@tuempresa.com",
    "address": "Tu Dirección"
  }
}
```

### Modificar Servicios y Precios

Editar `data/services.json`:

```json
{
  "services": [
    {
      "id": "servicio-id",
      "name": "Nombre del Servicio",
      "pricePerUnit": 15000,
      "materialCost": 8000,
      "laborCost": 7000,
      ...
    }
  ]
}
```

## 🔐 Seguridad

- ⚠️ Contraseña de admin debe cambiarse en producción
- 💡 Implementar autenticación robusta para producción
- 🔒 Configurar variables de entorno para datos sensibles

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build para Producción

```bash
npm run build
npm run start
```

## 📱 Responsive Design

- **Mobile First**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+

Todos los componentes se adaptan automáticamente al tamaño de pantalla.

## 🎨 Paleta de Colores

```css
--primary: #FF6B35       /* Naranja construcción */
--secondary: #2C3E50     /* Azul oscuro profesional */
--accent: #F7931E        /* Amarillo seguridad */
```

## 📝 Licencia

Este proyecto fue creado como demostración. Personaliza según tus necesidades.

## 🤝 Soporte

Para preguntas o problemas:
- 📧 Email: info@construcciones.com
- 💬 WhatsApp: +54 9 11 1234-5678

## 🔄 Roadmap (Futuras Versiones)

- [ ] Generación de PDF
- [ ] Envío automático por email
- [ ] Base de datos persistente
- [ ] Sistema de usuarios
- [ ] Calculadora avanzada de materiales
- [ ] Panel admin completo con CRUD
- [ ] Analytics y reportes
- [ ] Modo oscuro
- [ ] Multi-idioma

---

**Desarrollado con ❤️ usando Next.js y React**

**Version**: 1.0.0  
**Última actualización**: Enero 2026

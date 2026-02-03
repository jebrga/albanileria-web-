# 🔧 Guía de Configuración de Base de Datos Supabase

## Estado Actual

✅ **Prisma Client Generado** - El cliente está listo  
✅ **Proyecto Supabase Encontrado** - Tienes "ABAÑILEZE" disponible  
⚠️ **Falta configurar** - DATABASE_URL y DIRECT_URL en `.env.local`

---

## Pasos para Obtener las URLs de Conexión

### 1. Accede a tu Proyecto Supabase

Ya tienes el proyecto **"ABAÑILEZE"** en Supabase. Desde el dashboard del proyecto:

1. Haz clic en el botón **"Connect"** (arriba a la derecha)
2. Ve a la pestaña **"ORMs"**
3. Selecciona **"Prisma"**

### 2. Copia las URLs

Verás dos variables importantes:

- **`DATABASE_URL`** - Para conexiones con pooling (puerto 6543)
- **`DIRECT_URL`** - Para migraciones directas (puerto 5432)

Ambas tendrán un formato similar a:
```
postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### 3. Actualiza el Archivo `.env.local`

Necesito que actualices el archivo [.env.local](file:///home/jesus/.gemini/antigravity/scratch/albanileria-web/.env.local) con estas URLs.

**Importante**: La contraseña que configuraste en Supabase debe reemplazar `[YOUR-PASSWORD]` en ambas URLs.

---

## Opción Rápida: Déjame las URLs

Si ya tienes las URLs de conexión, compártelas conmigo y yo actualizo el archivo `.env.local` automáticamente.

**Formato necesario:**
```
DATABASE_URL="postgresql://postgres.xxxxx:TU_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.xxxxx:TU_PASSWORD@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

---

## ¿Olvidaste la Contraseña?

Si no recuerdas la contraseña de la base de datos:

1. Ve a **Settings** → **Database** en tu proyecto Supabase
2. Busca la sección **"Database Password"**
3. Haz clic en **"Reset Password"**
4. Copia la nueva contraseña generada
5. Úsala en las URLs de conexión

---

## Siguiente Paso Automático

Una vez que tengas las URLs configuradas, ejecutaré automáticamente:

```bash
# Crear las tablas en la base de datos
npm run db:push

# Poblar con datos iniciales
npm run db:seed
```

Esto creará:
- ✅ 1 usuario admin (`admin@albanileria.com` / `Ventilador@2026`)
- ✅ 6 servicios de albañilería con precios
- ✅ 3 descuentos automáticos
- ✅ 3 medios de pago

**¿Tienes las URLs listas para configurar?** 🚀

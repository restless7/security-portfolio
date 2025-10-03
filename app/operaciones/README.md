# Centro de Control de Operaciones Electorales

## 🎯 Descripción General

El **Centro de Control de Operaciones Electorales** es una interfaz mockup profesional diseñada para la gestión, monitoreo y análisis de operaciones electorales. Este sistema permite geolocalizar y parametrizar votantes, medir intención de voto, cualificar interacciones y registrar múltiples métricas en tiempo real.

### 🏗️ Arquitectura del Sistema

```
app/operaciones/
├── components/           # Componentes React reutilizables
│   ├── Sidebar.tsx      # Navegación lateral
│   ├── TopBar.tsx       # Barra superior con notificaciones
│   ├── KPICard.tsx      # Tarjetas de indicadores
│   ├── OperationsMap.tsx # Mapa interactivo con Leaflet
│   ├── VoterTable.tsx   # Tabla de votantes con filtros
│   ├── VoterProfile.tsx # Panel detallado de votantes
│   ├── IntentionChart.tsx # Gráficos de tendencias
│   └── RecentActivity.tsx # Feed de actividad
├── lib/
│   └── mockData.ts      # Datos mock y tipos TypeScript
├── api/                 # Endpoints API simulados
└── page.tsx            # Página principal del centro de control
```

## 🚀 Funcionalidades Principales

### 📊 Dashboard Principal
- **Vista general del sistema** con KPIs en tiempo real
- **Métricas clave**: Total votantes, tasa de contacto, intención promedio, conversiones
- **Gráficos interactivos** de tendencias y análisis temporal
- **Feed de actividad** con eventos del sistema y interacciones

### 🗺️ Mapa Electoral Interactivo
- **Geolocalización de votantes** con markers personalizados por intención
- **Clustering inteligente** que muestra densidad y promedio de intención
- **Capas configurables**: clusters, heatmaps, límites territoriales
- **Popups informativos** con acciones directas
- **Vista fullscreen** para análisis detallado

### 👥 Gestión de Votantes
- **Tabla avanzada** con filtros múltiples (barrio, intención, etiquetas)
- **Búsqueda en tiempo real** por nombre, ubicación o características
- **Ordenamiento dinámico** por cualquier campo
- **Paginación eficiente** para grandes volúmenes de datos
- **Acciones rápidas**: contacto directo, edición, exportación

### 📋 Perfil Detallado de Votante
- **Vista integral** con información personal y contacto
- **Historial completo de interacciones** con timeline visual
- **Análisis de comportamiento** y recomendaciones automáticas
- **Gestión de etiquetas** y clasificaciones
- **Interfaz tabbed** para organizar información

### 📈 Análisis y Reportes
- **KPIs dinámicos** filtrados por período y ubicación
- **Breakdown por barrios** con métricas específicas
- **Análisis de tipos de interacción** y efectividad
- **Series temporales** para identificar tendencias
- **Exportación de datos** para análisis externos

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15.5.2** (App Router) - Framework React
- **TypeScript** - Tipado estático
- **TailwindCSS v3** - Estilos y diseño responsive
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconografía consistente

### Mapa y Visualización
- **Leaflet 1.9.4** - Motor de mapas interactivos
- **React Leaflet 4.2.1** - Integración con React
- **Leaflet.markercluster** - Agrupación de marcadores
- **Recharts 2.13.3** - Gráficos y visualizaciones

### Gestión de Datos
- **Prisma 6.15.0** - ORM y modelado de datos
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

## 📦 Instalación y Configuración

### Prerequisitos
- Node.js 18+ 
- pnpm o npm
- PostgreSQL (para implementación real)

### 1. Instalar Dependencias
```bash
cd /home/sebastiangarcia/planmaestro-ecosystem/packages/security-portfolio
pnpm install
```

### 2. Configurar Variables de Entorno
```bash
# .env.local (para implementación con BD real)
DATABASE_URL="postgresql://usuario:password@localhost:5432/operaciones_db"
NEXTAUTH_SECRET="tu-secret-key"
```

### 3. Inicializar Base de Datos (Opcional)
```bash
# Solo para implementación real
pnpm prisma generate
pnpm prisma db push
```

### 4. Ejecutar en Modo Desarrollo
```bash
pnpm dev
```

### 5. Acceder al Centro de Control
```
http://localhost:3000/operaciones
```

## 🎮 Modo Demo

El sistema incluye un **modo demo completo** con:

### Datos Mock Realistas
- **500 votantes** con información georreferenciada en Bogotá
- **2000+ interacciones** distribuidas temporalmente
- **Múltiples barrios** con características específicas
- **Variedad de canales** de contacto y resultados

### Simulación en Tiempo Real
- **Eventos automáticos** cada 8-10 segundos
- **Notificaciones dinámicas** con diferentes prioridades
- **Actualización de métricas** sin recargar página
- **Feed de actividad** con nuevos elementos

### Navegación Intuitiva
- **4 vistas principales**: Dashboard, Mapa, Votantes, Análisis
- **Filtros interactivos** con persistencia de estado
- **Búsquedas instantáneas** con highlighting
- **Acciones contextuales** en cada elemento

## 🔐 Seguridad y Privacidad

### Protección de Datos
- **Pseudonimización** de información personal
- **Consentimiento explícito** rastreado en metadata
- **Audit trail** completo de todas las acciones
- **Cifrado en tránsito** (HTTPS obligatorio)

### Control de Acceso
- **3 roles diferenciados**: Operador, Coordinador, Auditor
- **Permisos granulares** por funcionalidad
- **Sesiones seguras** con expiración automática
- **Logging detallado** de accesos y cambios

### Cumplimiento Legal
- **Habeas Data** - Normativas colombianas
- **GDPR compliance** ready para expansión
- **Anonimización** automática post-retención
- **Export/Delete** de datos por votante

## 📊 APIs Disponibles

### Votantes
```bash
GET /api/operaciones/voters
POST /api/operaciones/voters
GET /api/operaciones/voters/[id]
PUT /api/operaciones/voters/[id]
DELETE /api/operaciones/voters/[id]
```

### Interacciones
```bash
GET /api/operaciones/interactions
POST /api/operaciones/interactions
```

### KPIs y Análisis
```bash
GET /api/operaciones/kpis?timeframe=30d&neighborhood=Chapinero
```

### Parámetros de Query Disponibles

#### Votantes
- `page`, `limit` - Paginación
- `search` - Búsqueda por nombre/barrio/tags
- `neighborhood` - Filtro por barrio
- `intentionMin`, `intentionMax` - Rango de intención
- `sortBy`, `sortOrder` - Ordenamiento

#### Interacciones
- `voterId` - Filtrar por votante específico
- `type`, `channel`, `result` - Filtros por tipo
- `fromDate`, `toDate` - Rango temporal

## 🎨 Personalización y Temas

### Colores del Sistema
```css
/* Intención Alta */
.high-intention { @apply text-green-600 bg-green-100; }

/* Intención Media */
.medium-intention { @apply text-yellow-600 bg-yellow-100; }

/* Intención Baja */
.low-intention { @apply text-red-600 bg-red-100; }

/* Colores primarios */
.primary { @apply bg-blue-600; }
.secondary { @apply bg-slate-600; }
```

### Configuración de Mapas
```typescript
// Personalizar marcadores
const createCustomIcon = (intentionScore: number) => {
  const color = intentionScore >= 70 ? '#22c55e' : 
               intentionScore >= 40 ? '#eab308' : '#ef4444';
  return L.divIcon({
    html: `<div style="background-color: ${color};">${intentionScore}</div>`,
    className: 'custom-marker'
  });
};
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px - Vista optimizada para móvil
- **Tablet**: 640px - 1024px - Layout adaptativo
- **Desktop**: 1024px+ - Experiencia completa

### Componentes Adaptables
- **Sidebar colapsible** en dispositivos pequeños
- **Tablas con scroll horizontal** en móvil
- **Mapas responsivos** con controles adaptativos
- **Modals full-screen** en pantallas pequeñas

## 🚀 Roadmap de Implementación Real

### Fase 1: Backend & Database
- [ ] Configurar PostgreSQL con Prisma
- [ ] Implementar autenticación con NextAuth
- [ ] Crear migrations y seeders
- [ ] Establecer rate limiting y validaciones

### Fase 2: Integración de Datos
- [ ] Conectar APIs reales en lugar de mocks
- [ ] Implementar cache con Redis
- [ ] Configurar webhooks para tiempo real
- [ ] Optimizar queries con índices

### Fase 3: Características Avanzadas
- [ ] Upload masivo de votantes (CSV/Excel)
- [ ] Exportación avanzada con filtros
- [ ] Notificaciones push y email
- [ ] Dashboard ejecutivo con reportes PDF

### Fase 4: Seguridad & Compliance
- [ ] Auditoría completa de seguridad
- [ ] Implementar backup automático
- [ ] Configurar monitoring y alertas
- [ ] Documentación de compliance

## 🤝 Contribución

### Estructura de Commits
```bash
feat: añadir nuevo filtro en tabla de votantes
fix: corregir cluster de marcadores en mapa
docs: actualizar README con nuevas APIs
style: mejorar responsive design en móvil
```

### Guías de Desarrollo
1. **Componentes**: Cada componente debe ser reutilizable y documentado
2. **TypeScript**: Tipado estricto en todas las interfaces
3. **Testing**: Coverage mínimo del 80% en funciones críticas
4. **Performance**: Lazy loading y memoización donde sea necesario

## 📞 Soporte y Contacto

Para dudas sobre implementación, personalización o deployment:

- **Documentación Técnica**: Ver `/docs` en el repositorio
- **Issues**: Reportar problemas en GitHub Issues
- **Discussions**: Preguntas generales en GitHub Discussions

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para operaciones electorales efectivas y transparentes**
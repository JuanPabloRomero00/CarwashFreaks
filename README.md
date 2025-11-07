# CarwashFreaks

Sistema de gestión completo para servicios de lavado de autos que permite la administración de turnos, servicios, usuarios y reservas a través de una interfaz web moderna y responsive.

## Funcionalidades

### Gestión de Usuarios
- Registro y autenticación de usuarios con roles (user/admin)
- Sistema de autenticación JWT con refresh tokens
- Recuperación de contraseña por email
- Control de acceso basado en roles (RBAC)

### Gestión de Servicios
- CRUD completo de servicios de lavado
- Información detallada: nombre, descripción, precio, duración y características
- Gestión de imágenes para cada servicio
- Estado activo/inactivo para servicios

### Sistema de Turnos
- Creación de citas con selección de servicio, fecha y horario
- Estados de turnos: pendiente, confirmado, cancelado, completado
- Cancelación de turnos por parte del usuario
- Auto-completado de turnos mediante cron jobs
- Sistema de notificaciones

### Panel Administrativo
- Vista completa de todos los turnos y usuarios
- Gestión de servicios desde interfaz administrativa
- Control de permisos y roles
## Stack Tecnológico

### Frontend
- **React 18** - Biblioteca principal con hooks y componentes funcionales
- **React Router DOM 6** - Navegación y enrutamiento SPA
- **Vite** - Build tool y development server
- **CSS3** - Estilos personalizados con diseño responsive
- **ESLint** - Linting y calidad de código

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web con middlewares de seguridad
- **MongoDB** - Base de datos NoSQL con Mongoose ODM
- **JWT** - Autenticación y autorización
- **bcryptjs** - Hashing de contraseñas
- **Zod** - Validación de esquemas y datos
- **node-cron** - Programación de tareas automáticas
- **CORS** - Configuración de políticas de origen cruzado

### Seguridad
- Autenticación JWT con refresh tokens
- Hashing seguro de contraseñas con bcryptjs
- Validación de entrada con Zod
- Control de acceso basado en roles
- Middlewares de seguridad y manejo de errores

## Estructura del Proyecto

```
CarwashFreaks/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Lógica de controladores
│   │   ├── models/          # Esquemas de MongoDB
│   │   ├── routes/          # Definición de rutas REST
│   │   ├── services/        # Lógica de negocio
│   │   ├── middlewares/     # Auth, RBAC y manejo de errores
│   │   └── utils/           # Utilidades (hash, tokens)
│   └── scripts/             # Scripts de automatización
└── frontend/
    └── src/
        ├── components/      # Componentes React reutilizables
        ├── pages/           # Páginas principales
        ├── hooks/           # Custom hooks
        └── services/        # Servicios de API
```

## Instalación y Configuración

### Prerrequisitos
- Node.js 16+
- MongoDB Atlas o MongoDB local
- npm o yarn

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Configurar variables de entorno
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Variables de Entorno
```env
# Backend
PORT=5000
MONGODB_URI=
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
ADMIN_SECRET=your_admin_secret
```

## Scripts Disponibles

### Backend
- `npm start` - Inicia el servidor en producción
- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon

### Frontend
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/refresh` - Renovar token
- `POST /api/auth/forgot-password` - Recuperar contraseña

### Servicios
- `GET /api/services` - Obtener todos los servicios
- `POST /api/services` - Crear servicio (admin)
- `PUT /api/services/:id` - Actualizar servicio (admin)
- `DELETE /api/services/:id` - Eliminar servicio (admin)

### Turnos
- `GET /api/appointments` - Obtener turnos del usuario
- `POST /api/appointments` - Crear nuevo turno
- `PUT /api/appointments/:id` - Actualizar turno
- `DELETE /api/appointments/:id` - Cancelar turno

## Arquitectura y Patrones de Diseño

### Arquitectura Backend
- **Patrón MVC** - Separación clara entre Models, Views y Controllers
- **Arquitectura en Capas** - Controllers → Services → Models
- **Middleware Pattern** - Autenticación, RBAC y manejo de errores
- **Repository Pattern** - Abstracción de acceso a datos con Mongoose

### Patrones Frontend
- **Component-Based Architecture** - Componentes React reutilizables
- **Custom Hooks** - Lógica compartida (useAuth)
- **Service Layer** - Abstracción de llamadas a API
- **Route-Based Code Splitting** - Optimización de carga

### Características Técnicas Avanzadas

#### Sistema de Autenticación
- **JWT Access Tokens** - Tokens de corta duración (15 minutos)
- **Refresh Tokens** - Renovación automática de sesión
- **Token Blacklisting** - Invalidación de tokens en logout
- **Password Reset** - Flujo completo con tokens temporales

#### Automatización
- **Cron Jobs** - Auto-completado de turnos vencidos
- **Email Service** - Notificaciones automáticas (configuración preparada)
- **Seed Scripts** - Inicialización de datos de prueba


## Middlewares y Servicios

### Middleware de Autenticación
- Verificación de JWT tokens en headers Authorization
- Carga automática del usuario en req.user
- Manejo de tokens expirados con respuestas 403

### Middleware RBAC
- Control de acceso basado en roles de usuario
- Restricción de rutas administrativas
- Validación de permisos granulares

### Servicio de Email (Preparado)
- Configuración lista para SMTP
- Templates para confirmación de turnos
- Notificaciones de cambios de estado

## Performance y Optimización

### Frontend
- **Code Splitting** - Carga lazy de componentes
- **Bundle Optimization** - Vite para builds optimizados
- **CSS Optimization** - Estilos modulares y responsive
- **Image Optimization** - Compresión automática en build

### Backend
- **Connection Pooling** - Mongoose con pool de conexiones
- **Query Optimization** - Populate selectivo y proyecciones
- **Caching Strategy** - Headers de cache para recursos estáticos
- **Error Handling** - Middleware centralizado de errores

## Despliegue y Producción

### Variables de Entorno Producción
```env
NODE_ENV=
PORT=
MONGODB_URI=mongodb+srv:
JWT_SECRET=complex_production_secret_256_bits
JWT_REFRESH_SECRET=complex_refresh_secret_256_bits
ADMIN_SECRET=admin_registration_secret
EMAIL_USER=
EMAIL_PASS=app_specific_password
```

### Configuración de Build
```bash
# Frontend build para producción
npm run build  # Genera dist/ con assets optimizados

# Backend en producción
npm start  # Inicia con node (no nodemon)
```

## Testing y Calidad

### Herramientas de Desarrollo
- **ESLint** - Linting de código JavaScript/React
- **Prettier** - Formateo automático de código
- **Nodemon** - Hot reload en desarrollo backend
- **Vite HMR** - Hot Module Replacement frontend


## Contribución y Desarrollo

### Workflow de Desarrollo
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commits descriptivos siguiendo convenciones
4. Pull request con descripción detallada

### Convenciones de Código
- **JavaScript**: ES6+, async/await, destructuring
- **React**: Functional components, hooks, JSX
- **CSS**: BEM methodology, responsive-first
- **Git**: Conventional commits (feat, fix, docs, style, refactor)

### Roadmap Futuro
- [ ] Implementar tests unitarios e integración
- [ ] Sistema de notificaciones push
- [ ] Dashboard de analytics para admin
- [ ] Sistema de descuentos y promociones
- [ ] Integración con pasarelas de pago
- [ ] App móvil con React Native
- [ ] API de terceros para servicios adicionales
- [ ] Sistema de reviews y calificaciones

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Soporte

Para reportar bugs o solicitar nuevas funcionalidades:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo
- Revisar la documentación de la API

---

**Desarrollado con ❤️ para la gestión eficiente de servicios de lavado de autos**

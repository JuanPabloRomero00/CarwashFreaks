# CarwashFreaks 🚗✨
Una web para gestionar un servicio de lavado de autos: turnos, servicios, reservas y más.

## ✅ Características

- Registro y autenticación de usuarios  
- Listado de servicios con imágenes, descripción y precios  
- Sistema de turnos: selección de servicio, horario, confirmación por email  
- Cancelación
- Responsive (adaptado para móviles y escritorio)  
- Buen diseño visual con estilo moderno

## 🛠 Tecnologías usadas

Aquí un listado de las principales herramientas y librerías:

- **Frontend**: React  
- **Estilos**: CSS  
- **Backend / API**: ...
- **Base de datos**: MongoDB 

---

## 🔒 Registro privado de administrador

Para registrar un usuario con rol "admin" accedé a la siguiente URL (solo si conocés el secret):

```
POST /users/admin/register?secret=TU_CLAVE_ADMIN
```

La clave debe estar definida en la variable de entorno `ADMIN_REGISTER_SECRET`.

> No expongas esta URL en el frontend público. Compartila solo con el administrador.

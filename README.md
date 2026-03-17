###Frontend Web

Panel administrativo web para la gestión de oficinas, cobradores y créditos. 

Framework: React 18 (Vite)
Routing: React Router DOM v6
HTTP: Axios

##Instalación
    bashnpm install
    npm run dev

##Layout
Es el contenedor con barra lateral para las rutas privadas del ADMIN:

/offices/:slug/clientes
/offices/:slug/cobradores
/offices/:slug/creditos

###Páginas

##Superadmin

Incluye login propio en la misma página.

-Ver lista de oficinas con estado activo/inactivo.
-Crear nueva oficina (nombre, slug para identificar las oficianas, teléfono, dirección).
-Activar o desactivar una oficina.
-Crear un ADMIN para una oficina desde un modal.

##Clientes

Gestión de clientes de la oficina.

-Lista los cobradores activos de la oficina para asignar al crear un cliente.
-Crea clientes con: nombre, cédula, dirección, teléfono y cobrador asignado.
-Lista todos los clientes de la oficina con su cobrador.
-Botón de cierre de sesión que redirige al login de la misma oficina.

##Cobradores

Gestión de cobradores de la oficina.

-Lista los cobradores con botones para habilitar/deshabilitar.
-Botón "Ver clientes" carga los clientes asignados a ese cobrador.
-Modal integrado para crear un nuevo usuario (COBRADOR o ADMIN).


##Creditos

Gestión de créditos.

-Selecciona un cliente del dropdown para crear o consultar créditos.
-El interés fijo es 30%. El campo montoAPagar se calcula automáticamente: monto * 1.30.
-Lista los créditos del cliente seleccionado con: monto prestado, total a pagar, saldo pendiente y estado.
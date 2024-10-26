
# API de Gestión Hotelera

## 1. Introducción

Este documento describe el contrato de servicios web para la API de Gestión Hotelera. Esta API proporciona endpoints para gestionar un sistema hotelero, incluyendo habitaciones, usuarios, reservas y ubicaciones.

## 2. Versión

Versión actual: 1.0.0

## 3. URL Base

```
https://api.ejemplo.com/api
```

## 4. Recursos y Operaciones

La API está organizada alrededor de los siguientes recursos:

### 4.1 Habitaciones (Rooms)

- `GET /rooms`: Listar todas las habitaciones
- `GET /rooms/{id}`: Obtener una habitación específica
- `POST /rooms`: Crear una nueva habitación
- `PUT /rooms/{id}`: Actualizar una habitación
- `DELETE /rooms/{id}`: Eliminar una habitación

### 4.2 Usuarios (Users)

- `GET /users`: Listar todos los usuarios
- `GET /users/{id}`: Obtener un usuario específico
- `POST /users`: Crear un nuevo usuario
- `PUT /users/{id}`: Actualizar un usuario
- `DELETE /users/{id}`: Eliminar un usuario

### 4.3 Reservas (Reservations)

- `GET /reservations`: Listar todas las reservas
- `GET /reservations/{id}`: Obtener una reserva específica
- `POST /reservations`: Crear una nueva reserva
- `PUT /reservations/{id}`: Actualizar una reserva
- `DELETE /reservations/{id}`: Eliminar una reserva

### 4.4 Ubicaciones (Locations)

- `GET /locations`: Listar todas las ubicaciones
- `GET /locations/{id}`: Obtener una ubicación específica
- `POST /locations`: Crear una nueva ubicación
- `PUT /locations/{id}`: Actualizar una ubicación
- `DELETE /locations/{id}`: Eliminar una ubicación

## 5. Formatos de Datos

Todas las solicitudes y respuestas utilizan el formato JSON.

## 6. Manejo de Errores

La API utiliza códigos de respuesta HTTP convencionales para indicar el éxito o fracaso de una solicitud:

- 2xx: Éxito
- 4xx: Error del cliente (ej. parámetro requerido omitido)
- 5xx: Error del servidor

## 7. Límites de Tasa

Las llamadas a la API están sujetas a límites de tasa. Verifique los encabezados de respuesta para conocer su estado actual de límite de tasa.

## 8. Uso de Swagger

Swagger se utiliza para documentar y probar la API. Para acceder a la interfaz de Swagger:

1. Inicie el servidor de desarrollo
2. Navegue a `http://localhost:3000/api-docs` en su navegador
3. Explore los endpoints, modelos de datos y pruebe las operaciones directamente desde la interfaz

Swagger proporciona una interfaz interactiva que permite:
- Ver todos los endpoints disponibles y sus descripciones
- Probar las operaciones de la API directamente desde el navegador
- Ver los modelos de datos y esquemas de respuesta
- Entender los parámetros requeridos y opcionales para cada endpoint

## 9. Despliegue Local

Para desplegar el proyecto localmente:

1. Clone el repositorio:
   ```
   git clone https://github.com/hrcamilo11/HotelAPI.git
   ```

2. Instale las dependencias:
   ```
   cd HotelAPI
   npm install
   ```

3. Configure las variables de entorno:
    - Copie el archivo `.env.example` a `.env`
    - Complete las variables con sus valores correspondientes

4. Inicie el servidor de desarrollo:
   ```
   npm run dev
   ```

5. El servidor estará disponible en `http://localhost:3000`

## 10. Uso de las APIs como Servicio

Para utilizar estas APIs como servicio en su aplicación:

1. Asegúrese de que su aplicación pueda realizar solicitudes HTTP
2. Utilice la URL base y las rutas especificadas para cada endpoint
3. Envíe y reciba datos en formato JSON
4. Maneje las respuestas y los errores adecuadamente en su aplicación

Ejemplo de solicitud usando fetch en JavaScript:

```javascript
fetch('https://api.ejemplo.com/api/rooms')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

Para otros lenguajes o frameworks, utilice el método apropiado para realizar solicitudes HTTP y procesar respuestas JSON.

## 11. Ejemplos de Uso

### Listar todas las habitaciones:
```
GET /api/rooms
```

### Crear una nueva reserva:
```
POST /api/reservations
Content-Type: application/json

{
  "user_id": "123",
  "room_id": "456",
  "check_in": "2023-06-01",
  "check_out": "2023-06-05"
}
```

### Actualizar una ubicación:
```
PUT /api/locations/789
Content-Type: application/json

{
  "name": "Hotel Central",
  "address": "123 Main St, City, Country"
}
```

## 12. Soporte

Para soporte técnico, por favor contacte a support@ejemplo.com

## 13. Términos de Uso

El uso de esta API está sujeto a nuestros Términos de Servicio. Al utilizar la API, usted acepta cumplir con estos términos.

## 14. Cambios y Actualizaciones

Nos reservamos el derecho de realizar cambios en la API. Las actualizaciones importantes serán comunicadas a través de nuestro boletín de desarrolladores.# API de Gestión Hotelera

## 1. Introducción

Este documento describe el contrato de servicios web para la API de Gestión Hotelera. Esta API proporciona endpoints para gestionar un sistema hotelero, incluyendo habitaciones, usuarios, reservas y ubicaciones.

## 2. Versión

Versión actual: 1.0.0

## 3. URL Base

```
https://api.ejemplo.com/api
```

## 4. Recursos y Operaciones

La API está organizada alrededor de los siguientes recursos:

### 4.1 Habitaciones (Rooms)

- `GET /rooms`: Listar todas las habitaciones
- `GET /rooms/{id}`: Obtener una habitación específica
- `POST /rooms`: Crear una nueva habitación
- `PUT /rooms/{id}`: Actualizar una habitación
- `DELETE /rooms/{id}`: Eliminar una habitación

### 4.2 Usuarios (Users)

- `GET /users`: Listar todos los usuarios
- `GET /users/{id}`: Obtener un usuario específico
- `POST /users`: Crear un nuevo usuario
- `PUT /users/{id}`: Actualizar un usuario
- `DELETE /users/{id}`: Eliminar un usuario

### 4.3 Reservas (Reservations)

- `GET /reservations`: Listar todas las reservas
- `GET /reservations/{id}`: Obtener una reserva específica
- `POST /reservations`: Crear una nueva reserva
- `PUT /reservations/{id}`: Actualizar una reserva
- `DELETE /reservations/{id}`: Eliminar una reserva

### 4.4 Ubicaciones (Locations)

- `GET /locations`: Listar todas las ubicaciones
- `GET /locations/{id}`: Obtener una ubicación específica
- `POST /locations`: Crear una nueva ubicación
- `PUT /locations/{id}`: Actualizar una ubicación
- `DELETE /locations/{id}`: Eliminar una ubicación

## 5. Formatos de Datos

Todas las solicitudes y respuestas utilizan el formato JSON.

## 6. Manejo de Errores

La API utiliza códigos de respuesta HTTP convencionales para indicar el éxito o fracaso de una solicitud:

- 2xx: Éxito
- 4xx: Error del cliente (ej. parámetro requerido omitido)
- 5xx: Error del servidor

## 7. Límites de Tasa

Las llamadas a la API están sujetas a límites de tasa. Verifique los encabezados de respuesta para conocer su estado actual de límite de tasa.

## 8. Uso de Swagger

Swagger se utiliza para documentar y probar la API. Para acceder a la interfaz de Swagger:

1. Inicie el servidor de desarrollo
2. Navegue a `http://localhost:3000/api-docs` en su navegador
3. Explore los endpoints, modelos de datos y pruebe las operaciones directamente desde la interfaz

Swagger proporciona una interfaz interactiva que permite:
- Ver todos los endpoints disponibles y sus descripciones
- Probar las operaciones de la API directamente desde el navegador
- Ver los modelos de datos y esquemas de respuesta
- Entender los parámetros requeridos y opcionales para cada endpoint

## 9. Despliegue Local

Para desplegar el proyecto localmente:

1. Clone el repositorio:
   ```
   git clone https://github.com/su-usuario/hotel-management-api.git
   ```

2. Instale las dependencias:
   ```
   cd hotel-management-api
   npm install
   ```

3. Configure las variables de entorno:
    - Copie el archivo `.env.example` a `.env`
    - Complete las variables con sus valores correspondientes

4. Inicie el servidor de desarrollo:
   ```
   npm run dev
   ```

5. El servidor estará disponible en `http://localhost:3000`

## 10. Uso de las APIs como Servicio

Para utilizar estas APIs como servicio en su aplicación:

1. Asegúrese de que su aplicación pueda realizar solicitudes HTTP
2. Utilice la URL base y las rutas especificadas para cada endpoint
3. Envíe y reciba datos en formato JSON
4. Maneje las respuestas y los errores adecuadamente en su aplicación

Ejemplo de solicitud usando fetch en JavaScript:

```javascript
fetch('https://api.ejemplo.com/api/rooms')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

Para otros lenguajes o frameworks, utilice el método apropiado para realizar solicitudes HTTP y procesar respuestas JSON.

## 11. Ejemplos de Uso

### Listar todas las habitaciones:
```
GET /api/rooms
```

### Crear una nueva reserva:
```
POST /api/reservations
Content-Type: application/json

{
  "user_id": "123",
  "room_id": "456",
  "check_in": "2023-06-01",
  "check_out": "2023-06-05"
}
```

### Actualizar una ubicación:
```
PUT /api/locations/789
Content-Type: application/json

{
  "name": "Hotel Central",
  "address": "123 Main St, City, Country"
}
```

## 12. Soporte

Para soporte técnico, por favor contacte a hrcamilo11@gmail.com

## 13. Términos de Uso

El uso de esta API está sujeto a nuestros Términos de Servicio. Al utilizar la API, usted acepta cumplir con estos términos.

## 14. Cambios y Actualizaciones

Nos reservamos el derecho de realizar cambios en la API. Las actualizaciones importantes serán comunicadas a través de nuestro boletín de desarrolladores.
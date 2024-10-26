require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const locationsRouter = require('./routes/locations');
const reservationsRouter = require('./routes/reservations');

const app = express();
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hotel Reservation API',
            version: '1.0.0',
            description: 'API para reservas de hotel en Medellín',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/reservations', reservationsRouter);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
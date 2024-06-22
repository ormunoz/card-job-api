const { Router } = require('express');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const routes = require('./indexRoutes.js');

const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Card Jobs',
            version: '1.0.0',
            description: "Endpoints comienzan con '/api/v1'"
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production' ? `${process.env.DOC_URL}/api/v1` : 'http://localhost:3000/api/v1'
            }
        ]
    },
    apis: [
        path.join(__dirname, './*.js')
    ]
};

const appRoutes = (app) => {
    const router = Router();
    app.use('/api/v1', router);
    router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
    router.use('/users', routes.usersRoutes);
};

module.exports = appRoutes;

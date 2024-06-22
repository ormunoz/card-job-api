const express = require('express');
const path = require('path'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const { boomErrorHandler, logError, handleError } = require('./middlewares/ErrorHandler.js');
const appRoutes = require('./router/AppRoutes.js');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';
        this.middleware();
        this.routes();
    }

    routes() {
        // Rutas del backend
        this.app.get('/api/v1', (req, res) => {
            res.json({ ok: true, msg: 'API Online' });
        });
        appRoutes(this.app);
        // Configura una ruta de comodín para redirigir todas las solicitudes a index.html
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
        });
        this.handleErrors();
    }

    middleware() {
        // Configuración de middleware
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
        this.app.options('*', cors());
        this.app.use(bodyParser.json());
        // Servir archivos estáticos desde la carpeta "dist"
        this.app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
    }

    handleErrors() {
        // Manejo de errores
        this.app.use(logError);
        this.app.use(boomErrorHandler);
        this.app.use(handleError);
    }

    init() {
        // Iniciar el servidor
        this.app.listen(this.port, () => {
            console.log(`Servidor en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;

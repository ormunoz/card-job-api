require('dotenv').config();

const Server = require('./server');

const server = new Server();
server.init();
console.log('Servidor inicializado.');
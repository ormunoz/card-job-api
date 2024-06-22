const express = require('express');
const router = express.Router();
// import { isValidToken } from '../middlewares/jwtHandler.js';
// import {validateHandler} from '../middlewares/validationHandler.js'
const { userController } = require('../controller/indexController.js');

// Get users
/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             example:
 *               status: 'success'
 *               message: 'Lista de usuarios obtenida correctamente'
 *               data: 
 *                 - name: 'Usuario 1'
 *                   email: 'usuario1@example.com'
 *                   state: 'activo'
 *                   role: 'Usuario'
 *                 - name: 'Usuario 2'
 *                   email: 'usuario2@example.com'
 *                   state: 'inactivo'
 *                   role: 'Admin'
 */
router.get('/all', userController.getAllUser );


// login user
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               msg: Inicio de sesión exitoso
 *               User:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   state:
 *                     type: string
 *                   role:
 *                     type: string
 *                   
 *               token:
 *                 type: string
 *       401:
 *         description: Error de autenticación
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: Error de autenticación
 *               status: 401
 */
router.post('/login', userController.loginUser) // ok


module.exports = router


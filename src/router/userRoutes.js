const express = require('express');
const router = express.Router();
// import { isValidToken } from '../middlewares/jwtHandler.js';
// import {validateHandler} from '../middlewares/validationHandler.js'
const { userController } = require('../controller/indexController.js');

// Obtener todos los usuarios
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
 *                 - user_name: 'Usuario 1'
 *                   email: 'usuario1@example.com'
 *                   role_id: 1
 *                   profile_image: 'url_de_la_imagen'
 *                 - user_name: 'Usuario 2'
 *                   email: 'usuario2@example.com'
 *                   role_id: 2
 *                   profile_image: 'url_de_la_imagen'
 */
router.get('/all', userController.getAllUser );


// Iniciar sesión de usuario
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
 *                   user_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role_id:
 *                     type: integer
 *                   profile_image:
 *                     type: string
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

// Crear invitación
/**
 * @swagger
 * /users/invitation:
 *   post:
 *     summary: Crea una invitación para un usuario
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
 *                 description: Correo electrónico del usuario a invitar
 *               user_create:
 *                 type: string
 *                 description: Usuario que crea la invitación
 *             required:
 *               - email
 *               - user_create
 *     responses:
 *       200:
 *         description: Invitación creada con éxito
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               msg: Invitación realizada con éxito
 *               data:
 *                 email: 'usuario@example.com'
 *                 user_create: 'admin'
 */
router.post('/invitation', userController.createInvitation) // ok

// Eliminar usuario
/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               msg: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: Usuario no encontrado
 */
router.delete('/delete/:id', userController.deleteUser);

// Cambiar rol de usuario
/**
 * @swagger
 * /users/change-role/{id}:
 *   put:
 *     summary: Cambia el rol de un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario cuyo rol se va a cambiar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newRole:
 *                 type: integer
 *                 description: Nuevo rol del usuario (ID del rol)
 *             required:
 *               - newRole
 *     responses:
 *       200:
 *         description: Rol de usuario actualizado correctamente
 *         content:
 *           application/json:
 *             example:
 *               message: Rol de usuario actualizado correctamente: 1
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: Usuario no encontrado
 */
router.put('/change-role/:id', userController.changeUserRole);

module.exports = router


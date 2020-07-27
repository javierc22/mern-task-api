// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Crear usuario: api/usuarios
router.post('/',
  userController.createUser
);

module.exports = router;
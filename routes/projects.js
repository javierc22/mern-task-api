const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

// Crear Proyecto: api/projects
router.post('/',
  auth,
  [
    check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ],
  projectController.createProject
);

// Obtener proyectos: api/projects
router.get('/', 
  auth,
  projectController.getProjects
);

module.exports = router;
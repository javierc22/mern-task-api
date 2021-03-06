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

// Actualizar proyecto: api/projects/:id
router.put('/:id', 
  auth,
  [
    check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ],
  projectController.updateProject
);

// Eliminar proyecto: api/projects/:id
router.delete('/:id',
  auth,
  projectController.deleteProject
);

module.exports = router;
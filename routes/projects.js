const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/projectController');

// Crear Proyecto: api/projects
router.post('/',
  proyectController.createProject
);

module.exports = router;
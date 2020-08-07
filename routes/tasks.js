const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crear una tarea: api/tasks
router.post('/', 
    auth,
    [
        check('name', 'El Nombre es obligatorio').not().isEmpty(),
        check('project', 'El proyecto es obligatorio').not().isEmpty()
    ],
    taskController.createTask
);

// Obtener Tareas: api/tasks
router.get('/', 
    auth,
    taskController.getTasks
);

module.exports = router;
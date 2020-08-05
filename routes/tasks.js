const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crear una tarea: api/tasks
router.post('/', 
    auth,
    [
        check('name', 'El Nombre es obligatorio').not().isEmpty()
    ],
    taskController.createTask
);

module.exports = router;
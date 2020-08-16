const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// Crear una nueva Tarea
exports.createTask = async (req, res) => {
  // Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json( { errors: errors.array() })
  }

  try {
    // Extraer proyecto y comprobar si existe
    const { project } = req.body;
    
    const projectTask = await Project.findById(project);

    // Revisar si el proyecto existe
    if (!projectTask) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    // Revisar si el creador del proyecto es igual al usuario actual 
    if (projectTask.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    // Crear la Tarea
    const task = new Task(req.body);
    await task.save();
    res.json({ task });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
} 

// Obtener tareas
exports.getTasks = async (req, res) => {
  try {
    // Extraer proyecto y comprobar si existe
    const { project } = req.query;

    const projectTask = await Project.findById(project);

    // Revisar si el proyecto existe
    if (!projectTask) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    // Revisar si el creador del proyecto es igual al usuario actual 
    if (projectTask.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    // Obtener las tareas por proyecto
    const tasks = await Task.find({ project }).sort({ created: -1 });
    res.json({ tasks });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

// Actualizar tareas
exports.updateTask = async (req, res) => {
  try {
    // Extraer proyecto y comprobar si existe
    const { project, name, status } = req.body;

    // Comprobar si la tarea existe
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json( { msg: 'No existe tarea' });
    }

    // Extraer proyecto
    const projectTask = await Project.findById(project);

    // Revisar si el creador del proyecto es igual al usuario actual 
    if (projectTask.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    // Crear un objeto con la nueva información
    const newTask = {};
    newTask.name = name;
    newTask.status = status;

    // Guardar la tarea
    task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true });
    res.json({ task });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

// Eliminar Tarea
exports.deleteTask = async (req, res) => {
  try {
    // Extraer proyecto y comprobar si existe
    const { project } = req.query;

    // Comprobar si la tarea existe
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json( { msg: 'No existe tarea' });
    }

    // Extraer proyecto
    const projectTask = await Project.findById(project);

    // Revisar si el creador del proyecto es igual al usuario actual 
    if (projectTask.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    // Eliminar
    await Task.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Tarea eliminada' });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

  // Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  
  try {
    // Crear nuevo proyecto
    const project = new Project(req.body);

    // Guardar Id de 'creador' vía JWT
    project.creator = req.user.id;

    // Guardar proyecto
    project.save()
    res.json(project);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

// Obtiene todos los proyectos del usuario actual
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ creator: req.user.id}).sort({ created: -1});
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

// Actualizar un proyecto
exports.updateProject = async (req, res) => {
  // Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Extraer la información del proyecto
  const { name } = req.body;
  const newProject = {};

  if (name) {
    newProject.name = name;
  }

  try {
    // Revisar el ID
    let project = await Project.findById(req.params.id);
    // Respuesta en caso que el proyecto no exista
    if (!project) {
      return res.status(404).json({ mgs: 'Proyecto no encontrado' })
    }
    // Verificar creador del proyecto
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ mgs: 'No Autorizado' })
    }

    // Actualizar
    project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });
    res.json({ project });
    
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor')
  }
}

// Eliminar un proyecto
exports.deleteProject = async (req, res) => {
  try {
    // Revisar el ID
    let project = await Project.findById(req.params.id);
    // Respuesta en caso que el proyecto no exista
    if (!project) {
      return res.status(404).json({ mgs: 'Proyecto no encontrado' })
    }
    // Verificar creador del proyecto
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ mgs: 'No Autorizado' })
    }
    // Eliminar el proyecto
    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Proyecto eliminado' })
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor')
  }
}
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
    
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor')
  }

}
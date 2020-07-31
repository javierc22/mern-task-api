const Project = require('../models/Project');

exports.createProject = async (req, res) => {
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
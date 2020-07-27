const User = require('../models/User')

exports.createUser = async (req, res) => {
  try {
    let user;
    // Crea el nuevo usuario
    user = new User(req.body);
    // Guardar usuario
    await user.save();
    // Mensaje de confirmación
    res.send('Usuario creado correctamente');
  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
  }
}
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  // Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extraer email y password
  const { email, password } = req.body;

  try {
    // Revisar que el usuario registrado sea único
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe'});
    }

    // Crea el nuevo usuario
    user = new User(req.body);

    // Hashear el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // Guardar usuario
    await user.save();
    // Mensaje de confirmación
    res.json({ msg: 'Usuario creado correctamente'});
  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
  }
}
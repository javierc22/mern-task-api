const User = require('../models/User');
const bcryptjs = require('bcryptjs');

exports.createUser = async (req, res) => {
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
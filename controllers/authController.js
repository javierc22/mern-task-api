const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
  // Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Extraer email y password
  const { email, password } = req.body;

  try {
    // Revisar que el usuario registrado sea único
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'El usuario no existe'});
    }

    // Revisar el password
    const correctPassword = await bcryptjs.compare(password, user.password);

    if (!correctPassword) {
      return res.status(400).json({ msg: 'Password incorrecto' })
    }

    // Si todo es correcto, Crear y firmar el JWT
    const payload = {
      user: { id: user.id }
    };

    // Firmar el JWT
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600 // 3600 segundos = 1 hora
    }, (error, token) => {
      // Si existe error lanza el error en vez del token
      if (error) throw error;
      // mensaje de confirmación. Si no existe error, se envía token
      res.json({ token });
    });
    
  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
  }
}

// Obtiene el usuario autenticado
exports.authenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error'});
  }
}
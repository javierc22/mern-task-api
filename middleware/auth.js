const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Leer el token del header
  const token = req.header('x-auth-token');

  // Revisar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No hay Token, permiso no válido' })
  }

  // Validar el Token
  try {
    const encryption = jwt.verify(token, process.env.JWT_SECRET);
    req.user = encryption.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' })
  }
}
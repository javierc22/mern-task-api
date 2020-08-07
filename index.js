const express = require('express');
const conectarDB = require('./config/db');

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar express.json
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
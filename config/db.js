const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('DB Conectada');
  } catch (error) {
    console.log('Hubo un error');
    console.log(error);
    // Detener la App
    process.exit(1); 
  }
}

module.exports = conectarDB;
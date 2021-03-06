# MERN TASK API

## 1. Primeros Pasos

1.1. Iniciar **package.json** para las dependencias y completar los datos:
~~~
$ npm init
~~~

<img src="./readme_images/01.png" width="400">

1.2. Instalar **Nodemon** como dependencia de desarrollo. Nos ayudará a que cada vez que haya un cambio, reiniciará el servidor.
~~~
$ npm install -D nodemon
~~~

<img src="./readme_images/02.png" height="250">

1.3. Instalar **express**, **mongoose** y **dotenv**
* **express**: Es el servidor que se va a utilizar
* **mongoose**: ORM de Mongo DB para facilitar las consultas
* **dotenv**: Para almacenar las variables de entorno

<img src="./readme_images/03.png" height="250">

1.4. Instalar **Postman**
~~~
$ sudo snap install postman
~~~

<img src="./readme_images/04.png" height="80">

Puedes ejecutar **Postman** desde la terminal con `$ postman` o abrirlo directamente desde el menú de aplicaciones.

## 2. Primeros Scripts

2.1. Agregar los primeros *script* en **package.json**
~~~json
  "scripts": {
    "start": "node .",
    "dev": "nodemon ."
  },
~~~

2.2. Crear archivo **index.js** con el mensaje `console.log('Desde index.js')` en la raíz del proyecto y ejecutar en consola `$ npm run dev` para comprobar el servidor

<img src="./readme_images/05.png" height="200">

## 3. Creando el servidor de Express

3.1. Modificar **index.js**
~~~js
const express = require('express');

// crear el servidor
const app = express();

// puerto de la app
const PORT = process.env.PORT || 4000;

// arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
~~~

3.2. Crear el archivo **variables.env** en la raíz del proyecto para las variables de entorno

## 4. Configurando Mongo DB con Atlas

4.1. Instalar **MongoDB Compass** en https://www.mongodb.com/try/download/compass

<img src="./readme_images/06.png" height="400">

Descargar e instalar con:
~~~
$ sudo apt install -f ~/Descargas/mongodb-compass_1.21.2_amd64.deb
~~~

<img src="./readme_images/07.png" height="400">

4.1. Ingresar a https://www.mongodb.com/cloud/atlas, crear una cuenta e ingresar.

<img src="./readme_images/08.png" height="400">

4.1. Crear un Cluster

<img src="./readme_images/09.png" height="400">

4.5. En el Cluster, dar click en **CONNECT**, escoger la opción **Connect your application** y copiar el código.

<img src="./readme_images/10.png" height="400">

<img src="./readme_images/11.png" height="400">

4.6 Agregar código al archivo **variables.env** con las modificaciones correspondientes

En este caso el código es
~~~
mongodb+srv://user_udemy:<password>@cluster0.mujzf.mongodb.net/<dbname>?retryWrites=true&w=majority
~~~
Quedando de esta forma para el proyecto
~~~
MONGO_DB = mongodb+srv://user_udemy:user_udemy@cluster0.mujzf.mongodb.net/merntasks
~~~

* Nota: El password es el que tiene el usuario en Mongo DB Atlas en *Database Access*

<img src="./readme_images/12.png" height="400">

Para entorno de desarrollo instalar Mongo DB:
https://linuxhint.com/install_mongodb_ubuntu_20_04/

## 5. Petición de prueba

Esto permitirá leer peticiones de tipo JSON en el proyecto
~~~js
// index.js

// Habilitar express.json
app.use(express.json({ extended: true }));
~~~

En el commit `456ba69 Enviar una petición a la API y leer contenido`, se puede enviar una petición de prueba desde **Postman** con lo siguiente:

En *Headers* agregar *Content-Type: Application/json*

<img src="./readme_images/13.png" height="400">

En *Body* agregar valores de ejemplo para enviar

<img src="./readme_images/14.png" height="400">

En consola, deberiamos obtener esto:

<img src="./readme_images/15.png" height="200">

## 6. Modelos

* Schema Types de Mongoose: https://mongoosejs.com/docs/schematypes.html

## 7. Hashear Passwords en la base de datos

7.1. Instalar **bcryptjs** (https://github.com/dcodeIO/bcrypt.js)
~~~
$ npm install bcryptjs
~~~

## 8. Validaciones

8.1. Instalar **express-validator** (https://github.com/express-validator/express-validator)
~~~
$ npm install express-validator
~~~

### 9. Json Web Token

9.1 Instalar **jsonwebtoken** (https://github.com/auth0/node-jsonwebtoken)
~~~
$ npm install jsonwebtoken
~~~

### 10. Instalar CORS

10.1. Instalar **Cors**
~~~
npm i cors
~~~
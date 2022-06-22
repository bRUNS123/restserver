const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { socketController } = require('../sockets/controller');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.paths = {
      auth: '/api/auth',
      buscar: '/api/buscar',
      categorias: '/api/categorias',
      productos: '/api/productos',
      usuarios: '/api/usuarios',
      uploads: '/api/uploads',
    };

    //Conectar a Base de datos.
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicación.
    this.routes();

    //Configuraciòn de Scokets
    this.sockets();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //BodyParser
    this.app.use(bodyParser.urlencoded({extended: true}));

    //Morgan
    this.app.use(morgan('dev'));

    //CORS
    this.app.use(cors());

    //Lectura y Parse de Body
    this.app.use(express.json());

    //Directorio Publico
    this.app.use(express.static('public'));

    // //Directorio Uploads
    // this.app.use(express.static('uploads'));
    
    // //Metodo Imagen Publica
    // this.imagenPublica();
    

    //Carga de Archivos (Use temp files instead of memory for managing the upload process).
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.buscar, require('../routes/buscar'));
    this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    this.app.use(this.paths.categorias, require('../routes/categorias'));
    this.app.use(this.paths.productos, require('../routes/productos'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
  }
  sockets(){
    this.io.on('connection', socketController);
  }
  // imagenPublica() {
  //   this.app.get('*', (req, res) => {
  //     res.sendFile(path.resolve('../public/index.html'));
  // });
  // }


  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}

module.exports = Server;

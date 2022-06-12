const { Router } = require('express');

const { body, check } = require('express-validator');
const {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  retornaImagen,
} = require('../controllers/uploads');
//actualizarImagenCDN
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivosSubidos } = require('../middlewares');
const { route } = require('./auth');

const router = Router();

//Subir un nuevo archivo
router.post('/', validarArchivosSubidos, cargarArchivo);

//Actualizar Imagen
router.put(
  '/:coleccion/:id',
  [
    validarArchivosSubidos,
    check('id', 'El id no se encuentra en la base de datos').isMongoId(),
    check('coleccion').custom((c) =>
      coleccionesPermitidas(c, ['usuarios', 'productos'])
    ),
    validarCampos,
  ],
  //actualizarImagenCloudinary
  actualizarImagen
);

//Get Image.
router.get(
  '/:coleccion/:id',
  [
    check('id', 'El id no se encuentra en la base de datos').isMongoId(),
    check('coleccion').custom((c) =>
      coleccionesPermitidas(c, ['usuarios', 'productos'])
    ),
    validarCampos,
  ],
  mostrarImagen
);

router.get('/img/:coleccion/:img', retornaImagen);


module.exports = router;

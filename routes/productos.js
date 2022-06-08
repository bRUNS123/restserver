const { Router } = require('express');
const { check, body } = require('express-validator');
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require('../controllers/productos');
const {
  existeProductoPorId,
  existeCategoriaPorId,
  productoExisteActualizar,
} = require('../helpers/db-validators');

const { validarJWT, validarCampos, tieneRole } = require('../middlewares');

const router = Router();

//{[url]}/api/productos

//obtener todos los productos- Publico (paginado)
router.get(
  '/',
  [
    check('limit', 'El valor limit debe ser númerico').optional().isNumeric(),
    check('from', 'El valor from debe ser númerico').optional().isNumeric(),
    validarCampos,
  ],
  obtenerProductos
);

//obtener un Producto por id - Publico
router.get(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);
//check('id').custom(existeProducto),

//Crear Producto - Privado - Cualquier Usuario (token valido)
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es oblitagorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    // check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

//Actualizar Producto - privado (cualquiera con token)
router.put(
  '/:id',
  [
    validarJWT,
    // check('categoria', 'No es un id de DB').isMongoId(),
    check('id').custom(existeProductoPorId),
    // check('nombre', 'id').custom(productoExisteActualizar),
    validarCampos,
  ],
  actualizarProducto
);

//Borrar Categoria - Admin
router.delete(
  '/:id',
  [
    validarJWT,
    //Solo puede ser Admin role.
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'SUPER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;

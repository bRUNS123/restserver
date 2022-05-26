const { Router } = require('express');
const { check, body } = require('express-validator');
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require('../controllers/categorias');
const {
  existeCategoriaPorId,
  categoriaExisteActualizar,
} = require('../helpers/db-validators');

const { validarJWT, validarCampos, tieneRole } = require('../middlewares');

const router = Router();

//{[url]}/api/categorias

//obtener todas las categorias - Publico (paginado)
router.get(
  '/',
  [
    check('limit', 'El valor limit debe ser númerico').optional().isNumeric(),
    check('from', 'El valor from debe ser númerico').optional().isNumeric(),
    validarCampos,
  ],
  obtenerCategorias
);

//obtener una categoria por id - Publico
router.get(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);
//check('id').custom(existeCategoria),

//Crear categoria - Privado - Cualquier Usuario (token valido)
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es oblitagorio').not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar Categoria - privado (cualquiera con token)
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es oblitagorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'id').custom(categoriaExisteActualizar),
    check('categoria', 'No es un id de DB').isMongoId(),
    validarCampos,
  ],
  actualizarCategoria
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
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;

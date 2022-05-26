const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const esAdminRole = require('../middlewares/validar-roles');
const tieneRole = require('../middlewares/validar-roles');
const validarArchivosSubidos = require('../middlewares/validar-archivos');

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...esAdminRole,
  ...tieneRole,
  ...validarArchivosSubidos
};

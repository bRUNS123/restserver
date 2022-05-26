const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

//Exporto con todos sus contenidos (propiedades, constantes, funciones )
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...googleVerify,
  ...subirArchivo,
};

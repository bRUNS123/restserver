const { Router } = require('express');

const { body } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Cambiar check por body, cookies, headers, query o params en su lugar. (si no busca argumento en todos lados).
router.post(
  '/login',
  [
    body('correo', 'El correo es obligatorio.').isEmail(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  '/google',
  [
    body('id_token', 'Id_Token de google es necesario.').not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);

module.exports = router;

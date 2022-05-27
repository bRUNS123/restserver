const bcryptjs = require('bcryptjs');
const { response } = require('express');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('express/lib/response');
const { validarGoogleFlutterIdToken } = require('../helpers/google-verify_flutter');

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si el email existe.
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario/Contraseña no son correctos - correo.',
      });
    }
    //El usuario está activo(existe).
    //usuario.estado===false
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario/Contraseña no son correctos - estado: false.',
      });
    }
    //Verificar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario/Contraseña no son correctos - password.',
      });
    }

    //Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

const googleSignIn = async (req, res = response, next) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      //Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: 'any',
        img,
        google: true,
        role: 'USER_ROLE',
      };

      usuario = new Usuario(data);
      await usuario.save();

      //Si el usuario ya existe, se carga información, o si hay actualización en google (se podria hacer un else)
    }

    //Si el usuario en DB (si el estado:false)
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Hable con el administrador. -Usuario bloqueado-',
      });
    }

    //Generar JWT
    const token = await generarJWT(usuario.id);
    console.log(usuario);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ ok: false, msg: 'El Token no se pudo verificar' });
  }
};

const googleSignInFlutter = async (req, res = response, next) => {
  const token = req.body.token;
  if (!token) {
    return res.json({
      ok: false,
      msg: 'No hay token en la petición.'
    })
  }

  const googleUser = await validarGoogleFlutterIdToken(token);
  if (!googleUser) {
    return res.status(400).json({
      ok: false
    });
  }

  res.json({
    googleUser,
    ok: true
  });
}


module.exports = {
  login,
  googleSignIn,
  googleSignInFlutter,
  validarGoogleFlutterIdToken
};

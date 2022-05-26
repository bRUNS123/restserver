const { response, request } = require('express');
const bcrypts = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
  // const { user = 'Anonimo', password, apikey, page, limit } = req.query;
  const { limit = 5, from = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, correo, password, role });

  //Encriptar contraseña
  const salt = bcrypts.genSaltSync();
  usuario.password = bcrypts.hashSync(password, salt);

  //Guardar en db.

  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //Validar contra base de datos.
  if (password) {
    //Encriptar contraseña
    const salt = bcrypts.genSaltSync();
    resto.password = bcrypts.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - Controlador',
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  // const uid = req.uid;

  // Borrado fisicamente
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  // const usuarioAutenticado = req.usuario;

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};

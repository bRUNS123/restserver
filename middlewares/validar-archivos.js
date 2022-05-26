const { response } = require('express');

const validarArchivosSubidos = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res
      .status(400)
      .json({ msg: 'Ningun archivo fue selecionado para subir.' });
  }
  next();
};

module.exports = {
  validarArchivosSubidos,
};

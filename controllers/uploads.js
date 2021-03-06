const { response } = require('express');

const { subirArchivo, imagenesPermitidas } = require('../helpers');
const { Usuario, Producto } = require('../models');
const path = require('path');
const fs = require('fs');

//importar paquete de pcloud o cloudinary
// const cloudinary = require('cloudinary).v2
//cloudinary.config(process.CDN_URL)

//Esperando archivo.
const cargarArchivo = async (req, res = response) => {
  try {
    //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
    const nombre = await subirArchivo(req.files, imagenesPermitidas, 'productos');
    res.json({ nombre });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

//Actualizar Imagen.
const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `El usuario '${id}' no existe.` });
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `El producto '${id}' no existe.` });
      }
      break;

    default:
      return res.status(500).json({ msg: 'No se ha validado.' });
  }
  //Limpiar imágenes previas.

  if (modelo.img) {
    //Borrar la imagen del servidor.
    const pathImagen = path.join(
      __dirname,
      '../uploads',
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivo(req.files, imagenesPermitidas, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
};


// //Actualizar Imagen Cloudinary
// const actualizarImagenCloudinary = async (req, res = response) => {
//   const { id, coleccion } = req.params;

//   let modelo;

//   switch (coleccion) {
//     case 'usuarios':
//       modelo = await Usuario.findById(id);
//       if (!modelo) {
//         return res.status(400).json({ msg: `El usuario '${id}' no existe.` });
//       }
//       break;
//     case 'productos':
//       modelo = await Producto.findById(id);
//       if (!modelo) {
//         return res.status(400).json({ msg: `El producto '${id}' no existe.` });
//       }
//       break;

//     default:
//       return res.status(500).json({ msg: 'No se ha validado.' });
//   }

//   //Limpiar imágenes previas.
//   if (modelo.img) {
//Borrar imagen de CDN
//const nombreArr = modelo.img.split('/');
//const nombre = nombreArr[nombreArr.length -1];
//const [public_id] = nombre.split('.');
//cloudinary.uploader.destroy(public_id);

  
//}
//Subir a Cloudinary (temppath)
//const {tempFilePath} = req.files.archivo
//const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
//modelo.img = secure_url;
//res.json(modelo)

//   const nombre = await subirArchivo(req.files, imagenesPermitidas, coleccion);
//   modelo.img = nombre;

//   await modelo.save();

//   res.json(modelo);
// };


//Mostrar Imagen
const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `El usuario '${id}' no existe.` });
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `El producto '${id}' no existe.` });
      }
      break;

    default:
      return res.status(500).json({ msg: 'No se ha validado.' });
  }

  //Limpiar imágenes previas.
  if (modelo.img) {
    //Borrar la imagen del servidor.
    const pathImagen = path.join(
      __dirname,
      '../uploads',
      coleccion,
      modelo.img

    );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen)
    }
  }

  const pathImagen = path.join(__dirname, '../assets/no-image.jpg')
  res.sendFile(pathImagen)
 
};


const retornaImagen = (req, res = response) => {

  const coleccion = req.params.coleccion;
  const img = req.params.img;

  const pathImg = path.join(__dirname, `../uploads/${ coleccion }/${ img }`);

  // imagen por defecto
  if (fs.existsSync(pathImg)) {
      res.sendFile(pathImg);
  } else {
      const pathImg = path.join(__dirname, '../assets/no-image.jpg');
      res.sendFile(pathImg);
  }

}

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  retornaImagen
  //actualizarImagenCloudinary
};

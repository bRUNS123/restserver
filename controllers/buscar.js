const { response } = require('express');

const { isValidObjectId } = require('mongoose');
const { Usuario, Categoria, Producto } = require('../models');

//seria ideal obtener esta lista de las existentes
const coleccionesPermitidas = [
  'usuarios',
  'categorias',
  'productos',
  'roles',
  'productosporcategorias',
];

const buscarUsuarios = async (termino = '', res = response) => {
  const esMongoID = isValidObjectId(termino); //TRUE, FALSE

  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    }); //Se puede hacer un populate
  }

  //Insensible a mayuscular y minisculas , si estado: false, no aparece en busqueda.
  const regex = new RegExp(termino, 'i');

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  const usuariosCount = await Usuario.count({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  return res.json({
    contador: usuariosCount,
    results: usuarios,
  });
};

//Busqueda categorias.
const buscarCategorias = async (termino = '', res = response) => {
  const esMongoID = isValidObjectId(termino);

  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    res.json({
      results: categoria ? [categoria] : [],
    }); //Se puede hacer un populate
  }
  //Insensible a mayuscular y minisculas , si estado: false, no aparece en busqueda.
  const regex = new RegExp(termino, 'i');

  const categorias = await Categoria.find({ nombre: regex, estado: true });
  const categoriasCount = await Categoria.count({
    nombre: regex,
    estado: true,
  });

  res.json({
    contador: categoriasCount,
    results: categorias,
  });
};

//Busqueda productos.
const buscarProductos = async (termino = '', res = response) => {
  const esMongoID = isValidObjectId(termino);

  if (esMongoID) {
    const producto = await Producto.findById(termino).populate(
      'categoria',
      'nombre'
    );
    res.json({
      results: producto ? [producto] : [],
    }); //Se puede hacer un populate
  }
  //Insensible a mayuscular y minisculas , si estado: false, no aparece en busqueda.
  const regex = new RegExp(termino, 'i');

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate('categoria', 'nombre');
  const productosCount = await Producto.count({
    nombre: regex,
    estado: true,
  });

  res.json({
    contador: productosCount,
    results: productos,
  });
};

const buscarProductosPorCategoria = async (termino = '', res = response) => {
  try {
    const esMongoID = isValidObjectId(termino); //TRUE, FALSE
    if (esMongoID) {
      const productos = await Producto.find({
        categoria: isValidObjectId(termino),
        estado: true,
      }).populate('categoria', 'nombre');
      return res.json({ resuls: productos });
    }
    const regex = new RegExp(termino, 'i');
    const categorias = await Categoria.find({ nombre: regex, estado: true });

    if (!categorias.length) {
      return res
        .status(400)
        .json({ msg: `No hay resultados con la expresión: ${termino}` });
    }
    const productos = await Producto.find({
      $or: [
        ...categorias.map((c) => {
          return { categoria: c._id };
        }),
      ],
      $and: [{ estado: true }],
    })
      .select('nombre precio descripcion disponible')
      .populate('categoria', 'nombre');

    res.json({ results: productos });
  } catch (err) {
    res.status(400).json(error);
  }
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `La colección '${coleccion}' no existe`,
    });
  }

  switch (coleccion) {
    case 'usuarios':
      buscarUsuarios(termino, res);
      break;
    case 'categorias':
      buscarCategorias(termino, res);
      break;
    case 'productos':
      buscarProductos(termino, res);
      break;
    case 'productosporcategorias':
      buscarProductosPorCategoria(termino, res);
      break;

    default:
      res.status(500).json({
        msg: 'No existe búsqueda en el registro.',
      });
  }
  //   res.json({ coleccion, termino });
};

module.exports = {
  buscar,
};

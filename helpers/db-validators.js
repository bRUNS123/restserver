const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

const esRoleValido = async (role = '') => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`El rol ${role} no esta registrado en la BD`);
  }
};

const emailExiste = async (correo = '') => {
  //Verificar si correo existe.
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El email ${correo} ya está registrado.`);
  }
};

const existeUsuarioPorId = async (id) => {
  //Verificar si correo existe.
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id:${id} no existe.`);
  }
};

//Validadores de Categorias.

const existeCategoriaPorId = async (id) => {
  //Verificar si correo existe.
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id:${id} no existe.`);
  }
};

const categoriaExisteActualizar = async (nombre = '', id) => {
  nombre = nombre.toUpperCase();

  const nombreActual = await Categoria.findOne({ id });

  if (nombreActual.nombre !== nombre) {
    const existeCategoria = await Categoria.findOne({ nombre });
    if (existeCategoria) {
      throw new Error(`La categoria ${nombre} ya existe`);
    }
  }
};

//Validadores de Productos.
const existeProductoPorId = async (id) => {
  //Verificar si correo existe.
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id:${id} no existe.`);
  }
};

const productoExisteActualizar = async (nombre = '', id) => {
  nombre = nombre.toUpperCase();

  const nombreActual = await Producto.findOne({ id });

  if (nombreActual.nombre !== nombre) {
    const existeProducto = await Producto.findOne({ nombre });
    if (existeProducto) {
      throw new Error(`El producto ${nombre} ya existe`);
    }
  }
};

//Validar colecciones permitidas.
//No garantiza que id este en la colección
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La colección '${coleccion}' no es permitida. Utilice: '${colecciones}'`
    );
  }
  return true;
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  categoriaExisteActualizar,
  existeProductoPorId,
  productoExisteActualizar,
  coleccionesPermitidas,
};

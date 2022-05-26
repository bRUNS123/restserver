const path = require('path');
const { v4: uuidv4 } = require('uuid');

//Se podria crear otras extensiones.
imagenesPermitidas = ['png', 'jpg', 'jpeg', 'gif'];

//Archivo txt y md
txtMdPermitidas = ['txt', 'md'];

//Crear metodos para diferentes archivos con sus carpetas.
//

//Argumento opcional Archivos y Carpetas
const subirArchivo = (
  files,
  extensionesValidas = imagenesPermitidas,
  carpeta = ''
) => {
  return new Promise((resolve, reject) => {
    //Extraigo la request(files), extraigo nombre.
    const { archivo } = files;

    //El nombre se corta String con identificador . para separar.
    const nombreSplit = archivo.name.split('.');

    //Obtener extensión
    const extension = nombreSplit[nombreSplit.length - 1];

    //Si no se cumple que extension este en Extension valida.
    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extensión ${extension} no es permitida. Utilice: ${extensionesValidas}`
      );
    }

    //Nombre temporal generado por uuidv4
    const nombreTemp = uuidv4() + '.' + extension;

    // El dirname llega al controllers (carpeta raiz)
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
  imagenesPermitidas,
};

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENTEFLUTTER_IDWEB);
const validarGoogleFlutterIdToken = async (token) => {

try {

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: [
      process.env.GOOGLE_CLIENTEFLUTTER_IDWEB,
      process.env.GOOGLE_CLIENTEFLUTTER_IDANDROID
    ], // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    //Añadir el de IOS, SDK biblioteca APIs de google console.
  });
  const payload = ticket.getPayload();
  // const userid = payload['sub'];
  console.log(payload);
  return {
    name: payload['name'],
    picture: payload['picture'],
    email: payload['email'],
  }
  
} catch (error) {
  return null;
  
}


  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  
}




module.exports = { validarGoogleFlutterIdToken };

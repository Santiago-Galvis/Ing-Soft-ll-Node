/* Importacion de librerias */
require('dotenv').config();

const express = require('express');
const port = 3000 || process.env.PORT;

// Librerias de sengrid para envio de correos electrónicos
const email = require('./email');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Enviar Mensaje Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Prueba enviando SMS',
    from: '+16625055950',
    to: '+573117702079',
  })
  .then((message) => console.log(`Mensaje Enviado ${message.sid}`));

/////////////////////////

//Para realizar pruebas con postman
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Crear ruta proyecto http://localhost:3000
app.get('/', (req, res) => {
  res.json({ message: 'Success' });
});

app.listen(port, () => {
  console.log(`Accede al sitio web dando clic aqui: http://localhost:${port}`);
});

app.post('/api/email/confirmacion', async (req, res, next) => {
  //Llamamos la funcion que estará en la clase email.js y que requiere parametros que se ingresan por postman
  try {
    res.json(await email.SendOrder(req.body));
  } catch (err) {
    next(err);
  }
});

//Validar que el código nos devuelve la ejecución del código, en caso de error, mostrar todo lo contenido en el error
app.use((err, req, res, next) => {
  //100 -> Informativo
  //200 -> No es un error, es un stattus success
  //300 -> No está disponible el recurso
  //400 -> No se ebncontró la uri
  //500 -> Error del servidor
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: error.message });
  return;
});

function getMessage() {
  const body = 'Mensaje enviado el 11/04/2022 11:09:00 p.m.';
  return {
    to: 'santiagogalvist@autonoma.edu.com',
    from: 'santiagogalvisgt25@gmail.com', // Change to your verified sender
    subject: 'Prueba Sengrid',
    text: body,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div class="container section">
            <label>Black Friday</label>
            <img src="./public/bf.jpg" width="400px">
        </div>
    </body>
    </html>`,
  };
}

async function sendEmail() {
  try {
    await sgMail.send(getMessage());
    console.log('Correo ha sido enviado');
  } catch (err) {
    console.error('No se ha podido enviar el mensaje');
    console.error(err);
    if (err.response) console.error(err.response.body);
  }
}

async () => {
  console.log('Enviando correo electrónico');
  await sendEmail();
};


  // Enviar Mensaje Whatsapp
  client.messages
  .create({
    body: 'Prueba de Twilio por WhatsApp',
    from: 'whatsapp:+',
    to: 'whatsapp:+',
  })
  .then((message) =>
    console.log(`Mensaje Enviado por WhatsApp ${message.sid}`)
  );

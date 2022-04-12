const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailConfimationHTML(customerName, orderNro){
  return `
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
          <img src="https://ibb.co/Dg6YXm9">
      </div>
  </body>
  </html>`
}

function getMessage(emailParams){
  return{
    to: emailParams.toEmail,
    from: 'santiagogalvisgt25@gmail.com', // Change to your verified sender
    subject: 'Prueba Black Friday',
    text: `Hola ${emailParams.customerName}, te enviamos la imagen del producto comprado y la factura con número ${emailParams.orderNro}. Gracias por tu compra`,
    html:sendEmailConfimationHTML(emailParams.customerName, emailParams.orderNro)
  }
}

async function SendOrder(emailParams){
  try {
    await sgMail.send(getMessage(emailParams))
    return {message: 'Confirmación de compra enviada'}
  } catch (err) {
    const message = 'No se puedo enviar la orden de compra. Valide los errores'
    console.error(message)
    console.error(err)
    if(err.response) console.error(err.response.body)
    return {message}
  }
}

module.exports={
  SendOrder
}

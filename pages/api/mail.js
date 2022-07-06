import { createTransport } from 'nodemailer';


export const sendmail =async(body)=>{

let transporter = createTransport({ 
    service: 'gmail', 
    auth: { 
       user: 'danielproenca89@gmail.com', 
       pass: 'gwilfesiykdzzgsy' 
     } 
    });

const mailOptions = {
        from: 'danielproenca89@gmail.com', // sender address
        to: body.email, // receiver (use array of string for a list)
        subject: 'Siga', // Subject line
        html: `<h1>Olá ${body.nome}! Sua visita foi solicitada.</h1> \n Você receberá em breve um email de confirmação \n <h2>Ticket: ${body.ticket}</h2>`// plain text body
      };

transporter.sendMail(mailOptions, (err, info) => {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}


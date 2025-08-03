import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // o tu SMTP, puede ser Mailgun, SendGrid, etc
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function enviarNotificacionEmail(destinatario, asunto, mensajeHtml) {
  await transporter.sendMail({
    from: `"LitisBot" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: asunto,
    html: mensajeHtml
  });
}

module.exports = { enviarNotificacionEmail };

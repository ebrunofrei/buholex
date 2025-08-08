import nodemailer from "nodemailer";
<<<<<<< HEAD
import { enviarWhatsApp } from "./whatsappService.js";
import { enviarTelegram } from "./telegramService.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
=======

const transporter = nodemailer.createTransport({
  service: "gmail", // o tu SMTP, puede ser Mailgun, SendGrid, etc
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

<<<<<<< HEAD
// Renombrada a enviarEmail
async function enviarEmail(destinatario, asunto, mensajeHtml) {
=======
async function enviarNotificacionEmail(destinatario, asunto, mensajeHtml) {
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
  await transporter.sendMail({
    from: `"LitisBot" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: asunto,
    html: mensajeHtml
  });
}

<<<<<<< HEAD
export { enviarEmail, enviarWhatsApp, enviarTelegram };
=======
module.exports = { enviarNotificacionEmail };
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))

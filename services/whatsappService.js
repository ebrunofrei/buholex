import twilio from "twilio";
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function enviarWhatsApp(to, mensaje) {
  return client.messages.create({
    body: mensaje,
    from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
    to: 'whatsapp:' + to // ejemplo: whatsapp:+519xxxxxxxx
  });
}

export { enviarWhatsApp };

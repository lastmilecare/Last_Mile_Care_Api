const twilio = require('twilio');
const {
    WP_TWILIO_ACCOUNT_SID,
    WP_TWILIO_AUTH_TOKEN,
    WP_TWILIO_PHONE_NUMBER
} = require('../../config/envConfig');

const client = twilio(WP_TWILIO_ACCOUNT_SID, WP_TWILIO_AUTH_TOKEN);

async function sendWhatsAppMessage(phoneNumber, name, url) {
    const messageBody = `Dear ${name}, Please find the link of your health package report. 
      We thank you for choosing 1Care Center. 
      In case of emergency, call: 80921 02102. 
      ${url}`;
    console.log(WP_TWILIO_ACCOUNT_SID, WP_TWILIO_AUTH_TOKEN);
    console.log(messageBody)
    try {
        const message = await client.messages.create({
            from: `whatsapp:${WP_TWILIO_PHONE_NUMBER}`,
            body: messageBody,
            to: `whatsapp:+91${phoneNumber}`
        });
        console.log('Message sent successfully:', message.sid);
        return message.sid;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

module.exports = { sendWhatsAppMessage };

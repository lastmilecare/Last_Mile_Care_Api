const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, } = require('../../config/envConfig');
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

async function sendOTPToWhatsApp(phoneNumber) {
    console.log('TWILIO_ACCOUNT_SID:', TWILIO_ACCOUNT_SID);
    console.log('TWILIO_AUTH_TOKEN:', TWILIO_AUTH_TOKEN);
    console.log('TWILIO_PHONE_NUMBER:', TWILIO_PHONE_NUMBER);

    try {
        const send = await client.messages.create({
            from: `whatsapp:${TWILIO_PHONE_NUMBER}`,
            body: 'Hello there!',
            to: `whatsapp:+91${phoneNumber}`
        });
        return send;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error; // Throw the error to be handled by the caller
    }
}

module.exports = { sendOTPToWhatsApp };


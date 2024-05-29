// const twilio = require('twilio');
// const {
//     WP_TWILIO_ACCOUNT_SID,
//     WP_TWILIO_AUTH_TOKEN,
//     WP_TWILIO_PHONE_NUMBER
// } = require('../../config/envConfig');

// const client = twilio(WP_TWILIO_ACCOUNT_SID, WP_TWILIO_AUTH_TOKEN);

// async function generateOTP() {
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     return otp.toString();
// }

async function sendOTPToWhatsApp(phoneNumber) {
    // const otp = await generateOTP();
    // const messageText = `Your OTP is ${otp}. Please share this with the respective personnel to get your mobile verified and generate your request for an appointment.`;

    // try {
    //     const send = await client.messages.create({
    //         from: `whatsapp:${WP_TWILIO_PHONE_NUMBER}`,
    //         body: messageText,
    //         to: `whatsapp:+${phoneNumber}`
    //     });
    //     console.log('OTP sent successfully:', send.sid);
    //     return { otp, sid: send.sid };
    // } catch (error) {
    //     console.error('Error sending OTP:', error);
    //     throw error; // Throw the error to be handled by the caller
    // }
}

module.exports = { sendOTPToWhatsApp };


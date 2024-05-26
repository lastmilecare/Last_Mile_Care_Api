const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, } = require('../../config/envConfig');

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

async function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

async function sendOTP(phoneNumber) {
    const otp = await generateOTP();

    try {
        // await client.messages.create({
        //     body: `Your OTP is: ${otp}`,
        //     from: TWILIO_PHONE_NUMBER,
        //     to: `+91${phoneNumber}`
        // });
        return otp; // Return OTP if sent successfully
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error; // Throw the error to be handled by the caller
    }
}

module.exports = { sendOTP };
const twilio = require('twilio');
// Twilio configuration
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';
// const client = twilio(accountSid, authToken);

async function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

async function sendOTP(phoneNumber) {
    try {
        const otp = await generateOTP();
        // await client.messages.create({
        //     body: `Your OTP is: ${otp}`,
        //     from: twilioPhoneNumber,
        //     to: phoneNumber
        // });

        return otp; // Return true if OTP is sent successfully
    } catch (error) {
        console.error('Error sending OTP : ', error);
        return false; // Return false if there's an error
    }
}

module.exports = { sendOTP };
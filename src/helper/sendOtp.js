const twilio = require('twilio');
// Twilio configuration
const accountSid = 'ACf660295be300a93ff0411a8df0ea50b1';
const authToken = '640c02a12df3f7cde3a4b075cf90c302';
const twilioPhoneNumber = +12058431847;
const client = twilio(accountSid, authToken);

async function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

async function sendOTP(phoneNumber) {
    try {
        const otp = await generateOTP();
        await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: twilioPhoneNumber,
            to: `+91${phoneNumber}`
        });

        return otp; // Return true if OTP is sent successfully
    } catch (error) {

        return error; // Return false if there's an error
    }
}

module.exports = { sendOTP };
const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, } = require('../../config/envConfig');
const axios = require('axios');
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

async function generateOTP() {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
}

async function sendOTP(phoneNumber) {
    const otp = await generateOTP();

    try {

        const messageText = `Your OTP is ${otp}. Please share this with the respective personnel to get your mobile verified and generate your request for an appointment.`;
        const username = 'anupam@senpiper.com';
        const apiKey = encodeURIComponent('2959e07743f0e2661572cdd9dcf42dd182d4345a');
        const numbers = encodeURIComponent(`+91${phoneNumber}`);
        const sender = encodeURIComponent('SNPIPR');
        const message = encodeURIComponent(messageText);
        const data = `hash=${apiKey}&username=${username}&numbers=${numbers}&sender=${sender}&message=${message}`;
        const response = await axios.get(`https://api.textlocal.in/send/?${data}`);

        const resData = {
            response: response.data,
            otp: otp
        };
        console.log("resData", resData);
        return resData;

        // axios.get(`https://api.textlocal.in/send/?${data}`)
        //     .then(response => {
        //         // Process your response here
        //         const resData = {
        //             response: response.data,
        //             otp: otp
        //         }
        //         console.log("resData", resData);
        //         return resData
        //     })
        //     .catch(error => {
        //         console.error('There was an error sending the message:', error);
        //     });
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error; // Throw the error to be handled by the caller
    }
}

module.exports = { sendOTP };
const axios = require('axios');


exports.sendOtp = async (req, res) => {
    // Validate phoneNumber
    const otp = "1234"; // Generate a 6-digit OTP
    console.log(otp);
    // Use the approved message template format
    const messageText = `Your OTP is 3564. Please share this with the respective personnel to get your mobile verified and generate your request for an appointment.`;
    const username = 'anupam@senpiper.com';
    const apiKey = encodeURIComponent('2959e07743f0e2661572cdd9dcf42dd182d4345a');
    const numbers = encodeURIComponent('919088886641,919073333611');
    const sender = encodeURIComponent('SNPIPR');
    const message = encodeURIComponent(messageText);
    console.log(messageText);

    // Prepare data for GET request
    const data = `hash=${apiKey}&username=${username}&numbers=${numbers}&sender=${sender}&message=${message}`;

    // Send the GET request with axios
    axios.get(`https://api.textlocal.in/send/?${data}`)
        .then(response => {
            // Process your response here
            console.log(response.data);
            return res.status(200).json({ success: true, data: response.data });
        })
        .catch(error => {
            console.error('There was an error sending the message:', error);
        });
}

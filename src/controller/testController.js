const axios = require('axios');

// Account details

// exports.sendOtp = async (req, res) => {
//     const username = 'anupam@senpiper.com'; // Replace with your Textlocal username
//     const hash = '2959e07743f0e2661572cdd9dcf42dd182d4345a'; // Replace with your Textlocal hash
//     const { phoneNumber } = req.body; // Get the phone number from the request body
//     const sender = 'SNPIPR'; // Replace with your sender ID
//     const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

//     // Validate phoneNumber
//     if (!phoneNumber || !/^\+\d{12}$/.test(phoneNumber)) {
//         return res.status(400).json({ success: false, error: 'Invalid phone number format. Include country code.' });
//     }

//     // Use the approved message template format
//     const message = `Your OTP code is ${otp}. 
//     Please share this with the respective personnel to get your mobile verified and generate your request for an appointment.`;

//     // Prepare data for POST request
//     const data = new URLSearchParams();
//     data.append('username', username);
//     data.append('hash', hash);
//     data.append('numbers', phoneNumber);
//     data.append('message', message);
//     data.append('sender', sender);
//     console.log("data", data);
//     try {
//         // Send the POST request with Axios
//         const response = await axios.get('https://api.textlocal.in/send/', data);
//         // Check if the response status is failure and log the errors
//         if (response.data.status === 'failure') {
//             console.error('Failed to send OTP:', response.data.errors);
//             return res.status(400).json({ success: false, errors: response.data.errors });
//         } else {
//             // Process your response here
//             console.log('OTP sent successfully:', response.data);
//             return res.status(200).json({ success: true, data: response.data });
//         }
//     } catch (error) {
//         console.error('There was an error sending the OTP:', error);
//         return res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
// };

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

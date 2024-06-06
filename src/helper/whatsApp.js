const twilio = require('twilio');
const {
    WP_TWILIO_ACCOUNT_SID,
    WP_TWILIO_AUTH_TOKEN,
    WP_TWILIO_PHONE_NUMBER,
    WP_TWILIO_PHONE_NUMBER_TEMP
} = require('../../config/envConfig');

const client = twilio(WP_TWILIO_ACCOUNT_SID, WP_TWILIO_AUTH_TOKEN);
//537f228a33e48c7fd7a9f0632d557961
async function sendWhatsAppTemplateMessage(name, url) {
    const mediaUrl = "https://last-mile-care-center.vercel.app/images/LMC_logo.png";
    try {
        // Send message using Twilio API
        //const message = await sendMessageThroughTwilio(phoneNumber, messageBody, twilioConfig);
        await client.messages
            .create({
                from: 'whatsapp:+917209152555',
                body: `Dear ${name}, Please find the link of your health package report. \nWe thank you for choosing 1Care Center. In case of emergency, call: 80921 02102. \n${url}`,
                mediaUrl: [mediaUrl],
                to: 'whatsapp:+919088886641'
            })
            .then(message => console.log(message));

    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}



module.exports = { sendWhatsAppTemplateMessage };

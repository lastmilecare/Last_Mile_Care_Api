const twilio = require('twilio');
const {
    WP_TWILIO_ACCOUNT_SID,
    WP_TWILIO_AUTH_TOKEN,
    WP_TWILIO_PHONE_NUMBER,
    WP_TWILIO_PHONE_NUMBER_TEMP
} = require('../../config/envConfig');

const client = twilio("ACf660295be300a93ff0411a8df0ea50b1", "a1efb47eb22eaa2df55df3c0652a8d23");

async function sendWhatsAppMessage(phoneNumber, name, url) {
    const messageBody = `Dear ${name}, Please find the link of your health package report. 
          We thank you for choosing 1Care Center. 
          In case of emergency, call: 80921 02102. 
          ${url}`;

    try {
        // const message = await client.messages.create({
        //     from: `whatsapp:${WP_TWILIO_PHONE_NUMBER}`,
        //     body: messageBody,
        //     to: `whatsapp:+91${phoneNumber}`
        // });




        console.log('Message sent successfully:', message.sid);
        //return message.sid;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}


async function sendWhatsAppTemplateMessage(phoneNumber, name, headerMediaPath, mediaPath) {
    // Configuration details
    // const actionConfig = {
    //     type: "SMS",
    //     roles: ["FORM_FIELDS_USER"],
    //     ccRoles: [],
    //     actionConfig: {
    //         body: "test",
    //         promotional: false,
    //         formKey: ["p"]
    //     },
    //     actionConfigId: "SMS1",
    //     messageType: "WHATSAPP",
    //     messageTemplateId: "HX025d231bad970dd66eb23559d6eb91c4",
    //     templateVariableToValueMap: {
    //         // Mapping placeholders to field keys
    //         "name": name,
    //         "header_media_file_path": headerMediaPath,
    //         "media_file_path": mediaPath
    //     }
    // };

    // // Twilio configuration
    // const twilioConfig = {
    //     sid: "ACf660295be300a93ff0411a8df0ea50b1",
    //     authToken: "a1efb47eb22eaa2df55df3c0652a8d23",
    //     fromPhoneNumber: "+917209152555",
    //     messageServiceId: "MG13ac4e7f8bab96a9fbac37705b7178b8"
    // };

    // // Construct message body using template variables
    // const messageBody = `Dear ${name}, Please find the link of your health package report. \nWe thank you for choosing 1Care Center. In case of emergency, call: 80921 02102. \n${mediaPath}`;

    try {
        // Send message using Twilio API
        //const message = await sendMessageThroughTwilio(phoneNumber, messageBody, twilioConfig);
        await client.messages
            .create({
                from: 'whatsapp:+917209152555',
                body: `Dear [[$n]], Please find the link of your health package report. \nWe thank you for choosing 1Care Center. In case of emergency, call: 80921 02102. \n[[$u]]`,

                to: 'whatsapp:+919088886641'
            })
            .then(message => console.log(message.sid));
        console.log('Message sent successfully:', message.sid);
        return message.sid;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}


async function sendMessageThroughTwilio(phoneNumber, messageBody, twilioConfig) {
    // Initialize Twilio client

    try {
        // Send message
        const message = await client.messages.create({
            from: `whatsapp:${twilioConfig.fromPhoneNumber}`,
            to: `whatsapp:${phoneNumber}`,
            body: messageBody,
            // Optional if you need to send media
            // mediaUrl: [mediaPath]
        });
        return message;
    } catch (error) {
        throw error;
    }
}
module.exports = { sendWhatsAppTemplateMessage };

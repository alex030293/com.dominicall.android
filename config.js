// Define app configuration in a single location, but pull in values from
// system environment variables (so we don't check them in to source control!)
module.exports = {
    // Twilio Account SID - found on your dashboard
    accountSid: "ACba744ffca6127d57d7d6d1fb05746d06",

    // Twilio Auth Token - found on your dashboard
    authToken: "3f45ddfaafabec690ddb18d2270c46e8",

    // A Twilio number that you have purchased through the twilio.com web
    // interface or API
    twilioNumber: "34932200082",

    // The port your web application will run on
    port: process.env.PORT || 3000
};
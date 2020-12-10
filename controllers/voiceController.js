const VoiceRes = require('twilio').twiml.VoiceResponse;
const rp = require('request-promise');
const owmAPI = process.env.OPEN_WEATHER_MAP_KEY;
const dataProcessor = require('../lib/dataProcessor');

const apiController = require('./apiController');

const voiceResponse = (req, res) => {
  const twiml = new VoiceRes();
  const location = "melbourne";

  const gather = twiml.gather({
    numDigits: 1,
    action: '/gather',
  });
  gather.say('For sales, press 1. For support, press 2.');

  // If the user doesn't enter input, loop
  twiml.redirect('/voice');

  // rp(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${owmAPI}`)
  // .then(rawForcast=>{
  //   const forecast = dataProcessor.processForecastData(JSON.parse(rawForcast));
  //   const tomorrowWeather = forecast[0].description;
  //   const tomorrowTemp = forecast[0].temp;
  //   twiml.say(`Hello, tomorrow's weather will be ${tomorrowWeather}, temprature is ${tomorrowTemp} celsius degree.`);
  //
  //   res.type('text/xml');
  //   res.send(twiml.toString());
  // })
  res.type('text/xml');
  res.send(twiml.toString());
}

// Create a route that will handle <Gather> input
const gatherUserInput = (req, res) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceRes();

  // If the user entered digits, process their request
  if (req.body.Digits) {
    switch (req.body.Digits) {
      case '1':
        twiml.say('You selected sales. Good for you!');
        break;
      case '2':
        twiml.say('You need support. We will help!');
        break;
      default:
        twiml.say("Sorry, I don't understand that choice.").pause();
        twiml.redirect('/voice');
        break;
    }
  } else {
    // If no input was sent, redirect to the /voice route
    twiml.redirect('/voice');
  }

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
};

module.exports = {
  voiceResponse,
  gatherUserInput
};

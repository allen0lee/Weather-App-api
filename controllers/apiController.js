const fs = require('fs');
const rp = require('request-promise');
const request = require('request');
const owmAPI = process.env.OPEN_WEATHER_MAP_KEY;
const dataProcessor = require('../lib/dataProcessor');
const isWash = require('../lib/isWash');

const pgp = require('pg-promise')();


// const showGreetings = (req, res) => {
//   fs.readFile('database.txt', (err,data) => {
//     const greetings = data.toString().split('\n');
//     res.json(greetings);
//   });
// }

const showGreetings = (req, res) => {
  const cn = {
      url: 'http://localhost:5432',
      database: 'postgresql-cubed-33063'
  };
  const db = pgp(process.env.DATABASE_URL || cn);
  const today = new Date();

  db.any(`SELECT body FROM greetings WHERE day = ${today.getDay()}`)
    .then(greeting=>{
      res.json(greeting);
    })
    .catch(error => {
        console.log('ERROR:', error); // print error;
    });

}

const showWeather = (req, res) => {
  const location = req.params.location;
  console.log(location);

  rp(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8f3bfc5ecde5ab6c71f20726cc499e74`)
  .then(rawWeather=>{
    return dataProcessor.processWeatherData(JSON.parse(rawWeather));
  })
  .then(processedData => {
    rp(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=8f3bfc5ecde5ab6c71f20726cc499e74`)
    .then(rawForcast=>{
      processedData.forecast = dataProcessor.processForecastData(JSON.parse(rawForcast));
      res.json(processedData);
    })
  })
}

const showWash = (req, res) => {
  const location = req.params.location;
  rp(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=8f3bfc5ecde5ab6c71f20726cc499e74`)
  .then(rawForcast=>{
    const forecast = JSON.parse(rawForcast);
    const list = forecast.list.map(item => {
      return [item.main.humidity, item.clouds.all, item.wind.speed]
    })
    
    console.log(list)    // future 72 hours, so 9 items 

    isWash(list.slice(0,8), processedData=>{
      console.log(processedData);

      const reducer = (accumulator, currentValue) => {
        return (accumulator && currentValue)
      }
      const decision = processedData.reduce(reducer);
      res.json(decision);
    })
  })
}

module.exports = {
  showGreetings,
  showWeather,
  showWash
};

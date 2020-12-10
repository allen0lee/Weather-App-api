# Weather API

This is a simple express API server to provide weather information. User can get daily greeting on the home page as well as modifying them. You can find a front end app using this api in [this repo.](https://github.com/superpower1/SinefaTechnicalAssessment2)

## Install
1. Clone down this repo
2. `$ npm install`

## Test
1. `$ npm test`

## Tech
1. Node.js
2. Express

## Route Table
verb | url pattern | description
------------ | ------------- | ------
get | / | Home
get | /api/weather/:location | Get current weather information
get | /api/forecast/:location | Get weather forecast for 3 days
get | /api/greetings | Get daily greeting
post | greeting | Modify daily greeting

function processWeatherData(weatherRaw) {
	if (!weatherRaw.name) {
		throw new Error('Invalid Data');
	}
	return {
		location: weatherRaw.name,
		temp: weatherRaw.main.temp,
		humidity: weatherRaw.main.humidity,
		pressure: weatherRaw.main.pressure,
		maxTemp: weatherRaw.main.temp_max,
		minTemp: weatherRaw.main.temp_min,
		windSpeed: weatherRaw.wind.speed,
		cloud: weatherRaw.clouds.all,
		imgId: weatherRaw.weather[0].id
	}
}

function processForecastData(weatherRaw) {
	if (!weatherRaw.list) {
		throw new Error('Invalid Data');
	}
	const after24hours = weatherRaw.list[7];
	const after48hours = weatherRaw.list[15];
	const after72hours = weatherRaw.list[23];

	const processedData = [after24hours, after48hours, after72hours].map(forecast=>{
		return {
			time: forecast.dt_txt,
			description: forecast.weather[0].description,
			icon: forecast.weather[0].icon,
			temp: forecast.main.temp
		}
	})

	return processedData;
}

module.exports = {
	processWeatherData,
	processForecastData
}

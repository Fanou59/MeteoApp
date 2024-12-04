export const getTemperature = (weatherData) => {
  return weatherData ? Math.ceil((weatherData.main?.temp * 10) / 10) : null;
};

export const getWeatherIconUrl = (weatherData) => {
  const weatherIconCode = weatherData && weatherData.weather[0]?.icon;
  return weatherIconCode
    ? `https://openweathermap.org/img/wn/${weatherIconCode}.png`
    : null;
};

export const getCity = (locationData) => {
  return locationData && locationData[0]?.local_names?.fr;
};

export const getCountry = (locationData) => {
  return locationData && locationData[0]?.country;
};

export const getWindSpeed = (weatherData) => {
  return weatherData
    ? Math.ceil((weatherData.wind?.speed * 3.6 * 10) / 10)
    : null;
};

export const getHumidity = (weatherData) => {
  return weatherData ? weatherData.main?.humidity : null;
};

/* eslint-disable react/prop-types */

export function DisplayWeather({ temperature, city, country, weatherIconUrl }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center">
        {weatherIconUrl && <img src={weatherIconUrl} alt="weather icon" />}
        <span>{temperature} C°</span>
        <p>
          {city} {country}
        </p>
      </div>
    </div>
  );
}

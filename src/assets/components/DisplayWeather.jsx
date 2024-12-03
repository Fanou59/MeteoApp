/* eslint-disable react/prop-types */
import { Wind, Thermometer, Droplet } from "lucide-react";

export function DisplayWeather({
  temperature,
  city,
  country,
  weatherIconUrl,
  wind,
  humidity,
}) {
  return (
    <div className="flex flex-col items-center">
      {weatherIconUrl && <img src={weatherIconUrl} alt="weather icon" />}
      <div className="flex gap-3">
        {temperature && (
          <span className="flex flex-col items-center">
            <Thermometer /> {temperature} C°
          </span>
        )}
        {wind && (
          <span className="flex flex-col items-center">
            <Wind /> {wind} Km/h
          </span>
        )}
        {humidity && (
          <span className="flex flex-col items-center">
            <Droplet /> {humidity} %
          </span>
        )}
      </div>
      {city && country && (
        <p>
          {city}, {country}
        </p>
      )}
    </div>
  );
}

/* eslint-disable react/prop-types */

export function DisplayWeather({
  temperature,
  city,
  country,
  weatherIconUrl,
  wind,
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center">
        {weatherIconUrl && <img src={weatherIconUrl} alt="weather icon" />}
        <div className="flex gap-3">
          {temperature && <span>Temperature : {temperature} C°</span>}
          {wind && <span>Wind : {wind} Km/h</span>}
        </div>
        {city && country && (
          <p>
            {city}, {country}
          </p>
        )}
      </div>
    </div>
  );
}

/* eslint-disable react/prop-types */

export function DisplayWeather({ temperature, city, country, weatherIcon }) {
  const iconUrl = `https://developer.accuweather.com/sites/default/files/${
    weatherIcon < 10 ? "0" : ""
  }${weatherIcon}-s.png`;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center">
        <img src={iconUrl} alt="" />
        <span>{temperature} C°</span>
        <p>
          {city} {country}
        </p>
      </div>
    </div>
  );
}

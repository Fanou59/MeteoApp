import { useState } from "react";
import { DisplayWeather } from "./assets/components/DisplayWeather";
import { SearchBar } from "./assets/components/SearchBar";
import useWeather from "./hooks/useWeather";

function App() {
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    setSearchValue(value);
    setValue("");
  };

  const {
    locationData,
    locationError,
    locationIsLoading,
    weatherData,
    weatherError,
    weatherIsLoading,
  } = useWeather(searchValue);
  const temperature =
    weatherData && Math.ceil((weatherData.main?.temp * 10) / 10);
  const weatherIconCode = weatherData && weatherData.weather[0]?.icon;
  const weatherIconUrl = weatherIconCode
    ? `https://openweathermap.org/img/wn/${weatherIconCode}.png`
    : null;
  const city = locationData && locationData[0]?.local_names?.fr;
  const country = locationData && locationData[0]?.country;
  const wind =
    weatherData && Math.ceil((weatherData.wind?.speed * 3.6 * 10) / 10);
  const humidity = weatherData && weatherData.main?.humidity;

  if (weatherError || locationError) {
    const errorMessage =
      weatherError?.response?.status === 503 ||
      locationError?.response?.status === 503
        ? "Nombre de requêtes API dépassé"
        : "Error ! Task failed successfully.";

    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{errorMessage}</span>
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-center">METEO APP</h1>
          {(weatherIsLoading || locationIsLoading) && (
            <span className="loading loading-infinity loading-lg"></span>
          )}
        </div>
        <div className="card bg-neutral text-neutral-content w-96 p-4">
          <SearchBar
            value={value}
            onChange={handleChange}
            onClick={handleClick}
          />
          <DisplayWeather
            temperature={temperature}
            city={city}
            country={country}
            weatherIconUrl={weatherIconUrl}
            wind={wind}
            humidity={humidity}
          />
        </div>
      </div>
    </>
  );
}

export default App;

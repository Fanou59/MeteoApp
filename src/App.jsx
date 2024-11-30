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

  const temperature = weatherData && weatherData.main?.temp;
  const weatherIconCode = weatherData && weatherData.weather[0]?.icon;
  const weatherIconUrl = weatherIconCode
    ? `http://openweathermap.org/img/wn/${weatherIconCode}.png`
    : null;
  const city = locationData && locationData[0]?.name;
  const country = locationData && locationData[0]?.Country?.LocalizedName;

  if (weatherIsLoading || locationIsLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );

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
      <div className="flex justify-center items-center h-screen flex-col gap-2 ">
        <h1 className="text-black font-bold text-center">METEO APP</h1>
        <div className="card bg-neutral text-neutral-content w-96 space-y-4 p-4">
          <SearchBar onChange={handleChange} onClick={handleClick} />
          <DisplayWeather
            temperature={temperature}
            city={city}
            country={country}
            weatherIconUrl={weatherIconUrl}
          />
        </div>
      </div>
    </>
  );
}

export default App;

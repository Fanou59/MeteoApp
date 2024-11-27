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

  const temperature = weatherData && weatherData[0]?.Temperature?.Metric?.Value;
  const weatherIcon = weatherData && weatherData[0]?.WeatherIcon;
  const city = locationData && locationData[0]?.LocalizedName;
  const country = locationData && locationData[0]?.Country?.LocalizedName;

  if (weatherIsLoading || locationIsLoading) return <div>Loading...</div>;
  if (weatherError || locationError) return <div>Error...</div>;
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
            weatherIcon={weatherIcon}
          />
        </div>
      </div>
    </>
  );
}

export default App;

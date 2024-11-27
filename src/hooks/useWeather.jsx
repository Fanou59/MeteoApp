import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiKey = "MCNK5qYn54vTRputQVjw191XaHrS2ehA";
const useWeather = (searchValue) => {
  const [localisationKey, setLocalisationKey] = useState("");

  const {
    data: locationData,
    error: locationError,
    isLoading: locationIsLoading,
  } = useSWR(
    searchValue
      ? `http://dataservice.accuweather.com/locations/v1/search?apikey=${apiKey}&q=${searchValue}&language=fr`
      : null,
    fetcher
  );

  useEffect(() => {
    if (locationData && locationData.length > 0) {
      setLocalisationKey(locationData[0]?.Key);
    }
  }, [locationData]);

  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherIsLoading,
  } = useSWR(
    localisationKey
      ? `http://dataservice.accuweather.com/currentconditions/v1/${localisationKey}?apikey=${apiKey}&language=fr`
      : null,
    fetcher
  );

  return {
    locationData,
    locationError,
    locationIsLoading,
    weatherData,
    weatherError,
    weatherIsLoading,
  };
};

export default useWeather;

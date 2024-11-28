import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });

const useWeather = (searchValue) => {
  const [localisationKey, setLocalisationKey] = useState(null);

  const {
    data: locationData,
    error: locationError,
    isLoading: locationIsLoading,
    isValidating: locationIsValidating,
  } = useSWR(
    searchValue ? `/api/location?searchValue=${searchValue}` : null,
    fetcher
  );

  useEffect(() => {
    if (locationData && locationData.length > 0) {
      setLocalisationKey(locationData[0]?.Key);
    } else {
      setLocalisationKey(null);
    }
  }, [locationData]);

  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherIsLoading,
    isValidating: weatherIsValidating,
  } = useSWR(
    localisationKey ? `/api/weather?locationKey=${localisationKey}` : null,
    fetcher
  );

  return {
    locationData,
    locationError,
    locationIsLoading,
    locationIsValidating,
    weatherData,
    weatherError,
    weatherIsLoading,
    weatherIsValidating,
  };
};

export default useWeather;

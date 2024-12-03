import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error(`HTTP error! status: ${res.status}`);
    error.status = res.status;
    error.response = res;
    throw error;
  }
  return res.json();
};

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
    if (locationData && locationData[0].lat && locationData[0].lon) {
      setLocalisationKey({
        lat: locationData[0].lat,
        lon: locationData[0].lon,
      });
    } else {
      setLocalisationKey(null);
    }
    return () => {
      setLocalisationKey(null);
    };
  }, [locationData]);

  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherIsLoading,
    isValidating: weatherIsValidating,
  } = useSWR(
    localisationKey
      ? `/api/weather?lat=${localisationKey.lat}&lon=${localisationKey.lon}`
      : null,
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

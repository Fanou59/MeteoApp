/* eslint-disable no-undef */
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  const { lat, lon } = req.query;

  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  if (!lat || !lon) {
    return res.status(400).json({ error: "latitude et longitude sont requis" });
  }

  try {
    // const response = await fetch(
    //   `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=fr`
    // );

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res
        .status(response.status)
        .json({ error: "Erreur API AccuWeather", details: errorText });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}

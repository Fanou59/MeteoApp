/* eslint-disable no-undef */
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  const { searchValue } = req.query;
  const apiKey = process.env.OPEN_WEATHER_API_KEY;

  if (!searchValue) {
    return res.status(400).json({ error: "searchValue est requis" });
  }

  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=1&appid=${apiKey}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res
        .status(response.status)
        .json({ error: "Erreur API OpenWeather", details: errorText });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}

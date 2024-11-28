import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  const { locationKey } = req.query;
  const apiKey = process.env.ACCUWEATHER_API_KEY;
  if (!locationKey) {
    return res.status(400).json({ error: "locationKey est requis" });
  }

  try {
    const response = await fetch(
      `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=fr`
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

import fetch from "node-fetch";

export default async function handler(req, res) {
  const { locationKey } = req.query; // Récupérer la clé de localisation
  const apiKey = process.env.ACCUWEATHER_API_KEY; // Utiliser une variable d'environnement pour la clé API

  if (!locationKey) {
    return res.status(400).json({ error: "locationKey est requis" });
  }

  try {
    const response = await fetch(
      `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=fr`
    );
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Erreur API AccuWeather" });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}
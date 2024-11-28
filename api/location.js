import fetch from "node-fetch";

export default async function handler(req, res) {
  const { searchValue } = req.query; // Récupérer la valeur recherchée
  const apiKey = process.env.ACCUWEATHER_API_KEY; // Utiliser une variable d'environnement pour la clé API

  if (!searchValue) {
    return res.status(400).json({ error: "searchValue est requis" });
  }

  try {
    const response = await fetch(
      `https://dataservice.accuweather.com/locations/v1/search?apikey=${apiKey}&q=${searchValue}&language=fr`
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

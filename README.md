# METEO APP

Une application météo simple utilisant React, Tailwind CSS et l'API AccuWeather.

## Fonctionnalités

- Recherche de la météo actuelle par ville
- Affichage de la température actuelle, de l'icône météo, de la ville et du pays
- Utilisation de Tailwind CSS pour le style
- Utilisation de DaisyUI pour les composants UI

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/meteo-app.git
   cd meteo-app
   ```

2. Installez les dépendances :

```
npm install
```

3. Configurez votre clé API AccuWeather :

   - Créez un fichier .env à la racine du projet.
   - Ajoutez votre clé API AccuWeather dans le fichier .env :

   ```bash
    REACT_APP_ACCUWEATHER_API_KEY=your_api_key_here
   ```

## Utilisation

1. Lancez l'application en mode développement :

```bash
npm start
```

2. Ouvrez votre navigateur et accédez à http://localhost:3000.

## Structure du projet

- src/App.jsx : Composant principal de l'application
- src/assets/components/DisplayWeather.jsx : Composant pour afficher les informations météo
- src/assets/components/SearchBar.jsx : Composant pour la barre de recherche
- src/hooks/useWeather.js : Hook personnalisé pour récupérer les données météo
- tailwind.config.js : Configuration de Tailwind CSS

## Configuration de Tailwind CSS

Assurez-vous que votre fichier tailwind.config.js est correctement configuré :

```bash
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
```

## Contribution

Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou soumettre une pull request pour toute amélioration ou correction de bug.

# Pokedex API Project

## 📌 Overview
This project is a **Pokedex application** that interacts with the [PokéAPI](https://pokeapi.co/) to retrieve data about Pokémon. The primary goal of this project is to **understand API consumption in JavaScript**, particularly how to handle **nested API responses** and use **interfaces** to structure data efficiently.

Through this project, I explored:
- Fetching data from a RESTful API
- Working with **nested JSON responses**
- Structuring API responses using **TypeScript interfaces**
- Implementing efficient **asynchronous handling** using `async/await`

## 🔥 Features
- Search for Pokémon by name or ID.
- Display detailed Pokémon information such as abilities, types, and stats.
- Handle nested API calls (e.g., retrieving evolution chains, species data, and moves).
- Display Pokémon images and sprites dynamically.
- Error handling for API requests.

## 🚀 Tech Stack
- **JavaScript (or TypeScript)** – For API fetching and data handling.
- **Fetch API / Axios** – For making API requests.
- **HTML, CSS** – For structuring and styling the Pokedex UI.
- **Node.js (if applicable)** – For running a local development server.

## 🔄 How the PokeAPI Works
The [PokéAPI](https://pokeapi.co/) is a free RESTful API providing Pokémon-related data. It returns structured JSON responses, which often contain **nested objects** requiring additional API calls.

### Example API Request:
```
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
```

### Sample API Response (Partial):
```
{
  "id": 25,
  "name": "pikachu",
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "electric",
        "url": "https://pokeapi.co/api/v2/type/13/"
      }
    }
  ],
  "abilities": [
    {
      "ability": {
        "name": "static",
        "url": "https://pokeapi.co/api/v2/ability/9/"
      },
      "is_hidden": false
    }
  ],
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  }
}
```

## 🛠 Handling Nested API Responses
Since PokéAPI responses often contain **nested URLs** instead of full data, additional requests are required.

### Example: Fetching Pokémon Abilities
```
async function fetchPokemonAbilities(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    
    const abilityPromises = data.abilities.map(ability =>
      fetch(ability.ability.url).then(res => res.json())
    );
    
    const abilities = await Promise.all(abilityPromises);
    console.log('Abilities:', abilities);
  } catch (error) {
    console.error('Error fetching abilities:', error);
  }
}

fetchPokemonAbilities('pikachu');
```

## 📜 Using TypeScript Interfaces
To make API responses more structured and type-safe, I used **TypeScript interfaces**.

### Example Interface for a Pokémon
```
interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string; url: string } }[];
  abilities: { ability: { name: string; url: string } }[];
  sprites: { front_default: string };
}

async function fetchPokemon(name: string): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.json();
}
```
This ensures type safety and improves code maintainability.

## 🖼 Displaying Pokémon Data
Using JavaScript or TypeScript, I dynamically displayed the Pokémon data on a webpage.

```
async function displayPokemon(name) {
  const pokemon = await fetchPokemon(name);
  document.getElementById('pokemon-name').textContent = pokemon.name;
  document.getElementById('pokemon-image').src = pokemon.sprites.front_default;
}
```

## 📌 Key Learnings
1. **Understanding Nested API Responses** – Some API responses contain only URLs that require additional API calls.
2. **Using Interfaces for Type Safety** – Interfaces in TypeScript help structure the API response properly.
3. **Efficient API Calls with `Promise.all`** – To avoid multiple independent requests slowing down performance.
4. **Handling Errors Gracefully** – Implementing proper `try/catch` blocks to catch API errors.
5. **Working with Async/Await** – Making API calls in an asynchronous manner to ensure smooth UI updates.

## 🛠 Future Enhancements
- Implementing a caching system to reduce redundant API calls.
- Adding a search suggestion feature using debounce.
- Fetching and displaying Pokémon evolution chains.
- Creating a React or Vue.js version of the Pokedex.

## 🙌 Credits
- **PokéAPI** – The awesome free API providing Pokémon data.
- **MDN & TypeScript Docs** – For learning about API handling and interfaces.

## 📬 Contact
If you have any suggestions or feedback, feel free to reach out!

---
// ------------------------------------------------------------------------------------------------------------------------//

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


This README provides a **detailed overview of how I learned to work with APIs**, particularly nested responses. 🚀 Let me know if you'd like to refine any section!


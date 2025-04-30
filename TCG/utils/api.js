// // utils/api.js
// export async function fetchPokemonCards(pokemonName) {
//     try {
//       console.log(pokemonName)
//       const response = await fetch(`https://tcp-pokemon-api.herokuapp.com/api/pokemon/${pokemonName}`);
  
//       if (!response.ok) {
//         throw new Error(`Failed to fetch cards: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log('API response:', data); // ← this line helps you debug

//       return data; // make sure this matches your backend's response structure
//     } catch (err) {
//       console.error('API Error:', err);
//       return null;
//     }
//   }
  
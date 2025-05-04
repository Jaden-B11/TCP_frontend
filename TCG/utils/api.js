export async function fetchPokemonCards(pokemonName, rarity = '') {
    try {
      const nameParam = encodeURIComponent(pokemonName.trim());
      const rarityParam = encodeURIComponent(rarity.trim());
      const query = `name=${nameParam}${rarity ? `&rarity=${rarityParam}` : ''}`;
      const url = `https://tcp-pokemon-api-61738bdf9d6e.herokuapp.com/api/search?${query}`;
  
      console.log('Calling URL:', url);
  
      const response = await fetch(url);
      const data = await response.json();
  
      console.log('API response:', data);
  
      return data; // return raw response temporarily to inspect structure
    } catch (err) {
      console.error('API Error:', err);
      return null;
    }
  }
  
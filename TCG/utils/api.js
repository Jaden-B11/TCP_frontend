import { getIdToken } from './auth';

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

  export async function fetchUserCollection() {
    try {
      const token = await getIdToken();
      const res = await fetch('https://tcp-pokemon-api-61738bdf9d6e.herokuapp.com/api/collection', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch collection: ${res.status}`);
      }
  
      const data = await res.json();
      return data; // should be an array of cards
    } catch (err) {
      console.error('Collection fetch error:', err);
      return null;
    }
  }
  
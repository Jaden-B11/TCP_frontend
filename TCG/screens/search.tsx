import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const { POKEMON_API_KEY } = Constants.expoConfig?.extra ?? {};

const Search = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchCard = async () => {
    setLoading(true);
    setCard(null);

    try {
      const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`, {
        headers: {
          'X-Api-Key': POKEMON_API_KEY,
        },
      });

      const cardData = response.data.data[0];
      setCard(cardData);
    } catch (error) {
      console.error(error);
      alert('Card not found or error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Search Pokémon Card</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Pokémon name"
        placeholderTextColor="#aaa"
        value={pokemonName}
        onChangeText={setPokemonName}
      />
      <TouchableOpacity style={styles.button} onPress={fetchCard}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#f05c5c" />}

      {card && (
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{card.name}</Text>
          <Image source={{ uri: card.images.large }} style={styles.image} />
          <Text style={styles.cardInfo}><Text style={styles.bold}>Supertype:</Text> {card.supertype}</Text>
          <Text style={styles.cardInfo}><Text style={styles.bold}>Subtype:</Text> {card.subtypes?.join(', ')}</Text>
          <Text style={styles.cardInfo}><Text style={styles.bold}>Set:</Text> {card.set.name}</Text>
          <Text style={styles.cardInfo}><Text style={styles.bold}>Rarity:</Text> {card.rarity}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#25292e',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#f05c5c',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  cardContainer: {
    marginTop: 20,
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    display: 'flex',
    width: 375,
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardInfo: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 6,
  },
  image: {
    width: 300,
    height: 420,
    marginBottom: 10,
    borderRadius: 12,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Search;

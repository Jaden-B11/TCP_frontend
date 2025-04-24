// /screens/search.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
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
        value={pokemonName}
        onChangeText={setPokemonName}
      />
      <Button title="Search" onPress={fetchCard} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      
      {card && (
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{card.name}</Text>
          <Image source={{ uri: card.images.large }} style={styles.image} />
          <Text><Text style={styles.bold}>Supertype:</Text> {card.supertype}</Text>
          <Text><Text style={styles.bold}>Subtype:</Text> {card.subtypes?.join(', ')}</Text>
          <Text><Text style={styles.bold}>Set:</Text> {card.set.name}</Text>
          <Text><Text style={styles.bold}>Rarity:</Text> {card.rarity}</Text>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 420,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Search;
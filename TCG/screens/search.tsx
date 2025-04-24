// npm commands to use in TCG
// npm i
//npm install axios
//npm install @react-native-picker/picker

import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';

const { POKEMON_API_KEY } = Constants.expoConfig?.extra ?? {};

const Search = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [rarity, setRarity] = useState('');
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCards = async () => {
    setLoading(true);
    setCards([]);
  
    try {
      const nameQuery = `name:"${pokemonName.trim()}"`;
      const rarityQuery = rarity ? ` AND rarity:"${rarity}"` : '';
      const query = nameQuery + rarityQuery;
  
      const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(query)}`, {
        headers: {
          'X-Api-Key': POKEMON_API_KEY,
        },
      });
  
      setCards(response.data.data.slice(0, 5)); // Show only top 5 cards
    } catch (error) {
      console.error(error);
      alert('No matching cards found or an error occurred.');
    } finally {
      setLoading(false);
    }
  };
  

  //This is where the user types the pokemon in and filters by rarity
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Search Pokémon Card</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokémon name"
        value={pokemonName}
        onChangeText={setPokemonName}
      />

      
      <View style={styles.pickerContainer}> 
        <Text style={styles.pickerLabel}>Filter by Rarity:</Text>
        <Picker
          selectedValue={rarity}
          onValueChange={(value) => setRarity(value)}
          style={styles.picker}
        >
          <Picker.Item label="-- Any Rarity --" value="" />
          <Picker.Item label="Common" value="Common" />
          <Picker.Item label="Uncommon" value="Uncommon" />
          <Picker.Item label="Rare" value="Rare" />
          <Picker.Item label="Rare Holo" value="Rare Holo" />
          <Picker.Item label="Rare Ultra" value="Rare Ultra" />
          <Picker.Item label="Rare Secret" value="Rare Secret" />
        </Picker>
      </View>

      <Button title="Search" onPress={fetchCards} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {cards.map((card, index) => (
        <View key={card.id || index} style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{card.name}</Text>
          <Image source={{ uri: card.images.large }} style={styles.image} />
          <Text><Text style={styles.bold}>Supertype:</Text> {card.supertype}</Text>
          <Text><Text style={styles.bold}>Subtype:</Text> {card.subtypes?.join(', ')}</Text>
          <Text><Text style={styles.bold}>Set:</Text> {card.set.name}</Text>
          <Text><Text style={styles.bold}>Rarity:</Text> {card.rarity}</Text>
        </View>
      ))}
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
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 10,
  },
  picker: {
    width: '100%',
  },
  cardContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 30,
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

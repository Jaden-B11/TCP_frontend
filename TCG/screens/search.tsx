// npm commands to use in TCG
// npm i
//npm install axios
//npm install @react-native-picker/picker
//npm install form-data
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
import { Picker } from '@react-native-picker/picker';
import { fetchPokemonCards } from '../utils/api';

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
      const results = await fetchPokemonCards(pokemonName, rarity);
  
      if (!results || results.length === 0) {
        alert('No matching cards found.');
      } else {
        setCards(results.slice(0, 8)); // or however many you want to show
      }
    } catch (error) {
      alert('An error occurred while fetching cards.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.circle, styles.circleGreen, { width: 300, height: 300, top: -60, left: -60 }]} />
      <View style={[styles.circle, styles.circleYellow, { width: 200, height: 200, bottom: 80, right: -40 }]} />
      <View style={[styles.circle, styles.circlePurple, { width: 150, height: 150, top: 200, left: -30 }]} />
      <View style={[styles.circle, styles.circleBlue, { width: 180, height: 180, bottom: -100, right: -50 }]} />

      <Text style={styles.title}>Search Pokémon Cards</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokémon name"
        value={pokemonName}
        onChangeText={setPokemonName}
      />

      <View style={{ width: '100%', marginBottom: 10, borderRadius: 10, borderWidth: 2, borderColor: '#4d205a' }}>
        <Picker
          selectedValue={rarity}
          onValueChange={(itemValue) => setRarity(itemValue)}
          style={{ height: 50, backgroundColor: '#ffffff', borderRadius: 10 }}
        >
          <Picker.Item label="Filter by Rarity (Optional)" value="" />
          <Picker.Item label="Common" value="Common" />
          <Picker.Item label="Uncommon" value="Uncommon" />
          <Picker.Item label="Rare" value="Rare" />
          <Picker.Item label="Rare Holo" value="Rare Holo" />
          <Picker.Item label="Rare Ultra" value="Rare Ultra" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={fetchCards}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#5C3B94" />}
      <View style={styles.cardGrid}>
        {cards.map((card) => (
          <View key={card.id} style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{card.name}</Text>
            <Image source={{ uri: card.images.large }} style={styles.image} />
            <Text style={styles.cardInfo}><Text style={styles.bold}>Supertype:</Text> {card.supertype}</Text>
            <Text style={styles.cardInfo}><Text style={styles.bold}>Subtype:</Text> {card.subtypes?.join(', ')}</Text>
            <Text style={styles.cardInfo}><Text style={styles.bold}>Set:</Text> {card.set.name}</Text>
            <Text style={styles.cardInfo}><Text style={styles.bold}>Rarity:</Text> {card.rarity}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#c4b1cc',
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    color: '#4d205a',
    textAlign: 'center',
    fontWeight: '900',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#4d205a',
    backgroundColor: '#ffffff',
    color: '#333',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20, // or use margin in cardContainer for older RN versions
  },
  button: {
    backgroundColor: '#dbb925',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#7c385c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
    borderColor: '#7c385c', 
    borderWidth: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'center',
    
  },
  cardContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: 375,
    elevation: 3,
    borderWidth: 5,
    borderColor: '#BB6BD9',
    shadowColor: '#7c385c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#007E7A',
  },
  cardInfo: {
    color: '#333',
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
    color: '#4F2C72',
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.2,
    zIndex: -1,
  },
  circleGreen: {
    backgroundColor: '#a772a3',
  },
  circleYellow: {
    backgroundColor: '#69294b',
  },
  circlePurple: {
    backgroundColor: '#552663',
  },
  circleBlue: {
    backgroundColor: '#5e538d',
  },
});

export default Search;


// const fetchCards = async () => {
//   setLoading(true);
//   setCards([]);

//   try {
//     const results = await fetchPokemonCards(pokemonName.trim());

//     if (!results || results.length === 0) {
//       alert('No matching cards found.');
//     } else {
//       setCards(results.slice(0, 5)); // Limit to top 5
//     }
//   } catch (error) {
//     alert('An error occurred while fetching cards.');
//   } finally {
//     setLoading(false);
//   }
// };
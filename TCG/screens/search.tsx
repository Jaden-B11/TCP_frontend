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
      
      <View style={[styles.circle, styles.circleGreen, { top: 40, left: 30, width: 70, height: 70 }]} />
      <View style={[styles.circle, styles.circlePurple, { top: 180, right: 40, width: 90, height: 90 }]} />
      <View style={[styles.circle, styles.circleYellow, { bottom: 120, left: 50, width: 80, height: 80 }]} />
      <View style={[styles.circle, styles.circleBlue, { bottom: 40, right: 70, width: 60, height: 60 }]} />

      <Text style={styles.title}>Search Pokémon Card</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokémon name"
        placeholderTextColor="#999"
        value={pokemonName}
        onChangeText={setPokemonName}
      />

      <TouchableOpacity style={styles.button} onPress={fetchCard}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#5C3B94" />}

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
    backgroundColor: '#FFFDE7',
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#5C3B94',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#BB6BD9',
    backgroundColor: '#ffffff',
    color: '#333',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#F2C94C',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#4F2C72',
    fontWeight: '600',
    fontSize: 16,
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
  },
  circleGreen: {
    backgroundColor: '#6FCF97',
  },
  circleYellow: {
    backgroundColor: '#F2C94C',
  },
  circlePurple: {
    backgroundColor: '#BB6BD9',
  },
  circleBlue: {
    backgroundColor: '#56CCF2',
  },
});

export default Search;

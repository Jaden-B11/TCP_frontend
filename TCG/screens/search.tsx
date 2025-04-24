// npm commands to use in TCG
// npm i
//npm install axios
//npm install @react-native-picker/picker
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
          <Text style={styles.cardInfo}><Text style={styles.bold}>Supertype:</Text> {card.supertype}</Text>
          <Text style={styles.cardInfo}><Text style={styles.bold}>Subtype:</Text> {card.subtypes?.join(', ')}</Text>
          <Text style={styles.cardInfo}><Text style={styles.bold}>Set:</Text> {card.set.name}</Text>
          <Text style={styles.cardInfo}><Text style={styles.bold}>Rarity:</Text> {card.rarity}</Text>
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
    marginBottom: 30,
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

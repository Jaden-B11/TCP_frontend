import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const packImages = {
  1: require('../assets/images/_common.png'),
  2: require('../assets/images/_uncommon.png'),
  3: require('../assets/images/_rare.png'),
} as const;
const rarityLabels = {
  1: 'Common',
  2: 'Uncommon',
  3: 'Rare',
} as const;

export default function OpenPackScreen() {
  const [selectedPackId, setSelectedPackId] = useState<number | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPackCards = async (packId: number) => {
    setSelectedPackId(packId);
    setCards([]);
    setLoading(true);
    try {
      const url = `https://tcp-pokemon-api-61738bdf9d6e.herokuapp.com/api/packs/${packId}`;
      const response = await fetch(url);
      const contentType = response.headers.get('content-type');

      if (!contentType?.includes('application/json')) {
        throw new Error('No json brah');
      }
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Unexpected data format');
      setCards(data);
    } catch (err: unknown) {
      alert('I cant get cards man');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.circle, styles.circlePurple, { top: 70, left: 40, width: 80, height: 80 }]} />
        <View style={[styles.circle, styles.circleGreen, { top: 220, right: 40, width: 90, height: 90 }]} />
        <View style={[styles.circle, styles.circleBlue, { bottom: 150, left: 30, width: 60, height: 60 }]} />
        <View style={[styles.circle, styles.circleYellow, { bottom: 80, right: 100, width: 100, height: 100 }]} />
        <View style={[styles.circle, styles.circleGreen, { top: 160, left: 120, width: 50, height: 50 }]} />
        <View style={[styles.circle, styles.circlePurple, { bottom: 220, right: 30, width: 60, height: 60 }]} />
        <View style={[styles.circle, styles.circleBlue, { top: 300, left: 60, width: 90, height: 90 }]} />
      <Text style={styles.title}>Open a Pack!</Text>
      <Text style={styles.subtitle}>
        {selectedPackId
          ? `You opened a ${rarityLabels[selectedPackId as keyof typeof rarityLabels]} pack!`
          : 'Choose a pack to begin'}
      </Text>
      {!selectedPackId && !loading && (
        <View style={styles.packRow}>
          {[1, 2, 3].map((id) => (
            <TouchableOpacity
              key={id}
              onPress={() => fetchPackCards(id)}
              style={styles.packGlow}
            >
              <Image
                source={packImages[id as keyof typeof packImages]}
                style={styles.packImage}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {loading && <ActivityIndicator size="large" color="#5C3B94" style={{ marginTop: 20 }} />}
      {!loading && cards.length > 0 && (
        <View style={styles.fullCardSection}>
          <View style={styles.cardWrapper}>
            <ScrollView style={styles.cardScrollVertical}>
              <View style={styles.cardColumn}>
                {cards.map((card) => (
                  <View key={card.id} style={styles.cardCompact}>
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
          </View>
          <TouchableOpacity
            style={[styles.button, styles.buttonYellow, { marginTop: 20 }]}
            onPress={() => {
              setSelectedPackId(null);
              setCards([]);
            }}
          >
            <Text style={styles.buttonText}>Open More!</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#c4b1cc',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    
  },
  title: {
    fontSize: 26,
    color: '#4d205a',
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#855581',
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 20,
  },
  packSelection: {
    width: '100%',
    alignItems: 'center',
    
  },
  packImage: {
    width: 340,   
    height: 440, 
    marginVertical: 12,
    resizeMode: 'contain',
  },
  cardGroup: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 16,
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
  cardScroll: {
    width: '100%',
    marginTop: 20,
  },
  cardRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    
  },
  cardScrollVertical: {
    width: 400,            
    maxHeight: 600,        
    marginTop: 20,
    alignSelf: 'center',   
  },
  cardColumn: {
    alignItems: 'center',
    borderRadius: 16,
  },
  cardCompact: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: 350,
    marginBottom: 20,
    elevation: 3,
    borderWidth: 5,
    borderColor: '#BB6BD9',
    shadowColor: '#7c385c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.2,
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
  cardWrapper: {
    borderWidth: 6,
    borderColor: '#4d205a',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    backgroundColor: '#fdf9fc',
    alignSelf: 'center',
    width: 400,
  },
  packRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16, 
    marginTop: 10,
    flexWrap: 'wrap',
  },
  
  packGlow: {
    borderRadius: 16,
    padding: 4,
    marginHorizontal: 6,
    borderWidth: 3,
    borderColor: '#fdfdff',
    shadowColor: '#f9f7ff',
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 16,
    marginVertical: 8,
    width: '40%',
    alignItems: 'center',
    shadowColor: '#7c385c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonYellow: {
    backgroundColor: '#dbb925',
    borderColor: '#7c385c',
    borderWidth: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },
  fullCardSection: {
    alignItems: 'center',
    width: '100%',
  },
});
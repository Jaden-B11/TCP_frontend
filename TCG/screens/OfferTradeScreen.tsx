import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchUserCollection } from '../utils/api';
import { getIdToken } from '../utils/auth';

type Card = {
    id: string;
    name: string;
    rarity: string;
    images: {
      large: string;
    };
  };
  

export default function OfferTradeScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { tradeId } = route.params as { tradeId: number };

  const [userCards, setUserCards] = useState<Card[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const cards = await fetchUserCollection();
      setUserCards(cards);
      setLoading(false);
    };
    load();
  }, []);

  const handleSubmit = async () => {
    if (!selectedCardId) return Alert.alert('Select a card to offer!');

    try {
      const token = await getIdToken();

      const res = await fetch(
        `https://tcp-pokemon-api-61738bdf9d6e.herokuapp.com/api/trades/${tradeId}/accept`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestedCardId: selectedCardId,
          }),
        }
      );

      if (res.status === 200) {
        Alert.alert('✅ Trade completed!');
        navigation.goBack();
      } else if (res.status === 400) {
        Alert.alert('❌ You no longer own that card.');
      } else if (res.status === 403) {
        Alert.alert('❌ Not authorized to accept this trade.');
      } else if (res.status === 404) {
        Alert.alert('❌ Trade no longer available.');
      } else {
        throw new Error('Unknown error');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not complete trade.');
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#BB6BD9" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pick a card to offer in return</Text>
      <View style={styles.cardGrid}>
            {userCards.map((card) => (
                <TouchableOpacity
                key={card.id}
                style={[
                    styles.card,
                    selectedCardId === card.id && styles.cardSelected,
                ]}
                onPress={() => setSelectedCardId(card.id)}
                >
                <Image source={{ uri: card.images?.large }} style={styles.image} />
                <Text style={styles.name}>{card.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
      {selectedCardId && (
        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Offer</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fdf9fc',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#552663',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
  },
  cardSelected: {
    borderColor: '#BB6BD9',
  },
  image: {
    width: 180,
    height: 240,
    marginBottom: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  submit: {
    marginTop: 20,
    backgroundColor: '#BB6BD9',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16, // optional: works in modern RN
  },  
});

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getIdToken } from '../utils/auth';
import { auth } from '../utils/firebase';
import { fetchCardById } from '../utils/api';

type Card = {
  id: string;
  name: string;
  imageUrl: string;
  rarity: string;
};

type Trade = {
  id: number;
  offeredCardId: string;
  requestedCardId: string;
  offeredCard?: Card;
  requestedCard?: Card;
  receivingUserId: string;
};

export default function MyTradesScreen() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const token = await getIdToken();
        const res = await fetch(
          `https://tcp-pokemon-api-61738bdf9d6e.herokuapp.com/api/trades/${currentUserId}?incoming=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const rawTrades = await res.json();

        const filtered = rawTrades.filter(
          (trade: Trade) => trade.receivingUserId === currentUserId
        );

        const enriched = await Promise.all(
          filtered.map(async (trade: Trade) => {
            const offeredCard = await fetchCardById(trade.offeredCardId);
            const requestedCard = await fetchCardById(trade.requestedCardId);
            return { ...trade, offeredCard, requestedCard };
          })
        );

        setTrades(enriched);
      } catch (err) {
        console.error('Failed to fetch/enrich trades:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, [currentUserId]);

  const handleAccept = async (trade: Trade) => {
    try {
      const token = await getIdToken();
      const res = await fetch(
        `https://tcp-pokemon-api-61738bdf9d6e.herokuapp.com/api/trades/${trade.id}/accept`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestedCardId: trade.requestedCardId,
          }),
        }
      );

      if (res.status === 200) {
        Alert.alert('✅ Trade completed!');
        setTrades((prev) => prev.filter((t) => t.id !== trade.id));
      } else if (res.status === 400) {
        Alert.alert('❌ You no longer own that card.');
      } else if (res.status === 403) {
        Alert.alert('❌ Not authorized to accept this trade.');
      } else if (res.status === 404) {
        Alert.alert('❌ Trade no longer available.');
      } else {
        const text = await res.text();
        console.error('Unknown error:', text);
        Alert.alert('❌ Unknown error');
      }
    } catch (err) {
      console.error('Accept error:', err);
      Alert.alert('❌ Trade failed.');
    }
  };

  const handleDecline = async (tradeId: number) => {
    try {
      const token = await getIdToken();
      const res = await fetch(
        `https://tcp-pokemon-api-61738bdf9d6e.herokuapp.com/api/trades/${tradeId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        Alert.alert('❌ Trade declined.');
        setTrades((prev) => prev.filter((t) => t.id !== tradeId));
      } else {
        const text = await res.text();
        console.error('Decline failed:', text);
        Alert.alert('Error declining trade');
      }
    } catch (err) {
      console.error('Decline error:', err);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#BB6BD9" style={{ marginTop: 60 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Incoming Trade Requests</Text>
      {trades.length === 0 ? (
        <Text style={styles.noTrades}>You have no incoming trades.</Text>
      ) : (
        trades.map((trade) => (
          <View key={trade.id} style={styles.tradeBox}>
            <Text style={styles.label}>Trade Offer #{trade.id}</Text>
            <View style={styles.row}>
              <View style={styles.card}>
                <Text style={styles.subLabel}>They Offered</Text>
                {trade.requestedCard?.imageUrl ? (
                  <Image source={{ uri: trade.requestedCard.imageUrl }} style={styles.image} />
                ) : (
                  <Text style={styles.missing}>[No image]</Text>
                )}
                <Text>{trade.requestedCard?.name ?? 'Unknown'}</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.subLabel}>You Offered</Text>
                {trade.offeredCard?.imageUrl ? (
                  <Image source={{ uri: trade.offeredCard.imageUrl }} style={styles.image} />
                ) : (
                  <Text style={styles.missing}>[No image]</Text>
                )}
                <Text>{trade.offeredCard?.name ?? 'Unknown'}</Text>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.accept} onPress={() => handleAccept(trade)}>
                <Text style={styles.btnText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.decline} onPress={() => handleDecline(trade.id)}>
                <Text style={styles.btnText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdf9fc',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#552663',
  },
  noTrades: {
    fontSize: 16,
    color: '#888',
    marginTop: 40,
  },
  tradeBox: {
    borderWidth: 2,
    borderColor: '#BB6BD9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 140,
    marginVertical: 10,
    borderRadius: 6,
  },
  label: {
    fontWeight: 'bold',
    color: '#4d205a',
    marginBottom: 10,
    fontSize: 16,
  },
  subLabel: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  missing: {
    fontStyle: 'italic',
    color: '#999',
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  accept: {
    backgroundColor: '#6fcf97',
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  decline: {
    backgroundColor: '#eb5757',
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

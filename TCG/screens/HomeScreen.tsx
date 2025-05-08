import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { getIdToken } from '../utils/auth';
import { auth } from '../utils/firebase';

const { height } = Dimensions.get('window');

type Trade = {
  id: number;
  offeringUser: {
    uid: string;
    email: string;
  };
  offeredCard: {
    id: string;
    name: string;
    imageUrl: string;
    rarity: string;
  };
  requestedCard: null | {
    id: string;
    name: string;
    imageUrl: string;
    rarity: string;
  };
};

export default function HomeScreen() {
  const currentUserId = auth.currentUser?.uid;
  const navigation = useNavigation<NavigationProp<any>>();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loadingTrades, setLoadingTrades] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const token = await getIdToken();
        const res = await fetch('https://tcp-pokemon-api-61738bdf9d6e.herokuapp.com/api/trades/forum', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log('Fetched trades:', data);
        setTrades(data);
      } catch (err) {
        console.error('Failed to fetch trades:', err);
      } finally {
        setLoadingTrades(false);
      }
    };

    fetchTrades();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Decorative Circles */}
      <View style={[styles.circle, styles.circleGreen, { top: 50, left: 40, width: 80, height: 80 }]} />
      <View style={[styles.circle, styles.circlePurple, { top: 100, right: 60, width: 60, height: 60 }]} />
      <View style={[styles.circle, styles.circleYellow, { bottom: 150, left: 100, width: 100, height: 100 }]} />
      <View style={[styles.circle, styles.circleBlue, { bottom: 60, right: 30, width: 50, height: 50 }]} />
      <View style={[styles.circle, styles.circleGreen, { top: 180, left: 10, width: 40, height: 40 }]} />
      <View style={[styles.circle, styles.circleYellow, { top: 250, right: 20, width: 70, height: 70 }]} />
      <View style={[styles.circle, styles.circlePurple, { bottom: 200, left: 40, width: 60, height: 60 }]} />
      <View style={[styles.circle, styles.circleBlue, { top: 320, left: 90, width: 50, height: 50 }]} />
      <View style={[styles.circle, styles.circleYellow, { bottom: 300, right: 70, width: 80, height: 80 }]} />
      <View style={[styles.circle, styles.circleGreen, { bottom: 50, left: 200, width: 40, height: 40 }]} />

      <Image source={require('../assets/images/_logo.png')} style={styles.topImage} />

      <Text style={styles.title}>Welcome to PackSwap!</Text>
      <Text style={styles.subtitle}>Trade. Collect. Show off your monsters!</Text>

      <Text style={styles.tradeForumTitle}>Trade Forum</Text>
      <TouchableOpacity
        style={[styles.button, styles.buttonPurple]}
        onPress={() => navigation.navigate('MyTrades')}
      >
        <Text style={styles.buttonText}>My Trades</Text>
      </TouchableOpacity>


      {loadingTrades ? (
        <Text style={styles.loadingText}>Loading trades...</Text>
      ) : (
        trades.map((trade) => (
          <View key={trade.id} style={styles.tradeCard}>
            <Text style={styles.emailText}>{trade.offeringUser.email} wants to trade:</Text>

            <View style={styles.cardRow}>
              <View style={styles.cardBox}>
                <Text style={styles.label}>Offering</Text>
                <Image source={{ uri: trade.offeredCard.imageUrl }} style={styles.image} />
                <Text style={styles.cardName}>{trade.offeredCard.name}</Text>
              </View>

              <View style={styles.cardBox}>
                {trade.requestedCard ? (
                  <>
                    <Text style={styles.label}>Wants</Text>
                    <Image source={{ uri: trade.requestedCard.imageUrl }} style={styles.image} />
                    <Text style={styles.cardName}>{trade.requestedCard.name}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.label}>Status</Text>
                    <Text style={styles.cardName}>Open Trade</Text>
                  </>
                )}
              </View>
            </View>

            {!trade.requestedCard && trade.offeringUser.uid !== currentUserId && (
              <TouchableOpacity
                style={[styles.button, styles.buttonPurple, { marginTop: 10 }]}
                onPress={() => navigation.navigate('OfferTrade', { tradeId: trade.id })}
              >
                <Text style={styles.buttonText}>Offer a Trade</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c4b1cc',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },
  topImage: {
    width: 260,
    height: 260,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#4d205a',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 19,
    color: '#855581',
    fontWeight: '900',
    marginBottom: 30,
    textAlign: 'center',
  },
  tradeForumTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#552663',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  tradeCard: {
    width: '85%',
    borderWidth: 2,
    borderColor: '#BB6BD9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 20,
  },
  emailText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#4d205a',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardBox: {
    width: '48%',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#4d205a',
    marginBottom: 4,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 6,
  },
  cardName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 16,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#7c385c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonPurple: {
    backgroundColor: '#7864b1',
    borderColor: '#7c385c',
    borderWidth: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
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
});

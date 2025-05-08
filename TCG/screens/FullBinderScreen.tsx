import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { fetchUserCollection, postTradeOffer } from '../utils/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NavigationProp, RouteProp } from '@react-navigation/native';

type FullBinderRouteParams = {
  sortBy?: 'rarity';
};

type Card = {
  id: string;
  name: string;
  rarity: string;
  images: {
    large: string;
  };
  quantity: string;
};

export default function FullBinderScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<{ FullBinder: FullBinderRouteParams }, 'FullBinder'>>();
  const sortBy = route.params?.sortBy;

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollection = async () => {
      const result = await fetchUserCollection();
      if (result && Array.isArray(result)) {
        let cleaned = result.filter(
          (card: any) =>
            card.id && card.name && card.rarity && card.images?.large
        );

        const rarityOrder: Record<string, number> = {
          Common: 1,
          Uncommon: 2,
          Rare: 3,
          'Rare Holo': 4,
          'Rare Ultra': 5,
        };

        if (sortBy === 'rarity') {
          cleaned.sort(
            (a, b) => (rarityOrder[a.rarity] ?? 999) - (rarityOrder[b.rarity] ?? 999)
          );
        }

        setCards(cleaned);
      }
      setLoading(false);
    };

    loadCollection();
  }, [sortBy]);

  if (loading) {
    return <ActivityIndicator size="large" color="#BB6BD9" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Circles */}
      <View style={[styles.circle, styles.circleYellow, { top: 80, left: 30, width: 100, height: 100 }]} />
      <View style={[styles.circle, styles.circleGreen, { top: 200, right: 50, width: 60, height: 60 }]} />
      <View style={[styles.circle, styles.circleBlue, { bottom: 180, left: 90, width: 70, height: 70 }]} />
      <View style={[styles.circle, styles.circlePurple, { top: 320, right: 100, width: 80, height: 80 }]} />
      <View style={[styles.circle, styles.circleGreen, { bottom: 60, left: 40, width: 50, height: 50 }]} />
      <View style={[styles.circle, styles.circleYellow, { top: 420, left: 150, width: 60, height: 60 }]} />

      <Text style={styles.title}>Your Binder</Text>

      {cards.length === 0 ? (
        <Text style={styles.emptyText}>No cards yet.</Text>
      ) : (
        <View style={styles.cardGrid}>
          {cards.map((card) => (
            <View key={card.id} style={styles.card}>
              <Image source={{ uri: card.images.large }} style={styles.image} />
              <Text style={styles.name}>{card.name}</Text>

              <View style={styles.detailsGroup}>
                <Text style={styles.detailLabel}>Rarity: </Text>
                <Text style={styles.detailValue}>{card.rarity}</Text>
              </View>

              <View style={styles.detailsGroup}>
                <Text style={styles.detailLabel}>Quantity: </Text>
                <Text style={styles.quantityValue}>{card.quantity}</Text>
              </View>

              <TouchableOpacity
                style={styles.tradeButton}
                onPress={async () => {
                  try {
                    await postTradeOffer(card.id);
                    Toast.show({
                      type: 'success',
                      text1: 'Trade Posted!',
                      text2: `${card.name} is now in the trade forum.`,
                    });
                  } catch (err: any) {
                    Toast.show({
                      type: 'error',
                      text1: 'Error',
                      text2: 'Could not post trade offer.',
                    });
                    console.error(err);
                  }
                }}
              >
                <Text style={styles.tradeButtonText}>Trade</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    paddingBottom: 80,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: -35,
    color: '#4d205a',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    width: 160,
    borderWidth: 3,
    borderColor: '#BB6BD9',
    shadowColor: '#7c385c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: 140,
    height: 190,
    marginBottom: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#552663',
    textAlign: 'center',
  },
  detailsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#552663',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#BB6BD9',
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
  tradeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#7864b1',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4d205a',
    shadowColor: '#7c385c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    width: '100%',
  },
  tradeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

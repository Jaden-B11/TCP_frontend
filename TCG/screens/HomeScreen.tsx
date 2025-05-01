import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={styles.container}>

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

      <Text style={styles.title}> Welcome to PackSwap!</Text>
      <Text style={styles.subtitle}>Trade. Collect. Show off your monsters!</Text>

      <View style={styles.buttonGroup}>
      <TouchableOpacity
          style={[styles.button, styles.buttonYellow]}
          onPress={() => navigation.navigate('OpenPack')}
        >
          <Text style={styles.buttonText}>Open a Pack</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonGreen]}
          onPress={() => navigation.navigate('Collection')}
        >
          <Text style={styles.buttonText}>View Collection</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonBlue]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>Your Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonPurple]}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.buttonText}>Search a Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4b1cc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 60,
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
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 16,
    marginVertical: 8,
    width: '60%',
    alignItems: 'center',

    shadowColor: '#7c385c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonGreen: {
    backgroundColor: '#d49145',
    borderColor: '#7c385c', 
    borderWidth: 3,
  },
  buttonPurple: {
    backgroundColor: '#7864b1',
    borderColor: '#7c385c', 
    borderWidth: 3,
  },
  buttonYellow: {
    backgroundColor: '#dbb925',
    borderColor: '#7c385c', 
    borderWidth: 3,
  },
  buttonBlue: {
    backgroundColor: '#82bcd6',
    borderColor: '#7c385c', 
    borderWidth: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
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
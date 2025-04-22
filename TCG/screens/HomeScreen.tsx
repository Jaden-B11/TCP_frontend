import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
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
        <TouchableOpacity style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonText}>Open a Pack</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonPurple]}>
          <Text style={styles.buttonText}>View Collection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]}>
          <Text style={styles.buttonText}>Your Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7',
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5C3B94',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#007E7A',
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
    width: '80%',
    alignItems: 'center',
    elevation: 2,
  },
  buttonGreen: {
    backgroundColor: '#6FCF97',
  },
  buttonPurple: {
    backgroundColor: '#BB6BD9',
  },
  buttonYellow: {
    backgroundColor: '#F2C94C',
  },
  buttonBlue: {
    backgroundColor: '#56CCF2',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
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
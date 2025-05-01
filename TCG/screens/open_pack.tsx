import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OpenPackScreen() {
  return (
    <View style={styles.container}>

      <View style={[styles.circle, styles.circleBlue, { top: 40, left: 60, width: 70, height: 70 }]} />
      <View style={[styles.circle, styles.circleGreen, { top: 180, right: 40, width: 90, height: 90 }]} />
      <View style={[styles.circle, styles.circlePurple, { bottom: 120, left: 30, width: 60, height: 60 }]} />
      <View style={[styles.circle, styles.circleYellow, { bottom: 60, right: 90, width: 100, height: 100 }]} />
      <View style={[styles.circle, styles.circlePurple, { top: 100, left: 120, width: 50, height: 50 }]} />
      <View style={[styles.circle, styles.circleBlue, { bottom: 200, right: 30, width: 60, height: 60 }]} />
      <View style={[styles.circle, styles.circleGreen, { top: 280, left: 80, width: 80, height: 80 }]} />
      <View style={[styles.circle, styles.circleYellow, { bottom: 300, right: 40, width: 70, height: 70 }]} />

      <Image source={require('../assets/images/_pack.png')} style={styles.topImage} />

      <Text style={styles.title}>Open a Pack!</Text>
      <Text style={styles.subtitle}>What surprise is waiting inside? Probably nothing.</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.buttonYellow]}>
          <Text style={styles.buttonText}>Tear a Pack Open!!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonPurple]}>
          <Text style={styles.buttonText}>Browse Pack Types!</Text>
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
    height: 360,
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
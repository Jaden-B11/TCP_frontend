import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CollectionScreen() {
  return (
    <View style={styles.container}>
      
      <View style={[styles.circle, styles.circleYellow, { top: 80, left: 30, width: 100, height: 100 }]} />
      <View style={[styles.circle, styles.circleGreen, { top: 200, right: 50, width: 60, height: 60 }]} />
      <View style={[styles.circle, styles.circleBlue, { bottom: 180, left: 90, width: 70, height: 70 }]} />
      <View style={[styles.circle, styles.circlePurple, { top: 320, right: 100, width: 80, height: 80 }]} />
      <View style={[styles.circle, styles.circleGreen, { bottom: 60, left: 40, width: 50, height: 50 }]} />
      <View style={[styles.circle, styles.circleYellow, { top: 420, left: 150, width: 60, height: 60 }]} />

      
      <Image source={require('../assets/images/_collect.png')} style={styles.topImage} />

      <Text style={styles.title}>Your Collection</Text>
      <Text style={styles.subtitle}>Organize and admire your monsters!</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonText}>Sort by Rarity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonPurple]}>
          <Text style={styles.buttonText}>View Full Binder</Text>
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
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  return (
    <View style={styles.container}>

      <View style={[styles.circle, styles.circlePurple, { top: 70, left: 40, width: 80, height: 80 }]} />
      <View style={[styles.circle, styles.circleGreen, { top: 220, right: 40, width: 90, height: 90 }]} />
      <View style={[styles.circle, styles.circleBlue, { bottom: 150, left: 30, width: 60, height: 60 }]} />
      <View style={[styles.circle, styles.circleYellow, { bottom: 80, right: 100, width: 100, height: 100 }]} />
      <View style={[styles.circle, styles.circleGreen, { top: 160, left: 120, width: 50, height: 50 }]} />
      <View style={[styles.circle, styles.circlePurple, { bottom: 220, right: 30, width: 60, height: 60 }]} />
      <View style={[styles.circle, styles.circleBlue, { top: 300, left: 60, width: 90, height: 90 }]} />


      <Image source={require('../assets/images/_profile.png')} style={styles.topImage} />

      <Text style={styles.title}>Your Profile!!</Text>
      <Text style={styles.subtitle}>PLACEHOLDER_RANK • PLACEHOLDER_NAME</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]}>
          <Text style={styles.buttonText}>Your Collections!!!</Text>
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
    height: 360,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5C3B94',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#007E7A',
    marginBottom: 28,
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
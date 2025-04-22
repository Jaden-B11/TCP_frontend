import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginSignup: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
 
      <View style={[styles.circle, styles.circleBlue, { top: 60, left: 20, width: 70, height: 70 }]} />
      <View style={[styles.circle, styles.circleGreen, { top: 180, right: 40, width: 90, height: 90 }]} />
      <View style={[styles.circle, styles.circlePurple, { bottom: 120, left: 60, width: 60, height: 60 }]} />
      <View style={[styles.circle, styles.circleYellow, { bottom: 60, right: 90, width: 100, height: 100 }]} />
      <View style={[styles.circle, styles.circlePurple, { top: 300, left: 100, width: 50, height: 50 }]} />

      <ScrollView contentContainerStyle={styles.inside} keyboardShouldPersistTaps="handled">
        <View style={styles.section}>
          <Text style={styles.title}>Login</Text>
          <TextInput style={styles.input} placeholder="Your Email" placeholderTextColor="#999" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />
          <TouchableOpacity style={[styles.button, styles.buttonYellow]}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#999" />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />
          <TouchableOpacity style={[styles.button, styles.buttonBlue]}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7',
  },
  inside: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  section: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5C3B94',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#BB6BD9', 
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fefefe',
  },
  button: {
    width: '100%',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonGreen: {
    backgroundColor: '#6FCF97',
  },
  buttonYellow: {
    backgroundColor: '#F2C94C',
  },
  buttonPurple: {
    backgroundColor: '#BB6BD9',
  },
  buttonBlue: {
    backgroundColor: '#56CCF2',
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
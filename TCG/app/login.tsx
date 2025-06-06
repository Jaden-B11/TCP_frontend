import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { loginUser, getIdToken } from '../utils/auth';
import { useState } from 'react';


export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  return (
    <SafeAreaView style={styles.container}>
       <View style={[styles.circle, styles.circleGreen, { top: 50, left: 40, width: 80, height: 80 }]} />
            <View style={[styles.circle, styles.circlePurple, { top: 120, right: 60, width: 70, height: 70 }]} />
            <View style={[styles.circle, styles.circleYellow, { bottom: 120, left: 100, width: 100, height: 100 }]} />
            <View style={[styles.circle, styles.circleBlue, { bottom: 40, right: 30, width: 50, height: 50 }]} />
      <ScrollView contentContainerStyle={styles.inside}>
        <View style={styles.card}>
          <Image
            source={require('../assets/images/_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.section}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={styles.button}
              
              onPress={async () => {
                try {
                  if (!email || !password) {
                    alert('Please enter an email and password');
                    return;
                  }

                  const user = await loginUser(email, password);
                  const token = await getIdToken();

                  if (user?.email) {
                    alert('Welcome back, ' + user.email);
                    console.log('Firebase ID token:', token);

                    // Navigate to Home or Search page
                    navigation.navigate('Home');
                  } else {
                    alert('Login successful but user data is incomplete.');
                  }
                } catch (err: any) {
                  alert('Login failed: ' + (err?.message || 'Unknown error'));
                  console.error(err);
                }
              }}
            >
              <Text style={styles.buttonText}>LOGIN</Text>

              
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={styles.link}
            >
              <Text style={styles.linkText}>Don't have an account? Sign up here</Text>
            </TouchableOpacity>

            {/* <Text style={styles.linkText}>Don't have an account? Sign up here</Text> */}

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4b1cc',
    
  },
  inside: {
      padding: 20,
      paddingTop: 60,
      alignItems: 'center',
    },
  section: {
    width: '100%',
    maxWidth: 400, 
    marginBottom: 200,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    backgroundColor: '#BB6BD9',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  link: {
      marginTop: 16,
      alignItems: 'center',
  },
  linkText: {
      color: '#BB6BD9',
      fontWeight: '500',
  },
  card: {
      width: '100%',
      maxWidth: 515,
      backgroundColor: '#ffffff',
      borderRadius: 16,
      paddingVertical: 27,
      padding: 24,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 10,
      elevation: 5,
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
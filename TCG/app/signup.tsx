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

export default function SignupScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inside}>
        <View style={styles.card}>
          <Image
            source={require('../assets/images/PackSwap2.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.section}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput style={styles.input} placeholder="USERNAME" />
            <TextInput style={styles.input} placeholder="EMAIL" />
            <TextInput style={styles.input} placeholder="PASSWORD" secureTextEntry />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

            {/* 🔙 Link to Login */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.link}
            >
              <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
      backgroundColor: '#f05c5c',
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
        color: '#f05c5c',
        fontWeight: '500',
    },
    card: {
        width: '100%',
        maxWidth: 515,
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
        paddingVertical: 27,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5, // for Android shadow
      },          
  });
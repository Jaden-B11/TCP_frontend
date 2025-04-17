import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';

const LoginSignup: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inside}>
      
        <View style={styles.section}>
          <Text style={styles.title}>Login</Text>
          <TextInput style={styles.input} placeholder="your email" />
          <TextInput style={styles.input} placeholder="password" secureTextEntry />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput style={styles.input} placeholder="USERNAME" />
          <TextInput style={styles.input} placeholder="EMAIL" />
          <TextInput style={styles.input} placeholder="PASSWORD" secureTextEntry />
          <TouchableOpacity style={styles.button}>
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
  });
  
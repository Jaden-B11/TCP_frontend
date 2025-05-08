import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Platform, StatusBar, Image, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import FullBinderScreen from '../screens/FullBinderScreen'; // ✅

import HomeScreen from './index';
import OpenPackScreen from './open_pack';
import CollectionScreen from './collection';
import ProfileScreen from './profile';
import SearchScreen from './search';
import LoginScreen from './login';
import SignupScreen from './signup';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#000' },
        tabBarStyle: { backgroundColor: '#fff', height: 60 },
        tabBarLabelStyle: { fontSize: 12 },
        swipeEnabled: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Tab.Screen
        name="OpenPack"
        component={OpenPackScreen}
        options={{
          tabBarLabel: ({ color }) => <Ionicons name="gift-outline" size={22} color={color} />,
        }}
      />
      <Tab.Screen
        name="Collection"
        component={CollectionScreen}
        options={{
          tabBarLabel: ({ color }) => <Ionicons name="albums-outline" size={22} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: ({ color }) => <Ionicons name="search-outline" size={22} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return unsubscribe;
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#BB6BD9" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/_logo.png')}
          style={styles.logo}
        />
      </View>

      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Tabs" component={AppTabs} options={{ headerShown: false }} />
            <Stack.Screen
              name="FullBinder"
              component={FullBinderScreen}
              options={{
                headerShown: true,
                title: 'Go Back',
                headerStyle: { backgroundColor: '#7864b1' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

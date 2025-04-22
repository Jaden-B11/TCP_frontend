import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image, SafeAreaView, StyleSheet, View, Platform, StatusBar, Text } from 'react-native';

// Import screen components
import HomeScreen from './index';
import OpenPackScreen from './open_pack';
import CollectionScreen from './collection';
import ProfileScreen from './profile';
import SearchScreen from './search';
import LoginScreen from './login';
import SignupScreen from './signup';

const Tab = createMaterialTopTabNavigator();

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/PackSwap2.png')}
          style={styles.logo}
        />
      </View>

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
      tabBarLabel: ({ color }) => (
        <Ionicons name="home-outline" size={22} color={color} />
      ),
    }}
  />
  <Tab.Screen
    name="OpenPack"
    component={OpenPackScreen}
    options={{
      tabBarLabel: ({ color }) => (
        <Ionicons name="gift-outline" size={22} color={color} />
      ),
    }}
  />
  <Tab.Screen
    name="Collection"
    component={CollectionScreen}
    options={{
      tabBarLabel: ({ color }) => (
        <Ionicons name="albums-outline" size={22} color={color} />
      ),
    }}
  />
  <Tab.Screen
    name="Profile"
    component={ProfileScreen}
    options={{
      tabBarLabel: ({ color }) => (
        <Ionicons name="person-outline" size={22} color={color} />
      ),
    }}
  />
  <Tab.Screen
    name="Search"
    component={SearchScreen}
    options={{
      tabBarLabel: ({ color }) => (
        <Ionicons name="search-outline" size={22} color={color} />
      ),
    }}
  />
  <Tab.Screen
    name="Login"
    component={LoginScreen}
    options={{
      tabBarLabel: ({ color }) => (
        <Ionicons name="log-in-outline" size={22} color={color} />
      ),
    }}
  />
  <Tab.Screen
    name="Signup"
    component={SignupScreen}
    options={{
      tabBarLabel: ({ color }) => (
        <Ionicons name="person-add-outline" size={22} color={color} />
      ),
    }}
  />
</Tab.Navigator>

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
});

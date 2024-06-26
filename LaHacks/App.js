import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, {useState} from 'react';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { getGeminiVisionRes } from './src/api/gemini_vision';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import WelcomeScreen from './pages/WelcomeScreen';
import Dishes from './pages/Dishes';
import Recipe from './pages/Recipe';
import Cam from './pages/Cam';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WelcomeScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Home'
          component={Home}
        />
        <Stack.Screen
          name='Cam'
          component={Cam}
        />
        <Stack.Screen
          name='Login'
          component={Login}
        />
        <Stack.Screen
          name='Register'
          component={Register}
        />
        <Stack.Screen
          name='WelcomeScreen'
          component={WelcomeScreen}
        />
        <Stack.Screen
          name='Dishes'
          component={Dishes}
        />
        <Stack.Screen
            name='Recipe'
            component={Recipe}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

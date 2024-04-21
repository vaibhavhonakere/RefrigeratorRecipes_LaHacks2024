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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Dishes' screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Home'
          component={Home}
          // options={{ title: 'Home' }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          // options={{ title: 'Login' }}
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
        {/* <Stack.Screen
          name='Loading'
          component={Loading}
          options={{ title: 'Loading'}}
        />
        <Stack.Screen name='RecipeList'
          component={RecipeList}
          options={{ title: 'RecipeList'}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

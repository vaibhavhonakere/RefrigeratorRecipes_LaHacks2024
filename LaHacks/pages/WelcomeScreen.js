import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Snacking Time</Text>
        <Text style={styles.subtitle}>Cooking App</Text>
        <View style={styles.circle}>
          <Image source={require('../images/fridge.png')} style={styles.logo} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText1}>Create Account</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText2}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFA500', // Example color
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom:10,
    },
    subtitle: {
      fontSize: 24,
      color: '#fff',
      marginBottom: 40,
    },
    circle: {
      backgroundColor: '#FFD580', // This should be the color of the circle
      borderRadius: 100, // Half of the width/height to make it a perfect circle
      width: 200, // Circle size
      height: 200, // Circle size
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    logo: {
      margin: 40,
    },
    button: {
      backgroundColor: '#fff',
      padding: 15,
      margin: 10,
      borderRadius: 25,
      width: '80%',
      alignItems: 'center',
    },
    buttonText1: {
      fontSize: 18,
      color: '#FFA500', // Example color
      fontWeight: 'bold',
    },
    buttonText2: {
      fontSize: 18,
      color: 'orange', // Example color
      fontWeight: 'bold',
    },
    orText: {
      color: '#fff',
      fontSize: 16,
    },
  });

export default WelcomeScreen;
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chef it Up !</Text>
        <Text style={styles.subtitle}>From Pantry to Plate </Text>
        <View style={styles.circle}>
          <Image source={require('../images/Logo.png')} style={styles.logo} />
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
      fontSize: 38,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom:10,
    },
    subtitle: {
      fontSize: 20,
      color: '#fff',
      marginBottom: 40,
    },
    circle: {
      backgroundColor: '#FFD580',
      borderRadius: 100,
      width: 200,
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      overflow: 'hidden',
      marginHorizontal: -5, // Replace X with the amount needed to center the image
      marginVertical: -1,  // Replace Y with the amount needed to center the image
    },
    logo: {
      width: 150, // set the width to the size you want
      height: 100, // set the height to the same size as width to maintain aspect ratio
      resizeMode: 'contain',
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
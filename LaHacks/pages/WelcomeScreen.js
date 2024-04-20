import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = (navigation) => {
    const navHome = () =>{
        navigation.navigate("Register"); // Adjust the navigation route as necessary
    }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../images/fridge.png')} style={styles.logo} />
        <Text style={styles.title}>SnapChef</Text>
      </View>
      <View style={styles.mainContainer}>
        <Image source={require('../images/Ramen.png')} style={styles.mainImage} />
        <Text style={styles.slogan}>Snap, Cook, Count!</Text>
        <Text style={styles.subtitle}>
          Turn Ingredients into recipes with calorie confidence
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={navHome}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFDCAE', // a warm earthy color
  },
  headerContainer: {
    marginTop: 50, // adjust to your liking
  },
  logo: {
    width: 100, // adjust to your image size
    height: 100, // adjust to your image size
    resizeMode: 'contain',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6B4226', // a color that complements the background
    marginTop: 10, // adjust to your liking
  },
  mainContainer: {
    alignItems: 'center',
  },
  mainImage: {
    width: 250, // adjust to your image size
    height: 250, // adjust to your image size
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B4226',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B4226',
    textAlign: 'center',
    paddingHorizontal: 20, // adjust to your liking
  },
  button: {
    backgroundColor: '#E88E2D', // a vibrant call-to-action color
    padding: 15,
    borderRadius: 30,
    marginBottom: 50, // adjust to your liking
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default WelcomeScreen;

import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomePage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Upload your ingredients</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Image source={require('../images/cameraIcon.png')} />
        </TouchableOpacity>
        <Image
          source={require('../images/backIngred.png')}
          style={styles.chefImage}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500', // Assuming an orange background
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  uploadButton: {
    padding: 10,
    borderRadius: 5,
  },
  chefImage: {
    width: 300, // Set the width as per your image's aspect ratio
    height: 3400, // Set the height as per your image's aspect ratio
    resizeMode: 'contain',
  },
});
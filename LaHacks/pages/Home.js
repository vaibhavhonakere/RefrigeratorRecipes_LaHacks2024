
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, {useState, useEffect} from 'react';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { getGeminiVisionRes } from '../src/api/gemini_vision';
import LottieView from 'lottie-react-native';
export default function Home({navigation}) {
  const [image, setImage] = useState('');
  const [foodName, setFoodName] = useState('');
  const [selected, setSelect] = useState(false);
  const [response, setResponse] = useState(null);
  const options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    base64: true,
  };
  const handleImageSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(options);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const base64Image = result.assets[0].base64;
      setSelect(true);
      setResponse(null);
      try {
        const apiResponse = await getGeminiVisionRes(base64Image);
        console.log('API Response Home:', apiResponse)
        setResponse(apiResponse);
        setFoodName(apiResponse);
      } catch (error) {
        console.error('Error fetching Gemini Vision response:', error);
        setResponse('error');
      }
    }
  }
  return (

    <View style={styles.container}>
      {/* ... (your other components) */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Upload Your Ingredients</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center'}}> 
        {/* Conditionally render the LottieView or the image and the "Show Recipes" button */}
        {selected && response === null && (
          <LottieView
            source={require('../images/bowlanimation.json')}
            autoPlay
            loop
            style={{ width: 300, height: 300 }} // Adjust as needed
          />
        )}

        {selected && response !== null && (
          <View style={styles.responseContainer}>
            <Image
              style={styles.imageStyle}
              source={{ uri: image }}
            />
            {/* <Text style={styles.showRecipesText}>Show Recipes</Text> */}
          </View>
        )}
        
        {!selected && (
          <IconButton
            icon="camera"
            mode="contained"
            iconColor={MD3Colors.primary1}
            size={50}
            onPress={handleImageSelect}
          />
        )}
      </View>

      {/* Show the "Show Recipes" button if there's a response */}
      {response && (
        <Button onPress={() => navigation.navigate('Dishes', { data: foodName })}
          title="Show Recipes"
          style={styles.showRecipesButton}>Show Recipes</Button>
      )}

      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAD398',
    alignItems: 'center',
    justifyContent: 'center',
  },
  responseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure the container takes the full width
  }, 
  imageStyle: {
    width: 380, // Increase the width to fill more of the screen
    height: 380, // Set the height to a percentage of the container
    // maxHeight: 300, // You can adjust this value based on your screen size or preference
    resizeMode: 'contain', // This will make sure the entire image is visible and maintain the aspect ratio
    alignSelf: 'center' // This will ensure the image is centered in its container
  },
  showRecipesText: {
    marginTop: 20, // This will add space between the image and the text
    fontSize: 20,
    color: '#000',
  },
  showRecipesButton: {
    padding: 10,
    fontSize: 20,
    color: '#000',
    // Add any other styles for the button
  }, 
  headerContainer: {
    paddingTop: 40, // Adjust the padding top to fit with the status bar height
    paddingBottom: 20, // Space before the title and the content
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FAD398', // Match the background color of the page
    // Add shadow or elevation if you want to give depth, optional
  },
  headerText: {
    fontSize: 28, // Larger font size
    fontWeight: 'bold', // Bold font weight
    color: '#DAA599', // A gold-like color for contrast and to "pop"
    textShadowColor: 'rgba(0, 0, 0, 0.90)', // Shadow color
    textShadowRadius: 10, // Shadow blur radius
  },
});
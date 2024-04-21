import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {Camera, CameraType} from 'expo-camera';
import React, {useState, useEffect, useRef} from 'react';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { getGeminiVisionRes } from '../src/api/gemini_vision';
import LottieView from 'lottie-react-native';

export default function Cam({navigation}) {
  const [image, setImage] = useState('');
  const [foodName, setFoodName] = useState('');
  const [selected, setSelect] = useState(false);
  const [response, setResponse] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })(); 
  }, []);

  const options = {
    quality: 1,
    base64: true,
  };

  const handleImageSelect = async () => {
        const result = await cameraRef.current.takePictureAsync(options);
        setImage(result.uri);
       const base64Image = result.base64;
      setSelect(true);
  
      try {
        const apiResponse = await getGeminiVisionRes(base64Image);
        setResponse(apiResponse);
        setFoodName(apiResponse);
      } catch (error) {
        const apiResponse = '["bread", "tomato"]';
        setResponse(apiResponse);
        setFoodName(apiResponse);

      }
  }

  if(hasCameraPermission === null) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {selected == false && <Camera
          style = {styles.camera}
          type = {type}
          flashMode = {flash}
          ref = {cameraRef}
        />}
      </View>

      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, {color: "black"}]}>Upload Your Ingredients</Text>
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
          </View>
        )}
        
        {!selected && (
          <IconButton
            icon="camera"
            mode="contained"
            iconColor="black"
            size={50}
            onPress={handleImageSelect}
          />
        )}
      </View>

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
  cameraContainer: { // New style for the container
    paddingTop: 80,  // Initial padding
    marginTop: 30,   // Adjust this for camera offset
    flex: 1,
    boarderRadius: 20,
    height: 150,
    width: 300,
  },

  camera: {
    paddingTop: 80,
    flex: 1,
    boarderRadius: 20,
    height: 150,
    width: 300,
  },
  responseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure the container takes the full width
  }, 
  imageStyle: {
    // width: '80%', // Adjust width as per your design preference
    // height: undefined,
    // aspectRatio: 3/2, // Adjust the aspect ratio according to your image
    // resizeMode: 'contain',
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
    paddingTop: 80,
    fontSize: 28, // Larger font size
    fontWeight: 'bold', // Bold font weight
    color: '#DAA599', // A gold-like color for contrast and to "pop"
    textShadowColor: 'rgba(0, 0, 0, 0.90)', // Shadow color
    // textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 10, // Shadow blur radius
  },
});
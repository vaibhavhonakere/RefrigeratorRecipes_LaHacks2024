// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import React, {useState, useEffect} from 'react';
// import { Button, IconButton, MD3Colors } from 'react-native-paper';
// import { getGeminiVisionRes } from '../src/api/gemini_vision';
// import LottieView from 'lottie-react-native';
// import RecipesScreen from './Dishes';
// import { useNavigation } from '@react-navigation/native';

// export default function Home({navigation}) {
//   const [image, setImage] = useState('');
//   const [selected, setSelect] = useState(false);
//   const [response, setResponse] = useState(null); 


//   const options = { 
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     quality: 1,
//     base64: true,
//   };

//   const handleImageSelect = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync(options);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       const base64Image = result.assets[0].base64; 

//       setSelect(true);
//       setResponse(null);

//       try {
//         let apiResponse = await getGeminiVisionRes(base64Image); 
//         console.log('API Response:', apiResponse)
//         apiResponse= JSON.parse(apiResponse);
//         apiResponse = ["avocado", "tomato", "egg"]
//         //setResponse(apiResponse); 
//         console.log(response);
//         const ingredients = response;
//         navigation.navigate('Dishes', {ingredients});
//       } catch (error) {
//         console.error('Error fetching Gemini Vision response:', error);
//         setResponse('error'); 
//       }
//     }
//   }

//   return (
//     <View style={styles.container}>

//       {selected && response === null && (
//         <LottieView
//           source={require('../images/bowlanimation.json')} 
//           autoPlay
//           loop
//           style={{ width: 200, height: 200 }}
//         />
//       )}

//       {selected && response !== null && (
        
//         <View style={styles.responseContainer}>
//           <Image
//             style={{ height: 400, width: '100%' }}
//             source={{ uri: image }}
//          />
//         </View>
//       )}

//       {!selected && (
//         <View style={{ width: '100%', alignItems: 'center' }}> 
//           <IconButton
//             icon="camera"
//             mode="contained"
//             iconColor={MD3Colors.primary1}
//             size={50}
//             onPress={handleImageSelect}
//           />

//           <TouchableOpacity
//             onPress={handleImageSelect}
//             style={{ 
//               backgroundColor: 'skyblue',
//               height: 50,
//               borderRadius: 20,
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: 15
//             }}
//           >
//           </TouchableOpacity>

//           <Image
//             style={{ height: 400, width: '100%' }}
//             source={{ uri: image }}
//           />
//         </View>
//       )}
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAD398',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   responseContainer: {  
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 15,
//     backgroundColor: '#FAD398',
//     alignItems: 'center' 
//   }
// });
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import {Camera, CameraType} from 'expo-camera';
import React, {useState, useEffect, useRef} from 'react';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { getGeminiVisionRes } from '../src/api/gemini_vision';
import LottieView from 'lottie-react-native';

export default function Home({navigation}) {
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
    // mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    base64: true,
  };

  const handleImageSelect = async () => {
      
        const result = await cameraRef.current.takePictureAsync(options);
        // console.log('data:', result);
        setImage(result.uri);
     
      console.log("after picture");
       const base64Image = result.base64;
      setSelect(true);
      // setResponse(null);
  
      try {
       console.log('before API call');
        const apiResponse = await getGeminiVisionRes(base64Image);
       console.log('API Response Home:', apiResponse)
        setResponse(apiResponse);
        setFoodName(apiResponse);
      } catch (error) {
        // console.error('Error fetching Gemini Vision response:', error);
        setResponse('error');
      }
  }


  if(hasCameraPermission === null) {
    return <Text>No access to camera</Text>
  }


  return (

    <View style={styles.container}>
      {/* ... (your other components) */}
      {selected == false && <Camera
        style = {styles.camera}
        type = {type}
        flashMode = {flash}
        ref = {cameraRef}
      >
      </Camera>}
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
            {/* <Text style={styles.showRecipesText}>Show Recipes</Text> */}
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

      {/* Show the "Show Recipes" button if there's a response */}
      {response && (
        <Button onPress={() => navigation.navigate('Dishes', { data: foodName })}
          title="Show Recipes"
          style={styles.showRecipesButton}>Show Recipes</Button>
      )}
      <Image
        source = {require('../images/backIngred.png')}
        style = {styles.chefImage}
      />
      <StatusBar style="auto" />
    </View>
    // <View style={styles.container}>
    //   {selected && response === null && (
    //     <LottieView
    //       source={require('../images/bowlanimation.json')}
    //       autoPlay
    //       loop
    //       style={{ width: 300, height: 300 }}
    //     />
    //   )}
    //   {selected && response !== null && (
    //     <View style={styles.responseContainer}>
    //       <Image
    //         style = {styles.imageStyle}
    //         source={{ uri: image }}
    //      />
    //      <Text style={styles.showRecipesText}>Show Recipes</Text>
    //       {/* <Text>{`This is a ${foodName}`}</Text> */}
    //     </View>
    //   )}
    //   {!selected && (
    //     <View style={{ width: '100%', alignItems: 'center' }}>
    //       <IconButton
    //         icon="camera"
    //         mode="contained"
    //         iconColor={MD3Colors.primary1}
    //         size={50}
    //         onPress={handleImageSelect}
    //       />
    //       {/* <TouchableOpacity
    //         onPress={handleImageSelect}
    //         style={{
    //           backgroundColor: 'skyblue',
    //           height: 50,
    //           borderRadius: 20,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           marginTop: 15
    //         }}
    //       >
    //       </TouchableOpacity> */}
    //       <Image
    //         style={{ height: 400, width: '100%' }}
    //         source={{ uri: image }}
    //       />
    //       <StatusBar style="auto" />
    //     </View>
    //   )}
    //   {response && (
    //     <Button onPress={() => navigation.navigate('Dishes', { data: foodName })}
    //     title="Show Recipes">Show Recipes</Button>
    //   )}
    //   <StatusBar style="auto" />
    // </View>
  );
}
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#FAD398',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: '100%',
  // },
  // responseContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   padding: 15,
  //   backgroundColor: '#FAD398',
  //   alignItems: 'center', 
  //   justifyContent: 'center',
  // }, 
  // imageStyle: {
  //   width: '100%', // This will make the image responsive to the container width
  //   height: undefined, // This will ensure the height adjusts to maintain aspect ratio
  //   aspectRatio: 1, // Adjust this value to the aspect ratio of your image
  //   resizeMode: 'contain', // This will make sure the entire image is visible
  // }, 
  // showRecipesText: {
  //   marginTop: 10, // Adds space between the image and the text
  //   fontSize: 20, // Sets the font size for the text
  //   color: 'black', // Sets the text color, change as needed
  //   // Add other styling as needed for your design
  // }
  container: {
    flex: 1,
    backgroundColor: '#FAD398',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
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
    fontSize: 28, // Larger font size
    fontWeight: 'bold', // Bold font weight
    color: '#DAA599', // A gold-like color for contrast and to "pop"
    textShadowColor: 'rgba(0, 0, 0, 0.90)', // Shadow color
    // textShadowOffset: { width: -1, height: 1 }, // Shadow offset
    textShadowRadius: 10, // Shadow blur radius
  },
});
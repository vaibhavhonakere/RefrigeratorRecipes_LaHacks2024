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
        console.log('API Response:', apiResponse)
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

      {selected &&  response && (
        <Button onPress={() => navigation.navigate('Dishes', { data: foodName })}
        title="Show Recipes">Show Recipes</Button>
      )}

      {selected && response === null && (
        <LottieView
          source={require('../images/bowlanimation.json')} 
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      )}

      {selected && response !== null && (
        
        <View style={styles.responseContainer}>
          <Image
            style={{ height: 400, width: '100%' }}
            source={{ uri: image }}
         />
          <Text>{`This is a ${foodName}`}</Text>
        </View>
      )}

      {!selected && (
        <View style={{ width: '100%', alignItems: 'center' }}> 
          <IconButton
            icon="camera"
            mode="contained"
            iconColor={MD3Colors.primary1}
            size={50}
            onPress={handleImageSelect}
          />

          <TouchableOpacity
            onPress={handleImageSelect}
            style={{ 
              backgroundColor: 'skyblue',
              height: 50,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15
            }}
          >
          </TouchableOpacity>

          <Image
            style={{ height: 400, width: '100%' }}
            source={{ uri: image }}
          />
        </View>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#FAD398',
    alignItems: 'center' 
  }
});

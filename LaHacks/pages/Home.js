import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, {useState} from 'react';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { getGeminiVisionRes } from '../src/api/gemini_vision';

// import LottieView from "lottie-react-native";

export default function Home() {

  const [image, setImage] = useState('');
  const [foodName, setFoodName] = useState('');


  let options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    base64: true,
  };
  const handleImageSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(options);
    if (!result.canceled) {
      setImage(result.assets[0].uri);

      if (result.assets[0].base64) {
        const reponse = await getGeminiVisionRes(result.assets[0].base64);
        setFoodName(reponse);
      }       
    }
  }
  return (
    <View style={styles.container}>
      {foodName && <Text>{`This is a ${foodName}`}</Text>}
      <Image
        style={{height:400, width:'100%'}}
        source={{uri: image}}
      />
      <StatusBar style="auto" />
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
        }}
        >
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
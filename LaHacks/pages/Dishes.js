import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
const RecipesScreen = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const ingredients = JSON.parse(route.params?.data);

  function handlePress (item) {
    navigation.navigate('Recipe', { imgUrl: item.image, dishName:item.title})
  }

  useEffect(() => {
    const arrayIngredients = ingredients.join(',+');
    const apiKey = '8cf0bcaf19994ea4b3a57d7449e0e192'; // Replace with your actual API key
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        // Fetching recipes for each ingredient and combining them
        const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${arrayIngredients}&number=5&apiKey=${apiKey}`
        );
        console.log(response.data);
        setRecipes(prevRecipes => [...prevRecipes, ...response.data]);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);
  const renderRecipe = ({ item }) => (
    <TouchableOpacity style={styles.recipeCard} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.missingIngredientsLabel}>Missing Ingredients</Text>
        <View style={styles.ingredientsContainer}>
        {item.missedIngredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            {`${ingredient.name}${index < item.missedIngredients.length - 1 ? ', ' : ''}`}
          </Text>
        ))}
      </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFA500" />
      ) : (
        <><Text style={styles.headerText}>Recommedations for you </Text>
        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={item => item.id.toString()}
        />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#344955', // Updated color
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9AA33', // Vibrant background color
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15, // Rounded corners
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#232F34', // Updated shadow color
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    overflow: 'hidden', // Hides the overflow of the child elements
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 15, // Match with card's border radius
    borderBottomLeftRadius: 15,
  },
  infoContainer: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold', // Use fontWeight instead of fontStyle
    color: '#4A6572',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    marginLeft: 4,
    fontSize: 18,
    color: '#FFA500',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredient: {
    marginRight: 4,
  },
  missingIngredientsLabel: {
    fontSize: 16, // Size of the font for the label
    fontWeight: 'bold', // Make the label bold
    color: '#FFA500', // Color of the label text
    marginTop: 8, // Space above the label
    marginBottom: 4, // Space below the label
  },
});

export default RecipesScreen;
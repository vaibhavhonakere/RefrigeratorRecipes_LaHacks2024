// import React, { useState, useEffect } from 'react';
// import {StyleSheet, Text, View, Animated, FlatList, Image} from 'react-native';
// import { Button } from 'react-native-paper';
// import { getGeminiRecipe } from "../src/api/gemini_recipe";
// import { useRoute } from "@react-navigation/native";
//
// const Recipe = ({navigation}) => {
//     const [recipe, setRecipe] = useState({ ingredients: [], steps: [] });
//     const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
//
//     const route = useRoute();
//     const [activeSection, setActiveSection] = useState('ingredients');
//     const imgURL = route.params?.imgUrl;
//     const dishName = route.params?.dishName;
//     console.log(imgURL, dishName);
//     const fetchData = async () => {
//         try {
//             const result = await getGeminiRecipe(dishName);
//             const jsonStartIndex = result.indexOf('{');
//             const jsonEndIndex = result.indexOf('}');
//             if (jsonStartIndex === -1 || jsonEndIndex === -1 || jsonStartIndex >= jsonEndIndex) {
//                 return;
//             }
//             const jsonString = result.substring(jsonStartIndex,jsonEndIndex + 1);
//             const r2 = JSON.parse(jsonString);
//             setRecipe(r2);
//             fadeIn();
//         } catch (error) {
//             console.error('Error fetching recipe:', error);
//         }
//     };
//     useEffect(() => {
//         fetchData();
//     }, []);
//
//     const fadeIn = () => {
//         Animated.timing(fadeAnim, {
//             toValue: 1,
//             duration: 5000,
//             useNativeDriver: true
//         }).start();
//     };
//
//     const renderItem = ({ item }) => (
//         <Animated.View style={[styles.step, { opacity: fadeAnim }]}>
//             <Text style={styles.stepText}>{item}</Text>
//         </Animated.View>
//     );
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>{dishName}</Text>
//             <Image source={{ uri: imgURL}}/>
//             {recipe && (
//                 <>
//                 <View style={styles.ingredientsList}>
//                     <Text style={styles.subtitle}>Ingredients</Text>
//                     {recipe['ingredients'].map((ingredient, index) => (
//                         <Text key={index} style={styles.ingredient}>{ingredient}</Text>
//                     ))}
//                 </View>
//
//                 <View style={styles.stepsList}>
//                     <Text style={styles.subtitle}>Steps</Text>
//                     <FlatList
//                         data={recipe['steps']}
//                         renderItem={renderItem}
//                         keyExtractor={(item, index) => index.toString()}
//                     />
//                 </View>
//                 </>
//
//             )}
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFA500',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     subtitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     ingredient: {
//         fontSize: 16,
//         marginTop: 3,
//         color: '#000',
//     },
//     ingredientsList: {
//         backgroundColor: '#FAD398',
//         borderWidth: 1,
//         borderColor: 'gray', // Change color as needed
//         borderRadius: 25,     // Optional for rounded corners
//         padding: 18,
//     },
//     stepsList:{
//         backgroundColor: '#FAD398',
//         padding: 12,
//         borderRadius: 25,
//     },
//     step: {
//         marginTop: 10,
//         padding: 10,
//         borderRadius: 5,
//         backgroundColor: '#FAF4D3', // Light background for each step
//         // Add a shadow or elevation for a card-like effect if desired
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.22,
//         shadowRadius: 2.22,
//         elevation: 3,
//     },
//     stepText: {
//         fontSize: 16,
//         color: '#000',
//     },
// });
//
// export default Recipe;


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Image, ScrollView } from 'react-native';
import { getGeminiRecipe } from "../src/api/gemini_recipe";
import { useRoute } from "@react-navigation/native";

const Recipe = ({ navigation }) => {
    const [recipe, setRecipe] = useState({ ingredients: [], steps: [] });
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
    const route = useRoute();
    const imgURL = route.params?.imgUrl;
    const dishName = route.params?.dishName;

    const fetchData = async () => {
        try {
            const result = await getGeminiRecipe(dishName);
            const jsonStartIndex = result.indexOf('{');
            const jsonEndIndex = result.lastIndexOf('}');
            if (jsonStartIndex === -1 || jsonEndIndex === -1 || jsonStartIndex >= jsonEndIndex) {
                return;
            }
            let jsonString = result.substring(jsonStartIndex, jsonEndIndex + 1);
            console.log(jsonString);

            try{
                const r2 = JSON.parse(jsonString);
                setRecipe(r2);
            } catch(error){
                const r2= {"summary": "Panzanella is a traditional Italian salad made with stale bread, tomatoes, cucumbers, onions, and basil. It is a simple and refreshing salad that is perfect for summer.", "ingredients": ["1 pound stale bread, torn into 1-inch pieces", "1/2 cup olive oil", "1/2 cup red wine vinegar", "1 teaspoon dried oregano", "1/2 teaspoon salt", "1/4 teaspoon black pepper", "1 pound tomatoes, diced", "1 cucumber, diced", "1/2 red onion, diced", "1/2 cup fresh basil leaves, chopped"], "steps": ["In a large bowl, combine the bread, olive oil, vinegar, oregano, salt, and pepper. Toss to coat.", "Let stand for 15 minutes, or up to overnight.", "Add the tomatoes, cucumber, onion, and basil to the bowl. Toss to combine.", "Serve immediately or chill for later."]};
                setRecipe(r2);
            }
            fadeIn();
        } catch (error) {
            setRecipe( {"summary": "Panzanella is a traditional Italian salad made with stale bread, tomatoes, cucumbers, onions, and basil. It is a simple and refreshing salad that is perfect for summer.", "ingredients": ["1 pound stale bread, torn into 1-inch pieces", "1/2 cup olive oil", "1/2 cup red wine vinegar", "1 teaspoon dried oregano", "1/2 teaspoon salt", "1/4 teaspoon black pepper", "1 pound tomatoes, diced", "1 cucumber, diced", "1/2 red onion, diced", "1/2 cup fresh basil leaves, chopped"], "steps": ["In a large bowl, combine the bread, olive oil, vinegar, oregano, salt, and pepper. Toss to coat.", "Let stand for 15 minutes, or up to overnight.", "Add the tomatoes, cucumber, onion, and basil to the bowl. Toss to combine.", "Serve immediately or chill for later."]});
            console.error('Error fetching recipe:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
        }).start();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{dishName}</Text>
            <Image source={{ uri: imgURL }} style={styles.image} />
            {recipe && (
                <View>
                    <View style={styles.section}>
                        <Text style={styles.subtitle}>Ingredients</Text>
                        <View style={styles.sectionContent}>
                            {recipe.ingredients.map((ingredient, index) => (
                                <Text key={index} style={styles.ingredient}>{ingredient}</Text>
                            ))}
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.subtitle}>Steps</Text>
                        <View style={styles.sectionContent}>
                            {recipe.steps.map((step, index) => (
                                <View key={index} style={styles.step}>
                                    <Text style={styles.stepText}>{`Step ${index + 1}`}</Text>
                                    <Text style={styles.stepDetail}>{step}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD580',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    image: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'left',
    },
    section: {
        marginBottom: 20,
    },
    sectionContent: {
        borderWidth: 1,
        borderColor: 'orange', // Orange border color
        borderRadius: 10,
        backgroundColor: '#FFA500', // Light orange background color for the section
        padding: 15,
    },
    ingredient: {
        fontSize: 16,
        color: '#FFF', // Black color for the ingredient text
        marginBottom: 5, // Space between ingredients
    },
    step: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFE0B2', // A slightly different shade for step background
    },
    stepText: {
        fontSize: 16,
        fontWeight: 'bold', // Bold font for step number
        marginBottom: 5, // Space between step number and detail
    },
    stepDetail: {
        fontSize: 16,
        color: '#000', // Black color for the step text
    },
});

export default Recipe;

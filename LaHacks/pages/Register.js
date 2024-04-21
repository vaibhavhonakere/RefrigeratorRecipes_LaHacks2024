import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {useRoute} from "@react-navigation/native"; // Make sure to install @expo/vector-icons

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const route = useRoute();
  const ingredients = JSON.parse(route.params?.data);

  // Implement the sign-up logic
  const handleSignUp = () => {
    console.log('Sign Up with email:', email, 'password:', password);
    // Proceed with the sign-up process
  };

  // Implement the Google sign-up logic
  const handleGoogleSignUp = () => {
    console.log('Sign Up with Google');
    // Proceed with Google sign-up process
  };
  const navLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>Start cooking like a chef right now</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Retype Password"
        value={retypePassword}
        onChangeText={setRetypePassword}
        style={styles.input}
        secureTextEntry
      />
      
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Remember Me</Text>
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>or</Text>
      
      <TouchableOpacity style={styles.googleSignUpButton} onPress={handleGoogleSignUp}>
        <Ionicons name="logo-google" size={20} color="#DB4437" />
        <Text style={styles.googleSignUpButtonText}>Sign Up with Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText} onPress={navLogin}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFD580',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  orText: {
    color: 'grey',
    marginVertical: 10,
  },
  googleSignUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  googleSignUpButtonText: {
    marginLeft: 10,
    fontSize: 18,
  },
  signInButton: {
    marginTop: 10,
  },
  signInText: {
    color: '#FFA500',
  },
});

export default Register;

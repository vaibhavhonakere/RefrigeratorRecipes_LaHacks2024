import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Implement the sign-in logic
  const handleSignIn = () => {
    console.log('Sign In with email:', email, 'password:', password);
    navigation.navigate('Home');
    // Proceed with the sign-in process
  };

  // Implement the Google sign-in logic
  const handleGoogleSignIn = () => {
    console.log('Sign In with Google');
    // Proceed with Google sign-in process
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeBack}>Hi, Welcome Back! 👋</Text>
      <Text style={styles.welcomeSubtext}>Hello again, you've been missed!</Text>
      
      <View style={styles.inputContainer}>
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
      </View>
      
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>or</Text>
      
      <TouchableOpacity style={styles.googleSignInButton} onPress={handleGoogleSignIn}>
        <Ionicons name="logo-google" size={20} color="#DB4437" />
        <Text style={styles.googleSignInButtonText}>Sign In with Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpText}>Don’t have an account ? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD580',
    padding: 20,
    backgroundColor: 'FAD398',
  },
  welcomeBack: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 32,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    backgroundColor: '#F0F0F0',
    marginBottom: 16,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  signInButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  signInButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 14,
    color: 'grey',
    marginVertical: 16,
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  googleSignInButtonText: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
  signUpButton: {
    marginTop: 16,
  },
  signUpText: {
    color: 'black',
  },
});

export default Login;


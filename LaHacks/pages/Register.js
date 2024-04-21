// import React, { useState } from 'react';
// import { View, TextInput, Text, StyleSheet } from 'react-native';
// // import { createUserWithEmailAndPassword } from "firebase/auth";
// // import { auth } from '../Backend_Firebase/config';
// // import { db, doc, collection, setDoc } from 'firebase/firestore';
//  // Ensure these imports are set up correctly for React Native
// import Button from '../components/Button';

// const Register = ({ navigation }) => {
//   const [addData, setAddData] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [name, setName] = useState('');

//   function changeEmail(value){
//     setEmail(value);
//   }
//   function changePassword(value){
//     setPassword(value);
//   }
//   function changeConfirmPassword(value){
//     setConfirmPassword(value);
//   }
// //   function firebaseStuff(uid){
// //     name => setAddData(name);
// //     addDoc(collection(db, 'userInfo'), {
// //       name: name,
// //       cuisine: "", 
// //       food: "",
// //       restrictions: "",
// //     });
// //   }

//   function registerUser(){

//     if (email.length === 0) {
//       setErrorMessage("Email not entered");
//     }
//     else if (password.length === 0 || confirmPassword.length === 0){
//       setErrorMessage("Password not entered");
//     }
//     else if (password !== confirmPassword){
//       setErrorMessage("Please double check password");
//     }
//     else{
//     //   createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
//     //     const user = userCredential.user;
//     //     const uid = user.uid;
//     //     firebaseStuff(uid);
//     //     navigation.navigate('Login', {uid});
//     //   }).catch((error) => {
//     //     const errorCode = error.code;
//     //     setErrorMessage(errorCode === 'auth/email-already-in-use' ? "The email is already in use" : "This is an invalid email");
//     //   });
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.loginContainer}>
//         <TextInput
//           placeholder='Name:'
//           placeholderTextColor="#265073" 
//           style={styles.input}
//           secureTextEntry={true}
//           onChangeText={setName}
//           value={name}
//         />
//         <TextInput
//           placeholder='Email:'
//           placeholderTextColor="#265073" 
//           style={styles.input}
//           onChangeText={changeEmail}
//           value={email}
//         />
//         <TextInput
//           placeholder='Password:'
//           placeholderTextColor="#265073" 
//           style={styles.input}
//           secureTextEntry={true}
//           onChangeText={changePassword}
//           value={password}
//         />
//         <TextInput
//           placeholder='Confirm password:'
//           placeholderTextColor="#265073" 
//           style={styles.input}
//           secureTextEntry={true}
//           onChangeText={changeConfirmPassword}
//           value={confirmPassword}
//         />
//         <Button
//           text="Sign up"
//           onPress={registerUser}
//             style={{
//               ...styles.button,
//               backgroundColor: (email !== '' && password !== '') ? '#265073' : '#ccc',
//             }}
//             disabled={!(email != '' && password != '')}
//             textStyles={styles.text}>
//               {/* <Image source={require('../icons/arrow.png')}></Image> */}
//         </Button>
//       </View>
//       {errorMessage ? <Text> Error: {errorMessage}</Text> : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   textInput: {
//     height: 40,
//     width: '100%',
//     marginVertical: 10,
//     borderWidth: 1,
//     padding: 10,
//   },
//   loginContainer: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   input: {
//     fontSize: 20,
//     height: 40,
//     borderRadius: 10,
//     marginBottom: 10,
//     padding: 10,
//     width: 330,
//     backgroundColor: '#F8FDED',
//     color: '#265073',
//   },
//   button: {
//     backgroundColor: '#ccc',
//     padding: 10,
//     borderRadius: 15,
//     margin: 15,
//     marginTop: 28,
//     width: 90,
//   },
//   text: {
//     color: '#fff',
//     color: '#FEFFFD',
//     textAlign: 'center',
//     fontSize: 18,
//   },
//   textInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginTop: 8,
//     borderRadius: 5,
//     paddingHorizontal: 10,
// },
// });

// export default Register;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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

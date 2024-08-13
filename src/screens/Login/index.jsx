import React, { useState } from 'react';
import { ScrollView, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [masked, setMasked] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const onSubmit = async () => {
    try {
      if (username && password) {
        setError(false);
        setErrorMessage('');
        
        const data = { username, password };

        setIsLoading(true);

        const result = await login(data);

        setIsLoading(false);

        if (result.token) {
          await AsyncStorage.setItem('token', result.token); // Save token
          navigation.reset({
            index: 0,
            routes: [{ name: 'DrawerNavigator' }], // Correct route name
          });
        } else {
          setError(true);
          setErrorMessage('Login failed. Please try again.');
        }
      } else {
        setError(true);
        setErrorMessage('Please fill both fields.');
      }
    } catch (e) {
      setIsLoading(false);
      console.log('onSubmit ---', e);
    }
  };

  const login = async (data) => {
    try {
      const response = await fetch('http://192.168.43.15:3000/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, flexDirection: 'column' }}
      contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ padding: 10 }}>
        <Image source={require('../../assets/logo.png')} style={{ height: 100, width: 100 }} />
      </View>
      <View style={styles.phoneTextInputContainer}>
        <TextInput
          style={styles.phoneTextInput}
          maxLength={10}
          value={username}
          onChangeText={(val) => setUsername(val)}
          keyboardType='default'
          placeholder="Enter Username"
        />
      </View>

      <View style={styles.textInputAndButtonContainer}>
        <TextInput
          style={styles.passwordInput}
          maxLength={10}
          value={password}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry={masked}
          placeholder="Enter Password"
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setMasked(!masked)}>
          <Ionicons name={masked ? 'eye-off' : 'eye'} size={24} color={'#ccc'} />
        </TouchableOpacity>
      </View>

      <View style={styles.errorContainer}>
        {error ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonPill} onPress={onSubmit}>
          {isLoading ? <ActivityIndicator size={20} color={'white'} /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

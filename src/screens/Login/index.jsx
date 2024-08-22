import React, { useState } from 'react';
import { ScrollView, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setavatar, setemail, setname, setphone, settoken } from '../../redux/userSlice';
import { log } from 'console';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [masked, setMasked] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { name, phoneNumber, avatar } = useSelector((state) => state.user);


  const onSubmit = async () => {
    try {

      if (email && password) {
        setError(false);
        setErrorMessage('');
        
        const data = { email, password };
        
        setIsLoading(true);

        const result = await login(data);

        
        setIsLoading(false);

        if (result.token) {
          await AsyncStorage.setItem('token', result.token); 

          dispatch(setname(result.user.name))
          dispatch(setavatar(result.user.avatar))
          dispatch(setemail(result.user.email))
          dispatch(setphone(result.user.phoneNumber))
          dispatch(settoken(result.user.token))
          
          navigation.reset({
            index: 0,
            routes: [{ name: 'DrawerNavigator' }], 
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
      const response = await fetch('http://192.168.43.15:3000/user/login', {
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
          maxLength={30}
          value={email}
          onChangeText={(val) => setEmail(val)}
          keyboardType='default'
          placeholder="Enter Email"
        />
      </View>

      <View style={styles.textInputAndButtonContainer}>
        <TextInput
          style={styles.passwordInput}
          maxLength={30}
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
      

      <View style={styles.orSeparatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.separatorLine} />
      </View>

    
        <TouchableOpacity style={styles.buttonPill} onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

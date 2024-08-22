import React, { useState } from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import styles from './style'; // Import the same styles or create new ones as needed
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import { setemail, setname, setphone, settoken, setavatar } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [masked, setMasked] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(null); // New state for avatar
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (result && result.length > 0) {
        const uri = result[0].uri;
        setAvatar(uri);
        dispatch(setavatar(uri));
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User canceled document picker');
      } else {
        console.error('Document Picker Error: ', error);
      }
    }
  };

  const onSubmit = async () => {
    try {
      if (name && email && password && phone) {
        setError(false);
        setErrorMessage('');

        const data = { name, email, password, phone };
        setIsLoading(true);

        const result = await createAccount(data);

        if (result.token) {
          await AsyncStorage.setItem('token', result.token);

          dispatch(setname(result.user.name));
          dispatch(setemail(result.user.email));
          dispatch(setphone(result.user.phoneNumber));
          dispatch(settoken(result.token));

          // If avatar is selected, upload it
          if (avatar) {
            await uploadAvatar(result.token);
          }

          setIsLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'DrawerNavigator' }],
          });
        } else {
          setIsLoading(false);
          setError(true);
          setErrorMessage('Account creation failed. Please try again.');
        }
      } else {
        setError(true);
        setErrorMessage('Please fill all fields.');
      }
    } catch (e) {
      setIsLoading(false);
      console.log('onSubmit ---', e);
    }
  };

  const createAccount = async (data) => {
    try {
      const response = await fetch('http://192.168.43.15:3000/user/register', {
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

  const uploadAvatar = async (token) => {
    const formData = new FormData();
    formData.append('avatar', {
      uri: avatar,
      type: 'image/jpeg', // Or the correct type based on the image
      name: 'avatar.jpg', // Or the correct file name
    });

    try {
      const response = await fetch('http://192.168.43.15:3000/user/upload-avatar', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(setavatar(result.avatar))
        Alert.alert('Success', 'Avatar uploaded successfully');
      } else {
        Alert.alert('Error', result.message || 'Avatar upload failed');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Error', 'An error occurred while uploading the avatar');
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, flexDirection: 'column' }}
      contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
      showsVerticalScrollIndicator={false}
    >
      

      {/* Avatar Section */}
      <TouchableOpacity onPress={pickDocument} style={{ marginBottom: 20 }}>
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: 75, // Makes it round
            backgroundColor: '#e0e0e0', // Placeholder background color
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden', // Ensures the image stays within the circle
          }}
        >
          {avatar ? (
            <Image source={{ uri: avatar }} style={{ width: '100%', height: '100%' }} />
          ) : (
            <Text>Select Avatar</Text>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.phoneTextInputContainer}>
        <TextInput
          style={styles.phoneTextInput}
          value={name}
          onChangeText={(val) => setName(val)}
          placeholder="Enter Username"
        />
      </View>
      <View style={styles.phoneTextInputContainer}>
        <TextInput
          style={styles.phoneTextInput}
          value={phone}
          onChangeText={(val) => setPhone(val)}
          placeholder="Enter Phone Number"
        />
      </View>

      <View style={styles.phoneTextInputContainer}>
        <TextInput
          style={styles.phoneTextInput}
          value={email}
          onChangeText={(val) => setEmail(val)}
          placeholder="Enter Email"
        />
      </View>

      <View style={styles.textInputAndButtonContainer}>
        <TextInput
          style={styles.passwordInput}
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
          {isLoading ? <ActivityIndicator size={20} color={'white'} /> : <Text style={styles.buttonText}>Create Account</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.loginRedirectContainer}>
        <Text style={styles.loginRedirectText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginRedirectLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateAccount;

import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Profile = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const { name, email, phoneNumber, avatar } = useSelector((state) => state.user);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#2D3553',

      },

      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Urbanist',
        fontWeight: 400
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.iconContainer}
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerTitle: navigation, // Title of the header
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.simpleContainer}>



        <View style={styles.profileContainer}>
          <Image
            source={
              avatar 
                ? { uri: avatar }:
                 require('../assets/avatar3.png')
            }
            style={styles.profileImage} />

          <View style={styles.cont}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profilePhone}>{phoneNumber}</Text>
            <Text style={styles.profilePhone}>{email}</Text>
          </View>
        </View>


        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingsItem}>
            <Ionicons name="settings-outline" style={{ color: 'white' }} size={24} />
            <Text style={styles.settingsText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <Ionicons name="leaf-outline" style={{ color: 'white' }} size={24} />
            <Text style={styles.settingsText}>Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <Ionicons name="log-out-outline" style={{ color: 'white' }} size={24} />
            <Text onPress={handleLogout} style={styles.settingsText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Urbanist'
  },
  cont:{
    display:'flex',
    alignItems:'center'
  },
  simpleContainer: {
    padding: 20,
    width:'90%',
    height:'70%',
    borderRadius: 10,
    backgroundColor: '#8f98ff'
  },
  headerImage: {
    height: 40,
    width: 40,
    borderRadius: 100
  },
  text: {
    fontFamily: 'Urbanist',

    color: 'red'
  },
  iconContainer: {
    paddingHorizontal: 16,
  },
  profileContainer: {
    display:'flex',
    flexDirection:'row',
    gap:20,
    alignItems: 'center',
    justifyContent:'space-around',
    marginBottom: 20,

  },
  profileImage: {
    marginTop: 20,
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  profileName: {
    fontSize: 23,
    color: '#fff',
    marginTop: 10,
  },
  profilePhone: {
    fontSize: 16,
    color: '#EDEDFC',
    marginTop: 5,
  },
 

  settingsContainer: {
    backgroundColor: '#2D32AA',
    padding: 10,
    

    borderRadius: 10,
  },
  settingsItem: {
    flexDirection: 'row',
    gap: 5,
    padding: 10,
    alignItems: 'center',

  },
  settingsText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
});

export default Profile

import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
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
    useEffect(() => {
        navigation.setOptions({
          headerStyle: {
            backgroundColor: '#2D3553',
            
          },
          
          headerTintColor: '#fff', // Color of the text and icons
          headerTitleStyle: {
            fontFamily:'Urbanist',
            fontWeight:400
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.iconContainer}
            >
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTitle:navigation, // Title of the header
        });
      }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.simpleContainer}>

   
    
    <View style={styles.profileContainer}>
      <Image
        source={require('../assets/avatar3.png')} // Replace with your image URL or local image
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>Kanha Soni</Text>
      <Text style={styles.profilePhone}>+91 7489182879</Text>
      <Text style={styles.profileEmail}>D.Vader@galacticempire.com</Text>
    </View>

    
    <View style={styles.settingsContainer}>
      <TouchableOpacity style={styles.settingsItem}>
        <Ionicons name="settings-outline" style={{color:'white'}} size={24} />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsItem}>
      <Ionicons name="leaf-outline" style={{color:'white'}} size={24} />
        <Text style={styles.settingsText}>Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsItem}>
      <Ionicons name="log-out-outline" style={{color:'white'}} size={24} />
        <Text onPress={handleLogout} style={styles.settingsText}>Log out</Text>
      </TouchableOpacity>
    </View>
    </View>
  </View>
);
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    justifyContent:'center',
    alignItems: 'center',
    fontFamily:'Urbanist'
  },
  simpleContainer:{
    padding:20,
    borderRadius:10,
    backgroundColor:'#8f98ff'
  },
  headerImage:{
    height:40,
    width:40,
    borderRadius:100
  },
  text:{
    fontFamily:'Urbanist',
    
    color:'red'
  },
  iconContainer: {
    paddingHorizontal: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
   
  },
  profileImage: {
    marginTop:20,
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profileName: {
    fontSize: 20,
    color: '#fff',
    marginTop:10,
  },
  profilePhone: {
    fontSize: 16,
    color: '#EDEDFC',
    marginTop: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#EDEDFC',
  },
 
  settingsContainer: {
    backgroundColor: '#2D32AA',
    padding: 10,
    
   
    borderRadius: 10,
  },
  settingsItem: {
    flexDirection: 'row',
    gap:5,
    padding:10,
    alignItems: 'center',
    
  },
  settingsText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
});

export default Profile

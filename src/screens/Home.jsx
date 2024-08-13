import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {
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
          onPress={async () => {
            try {
            
              navigation.reset({
                index: 0,
                routes: [{ name: 'Profile' }],
              });
            } catch (error) {
              console.error('Error during logout:', error);
            }
          }}
          style={styles.iconContainer}
        >
           <Image
            source={require('../assets/avatar3.png')} // Replace with your image path or URL
            style={styles.headerImage}
          />
          
        </TouchableOpacity>
      ),
      headerTitle:navigation, // Title of the header
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
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
});

export default Home;

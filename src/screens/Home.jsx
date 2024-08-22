import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {
  const { avatar } = useSelector((state) => state.user);
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#2D3553',
        
      },
      
      headerTintColor: '#fff',
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
            source={
              avatar 
                ? { uri: avatar }:
                 require('../assets/avatar3.png')
            }
            style={styles.headerImage} />
          
        </TouchableOpacity>
      ),
      headerTitle:navigation,
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

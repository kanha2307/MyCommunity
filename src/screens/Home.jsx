import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
            try {
              await AsyncStorage.removeItem('token');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Error removing token:', error);
            }
          }}
          style={styles.iconContainer}
        >
          <Ionicons name="log-out-outline" size={24} color="white"/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    paddingHorizontal: 16,
  },
});

export default Home;

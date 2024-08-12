// navigations/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthenticationStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200EE',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.removeItem('token').then(() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
                });
              }}
              style={{ paddingHorizontal: 16 }}
            >
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export { AuthenticationStackNavigator };

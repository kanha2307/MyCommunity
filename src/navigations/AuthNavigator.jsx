import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import DrawerNavigator from './DrawerNavigator'; // Ensure this path is correct
import Login from '../screens/Login'; // Import Login screen
import CreateAccount from '../screens/CreateAccount';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >

        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
       

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;

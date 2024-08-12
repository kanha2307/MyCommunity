import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthenticationStackNavigator } from './StackNavigator';
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Splash">
      <Drawer.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Authentication"
        component={AuthenticationStackNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

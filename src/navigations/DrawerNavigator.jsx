import React, { Profiler } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens//Home';
import Login from '../screens/Login';
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#1D2339', // Background color of the drawer
        
      },
      drawerLabelStyle: {
       color:'white',
        fontFamily: 'Urbanist', // Font family for the drawer items
      },
      drawerActiveBackgroundColor: '#2D3553',
     
      
      headerStyle: {
        backgroundColor: '#000000', // Background color of the header
      },
      headerTintColor: '#2D3553', // Color of the header text and icons
      headerTitleStyle: {
        fontFamily: 'Urbanist-Bold', // Font family of the header title
      },
    }}
     initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Login"
        
        component={Login}
        options={{ headerShown: false }}
      />
     
      
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

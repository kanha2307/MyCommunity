
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { AuthenticationStackNavigator } from './StackNavigator'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Authentication">
            <Drawer.Screen name="Authentication" options={{
                headerShown: false,
            }} component={AuthenticationStackNavigator} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;

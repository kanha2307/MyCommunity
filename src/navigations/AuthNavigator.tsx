import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import DrawerNavigator from './DrawerNavigator'

const AuthNavigator = () => {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer >
    )
}

export default AuthNavigator

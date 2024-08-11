import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};

const AuthenticationStackNavigator = ({ navigation }: any) => {
    console.log('AuthenticationStackNavigator')
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={screenOptionStyle}
        >
            <Stack.Screen name="Login" options={{
                headerShown: false,
                gestureEnabled: false
            }} component={Login} />
        </Stack.Navigator>
    )
}

export { AuthenticationStackNavigator }


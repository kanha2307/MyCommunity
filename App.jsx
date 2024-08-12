/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import  { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { Provider } from "react-redux";
import { store } from './src/redux/store';
import AuthNavigator from './src/navigations/AuthNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <GestureHandlerRootView >
        <StatusBar
          animated={true}
          backgroundColor={Colors.black}
          barStyle={'default'}
        />
        <AuthNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

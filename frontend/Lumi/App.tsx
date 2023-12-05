/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import {LogBox} from 'react-native';

import {
  voiceAssistantStyles,
  NavigationStack,
  // ... other imports ...
} from './src';

import {NavigationContainer} from '@react-navigation/native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message, remove later to actually fix :D
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App(): JSX.Element {
  return (
    <SafeAreaView style={voiceAssistantStyles.container}>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;

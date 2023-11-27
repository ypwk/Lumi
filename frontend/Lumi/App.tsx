/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';

import {
  voiceAssistantStyles,
  NavigationStack,
  // ... other imports ...
} from './src';

import {NavigationContainer} from '@react-navigation/native';

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

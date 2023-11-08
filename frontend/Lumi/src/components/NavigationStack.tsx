import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SocketChatInterface from '../api/SocketChatInterface';
import ArchiveInterface from './ArchiveInterface';
import SettingsInterface from './SettingsInterface';

type RootStackParamList = {
  Chat: undefined;
  Settings: undefined;
  Archive: undefined;
  // Add other screens here
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen name="Chat" component={SocketChatInterface} />
      <Stack.Screen name="Settings" component={SettingsInterface} />
      <Stack.Screen name="Archive" component={ArchiveInterface} />
    </Stack.Navigator>
  );
}

export default AppNavigator;

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SocketChatInterface from '../api/SocketChatInterface';
import ArchiveInterface from './ArchiveInterface';
import SettingsInterface from './SettingsInterface';
import TextToSpeech from '../api/TextToSpeech';

type RootStackParamList = {
  Chat: undefined;
  Settings: undefined;
  Archive: undefined;
  // Add other screens here
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const tts = new TextToSpeech();
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Chat">
        {() => <SocketChatInterface tts={tts} />}
      </Stack.Screen>
      <Stack.Screen name="Settings">
        {() => <SettingsInterface tts={tts} />}
      </Stack.Screen>
      <Stack.Screen name="Archive" component={ArchiveInterface} />
    </Stack.Navigator>
  );
}

export default AppNavigator;

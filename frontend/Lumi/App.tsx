/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';

import {
  Colors,
  // DebugInstructions,
  // Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  VoiceButton,
  ChatInput,
  voiceAssistantStyles,
  commonStyles,
  // ... other imports ...
} from './src';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function beginMomentumScroll() {}
  function endMomentumScroll() {}

  return (
    <SafeAreaView style={voiceAssistantStyles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={voiceAssistantStyles.container}>
        {/* Header */}
        <View style={voiceAssistantStyles.header}>
          <Text style={commonStyles.text}>Lumi</Text>
          {/* Add icons on the right if necessary */}
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={voiceAssistantStyles.chatContent}
          disableIntervalMomentum={true}
          onMomentumScrollBegin={beginMomentumScroll}
          onMomentumScrollEnd={endMomentumScroll}>
          {/* Chat bubbles */}
          <View
            style={[
              voiceAssistantStyles.chatBubble,
              voiceAssistantStyles.receiverBubble,
            ]}>
            <Text style={commonStyles.text}>YES</Text>
          </View>

          <View
            style={[
              voiceAssistantStyles.chatBubble,
              voiceAssistantStyles.senderBubble,
            ]}>
            <Text style={commonStyles.text}>super down</Text>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={voiceAssistantStyles.footer}>
          <ChatInput />
          {/* Add icons and send button */}
          <VoiceButton />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;

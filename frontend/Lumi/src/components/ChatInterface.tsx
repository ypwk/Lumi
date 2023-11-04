import React, {useState} from 'react';
import {View, Button, Text, ScrollView} from 'react-native';
import Voice, {SpeechResultsEvent} from '@react-native-community/voice';
import axios from 'axios';
import {TouchableOpacity} from 'react-native';
import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import {ChatInput} from './ChatInput';
import commonStyles from '../styles/commonStyles';
import Icon from './Icon';

const BASE_URL = 'http://127.0.0.1:5000/query/';

function beginMomentumScroll() {}
function endMomentumScroll() {}

export const ChatInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [messages, setMessages] = useState<
    {
      user: string;
      text: string;
    }[]
  >([]);

  // Initialize voice recognition
  Voice.onSpeechStart = () => setIsListening(true);
  Voice.onSpeechEnd = () => setIsListening(false);
  Voice.onSpeechResults = (e: SpeechResultsEvent) =>
    setVoiceText(e?.value?.[0] || '');

  const startListening = async () => {
    if (Voice) {
      try {
        await Voice.start('en-US');
        setVoiceText('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const stopListening = async () => {
    if (Voice) {
      try {
        await Voice.stop();
        setMessages(prevMessages => [
          ...prevMessages,
          {
            user: 'You',
            text: voiceText,
          },
        ]);

        // axios
        //   .post(BASE_URL, {text: voiceText})
        //   .then(response => {
        //     // Append to chat bubbles/messages
        //     setMessages(prevMessages => [
        //       ...prevMessages,
        //       {
        //         user: 'You',
        //         text: voiceText,
        //       },
        //       {
        //         user: 'Assistant',
        //         text: response.data.reply,
        //       },
        //     ]);
        //   })
        //   .catch(error => console.error('There was an error:', error));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
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
        {messages.map((message, index) => (
          <View
            style={[
              voiceAssistantStyles.chatBubble,
              voiceAssistantStyles.receiverBubble,
            ]}>
            <Text key={index}>
              {message.user}: {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={voiceAssistantStyles.footer}>
        <ChatInput />
        {/* Add icons and send button */}
        {isListening ? (
          <TouchableOpacity
            style={voiceAssistantStyles.chatButton}
            onPress={stopListening}>
            <Icon type="microphone" fill="#000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={voiceAssistantStyles.chatButton}
            onPress={startListening}>
            <Icon type="microphone" fill="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatInterface;

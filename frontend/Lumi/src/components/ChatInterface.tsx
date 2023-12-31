import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Voice, {SpeechResultsEvent} from '@react-native-community/voice';
import {TouchableOpacity, TouchableHighlight} from 'react-native';
import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import commonStyles from '../styles/commonStyles';
import {ChatInput} from './ChatInput';
import {BigVoiceButton} from './BigVoiceButton';
import Icon from './Icon';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TextToSpeech from '../api/TextToSpeech';

export interface Message {
  user: string;
  text: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  sendMessage: (message: string) => void;
  tts: TextToSpeech;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  setMessages,
  sendMessage,
  tts,
}) => {
  const [inputText, setInputText] = useState(''); // Add a state to hold input text
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [inputVisible, setInputVisible] = useState(false);

  const invertInput = () => {
    setInputVisible(!inputVisible);
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const fetchData = async () => {
      if (Voice) {
        try {
          await Voice.stop();

          let chosenVoiceText = chooseVoiceText(voiceText);
          if (chosenVoiceText.trimStart() !== '') {
            console.log('Sending: ' + chosenVoiceText);

            setMessages(prevMessages => [
              ...prevMessages,
              {user: 'You', text: chosenVoiceText},
              {user: 'Assistant', text: ''},
            ]);

            sendMessage(chosenVoiceText);
            setVoiceText(''); // Clear the input after sending
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData().catch(console.error);
  }, [voiceText, setMessages, sendMessage]);

  // Initialize voice recognition
  // Voice.onSpeechStart = () => {
  //   console.log('speech start');
  // };
  Voice.onSpeechEnd = () => {
    setIsListening(false);
  };
  Voice.onSpeechResults = (e: SpeechResultsEvent) => {
    setVoiceText(chooseVoiceText(e?.value?.[0] || ''));
  };

  const startListening = async () => {
    tts.stopSpeech();
    if (Voice) {
      try {
        await Voice.start('en-US');
        setIsListening(true);
        setVoiceText('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const stopListening = async () => {
    try {
      setIsListening(false);
      await Voice.stop();
    } catch (error) {
      console.log(error);
    }
  };

  const chooseVoiceText = (text: string | Array<string>) => {
    if (Array.isArray(text)) {
      text = text.map(str => str.replace('Louie', 'Lumi'));
      console.log(text);
      let found = text.find(str => str.includes('Lumi'));
      return found || text[0]; // Return the found string or the first one if not found
    }
    return text;
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') {
      return; // Don't send empty messages
    }

    console.log('Sending: ' + inputText);

    setMessages(prevMessages => [
      ...prevMessages,
      {user: 'You', text: inputText},
      {user: 'Assistant', text: ''},
    ]);

    sendMessage(inputText);
    setInputText(''); // Clear the input after sending
  };

  return (
    <View style={voiceAssistantStyles.container}>
      {/* Header */}
      <View style={voiceAssistantStyles.header}>
        <TouchableOpacity
          style={voiceAssistantStyles.navButton}
          onPress={() => navigation.navigate('Archive')}>
          <Icon type="archive" fill="#FFF" />
        </TouchableOpacity>
        <Text style={commonStyles.text}>Chat</Text>
        <TouchableOpacity
          style={voiceAssistantStyles.navButton}
          onPress={() => navigation.navigate('Settings')}>
          <Icon type="settings" fill="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={voiceAssistantStyles.chatContent}
        disableIntervalMomentum={true}>
        {/* Chat bubbles */}
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              voiceAssistantStyles.chatBubble,
              message.user === 'You'
                ? voiceAssistantStyles.senderBubble
                : voiceAssistantStyles.receiverBubble,
            ]}>
            <Text style={voiceAssistantStyles.chatText} key={index}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {inputVisible ? (
        <View>
          <Text> </Text>
        </View>
      ) : (
        <View style={voiceAssistantStyles.voiceInputSpacing}>
          <Text> </Text>
        </View>
      )}

      {/* Footer */}
      <View style={voiceAssistantStyles.footer}>
        {inputVisible ? (
          <ChatInput
            value={inputText}
            onChangeText={setInputText}
            onSend={handleSendMessage}
            invertInput={invertInput}
          />
        ) : (
          <View style={voiceAssistantStyles.voiceInputBar}>
            <TouchableHighlight
              onPress={invertInput}
              style={voiceAssistantStyles.touchableInputChangeBar}>
              <View>
                <View style={voiceAssistantStyles.keyboardIcon}>
                  <Icon type="keyboard" fill="#FFF" />
                </View>
              </View>
            </TouchableHighlight>
          </View>
        )}
      </View>
      <BigVoiceButton
        startListening={startListening}
        stopListening={stopListening}
        isListening={isListening}
        inputVisible={inputVisible}
      />
    </View>
  );
};

export default ChatInterface;

import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Voice, {SpeechResultsEvent} from '@react-native-community/voice';
import {TouchableOpacity} from 'react-native';
import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import {ChatInput} from './ChatInput';
import commonStyles from '../styles/commonStyles';
import Icon from './Icon';
import EventSource from 'react-native-sse';

const BASE_URL = 'http://127.0.0.1:5000/query?question=';
// const BASE_URL = 'http://10.0.2.2:5000/query?question=';
// const BASE_URL = 'http://192.168.1.10:5000/query?question=';

function beginMomentumScroll() {}
function endMomentumScroll() {}

export const ChatInterface = () => {
  const [inputText, setInputText] = useState(''); // Add a state to hold input text
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [messages, setMessages] = useState<
    {
      user: string;
      text: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('stop listening: ' + voiceText);
      if (Voice) {
        try {
          await Voice.stop();
          let chosenVoiceText = chooseVoiceText(voiceText);
          if (chosenVoiceText.trimStart() !== '') {
            setMessages(prevMessages => [
              ...prevMessages,
              {user: 'You', text: chosenVoiceText},
              {user: 'Assistant', text: ''},
            ]);

            console.log(voiceText);

            const query = encodeURIComponent(voiceText);
            streamData(query);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData().catch(console.error);
  }, [voiceText]);

  // Initialize voice recognition
  Voice.onSpeechStart = () => {
    console.log('speech start');
  };
  Voice.onSpeechEnd = () => {
    setIsListening(false);
  };
  Voice.onSpeechResults = (e: SpeechResultsEvent) => {
    console.log(e);
    setVoiceText(e?.value?.[0] || '');
  };

  const streamData = async (query: string) => {
    if (query === '') {
      return;
    }
    const encodedQuery = encodeURIComponent(query);

    let es = new EventSource(BASE_URL + encodedQuery);

    es.addEventListener('open', _ => {
      console.log('Open SSE connection.');
    });

    es.addEventListener('message', event => {
      let newText = event.data;

      if (newText === null || newText === undefined || newText === '') {
        // console.log('Null message received.');
        return;
      }

      newText += ' ';

      // console.log('Received a chunk: ', newText);

      if (newText.includes('</s>')) {
        newText = newText.replace('</s>', '');
        es.close();
      }

      // Append new data to the chat messages
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (lastMessage && lastMessage.user === 'Assistant') {
          // Append only if the last message is from Assistant
          lastMessage.text += newText;
        } else {
          // Otherwise, add a new message
          updatedMessages.push({
            user: 'Assistant',
            text: newText,
          });
        }
        return updatedMessages;
      });
    });

    es.addEventListener('error', event => {
      if (event.type === 'error') {
        console.error('Connection error:', event.message);
      } else if (event.type === 'exception') {
        console.error('Error:', event.message, event.error);
      }
    });

    es.addEventListener('close', _ => {
      console.log('Close SSE connection.');
    });
  };

  const startListening = async () => {
    console.log('start listening');
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
      let found = text.find(str => str.includes('Lumi'));
      return found || text[0]; // Return the found string or the first one if not found
    }
    return text;
  };

  const sendMessage = () => {
    if (inputText.trim() === '') {
      return; // Don't send empty messages
    }

    setMessages(prevMessages => [
      ...prevMessages,
      {user: 'You', text: inputText},
      {user: 'Assistant', text: ''},
    ]);

    console.log(inputText);

    const query = encodeURIComponent(inputText);
    streamData(query);

    setInputText(''); // Clear the input after sending
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

      {/* Footer */}
      <View style={voiceAssistantStyles.footer}>
        <ChatInput
          value={inputText}
          onChangeText={setInputText}
          onSend={sendMessage}
        />
        {/* Add icons and send button */}
        {isListening ? (
          <TouchableOpacity
            style={voiceAssistantStyles.chatButton}
            onPress={stopListening}>
            <Icon type="microphone" fill="#0FF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={voiceAssistantStyles.chatButton}
            onPress={startListening}>
            <Icon type="microphone" fill="#FFF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatInterface;

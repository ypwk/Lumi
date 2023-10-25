import React from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ChatInput: React.FC = () => {
  return (
    <View style={voiceAssistantStyles.chatInput}>
      <TextInput
        placeholder="Message"
        style={voiceAssistantStyles.chatTextBox}
      />
      <TouchableOpacity style={voiceAssistantStyles.chatButton}>
        <Icon name="paper-plane" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

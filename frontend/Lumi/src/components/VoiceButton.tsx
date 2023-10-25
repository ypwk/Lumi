import React from 'react';
import {TouchableOpacity} from 'react-native';
import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const VoiceButton: React.FC = () => {
  return (
    <TouchableOpacity style={voiceAssistantStyles.chatButton}>
      <Icon name="microphone" size={30} color="#000" />
    </TouchableOpacity>
  );
};

import React from 'react';
import {TouchableOpacity} from 'react-native';
import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import Icon from './Icon';

interface VoiceButtonProps {
  isListening: boolean;
  inputVisible: boolean;
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
}

export const BigVoiceButton: React.FC<VoiceButtonProps> = ({
  isListening,
  inputVisible,
  startListening,
  stopListening,
}) => {
  if (inputVisible) {
    return null;
  }
  return (
    <TouchableOpacity
      style={voiceAssistantStyles.bigVoiceButton}
      onPress={isListening ? stopListening : startListening}>
      <Icon
        type="microphone"
        fill={isListening ? '#0FF' : '#FFF'}
        style={voiceAssistantStyles.voiceButton}
      />
    </TouchableOpacity>
  );
};

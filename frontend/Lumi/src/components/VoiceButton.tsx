import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import Icon from './Icon';

interface VoiceButtonProps {
  isListening: boolean;
  startListening: () => Promise<void>;
  stopListening: () => Promise<void>;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  isListening,
  startListening,
  stopListening,
}) => {
  return (
    <View>
      {isListening ? (
        <TouchableOpacity
          style={voiceAssistantStyles.chatButton}
          onPress={stopListening}>
          <Icon
            type="microphone"
            fill="#0FF"
            style={voiceAssistantStyles.voiceButton}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={voiceAssistantStyles.chatButton}
          onPress={startListening}>
          <Icon
            type="microphone"
            fill="#FFF"
            style={voiceAssistantStyles.voiceButton}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

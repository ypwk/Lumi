import React from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import Icon from './Icon';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  invertInput: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  invertInput,
}) => {
  return (
    <View style={voiceAssistantStyles.chatInputBar}>
      <TextInput
        placeholder="Message"
        value={value} // Bind the input value to the state from the parent component
        onChangeText={onChangeText} // Method to update the state in the parent component
        style={voiceAssistantStyles.chatTextBox}
        onSubmitEditing={onSend} // Optionally handle the 'return' key press
        placeholderTextColor="#ffffff"
      />
      <TouchableOpacity
        style={voiceAssistantStyles.chatButton}
        onPress={onSend}>
        <Icon type="airplane" fill="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={voiceAssistantStyles.chatButton}
        onPress={invertInput}>
        <Icon type="microphone" fill="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

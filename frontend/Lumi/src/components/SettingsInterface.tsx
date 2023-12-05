import React, {useEffect, useState} from 'react';
import {Text, ScrollView, TouchableOpacity, View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
import {Voice} from 'react-native-tts';

import Icon from './Icon';

import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import commonStyles from '../styles/commonStyles';

import TextToSpeech from '../api/TextToSpeech';
import settingsStyles from '../styles/settingsStyles';

interface SettingsInterfaceProps {
  tts: TextToSpeech;
}

const SettingsInterface: React.FC<SettingsInterfaceProps> = ({tts}) => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    tts
      .getVoices()
      .then(fetchedVoices => {
        setVoices(fetchedVoices);
        setSelectedVoice(tts.getDefaultVoice());
      })
      .catch(error => console.error('Error fetching voices: ', error));
  }, [tts]);

  const handleVoiceChange = (voiceId: string) => {
    setSelectedVoice(voiceId);
    tts.setDefaultVoice(voiceId);
  };

  return (
    <View style={voiceAssistantStyles.container}>
      {/* Header */}
      <View style={voiceAssistantStyles.header}>
        <TouchableOpacity
          style={voiceAssistantStyles.navButton}
          onPress={() => navigation.navigate('Chat')}>
          <Icon type="back" fill="#FFF" />
        </TouchableOpacity>
        <Text style={commonStyles.text}>Settings</Text>
        <TouchableOpacity style={voiceAssistantStyles.navIcon}>
          <Text> </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={settingsStyles.settingsPane}
        disableIntervalMomentum={true}>
        <Picker selectedValue={selectedVoice} onValueChange={handleVoiceChange}>
          {voices.map(voice => (
            <Picker.Item label={voice.name} value={voice.id} key={voice.id} />
          ))}
        </Picker>
      </ScrollView>
    </View>
  );
};

export default SettingsInterface;

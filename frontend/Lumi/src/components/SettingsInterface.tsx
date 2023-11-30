import React from 'react';
import {Text, ScrollView, TouchableOpacity, View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Icon from './Icon';

import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import commonStyles from '../styles/commonStyles';

const SettingsInterface = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={voiceAssistantStyles.chatContent}
        disableIntervalMomentum={true}>
        <Text>Settings Placeholder</Text>
      </ScrollView>
    </View>
  );
};

export default SettingsInterface;

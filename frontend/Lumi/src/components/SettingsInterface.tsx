import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native-windows';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Icon from './Icon';

import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import commonStyles from '../styles/commonStyles';

function beginMomentumScroll() {}
function endMomentumScroll() {}

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
          <Icon type="settings" fill="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={voiceAssistantStyles.chatContent}
        disableIntervalMomentum={true}
        onMomentumScrollBegin={beginMomentumScroll}
        onMomentumScrollEnd={endMomentumScroll}>
        <Text>Yeet</Text>
      </ScrollView>
    </View>
  );
};

export default SettingsInterface;

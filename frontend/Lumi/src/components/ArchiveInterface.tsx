import React, {useState, useEffect} from 'react';
import {Text, ScrollView, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {v4 as uuidv4} from 'uuid'; // to generate random IDs

import Icon from './Icon';

import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import commonStyles from '../styles/commonStyles';
import ArchiveItem from './ArchiveItem';

const ArchiveInterface = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [archiveEntries, setArchiveEntries] = useState<Item[]>([]);

  const generateRandomDate = () => {
    return new Date(
      +new Date() - Math.floor(Math.random() * 10000000000),
    ).toLocaleDateString('en-US');
  };

  useEffect(() => {
    const generateRandomEntries = (count: number): Item[] => {
      return Array.from({length: count}, (_, i) => ({
        id: uuidv4(), // Ensure unique id for key prop
        text: `Entry ${i + 1}`,
        time: generateRandomDate(),
      }));
    };
    setArchiveEntries(generateRandomEntries(50)); // Populate the state on component mount
  }, []);

  const handleDelete = (id: string) => {
    setArchiveEntries(currentEntries =>
      currentEntries.filter(entry => entry.id !== id),
    );
  };

  return (
    <GestureHandlerRootView style={voiceAssistantStyles.container}>
      <View style={voiceAssistantStyles.container}>
        {/* Header */}
        <View style={voiceAssistantStyles.header}>
          <TouchableOpacity
            style={voiceAssistantStyles.navButton}
            onPress={() => navigation.navigate('Chat')}>
            <Icon type="back" fill="#FFF" />
          </TouchableOpacity>
          <Text style={commonStyles.text}>Archive</Text>
          <TouchableOpacity style={voiceAssistantStyles.navIcon}>
            <Icon type="archive" fill="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={voiceAssistantStyles.chatContent}
          disableIntervalMomentum={true}>
          {archiveEntries.map(item => (
            <ArchiveItem key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default ArchiveInterface;

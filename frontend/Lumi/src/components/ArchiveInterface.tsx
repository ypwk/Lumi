import React, {useState, useEffect} from 'react';
import {Text, ScrollView, TouchableOpacity, View, Alert} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Icon from './Icon';

import voiceAssistantStyles from '../styles/voiceAssistantStyles';
import commonStyles from '../styles/commonStyles';
import ArchiveItem from './ArchiveItem';

interface ArchiveEntry {
  collection_id: string;
  custom_id: string;
  document: string;
  embedding: string;
  uuid: string;
}

// const server_address = 'http://10.0.2.2:5000';
const server_address = 'http://127.0.0.1:5000';

const ArchiveInterface = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [archiveEntries, setArchiveEntries] = useState<ArchiveEntry[]>([]);

  useEffect(() => {
    // Fetch the archive entries from the server
    fetch(server_address + '/get_archive/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setArchiveEntries(data);
      })
      .catch(error => {
        console.error('Error fetching archive entries:', error);
      });
  }, []);

  const handleDelete = (id: string) => {
    fetch(`${server_address}/delete_archive/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setArchiveEntries(currentEntries =>
            currentEntries.filter(entry => entry.uuid !== id),
          );
        } else {
          Alert.alert('Error', 'Unable to delete the entry');
        }
      })
      .catch(error => {
        console.error('Error deleting archive entry:', error);
      });
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
            <Text> </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={voiceAssistantStyles.chatContent}
          disableIntervalMomentum={true}>
          {archiveEntries.map(item => (
            <ArchiveItem key={item.uuid} item={item} onDelete={handleDelete} />
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default ArchiveInterface;

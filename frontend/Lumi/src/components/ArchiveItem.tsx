import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import archiveStyles from '../styles/archiveStyles';

interface ArchiveEntry {
  collection_id: string;
  custom_id: string;
  document: string;
  embedding: string;
  uuid: string;
}

interface ArchiveItemProps {
  item: ArchiveEntry;
  onDelete: (id: string) => void;
}

const ArchiveItem: React.FC<ArchiveItemProps> = ({item, onDelete}) => {
  // A simple handler to simulate swipe to delete
  const handleDelete = () => {
    // Call the passed onDelete function with the item's id
    onDelete(item.uuid);
  };

  return (
    <View style={archiveStyles.itemContainer}>
      <View style={archiveStyles.textContainer}>
        <Text style={archiveStyles.text}>{item.document}</Text>
        <Text style={archiveStyles.text}>{item.uuid}</Text>
      </View>
      <TouchableOpacity
        onPress={handleDelete}
        style={archiveStyles.deleteButton}>
        <Text style={archiveStyles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ArchiveItem;

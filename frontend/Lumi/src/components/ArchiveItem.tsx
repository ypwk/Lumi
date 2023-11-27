import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import archiveStyles from '../styles/archiveStyles';

interface Item {
  id: string;
  text: string;
  time: string;
}

interface ArchiveItemProps {
  item: Item;
  onDelete: (id: string) => void;
}

const ArchiveItem: React.FC<ArchiveItemProps> = ({item, onDelete}) => {
  // A simple handler to simulate swipe to delete
  const handleDelete = () => {
    // Call the passed onDelete function with the item's id
    onDelete(item.id);
  };

  return (
    <View style={archiveStyles.itemContainer}>
      <View style={archiveStyles.textContainer}>
        <Text style={archiveStyles.text}>{item.text}</Text>
        <Text style={archiveStyles.text}>{item.time}</Text>
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

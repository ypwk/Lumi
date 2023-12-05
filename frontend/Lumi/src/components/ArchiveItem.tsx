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

  // Split the document into Question and Answer
  const splitDocument = (document: string) => {
    const parts = document.split(' - Answer: ');
    parts[0] = parts[0].replace(' - Question: ', '').trim();
    parts[1] = parts[1].replace('</s>', '');
    return {
      question: parts[0] || '',
      answer: parts[1] || '',
    };
  };

  const {question, answer} = splitDocument(item.document);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  return (
    <View style={archiveStyles.itemContainer}>
      <View style={archiveStyles.textContainer}>
        <Text style={[archiveStyles.text, archiveStyles.questionText]}>
          {truncateText(question, 50)}
        </Text>
        <Text style={[archiveStyles.text]}>{truncateText(answer, 200)}</Text>
        <Text style={[archiveStyles.text, archiveStyles.idText]}>
          {item.uuid}
        </Text>
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

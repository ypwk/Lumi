import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#ffffff',
  },
});

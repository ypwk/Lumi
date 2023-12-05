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
    padding: 0,
    margin: 0,
  },
  text: {
    fontSize: 14,
    color: 'white',
    padding: 0,
    margin: 0,
  },
  questionText: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  idText: {
    fontStyle: 'italic',
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

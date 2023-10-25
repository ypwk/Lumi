import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c35', // Dark background
    padding: 10,
  },
  header: {
    height: 60, // adjust as needed
    backgroundColor: '#4a4e5a',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#353a45',
    borderBottomWidth: 1,
  },
  chatContent: {
    flex: 1,
    backgroundColor: '#282c35',
    padding: 10,
  },
  chatBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  chatInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatTextBox: {
    flex: 1,
    height: 40, // Define a fixed height for the TextInput
    lineHeight: 50, // Set the lineHeight to match the height of the TextInput
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16, // Adjust fontSize as needed
    justifyContent: 'center', // Vertically center the content
  },
  chatButton: {
    width: 40, // Adjust width as needed
    height: 40, // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, // To make it circular if that's the desired shape
    backgroundColor: '#353a45', // Adjust color as needed
  },
  senderBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4a4e5a', // Lighter bubble for sender
  },
  receiverBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#353a45', // Darker bubble for receiver
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 10,
  },
});

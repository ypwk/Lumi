import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c35', // Dark background
    padding: 3,
  },
  chatText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Lato',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
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
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Lato',
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
    lineHeight: 20, // Set the lineHeight to match the height of the TextInput
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16, // Adjust fontSize as needed
    justifyContent: 'center', // Vertically center the content
    color: '#FFFFFF',
    fontFamily: 'Arial',
  },
  chatButton: {
    width: 40, // Adjust width as needed
    height: 40, // Adjust height as needed
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, // To make it circular if that's the desired shape
    backgroundColor: '#353a45', // Adjust color as needed
  },
  senderBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4a4e5a', // Lighter bubble for sender
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Lato',
  },
  receiverBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#353a45', // Darker bubble for receiver
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Lato',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,
    paddingHorizontal: 10,
  },
  voiceButton: {
    borderRadius: 40,
  },
});

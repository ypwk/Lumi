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
    padding: 0,
  },
  chatBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Lato',
    margin: 0,
  },
  chatInputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  chatTextBox: {
    height: 40, // Define a fixed height for the TextInput
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
    flexGrow: 5,
    fontSize: 16, // Adjust fontSize as needed
    color: '#FFFFFF',
    fontFamily: 'Lato',
  },
  chatButton: {
    width: 40, // Adjust width as needed
    height: 40, // Adjust height as needed
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, // To make it circular if that's the desired shape
    backgroundColor: '#353a45', // Adjust color as needed
  },
  navButton: {
    width: 40, // Adjust width as needed
    height: 40, // Adjust height as needed
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, // To make it circular if that's the desired shape
    backgroundColor: '#353a45', // Adjust color as needed
  },
  bigVoiceButton: {
    position: 'absolute',
    bottom: 50, // Half of the height to make it stick out
    alignSelf: 'center', // This centers the button on the X-axis
    zIndex: 2,
    elevation: 2,
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
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
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#282c35',
    borderTopWidth: 1,
    borderTopColor: '#ffffff',
    zIndex: 1,
    overflow: 'visible',
    elevation: 0,
  },
  voiceInputBar: {
    flex: 1,
    width: '100%',
    height: 100,
  },
  touchableInputChangeBar: {
    flex: 1,
    width: '100%',
  },
  voiceButton: {
    width: 40, // Adjust width as needed
    height: 40, // Adjust height as needed
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, // To make it circular if that's the desired shape
    backgroundColor: '#353a45', // Adjust color as needed
  },
  keyboardIcon: {
    width: 40, // Adjust width as needed
    height: 40, // Adjust height as needed
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

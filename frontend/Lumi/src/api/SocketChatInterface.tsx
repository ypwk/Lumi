import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View} from 'react-native';
import ChatInterface from '../components/ChatInterface';
import {Message} from '../components/ChatInterface';
import commonStyles from '../styles/commonStyles';
import {io, Socket} from 'socket.io-client';

// const SOCKET_URL = 'http://10.0.2.2:5000/';
const SOCKET_URL = 'http://127.0.0.1:5000/';

const SocketChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const webSocketRef = useRef<Socket | null>(null);

  const connect = useCallback(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'], // Use WebSocket transport for compatibility
    });
    webSocketRef.current = socket;

    // socket.on('connect', () => {
    //   console.log('Socket.IO Connected');
    // });

    socket.on('message', message => {
      const cleanedMessage = message.replace(/<\/s>$/, '');
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (lastMessage && lastMessage.user === 'Assistant') {
          // Append only if the last message is from Assistant
          lastMessage.text += cleanedMessage;
        } else {
          // Otherwise, add a new message
          updatedMessages.push({
            user: 'Assistant',
            text: cleanedMessage,
          });
        }
        return updatedMessages;
      });
    });

    socket.on('connect_error', error => {
      console.log('Socket.IO Connection Error', error.message);
    });

    socket.on('disconnect', reason => {
      console.log('Socket.IO Disconnected', reason);
    });

    // Cleanup on unmount
    return () => {
      webSocketRef.current && webSocketRef.current.close();
    };
  }, []);

  useEffect(() => {
    connect();
  }, [connect]);

  const sendMessage = useCallback((message: string) => {
    if (webSocketRef.current) {
      webSocketRef.current.emit('message', message);
    } else {
      console.log('Socket.IO not connected, message not sent');
    }
  }, []);

  return (
    <View style={commonStyles.wrapping}>
      <ChatInterface
        sendMessage={sendMessage}
        setMessages={setMessages}
        messages={messages}
      />
    </View>
  );
};

export default SocketChatInterface;

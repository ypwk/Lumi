// API
export * from './api/serverAPI';
export {default as WebSocketClient} from './api/WebSocketClient';

// Components
export {default as ResponseDisplay} from './components/ResponseDisplay';
export {default as MicrophoneIndicator} from './components/MicrophoneIndicator';
export {ChatInput} from './components/ChatInput';
export {ChatInterface} from './components/ChatInterface';

// Features
export {default as VoiceAssistantScreen} from './features/assistant/VoiceAssistantScreen';
export * from './features/assistant/useVoiceRecording';

// Styles (assuming you're exporting styled components or CSS-in-JS objects)
export {default as commonStyles} from './styles/commonStyles';
export {default as voiceAssistantStyles} from './styles/voiceAssistantStyles';

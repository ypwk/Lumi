// API
export * from './api/serverAPI';

// Components
export {VoiceButton} from './components/VoiceButton';
export {default as ResponseDisplay} from './components/ResponseDisplay';
export {default as MicrophoneIndicator} from './components/MicrophoneIndicator';
export {ChatInput} from './components/ChatInput';

// Features
export {default as VoiceAssistantScreen} from './features/assistant/VoiceAssistantScreen';
export * from './features/assistant/useVoiceRecording';

// Styles (assuming you're exporting styled components or CSS-in-JS objects)
export {default as commonStyles} from './styles/commonStyles';
export {default as voiceAssistantStyles} from './styles/voiceAssistantStyles';

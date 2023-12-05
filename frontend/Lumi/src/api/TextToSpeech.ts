import Tts from 'react-native-tts';

class TextToSpeech {
  private sentenceQueue: string[];
  private isSpeaking: boolean;
  private currentSentence: string;

  constructor() {
    this.sentenceQueue = [];
    this.isSpeaking = false;
    this.currentSentence = '';
    // the finish event is a piece of shit, it keeps triggering for no reason?? I use something else.
    Tts.addEventListener('tts-finish', this.onFinishSpeaking);
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultPitch(0.8);
  }

  public receiveText(text: string): void {
    this.currentSentence += text;
    const trimmedText = text.trimEnd();
    if (
      trimmedText.endsWith('.') ||
      trimmedText.endsWith('?') ||
      trimmedText.endsWith('!')
    ) {
      this.sentenceQueue.push(this.currentSentence);
      this.currentSentence = '';
      if (!this.isSpeaking) {
        this.processQueue();
      }
    }
  }

  private async processQueue(): Promise<void> {
    if (this.sentenceQueue.length > 0 && !this.isSpeaking) {
      this.isSpeaking = true;
      const sentenceToSpeak = this.sentenceQueue.shift()!;
      try {
        await Tts.speak(sentenceToSpeak);
        this.processQueue();
      } catch (error) {
        this.isSpeaking = false;
        this.processQueue();
      }
    }
  }

  private onFinishSpeaking = (): void => {
    this.isSpeaking = false;
    this.processQueue();
  };

  public stopSpeech = (): void => {
    this.isSpeaking = false;
    this.sentenceQueue = [];
    Tts.stop();
  };
}

export default TextToSpeech;

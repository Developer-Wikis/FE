import { useCallback, useEffect, useRef } from 'react';

const useTTS = () => {
  const voice = useRef<SpeechSynthesisVoice>();

  const speak = useCallback((text: string, handleEnd: () => void) => {
    if (!voice.current) {
      console.error('voice not found');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => handleEnd();
    utterance.voice = voice.current;
    window.speechSynthesis.speak(utterance);
  }, []);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  const setVoice = useCallback(() => {
    const koKRVoice = window.speechSynthesis
      .getVoices()
      .filter((voice) => voice.lang === 'ko-KR')[0];
    voice.current = koKRVoice;
  }, []);

  useEffect(() => {
    setVoice();
  }, []);

  return { speak, cancel };
};

export default useTTS;

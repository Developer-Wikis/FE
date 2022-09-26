import { useCallback, useEffect, useRef, useState } from 'react';
import PageContainer from '~/components/common/PageContainer';
import styled from '@emotion/styled';

const question = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<null | MediaRecorder>(null);

  const onRecordAudio = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(mediaStream);
    setMediaRecorder(mediaRecorder);

    let blobChunk: Blob[] = [];

    mediaRecorder.ondataavailable = (e) => {
      // MediaRecorder가 미디어 데이터를 사용하도록 애플리케이션에 전달할 때 이벤트가 시작
      // ondatavailable 이후 onstop 실행
      blobChunk.push(e.data);
      // setAudioBlob(() => e.data);
      // setAudioBlob로 담아서 이 값으로 컨트롤 하고 싶었으나 비동기로 값이 담기기 때문에 임의로 위에 변수 실행
    };

    mediaRecorder.onstop = (event) => {
      const blob = new Blob(blobChunk, { type: 'audio/ogg codecs=opus' });

      console.log(blob, 'blob');
      blobChunk.splice(0);

      // Blob 데이터에 접근할 수 있는 주소 생성
      const blobURL = window.URL.createObjectURL(blob);

      if (audioRef.current) {
        setAudioSrc(blobURL);
      }
    };
    mediaRecorder.start(1000);
    setIsRecording(true);
    setTimeout(() => {
      if (mediaRecorder.state === 'recording') {
        onRecordStop(mediaRecorder);
      }
    }, 5000);
  };

  const onRecordStop = (recorder: MediaRecorder) => {
    if (recorder) {
      recorder.stop();
      recorder.stream.getTracks().forEach((track) => {
        track.stop();
      });
      setIsRecording(false);
    }
  };

  const onClickStop = () => {
    if (mediaRecorder) {
      onRecordStop(mediaRecorder);
    }
  };

  return (
    <Container>
      <h2>ㅇㅇㅇ에 대해 설명해 주세요.</h2>
      <button onClick={isRecording ? onClickStop : onRecordAudio}>
        {isRecording ? '녹음중지' : '녹음'}
      </button>
      <audio controls ref={audioRef} src={audioSrc}></audio>
      <p>예상되는 꼬리 질문</p>
    </Container>
  );
};

export default question;

const Container = styled(PageContainer)`
  margin-top: 32px;
`;

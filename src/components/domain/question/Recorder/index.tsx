import styled from '@emotion/styled';
import { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';
import useTimer from '~/hooks/useTimer';
import { formatTime } from '~/utils/helper/formatting';

interface RecorderProps {
  limit?: number;
}

const Recorder = forwardRef(({ limit }: RecorderProps, ref?: Ref<HTMLButtonElement>) => {
  const [recordCount, setRecordCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  const [duration, setDuration] = useState({ minutes: 0, seconds: 0 });

  const audioRef = useRef<null | HTMLAudioElement>(null);
  const timeoutId = useRef<null | NodeJS.Timeout>(null);
  const mediaRecorder = useRef<null | MediaRecorder>(null);

  const { onStart, onFinish, onStop, minutes, seconds } = useTimer();

  const onRecordAudio = async () => {
    onStart();
    setIsCompleted(false);
    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(mediaStream);

    let blobChunk: Blob[] = [];

    mediaRecorder.current.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        blobChunk.push(e.data);
      }
    };

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(blobChunk, { type: 'audio/ogg; codecs=vorbis' });
      blobChunk.splice(0);

      const blobURL = window.URL.createObjectURL(blob);

      if (audioRef.current) {
        setAudioSrc(blobURL);
      }
    };

    mediaRecorder.current.start();
    setIsRecording(true);

    timeoutId.current = setTimeout(() => {
      if (mediaRecorder.current?.state === 'recording') {
        onRecordStop({ minutes: 1, seconds: 0 });
      }
    }, 61000);
  };

  const onMediaRecordStop = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const onRecordStop = (time: { minutes: number; seconds: number }) => {
    onFinish();
    onMediaRecordStop();

    setDuration(time);
    setIsRecording(false);
    setIsCompleted(true);
  };

  const onRecordReset = () => {
    limit && setRecordCount(recordCount + 1);
    onPlayStop();
    onFinish();
    setIsRecording(false);
    setIsPlaying(false);
    setIsCompleted(false);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  const onClickStop = () => {
    if (mediaRecorder.current) {
      onRecordStop({ minutes, seconds });
    }
  };

  const onPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      onStart();
      setIsPlaying(true);
    }
  };

  const onPlayStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      onStop();
      setIsPlaying(false);
    }
  };

  const onPlayEnded = () => {
    setIsPlaying(false);
    onFinish();
  };

  useEffect(() => {
    return () => {
      onMediaRecordStop();
    };
  }, []);

  return (
    <>
      <RecordContainer>
        {!isRecording && !isPlaying && !isCompleted ? (
          <RecordStart>
            <MikeButton onClick={onRecordAudio} ref={ref}>
              <Icon name="Microphone" size="30" />
            </MikeButton>
          </RecordStart>
        ) : (
          <Player>
            <ButtonArea>
              {isRecording && (
                <StopButton onClick={onClickStop}>
                  <Icon name="Stop" size="21" />
                </StopButton>
              )}
              {isCompleted &&
                (isPlaying ? (
                  <PlayButton onClick={onPlayStop}>
                    <Icon name="Pause" size="36" />
                  </PlayButton>
                ) : (
                  <PlayButton onClick={onPlay}>
                    <Icon name="Play" size="21" />
                  </PlayButton>
                ))}
            </ButtonArea>
            <TimeArea>
              <span>{formatTime(minutes, seconds)}</span>
              {isCompleted && <span> / {formatTime(duration.minutes, duration.seconds)}</span>}
            </TimeArea>
          </Player>
        )}
      </RecordContainer>
      <RecordInfo>
        {isRecording || isCompleted ? (
          recordCount < (limit ?? Infinity) && (
            <Button variant="borderGray" onClick={onRecordReset}>
              다시 녹음하기
            </Button>
          )
        ) : (
          <Notice>
            <p>
              <strong className="red">마이크 버튼</strong>을 누르면 녹음이 시작됩니다.
            </p>
            <p>
              * 녹음은 <strong>최대 1분</strong>동안 가능합니다.
            </p>
          </Notice>
        )}
      </RecordInfo>

      <audio
        controls
        ref={audioRef}
        src={audioSrc}
        onEnded={onPlayEnded}
        style={{ display: 'none' }}
      ></audio>
    </>
  );
});

export default Recorder;

const RecordContainer = styled.div`
  max-width: 352px;
  width: 100%;
  height: 95px;
  display: flex;
  background: ${({ theme }) => theme.colors.gray200};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const Player = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RecordStart = styled.div``;

const ButtonArea = styled.div`
  margin-left: 20px;
`;

const StopButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.gray800};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeArea = styled.div`
  padding-right: 30px;
  flex-grow: 1;
  text-align: center;
`;

const MikeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.red};
  border-radius: 50%;

  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Notice = styled.div`
  text-align: center;

  strong.red {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const RecordInfo = styled.div`
  height: 50px;
`;

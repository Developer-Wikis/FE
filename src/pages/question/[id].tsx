import React, { useCallback, useEffect, useRef, useState } from 'react';
import PageContainer from '~/components/common/PageContainer';
import styled from '@emotion/styled';
import AdditionalQuestions from '~/components/domain/question/AdditionalQuestions';
import PostHeader from '~/components/domain/question/PostHeader';
import Comment from '~/components/common/Comment';
import { ICommentItem } from '~/types/comment';
import useTimer from '~/hooks/useTimer';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';
import { getQuestionDetail } from '~/service/question';
import { NextPageContext } from 'next';
import { IQuestionDetail } from '~/types/question';
import { useRouter } from 'next/router';
import MoveButtons from '~/components/domain/question/MoveButtons';

const commentData: ICommentItem[] = [
  {
    id: 1,
    nickname: '하이루',
    content: '반가워요~',
    createdAt: '2022.09.28 00:00:00',
  },
  {
    id: 2,
    nickname: '하이루2',
    content: '반가워요~2',
    createdAt: '2022.09.28 00:00:00',
  },
  {
    id: 3,
    nickname: '하이루3',
    content: '반가워요~3',
    createdAt: '2022.09.28 00:00:00',
  },
];

/*

1. [녹음 시작버튼] 클릭 시 시간을 카운트 한다.
2. 60초가되면 녹음을 자동으로 멈추고 카운트도 멈춘다
   [녹음 중지] 버튼을 눌렀을 경우 카운트를 멈춘다.

3. 녹음이 중지되었을 경우 [재생 버튼]이 활성화 된다.
4. 재생 버튼을 클릭 할 경우 0에서 지정한 카운트 만큼 시간이 표시 되고
   녹음된 내용이 재생된다.
5. 다시 재생 버튼을 누를 경우 다시 0에서 지정한 카운트 만큼 표시되면서 진행상황을 알려준다.
6. 만약 다시 녹음 버튼을 누른다면 지정한 카운트가 초기화 되고 재생 버튼이 비활성화 되고,
   녹음이 다시 시작된다.

*/

export const getServerSideProps = async (context: NextPageContext) => {
  const { id } = context.query;
  const questionId = Number(id);

  if (Number.isNaN(questionId)) {
    return {
      notFound: true,
    };
  }

  try {
    const response = await getQuestionDetail(questionId);
    return {
      props: { detailData: response.data || null },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

interface QuestionDetailProps {
  detailData: IQuestionDetail;
}

const QuestionDetail = ({ detailData }: QuestionDetailProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const router = useRouter();

  let timeoutId = useRef<null | NodeJS.Timeout>(null);
  // 그냥 일반 변수or state 로 저장 시에 timeout을 삭제하려는 시점에 값이 null이기 때문에 초기화가 안됨.

  let mediaRecorder = useRef<null | MediaRecorder>(null);

  const { onStart, onFinish, onStop, minutes, seconds } = useTimer();

  const onRecordAudio = async () => {
    onStart();
    setIsCompleted(false);
    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(mediaStream);

    let blobChunk: Blob[] = [];

    mediaRecorder.current.ondataavailable = (e) => {
      // MediaRecorder가 미디어 데이터를 사용하도록 애플리케이션에 전달할 때 이벤트가 시작
      // ondatavailable 이후 onstop 실행
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
        onRecordStop();
      }
    }, 61000);
  };

  const onRecordStop = () => {
    if (mediaRecorder.current) {
      onFinish();
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((track) => {
        track.stop();
      });

      setIsRecording(false);
      setIsCompleted(true);
    }
  };

  const onRecordReset = () => {
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
      onRecordStop();
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

  return (
    <Container>
      <PostHeader
        category={detailData.category}
        title={detailData.title}
        writer={detailData.nickname}
      />
      <PostContent>
        <RecordContainer>
          {!isRecording && !isPlaying && !isCompleted ? (
            <RecordStart>
              <MikeButton onClick={onRecordAudio}>
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
                <span>
                  {minutes}:{seconds < 10 ? 0 : ''}
                  {seconds}
                </span>
              </TimeArea>
            </Player>
          )}
        </RecordContainer>
        <Button buttonType="borderGray" onClick={onRecordReset}>
          다시 녹음하기
        </Button>
        <audio
          controls
          ref={audioRef}
          src={audioSrc}
          onEnded={onPlayEnded}
          style={{ display: 'none' }}
        ></audio>
        <AdditionalQuestions questions={detailData.additionQuestions} />
        <MoveButtons prevId={detailData.prevId} nextId={detailData.nextId} />
      </PostContent>
      <Comment total={2} comments={commentData} />
    </Container>
  );
};

export default QuestionDetail;

const Container = styled(PageContainer)`
  margin-top: 32px;
`;

const PostContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  margin-top: 36px;
`;

const RecordContainer = styled.div`
  width: 352px;
  height: 95px;
  display: flex;
  background: ${({ theme }) => theme.colors.bgGray};
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
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.red};
  svg {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
  }
`;

const PlayButton = styled.button`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.blackGray};
  svg {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
  }
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

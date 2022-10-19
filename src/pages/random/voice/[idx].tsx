import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import useStorage from '~/hooks/useStorage';
import PostHeader from '~/components/domain/question/PostHeader';
import { IQuestionDetail } from '~/types/question';
import Recorder from '~/components/domain/question/Recorder';
import styled from '@emotion/styled';
import Button from '~/components/base/Button';
import PageContainer from '~/components/common/PageContainer';
import Icon from '~/components/base/Icon';
import { isValidRandomType } from '~/utils/helper/validation';
import { isString } from '~/utils/helper/checkType';

const STORAGE_KEY = 'random';
const DUMMY = 1;
const DUMMY_QUESTION = {} as IQuestionDetail;

type CurQuestion = IQuestionDetail & {
  idx: number;
};

const RandomVoice = () => {
  const local = useStorage('local');
  const router = useRouter();
  const recordRef = useRef<HTMLButtonElement>(null);
  const recordRefLastId = useRef(0);

  const [questions, setQuestions] = useState<IQuestionDetail[]>();
  const [curQuestion, setCurQuestion] = useState<CurQuestion>();

  const handleSpeechEnd = (recordRefId: number) => {
    if (recordRefId !== recordRefLastId.current) return;
    recordRef.current?.click();
  };

  const handleQuestionEnd = () => {
    const answer = confirm('마지막 질문입니다. 종료하시겠습니까?');
    if (!answer) return;

    local.removeItem(STORAGE_KEY);
    router.push('/');
  };

  const handlePrev = () => {
    if (!curQuestion || !questions || curQuestion.idx === 1) {
      alert('첫 번째 질문입니다.');
      return;
    }

    const nextIdx = curQuestion.idx - 1;
    setCurQuestion({ idx: nextIdx, ...questions[nextIdx] });
    router.push(`/random/voice/${nextIdx}`);

    speechSynthesis.cancel();
    const id = ++recordRefLastId.current;
    speak(questions[nextIdx].title, speechSynthesis, () => handleSpeechEnd(id));
  };

  const handleNext = async () => {
    if (!curQuestion || !questions || curQuestion.idx === questions.length - 1) {
      handleQuestionEnd();
      return;
    }

    const nextIdx = curQuestion.idx + 1;
    setCurQuestion({ idx: nextIdx, ...questions[nextIdx] });
    router.push(`/random/voice/${nextIdx}`);

    speechSynthesis.cancel();
    const id = ++recordRefLastId.current;
    speak(questions[nextIdx].title, speechSynthesis, () => handleSpeechEnd(id));
  };

  useEffect(() => {
    if (!router.isReady) return;

    const { idx: idxString } = router.query;
    const idx = Number(idxString);

    const random = local.getItem<{ type: string; questions: IQuestionDetail[] } | null>(
      STORAGE_KEY,
      null,
    );

    if (
      !random ||
      !isValidStoredValue(random) ||
      !isValidIdx(idx, random.questions.length + DUMMY)
    ) {
      alert('잘못된 접근입니다.');
      router.push('/');
      return;
    }

    setQuestions([DUMMY_QUESTION, ...random.questions]);
    setCurQuestion({ idx, ...random.questions[idx - DUMMY] });

    speak(random.questions[idx - DUMMY].title, speechSynthesis, () =>
      handleSpeechEnd(recordRefLastId.current),
    );
  }, [router.isReady]);

  return (
    <>
      {curQuestion && (
        <Container>
          <PostHeader
            subCategory={curQuestion.subCategory}
            title={isString(curQuestion.title) ? curQuestion.title : ''}
            writer={curQuestion.nickname}
          />

          <PostContent>
            <Recorder ref={recordRef} limit={1} key={curQuestion.idx} />

            <Buttons>
              <PrevButton buttonType="borderGray" onClick={handlePrev}>
                <Icon name="ArrowLeft" size="20" color="gray600" />
                <span>이전 질문</span>
              </PrevButton>
              <NextButton buttonType="borderGray" onClick={handleNext}>
                <span> 다음 질문</span>
                <Icon name="ArrowRight" size="20" color="gray600" />
              </NextButton>
            </Buttons>
          </PostContent>
        </Container>
      )}
    </>
  );
};

export default RandomVoice;

async function populateVoiceList(synth: SpeechSynthesis) {
  try {
    return await synth.getVoices();
  } catch (error) {
    throw new Error('Failure retrieving voices');
  }
}

async function speak(textToRead: string, synth: SpeechSynthesis, handleEnd: () => void) {
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => populateVoiceList;
  }

  if (textToRead !== '') {
    const utterThis = new SpeechSynthesisUtterance(textToRead);
    utterThis.onend = function (event) {
      handleEnd();
    };
    utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror', event);
    };

    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
  }
}

function isValidIdx(idx: number, length: number) {
  return 0 + DUMMY <= idx && idx < length;
}

function isValidStoredValue(value: unknown) {
  if (!value || typeof value !== 'object') return false;
  const objValue = value as { type: string; questions: IQuestionDetail[] };

  return (
    'type' in objValue &&
    isValidType(objValue.type) &&
    'questions' in objValue &&
    Array.isArray(objValue.questions) &&
    objValue.questions.length > 0
  );
}
function isValidType(type: unknown) {
  return isValidRandomType(type) && type === 'voice';
}

const Container = styled(PageContainer)`
  margin-top: 32px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  padding: 20px 0 50px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const PostContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  margin-top: 36px;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  padding: 0 36px;
`;

const PrevButton = styled(Button)`
  display: flex;
  align-items: center;
  padding-left: 16px;
`;

const NextButton = styled(Button)`
  display: flex;
  align-items: center;
  padding-right: 16px;
`;

import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useCallback } from 'react';
import useStorage from '~/hooks/useStorage';
import PostHeader from '~/components/domain/question/PostHeader';
import { IQuestionDetail } from '~/types/question';
import Recorder from '~/components/domain/question/Recorder';
import PageContainer from '~/components/common/PageContainer';
import { isValidRandomType } from '~/utils/helper/validation';
import { isString } from '~/utils/helper/checkType';
import { RANDOM_LOCAL_KEY } from '~/utils/constant/random';
import Article from '~/components/common/Article';
import MoveButtons from '~/components/common/MoveButtons';
import RandomContent from '~/components/domain/random/RandomContent';
import useTTS from '~/hooks/useTTS';

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
  const { speak, cancel } = useTTS();

  const clearLocal = useCallback(() => {
    Object.values(RANDOM_LOCAL_KEY).forEach(local.removeItem);
  }, [local]);

  const handleSpeechEnd = (recordRefId: number) => {
    if (recordRefId !== recordRefLastId.current) return;
    recordRef.current?.click();
  };

  const handleNext = async () => {
    if (!curQuestion || !questions || curQuestion.idx === questions.length - 1) {
      handleQuestionEnd();
      return;
    }

    move(curQuestion.idx + 1);
  };

  const handleQuestionEnd = () => {
    const answer = confirm('마지막 질문입니다. 종료하시겠습니까?');
    if (!answer) return;

    clearLocal();
    router.push('/');
  };

  const move = (nextIdx: number) => {
    if (!questions) return;

    setCurQuestion({ idx: nextIdx, ...questions[nextIdx] });
    local.setItem(RANDOM_LOCAL_KEY.latest, nextIdx);
    router.push(`/random/voice/${nextIdx}`);

    cancel();
    const id = ++recordRefLastId.current;
    speak(questions[nextIdx].title, () => handleSpeechEnd(id));
  };

  useEffect(() => {
    if (!router.isReady) return;

    const { idx: idxString } = router.query;
    const idx = Number(idxString);

    const random = local.getItem<{ type: string; questions: IQuestionDetail[] }>(
      RANDOM_LOCAL_KEY.random,
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
    local.setItem(RANDOM_LOCAL_KEY.latest, idx);

    speak(random.questions[idx - DUMMY].title, () => handleSpeechEnd(recordRefLastId.current));
  }, [router.isReady]);

  return (
    <>
      {curQuestion && (
        <PageContainer>
          <Article full>
            <PostHeader
              questionId={curQuestion.id}
              subCategory={curQuestion.subCategory}
              title={isString(curQuestion.title) ? curQuestion.title : ''}
            />

            <RandomContent>
              <Recorder ref={recordRef} limit={1} key={curQuestion.idx} />
              <MoveButtons
                disabledPrev={!curQuestion || !questions || curQuestion.idx === 1}
                onPrev={() => move(curQuestion.idx - 1)}
                onNext={handleNext}
              />
            </RandomContent>
          </Article>
        </PageContainer>
      )}
    </>
  );
};

export default RandomVoice;

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

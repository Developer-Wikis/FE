import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import PageContainer from '~/components/common/PageContainer';
import PostHeader from '~/components/domain/question/PostHeader';
import Recorder from '~/components/domain/question/Recorder';
import TailQuestions from '~/components/domain/question/TailQuestions';
import useStorage from '~/hooks/useStorage';
import { IQuestionDetail } from '~/types/question';
import { RANDOM_LOCAL_KEY } from '~/utils/constant/random';
import { isString } from '~/utils/helper/checkType';
import { isValidRandomType } from '~/utils/helper/validation';
import Article from '~/components/common/Article';
import MoveButtons from '~/components/common/MoveButtons';
import RandomContent from '~/components/domain/random/RandomContent';

const DUMMY = 1;
const DUMMY_QUESTION = {} as IQuestionDetail;

type CurQuestion = IQuestionDetail & {
  idx: number;
};

const RandomText = () => {
  const local = useStorage('local');
  const router = useRouter();
  const recordRef = useRef<HTMLButtonElement>(null);

  const [questions, setQuestions] = useState<IQuestionDetail[]>();
  const [curQuestion, setCurQuestion] = useState<CurQuestion>();

  const clearLocal = useCallback(() => {
    Object.values(RANDOM_LOCAL_KEY).forEach(local.removeItem);
  }, [local]);

  const handleNext = () => {
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
    router.push(`/random/text/${nextIdx}`);
  };

  useEffect(() => {
    if (!router.isReady) return;

    const { idx: idxString } = router.query;
    const idx = Number(idxString);

    const random = local.getItem<{ type: string; questions: IQuestionDetail[] } | null>(
      RANDOM_LOCAL_KEY.random,
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
    local.setItem(RANDOM_LOCAL_KEY.latest, idx);
  }, [router.isReady]);

  return (
    <>
      {curQuestion && (
        <PageContainer>
          <Article full>
            <PostHeader
              subCategory={curQuestion.subCategory}
              title={isString(curQuestion.title) ? curQuestion.title : ''}
            />

            <RandomContent>
              <Recorder ref={recordRef} key={curQuestion.idx} />

              <TailQuestions
                questions={curQuestion.tailQuestions}
                questionId={curQuestion.id}
                title={curQuestion.title}
                key={curQuestion.id + curQuestion.idx}
              />

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

export default RandomText;

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
    Array.isArray(objValue.questions)
  );
}
function isValidType(type: unknown) {
  return isValidRandomType(type) && type === 'text';
}

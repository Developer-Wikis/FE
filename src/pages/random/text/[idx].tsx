import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '~/components/base/Icon';
import PageContainer from '~/components/common/PageContainer';
import PostHeader from '~/components/domain/question/PostHeader';
import Recorder from '~/components/domain/question/Recorder';
import TailQuestions from '~/components/domain/question/TailQuestions';
import useStorage from '~/hooks/useStorage';
import { IQuestionDetail } from '~/types/question';
import { RANDOM_LOCAL_KEY } from '~/utils/constant/random';
import { isString } from '~/utils/helper/checkType';
import { isValidRandomType } from '~/utils/helper/validation';
import styled from '@emotion/styled';
import Article from '~/components/common/Article';
import Button from '~/components/base/Button';

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

  const handlePrev = () => {
    if (!curQuestion || !questions || curQuestion.idx === 1) {
      alert('첫 번째 질문입니다.');
      return;
    }

    move(curQuestion.idx - 1);
  };

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
              writer={curQuestion.nickname}
            />

            <PostContent>
              <Recorder ref={recordRef} key={curQuestion.idx} />

              <TailQuestions
                questions={curQuestion.tailQuestions}
                questionId={curQuestion.id}
                title={curQuestion.title}
                key={curQuestion.id + curQuestion.idx}
              />

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

const PostContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 36px;
  padding: 0 36px 0;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 56px;
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

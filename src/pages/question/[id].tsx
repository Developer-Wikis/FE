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
import MainContainer from '~/components/common/MainContainer';
import { getQuestionDetail } from '~/service/question';
import { NextPageContext } from 'next';
import { IQuestionDetail } from '~/types/question';
import { useRouter } from 'next/router';
import MoveButtons from '~/components/domain/question/MoveButtons';
import Recorder from '~/components/domain/question/Recorder';

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
  return (
    <Container>
      <PostHeader
        category={detailData.category}
        title={detailData.title}
        writer={detailData.nickname}
      />
      <PostContent>
        <Recorder />
        <AdditionalQuestions questions={detailData.additionQuestions} />
        <MoveButtons prevId={detailData.prevId} nextId={detailData.nextId} />
      </PostContent>
      <Comment questionId={detailData.id} />
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

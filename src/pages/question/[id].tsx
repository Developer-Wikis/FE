import React from 'react';
import PageContainer from '~/components/common/PageContainer';
import styled from '@emotion/styled';
import AdditionalQuestions from '~/components/domain/question/AdditionalQuestions';
import PostHeader from '~/components/domain/question/PostHeader';
import Comment from '~/components/common/Comment';
import { getQuestionDetail } from '~/service/question';
import { NextPageContext } from 'next';
import { IQuestionDetail, QuestionCategoryQuery } from '~/types/question';
import MoveButtons from '~/components/domain/question/MoveButtons';
import Recorder from '~/components/domain/question/Recorder';
import { formatCategory } from '~/utils/helper/formatting';
import { isString } from '~/utils/helper/checkType';

/*

TODO: progress UI 처리

*/

export const getServerSideProps = async (context: NextPageContext) => {
  const { id, main, sub } = context.query;
  const questionId = Number(id);

  if (!isString(id) || !isString(main) || !isString(sub)) {
    return {
      notFound: true,
    };
  }

  const category = formatCategory(main, sub);

  if (Number.isNaN(questionId) || !category) {
    return {
      notFound: true,
    };
  }

  try {
    const response = await getQuestionDetail(questionId, category);
    return {
      props: { detailData: response.data || null, query: { main, sub } },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

interface QuestionDetailProps {
  detailData: IQuestionDetail;
  query: QuestionCategoryQuery;
}

const QuestionDetail = ({ detailData, query }: QuestionDetailProps) => {
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
        <MoveButtons categoryQuery={query} prevId={detailData.prevId} nextId={detailData.nextId} />
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

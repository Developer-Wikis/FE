import React from 'react';
import PageContainer from '~/components/common/PageContainer';
import styled from '@emotion/styled';
import TailQuestions from '~/components/domain/question/TailQuestions';
import PostHeader from '~/components/domain/question/PostHeader';
import Comment from '~/components/common/Comment';
import { getQuestionDetail } from '~/service/question';
import { NextPageContext } from 'next';
import { IQuestionDetail, QuestionCategoryQuery } from '~/types/question';
import QuestionMoveButtons from '~/components/domain/question/QuestionMoveButtons';
import Recorder from '~/components/domain/question/Recorder';
import { isMainType, isString, isSubWithAllType } from '~/utils/helper/checkType';

/*

TODO: progress UI 처리

*/

export const getServerSideProps = async (context: NextPageContext) => {
  const { id, mainCategory, subCategory } = context.query;
  const questionId = Number(id);

  if (!isString(id) || !isMainType(mainCategory) || !isSubWithAllType(subCategory)) {
    return {
      notFound: true,
    };
  }

  if (Number.isNaN(questionId)) {
    return {
      notFound: true,
    };
  }

  try {
    const query = { mainCategory, subCategory };
    const response = await getQuestionDetail(questionId, query);
    return {
      props: { detailData: response.data || null, query },
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
        subCategory={detailData.subCategory}
        title={detailData.title}
        writer={detailData.nickname}
      />
      <PostContent>
        <Recorder key={detailData.id} />
        <TailQuestions
          questions={detailData.tailQuestions}
          questionId={detailData.id}
          title={detailData.title}
        />
        <QuestionMoveButtons
          categoryQuery={query}
          prevId={detailData.prevId}
          nextId={detailData.nextId}
        />
      </PostContent>

      <Comment questionId={detailData.id} />
    </Container>
  );
};

export default QuestionDetail;

const Container = styled(PageContainer)`
  margin-top: 32px;
  margin-bottom: 80px;
`;

const PostContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  margin-top: 36px;
`;

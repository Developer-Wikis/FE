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

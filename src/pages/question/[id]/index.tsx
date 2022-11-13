import React, { useEffect, useState } from 'react';
import PageContainer from '~/components/common/PageContainer';
import styled from '@emotion/styled';
import TailQuestions from '~/components/domain/question/TailQuestions';
import PostHeader from '~/components/domain/question/PostHeader';
import Comment from '~/components/common/Comment';
import questionApi from '~/service/question';
import { GetServerSideProps, GetServerSidePropsResult, NextPageContext } from 'next';
import { ICategoryQuery } from '~/types/question';
import QuestionMoveButtons from '~/components/domain/question/QuestionMoveButtons';
import Recorder from '~/components/domain/question/Recorder';
import { isMainType, isString, isSubWithAllType } from '~/utils/helper/checkType';
import { QueryClient, dehydrate, useQueryClient } from '@tanstack/react-query';
import { useQuestionDetail } from '~/react-query/hooks/useQuestion';
import { QUERY_KEY } from '~/react-query/queryKey';
import { useRouter } from 'next/router';

/*

TODO: progress UI 처리

*/

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export const getServerSideProps = async (context: NextPageContext) => {
  const { id, mainCategory, subCategory } = context.query;
  const questionId = Number(id);

  if (
    !isString(id) ||
    !isMainType(mainCategory) ||
    !isSubWithAllType(subCategory) ||
    Number.isNaN(questionId)
  ) {
    return {
      notFound: true,
    };
  }

  try {
    const query = { mainCategory, subCategory };

    await queryClient.prefetchQuery([QUERY_KEY.questionDetail, questionId, query], () =>
      questionApi.getDetail(questionId, query),
    );

    return {
      props: {
        questionId,
        query,
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

interface QuestionDetailProps {
  questionId: number;
  query: ICategoryQuery;
}

const QuestionDetail = ({ questionId: defaultId, query }: QuestionDetailProps) => {
  const [questionId, setQuestionId] = useState(defaultId);
  const { detailData, prefetchDetail } = useQuestionDetail(questionId, query);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    const numberId = Number(id);

    /* CSR 이동 체크 */
    if (numberId !== questionId) {
      setQuestionId(numberId);
    }
  }, [router.query.id]);

  useEffect(() => {
    /* 이전,다음 페이지 데이터 미리 받아오기 */
    if (detailData) {
      if (detailData.nextId) {
        prefetchDetail(detailData.nextId);
      }

      if (detailData.prevId) {
        prefetchDetail(detailData.prevId);
      }
    }
  }, [detailData?.nextId]);

  if (!detailData) {
    return;
  }

  return (
    <Container>
      <PostHeader subCategory={detailData.subCategory} title={detailData.title} />
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

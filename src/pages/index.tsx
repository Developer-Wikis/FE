import type { NextPage } from 'next';
import Head from 'next/head';
import PageContainer from '~/components/common/PageContainer';
import QuestionList from '~/components/domain/QuestionList';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import MiddleCategory from '~/components/common/MiddleCategory';
import useAxios from '~/hooks/useAxios';
import questionApi from '~/service/question';
import { IQuestionItem } from '~/types/question';
import { useRouter } from 'next/router';
import { isMainType, isMocking, isSubWithAllType } from '~/utils/helper/checkType';
import { MainType, SubWithAllType, SUB_CATEGORIES } from '~/utils/constant/category';
import { isValidCategoryPair } from '~/utils/helper/validation';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import Pagination from '~/components/common/Pagination';
import useUrlState from '~/hooks/useUrlState';

type QueryParams = {
  mainCategory: MainType;
  subCategory: SubWithAllType;
  page: number;
};

const initialValues: QueryParams = {
  mainCategory: 'fe',
  subCategory: 'all',
  page: 0,
};

/*
TODO:
- 목록 조회/북마크 기능 api 연결
- react-query 적용
*/

const Home: NextPage = () => {
  const [queryParams, setQueryParams] = useUrlState(initialValues);
  const [questions, setQuestions] = useState<IQuestionItem[]>([]);

  const router = useRouter();
  const { request } = useAxios(questionApi.getList, [queryParams]);

  const onChangePage = (page: number) => {
    const nextQueryParams = { ...queryParams, page };
    setQueryParams(nextQueryParams);
    requestQuestionList(nextQueryParams);
  };

  const onChangeSubCategory = (subCategory: SubWithAllType) => {
    if (queryParams.subCategory === subCategory) return;

    const nextQueryParams = { ...queryParams, subCategory, page: initialValues.page };

    setQueryParams(nextQueryParams);
    requestQuestionList(nextQueryParams);
  };

  const requestQuestionList = async (queryParams: QueryParams) => {
    const result = await request(queryParams);
    if (!result) return;

    setQuestions(result.data.content);
  };

  useEffect(() => {
    if (!router.isReady) return;

    const { query } = router;
    query.subCategory = query.subCategory ?? 'all';
    const nextQueryParams = { ...initialValues };

    if (
      isMainType(query.mainCategory) &&
      isSubWithAllType(query.subCategory) &&
      isValidCategoryPair(query.mainCategory, query.subCategory)
    ) {
      nextQueryParams.mainCategory = query.mainCategory;
      nextQueryParams.subCategory = query.subCategory;
    }

    const notChanged =
      queryParams &&
      nextQueryParams.mainCategory === queryParams.mainCategory &&
      nextQueryParams.subCategory === queryParams.subCategory;
    if (notChanged) return;

    setQueryParams(nextQueryParams);
    requestQuestionList(nextQueryParams);
  }, [router.isReady, router.query.mainCategory, router.query.subCategory]);

  return (
    <div>
      <Head>
        <title>Developer Wiki</title>
        <meta name="description" content="Developer Wiki" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent>
        {queryParams && (
          <>
            <StyledMiddleCategory
              subCategories={['all', ...SUB_CATEGORIES[queryParams.mainCategory]]}
              onSelect={onChangeSubCategory}
              currentCategory={queryParams.subCategory}
            />
            <StyledQuestionList
              questions={questions}
              currentCategory={{
                mainCategory: queryParams.mainCategory,
                subCategory: queryParams.subCategory,
              }}
              onBookmarkToggle={(id) => {
                alert(`${id} clicked`);
              }}
            />

            <Pagination
              totalElements={21}
              onChange={onChangePage}
              current={queryParams.page}
              key={JSON.stringify(queryParams)}
            />
          </>
        )}
      </MainContent>
    </div>
  );
};

export default Home;

const MainContent = styled(PageContainer)`
  margin-top: 32px;

  ${mediaQuery('sm')} {
    margin-top: 0;
  }
`;

const StyledMiddleCategory = styled(MiddleCategory)`
  margin-bottom: 32px;
`;

const StyledQuestionList = styled(QuestionList)`
  margin-bottom: 29px;
`;

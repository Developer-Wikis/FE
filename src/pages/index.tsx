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
import useIntersectionObserver from '~/hooks/useIntersectionObserver';
import { MainType, SubWithAllType, SUB_CATEGORIES } from '~/utils/constant/category';
import { isValidCategoryPair } from '~/utils/helper/validation';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import Pagination from '~/components/common/Pagination';

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
- 무한스크롤 제거
- 목록 조회/북마크 기능 api 연결
- react-query 적용
*/

const Home: NextPage = () => {
  const [queryParams, setQueryParams] = useState<QueryParams | null>(null);
  const [questions, setQuestions] = useState<IQuestionItem[]>([]);
  const [isEndPage, setIsEndPage] = useState(false);

  const router = useRouter();
  const { request } = useAxios(questionApi.getList, [queryParams]);
  const [isLoading, setIsLoading] = useState(false);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isEndPage) {
      setObserverTarget(undefined);
      return;
    }

    if (isIntersecting && !isLoading && queryParams) {
      const nextQueryParams = { ...queryParams, page: queryParams.page + 1 };
      setQueryParams(nextQueryParams);
      requestQuestionList(nextQueryParams);
    }
  };
  const { setTarget: setObserverTarget } = useIntersectionObserver({ onIntersect, threshold: 0.2 });

  const onChangePage = (page: number) => {
    if (!queryParams) return;

    const nextQueryParams = { ...queryParams, page };
    setQueryParams(nextQueryParams);
    requestQuestionList(nextQueryParams);
  };

  const onChangeSubCategory = (subCategory: SubWithAllType) => {
    if (!queryParams || queryParams.subCategory === subCategory) return;

    const nextQueryParams = { ...queryParams, subCategory, page: initialValues.page };
    setIsEndPage(false);
    setQueryParams(nextQueryParams);
    router.push({
      pathname: '/',
      query: { mainCategory: queryParams.mainCategory, subCategory },
    });
    requestQuestionList(nextQueryParams);
  };

  const requestQuestionList = async (queryParams: QueryParams) => {
    if (!queryParams) return;

    setIsLoading(true);

    const result = await request(queryParams);
    if (!result) return;

    if (isMocking()) {
      setQuestions(result.data.content);
    } else {
      setQuestions(
        queryParams.page === initialValues.page
          ? result.data.content
          : [...questions, ...result.data.content],
      );
    }

    if (result.data.last) {
      setIsEndPage(true);
    }
    setIsLoading(false);
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
    setIsEndPage(false);
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
              ref={setObserverTarget}
              questions={questions}
              currentCategory={{
                mainCategory: queryParams.mainCategory,
                subCategory: queryParams.subCategory,
              }}
              onBookmarkToggle={(id) => {
                alert(`${id} clicked`);
              }}
            />

            {isMocking() && (
              <Pagination
                totalElements={21}
                onChange={onChangePage}
                current={queryParams.page}
                key={JSON.stringify(queryParams)}
              />
            )}
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

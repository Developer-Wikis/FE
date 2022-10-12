import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import PageContainer from '~/components/common/PageContainer';
import QuestionList from '~/components/domain/QuestionList';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import MiddleCategory from '~/components/common/MiddleCategory';
import useAxios from '~/hooks/useAxios';
import { getQuestionList } from '~/service/question';
import { IQuestionItem } from '~/types/question';
import { useRouter } from 'next/router';
import { isMainType, isSubWithAllType } from '~/utils/helper/checkType';
import useIntersectionObserver from '~/hooks/useIntersectionObserver';
import { MainType, SubWithAllType, SUB_CATEGORIES } from '~/utils/constant/category';
import { isValidCategoryPair } from '../utils/helper/validation';

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

interface HomeProps {
  queryParams: QueryParams;
  questions: IQuestionItem[];
  isEndPage: boolean;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  query.subCategory = query.subCategory ?? 'all';
  const queryParams = { ...initialValues };

  if (
    isMainType(query.mainCategory) &&
    isSubWithAllType(query.subCategory) &&
    isValidCategoryPair(query.mainCategory, query.subCategory)
  ) {
    queryParams.mainCategory = query.mainCategory;
    queryParams.subCategory = query.subCategory;
  }

  try {
    const { data } = await getQuestionList(queryParams);
    return {
      props: {
        queryParams,
        questions: data.content,
        isEndPage: data.last,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

const Home: NextPage<HomeProps> = (homeData) => {
  const [queryParams, setQueryParams] = useState<QueryParams>(homeData.queryParams);
  const [questions, setQuestions] = useState<IQuestionItem[]>(homeData.questions);
  const [isEndPage, setIsEndPage] = useState(homeData.isEndPage);

  const router = useRouter();
  const { isLoading, request } = useAxios(getQuestionList, [queryParams]);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isEndPage) {
      setObserverTarget(undefined);
      return;
    }

    if (isIntersecting && !isLoading) {
      setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }
  };
  const { setTarget: setObserverTarget } = useIntersectionObserver({ onIntersect, threshold: 0.2 });

  const onChangeSubCategory = (subCategory: SubWithAllType) => {
    if (queryParams.subCategory === subCategory) return;

    setQueryParams({ ...queryParams, subCategory, page: initialValues.page });
    setIsEndPage(false);
    router.push(
      {
        pathname: '/',
        query: { mainCategory: queryParams.mainCategory, subCategory },
      },
      undefined,
      { shallow: true },
    );
  };

  const requestQuestionList = async () => {
    const result = await request(queryParams);
    if (!result) return;

    setQuestions(
      queryParams.page === initialValues.page
        ? result.data.content
        : [...questions, ...result.data.content],
    );

    if (result.data.last) {
      setIsEndPage(true);
    }
  };

  useEffect(() => {
    requestQuestionList();
  }, [request]);

  useEffect(() => {
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
      query.mainCategory === queryParams.mainCategory &&
      query.subCategory === queryParams.subCategory;
    if (notChanged) return;

    setQueryParams(nextQueryParams);
  }, [router.query.mainCategory, router.query.subCategory]);

  return (
    <div>
      <Head>
        <title>Developer Wiki</title>
        <meta name="description" content="Developer Wiki" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent>
        <>
          <MiddleCategory
            subCategories={['all', ...SUB_CATEGORIES[queryParams.mainCategory]]}
            onSelect={onChangeSubCategory}
            currentCategory={queryParams.subCategory}
          />
          <QuestionList
            ref={setObserverTarget}
            questions={questions}
            currentCategory={{
              mainCategory: queryParams.mainCategory,
              subCategory: queryParams.subCategory,
            }}
          />
        </>
      </MainContent>
    </div>
  );
};

export default Home;

const MainContent = styled(PageContainer)`
  margin-top: 32px;
`;

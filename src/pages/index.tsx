import type { NextPage } from 'next';
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

const Home: NextPage = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>();
  const [questions, setQuestions] = useState<IQuestionItem[]>([]);
  const [isEndPage, setIsEndPage] = useState(false);

  const router = useRouter();
  const { isLoading, request } = useAxios(getQuestionList, [queryParams]);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isEndPage) {
      setObserverTarget(undefined);
      return;
    }

    if (isIntersecting && !isLoading && queryParams) {
      setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }
  };
  const { setTarget: setObserverTarget } = useIntersectionObserver({ onIntersect, threshold: 0.2 });

  const onChangeSubCategory = (subCategory: SubWithAllType) => {
    if (!queryParams || queryParams.subCategory === subCategory) return;

    setQueryParams({ ...queryParams, subCategory, page: initialValues.page });
    setIsEndPage(false);
    router.push({
      pathname: '/',
      query: { mainCategory: queryParams.mainCategory, subCategory },
    });
  };

  const requestQuestionList = async () => {
    if (!router.isReady || !queryParams) return;

    const result = await request(queryParams);
    if (result) {
      setQuestions(
        queryParams.page === initialValues.page
          ? result.data.content
          : [...questions, ...result.data.content],
      );

      if (result.data.last) {
        setIsEndPage(true);
      }
    }
  };

  useEffect(() => {
    requestQuestionList();
  }, [request]);

  useEffect(() => {
    if (!router.isReady) return;

    let { mainCategory, subCategory } = router.query;

    if (!isMainType(mainCategory)) mainCategory = initialValues.mainCategory;
    if (!isSubWithAllType(subCategory)) subCategory = initialValues.subCategory;

    const notChanged =
      mainCategory === queryParams?.mainCategory && subCategory === queryParams?.subCategory;
    if (notChanged) return;

    setQueryParams({
      mainCategory: mainCategory as MainType,
      subCategory: subCategory as SubWithAllType,
      page: initialValues.page,
    });
  }, [router.isReady, router.query.mainCategory, router.query.subCategory]);

  return (
    <div>
      <Head>
        <title>Developer Wiki</title>
        <meta name="description" content="Developer Wiki" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent>
        {router.isReady && queryParams && (
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
        )}
      </MainContent>
    </div>
  );
};

export default Home;

const MainContent = styled(PageContainer)`
  margin-top: 32px;
`;

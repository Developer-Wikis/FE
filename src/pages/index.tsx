import type { NextPage } from 'next';
import Head from 'next/head';
import PageContainer from '~/components/common/PageContainer';
import QuestionList from '~/components/domain/QuestionList';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import MiddleCategory from '~/components/common/MiddleCategory';
import { useRouter } from 'next/router';
import { isMainType, isSubWithAllType } from '~/utils/helper/checkType';
import { MainType, SubWithAllType, SUB_CATEGORIES } from '~/utils/constant/category';
import { isValidCategoryPair } from '~/utils/helper/validation';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import Pagination from '~/components/common/Pagination';
import useUrlState from '~/hooks/useUrlState';
import useQuestionList from '~/react-query/hooks/useQuestionList';
import useBookmarkList from '~/react-query/hooks/useBookmarkList';
import { useUser } from '~/react-query/hooks/useUser';
import { QUERY_KEY } from '~/react-query/queryKey';

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
  const router = useRouter();
  const { user } = useUser();

  const [isReady, setIsReady] = useState(false);
  const [queryParams, setQueryParams] = useUrlState(initialValues);
  const { data } = useQuestionList(queryParams, isReady);
  const postBookmark = useBookmarkList(() => [QUERY_KEY.question, queryParams]);

  const onChangePage = (page: number) => setQueryParams({ ...queryParams, page });
  const onChangeSubCategory = (subCategory: SubWithAllType) => {
    if (queryParams.subCategory === subCategory) return;
    setQueryParams({ ...queryParams, subCategory, page: initialValues.page });
  };
  const onBookmarkToggle = (questionId: number) => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/login');
      return;
    }

    postBookmark(questionId);
  };

  useEffect(() => {
    if (!router.isReady) return;

    const filteredQuery = filterQuery(
      {
        mainCategory: router.query.mainCategory,
        subCategory: router.query.subCategory,
        page: router.query.page,
      },
      initialValues,
    );
    setQueryParams(filteredQuery);
    setIsReady(true);
  }, [router.isReady, router.query.mainCategory, router.query.subCategory]);

  if (!isReady) return null;
  return (
    <div>
      <Head>
        <title>Developer Wiki</title>
        <meta name="description" content="Developer Wiki" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent>
        <StyledMiddleCategory
          subCategories={['all', ...SUB_CATEGORIES[queryParams.mainCategory]]}
          onSelect={onChangeSubCategory}
          currentCategory={queryParams.subCategory}
        />
        <StyledQuestionList
          questions={data.content}
          currentCategory={{
            mainCategory: queryParams.mainCategory,
            subCategory: queryParams.subCategory,
          }}
          onBookmarkToggle={onBookmarkToggle}
        />
        <Pagination
          totalElements={data.totalElements}
          onChange={onChangePage}
          current={queryParams.page}
          key={JSON.stringify(queryParams)}
        />
      </MainContent>
    </div>
  );
};

export default Home;

function filterQuery(
  query: Record<keyof QueryParams, string | string[] | undefined>,
  defaultValue: QueryParams,
): QueryParams {
  const { mainCategory, subCategory = 'all', page } = query;

  if (!isMainType(mainCategory)) return defaultValue;
  if (!isSubWithAllType(subCategory) || !isValidCategoryPair(mainCategory, subCategory))
    return { ...defaultValue, mainCategory };
  if (!Number.isInteger(Number(page)))
    return { mainCategory, subCategory, page: defaultValue.page };
  return { mainCategory, subCategory, page: Number(page) };
}

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

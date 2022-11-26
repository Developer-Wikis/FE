import type { NextPage } from 'next';
import Head from 'next/head';
import PageContainer from '~/components/common/PageContainer';
import QuestionList from '~/components/domain/QuestionList';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import MiddleCategory from '~/components/common/MiddleCategory';
import { useRouter } from 'next/router';
import { isMainType, isSubWithAllType } from '~/utils/helper/checkType';
import { MainType, SubWithAllType, SUB_CATEGORIES } from '~/utils/constant/category';
import { isValidCategoryPair } from '~/utils/helper/validation';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import Pagination from '~/components/common/Pagination';
import useUrlState from '~/hooks/useUrlState';
import useQuestionList from '~/react-query/hooks/useQuestionList';

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

  const [queryParams, setQueryParams] = useUrlState(initialValues);
  const { data } = useQuestionList(queryParams);

  const onChangePage = (page: number) => setQueryParams({ ...queryParams, page });
  const onChangeSubCategory = (subCategory: SubWithAllType) => {
    if (queryParams.subCategory === subCategory) return;
    setQueryParams({ ...queryParams, subCategory, page: initialValues.page });
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
  }, [router.isReady, router.query.mainCategory, router.query.subCategory]);

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
          onBookmarkToggle={(id) => {
            alert(`${id} clicked`);
          }}
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

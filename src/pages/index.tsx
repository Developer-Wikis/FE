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
import SEO from '~/components/common/SEO';

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
  const [query, setQuery, setQueryWithoutUrl] = useUrlState(initialValues);
  const { data } = useQuestionList(query, isReady);
  const postBookmark = useBookmarkList(() => [QUERY_KEY.question, query]);

  const onChangePage = (page: number) => setQuery({ ...query, page });
  const onChangeSubCategory = (subCategory: SubWithAllType) => {
    if (query.subCategory === subCategory) return;
    setQuery({ ...query, subCategory, page: initialValues.page });
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

    setQueryWithoutUrl(filteredQuery);

    if (!isReady) {
      setIsReady(true);
    }
  }, [router.isReady, router.query]);

  return (
    <>
      <SEO title="Developer Wiki" />
      {isReady && (
        <MainContent>
          <StyledMiddleCategory
            subCategories={['all', ...SUB_CATEGORIES[query.mainCategory]]}
            onSelect={onChangeSubCategory}
            currentCategory={query.subCategory}
          />
          <StyledQuestionList
            questions={data.content}
            currentCategory={{
              mainCategory: query.mainCategory,
              subCategory: query.subCategory,
            }}
            onBookmarkToggle={onBookmarkToggle}
          />
          <Pagination
            totalElements={data.totalElements}
            onChange={onChangePage}
            current={query.page}
          />
        </MainContent>
      )}
    </>
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

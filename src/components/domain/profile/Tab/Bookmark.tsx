import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import Select from '~/components/base/Select';
import Pagination from '~/components/common/Pagination';
import useProfileBookmark from '~/react-query/hooks/useProfileBookmark';
import { MainType, SubWithAllType } from '~/utils/constant/category';
import {
  getMainCategorySelectList,
  getSubCategoryWithAllSelectList,
} from '~/utils/helper/categorySelect';
import PageInfo from './PageInfo';
import { isMainType, isSubWithAllType } from '~/utils/helper/checkType';
import { isValidCategoryPair } from '~/utils/helper/validation';
import BookmarkList from './BookmarkList';
import useBookmarkList from '~/react-query/hooks/useBookmarkList';
import { QUERY_KEY } from '~/react-query/queryKey';

type WithAll<T> = T | 'all';

export type TQueryBookmark = {
  mainCategory: WithAll<MainType>;
  subCategory: SubWithAllType;
  page: number;
};

const Bookmark = () => {
  const [isReady, setIsReady] = useState(false);
  const {
    data,
    query,
    setQuery,
    hasContentOn,
    refetch: refetchBookmark,
  } = useProfileBookmark(isReady);
  const postBookmark = useBookmarkList(() => [QUERY_KEY.user, QUERY_KEY.bookmark, query]);
  const router = useRouter();

  const handleMainCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setQuery({ mainCategory: e.target.value as WithAll<MainType>, subCategory: 'all', page: 0 });
  const handleSubCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setQuery({
      mainCategory: query.mainCategory,
      subCategory: e.target.value as SubWithAllType,
      page: 0,
    });
  const handlePage = (page: number) => {
    const nextPage = hasContentOn(page) ? page : page - 1;
    setQuery({ ...query, page: nextPage });

    if (nextPage === query.page) {
      refetchBookmark();
    }
  };

  const handleBookmarkToggle = (questionId: number) => {
    postBookmark(questionId);
  };

  useEffect(() => {
    if (!router.isReady || router.query.tab !== 'bookmark') return;

    const initialValues = { mainCategory: 'all', subCategory: 'all', page: 0 } as TQueryBookmark;
    const filteredQuery = filter(
      {
        mainCategory: router.query.mainCategory,
        subCategory: router.query.subCategory,
        page: router.query.page,
      },
      initialValues,
    );

    setQuery(filteredQuery);
    setIsReady(true);
  }, [router.isReady]);

  return (
    <>
      <StyledDiv>
        <div>
          <StyledSelect
            name="mainCategory"
            list={[{ value: 'all', text: '전체' }, ...getMainCategorySelectList()]}
            onChange={handleMainCategory}
            selected={query.mainCategory}
            withoutDefault
          />
          {query.mainCategory !== 'all' && (
            <StyledSelect
              name="subCategory"
              list={getSubCategoryWithAllSelectList(query.mainCategory)}
              onChange={handleSubCategory}
              selected={query.subCategory}
              key={query.mainCategory}
              withoutDefault
            />
          )}
        </div>

        <PageInfo cur={query.page} total={data.totalPages} />
      </StyledDiv>
      <StyledBookmarkList data={data} onBookmarkToggle={handleBookmarkToggle} />
      <Pagination current={query.page} totalElements={data.totalElements} onChange={handlePage} />
    </>
  );
};

export default Bookmark;

function filter(
  query: Record<keyof TQueryBookmark, string | string[] | undefined>,
  defaultValue: TQueryBookmark,
): TQueryBookmark {
  const { mainCategory, subCategory, page } = query;

  if (!isMainType(mainCategory) && mainCategory !== 'all') {
    return defaultValue;
  }
  if (!isSubWithAllType(subCategory) || !isValidCategoryPairWithAll(mainCategory, subCategory)) {
    return { ...defaultValue, mainCategory };
  }
  if (!Number.isInteger(Number(page))) {
    return { mainCategory, subCategory, page: defaultValue.page };
  }

  return { mainCategory, subCategory, page: Number(page) };
}

function isValidCategoryPairWithAll(main: 'all' | MainType, sub: SubWithAllType) {
  if (main === 'all' && sub === 'all') return true;
  if (main !== 'all') return isValidCategoryPair(main, sub);
  return false;
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 19px;
`;

const StyledSelect = styled(Select)`
  width: auto;
  display: inline-block;

  & ~ & {
    margin-left: 13px;
  }
`;

const StyledBookmarkList = styled(BookmarkList)`
  margin-bottom: 32px;
`;

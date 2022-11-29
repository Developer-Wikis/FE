import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import Select from '~/components/base/Select';
import Pagination from '~/components/common/Pagination';
import QuestionList from '~/components/domain/QuestionList';

import { IQuestionItem } from '~/types/question';
import { Paging } from '~/types/utilityType';
import { MainType, SubWithAllType } from '~/utils/constant/category';
import {
  getMainCategorySelectList,
  getSubCategoryWithAllSelectList,
} from '~/utils/helper/categorySelect';
import NoResult from './NoResult';

type WithAll<T> = T | 'all';

export type TQueryBookmark = {
  mainCategory: WithAll<MainType>;
  subCategory: SubWithAllType;
  page: number;
};

interface BookmarkProps {
  query: TQueryBookmark;
  data: Paging<IQuestionItem>;
  onChange: (value: TQueryBookmark) => void;
}

const Bookmark = ({ query, data, onChange }: BookmarkProps) => {
  const handleMainCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    onChange({ mainCategory: e.target.value as WithAll<MainType>, subCategory: 'all', page: 0 });
  const handleSubCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    onChange({
      mainCategory: query.mainCategory,
      subCategory: e.target.value as SubWithAllType,
      page: 0,
    });
  const handlePage = (page: number) => onChange({ ...query, page });

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

        <PageInfo>
          {query.page + 1}/{data.totalPages} 페이지
        </PageInfo>
      </StyledDiv>

      {data.totalElements === 0 ? (
        <NoResult>북마크한 질문이 없습니다.</NoResult>
      ) : (
        <StyledQuestionList
          questions={data.content}
          currentCategory={{
            mainCategory: 'fe',
            subCategory: 'all',
          }}
        />
      )}

      <Pagination totalElements={data.totalElements} onChange={handlePage} />
    </>
  );
};

export default Bookmark;

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

const PageInfo = styled.span`
  ${({ theme }) => theme.fontStyle.body2}
  color: ${({ theme }) => theme.colors.gray500};
`;

const StyledQuestionList = styled(QuestionList)`
  margin-bottom: 32px;
`;

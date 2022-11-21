import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import Select from '~/components/base/Select';
import QuestionList from '~/components/domain/QuestionList';
import { questionData } from '~/mocks/data';
import { IQuestionItem } from '~/types/question';
import { MainType, SubWithAllType } from '~/utils/constant/category';
import {
  getMainCategorySelectList,
  getSubCategoryWithAllSelectList,
} from '~/utils/helper/categorySelect';

type WithAll<T> = T | 'all';
export type TSubQuery = { mainCategory: WithAll<MainType>; subCategory: SubWithAllType };

export type TQueryBookmark = {
  tab: 'question';
  subQuery: TSubQuery;
  content: IQuestionItem[];
  page: number;
  totalPage: number;
};

interface BookmarkProps {
  query: TQueryBookmark;
  onChange: (name: 'subQuery', value: TSubQuery) => void;
}

const Bookmark = ({ query, onChange }: BookmarkProps) => {
  const handleMainCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    onChange('subQuery', {
      mainCategory: e.target.value as WithAll<MainType>,
      subCategory: 'all',
    });
  const handleSubCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    onChange('subQuery', {
      ...query.subQuery,
      subCategory: e.target.value as SubWithAllType,
    });

  return (
    <>
      <StyledDiv>
        <div>
          <StyledSelect
            name="mainCategory"
            list={[{ value: 'all', text: '전체' }, ...getMainCategorySelectList()]}
            onChange={handleMainCategory}
            selected={query.subQuery.mainCategory}
            withoutDefault
          />
          {query.subQuery.mainCategory !== 'all' && (
            <StyledSelect
              name="subCategory"
              list={getSubCategoryWithAllSelectList(query.subQuery.mainCategory)}
              onChange={handleSubCategory}
              selected={query.subQuery.subCategory}
              key={query.subQuery.mainCategory}
              withoutDefault
            />
          )}
        </div>

        <PageInfo>
          {query.page + 1}/{query.totalPage} 페이지
        </PageInfo>
      </StyledDiv>

      <QuestionList
        questions={
          query.content.length === 0
            ? (questionData.content as unknown as IQuestionItem[])
            : query.content
        }
        currentCategory={{
          mainCategory: 'fe',
          subCategory: 'all',
        }}
      />
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

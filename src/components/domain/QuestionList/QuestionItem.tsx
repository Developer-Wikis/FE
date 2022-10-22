import styled from '@emotion/styled';
import Icon from '~/components/base/Icon';
import Link from '~/components/base/Link';
import { IQuestionItem, QuestionCategoryQuery } from '~/types/question';
import { formatNumber } from '~/utils/helper/formatting';
import { forwardRef, Ref } from 'react';
import { convertSubCategory } from '~/utils/helper/converter';
import { mediaQuery } from '~/utils/helper/mediaQuery';

interface QuestionItemProps {
  question: IQuestionItem;
  currentCategory: QuestionCategoryQuery;
}

const QuestionItem = forwardRef(
  ({ question, currentCategory }: QuestionItemProps, ref?: Ref<HTMLLIElement>) => {
    return (
      <StyledItem ref={ref}>
        <Link
          href={{
            pathname: `/question/${question.id}`,
            query: { ...currentCategory },
          }}
        >
          <CategoryName title={convertSubCategory(question.subCategory)}>
            <span>{convertSubCategory(question.subCategory)}</span>
          </CategoryName>
          <QuestionTitle title={question.title}>
            <span>{question.title}</span>
          </QuestionTitle>
          <QuestionInfo>
            <QuestionInfoItem title={String(question.viewCount)} isViewCount>
              <Icon name="Eye" color="gray600" size="15" />
              {formatNumber(question.viewCount)}
            </QuestionInfoItem>
            <QuestionInfoItem title={String(question.commentCount)}>
              <Icon name="Comment" color="gray600" size="15" />
              {formatNumber(question.commentCount)}
            </QuestionInfoItem>
          </QuestionInfo>
        </Link>
      </StyledItem>
    );
  },
);

export default QuestionItem;

const StyledItem = styled.li`
  a {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  }
`;

const CategoryName = styled.div`
  padding: 0 20px;
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  ${({ theme }) => theme.fontStyle.body2}
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray600};

  ${mediaQuery('sm')} {
    width: 100px;
  }
`;

const QuestionTitle = styled.strong`
  font-weight: 400;
  ${({ theme }) => theme.fontStyle.body1}
  color: ${({ theme }) => theme.colors.gray800};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const QuestionInfo = styled.div`
  flex-grow: 1;
  text-align: right;
  padding: 0 20px;
  flex-shrink: 0;
  ${({ theme }) => theme.fontStyle.body2}
  color: ${({ theme }) => theme.colors.gray600};
`;

const QuestionInfoItem = styled.span<{ isViewCount?: boolean }>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;

  ~ span {
    margin-left: 17.5px;
  }

  ${mediaQuery('sm')} {
    ${({ isViewCount }) => (isViewCount ? 'display: none' : '')}
  }
`;

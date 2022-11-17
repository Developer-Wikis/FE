import styled from '@emotion/styled';
import Icon from '~/components/base/Icon';
import Link from '~/components/base/Link';
import { IQuestionItem, ICategoryQuery } from '~/types/question';
import { formatNumber } from '~/utils/helper/formatting';
import { forwardRef, Ref, useCallback } from 'react';
import { convertSubCategory } from '~/utils/helper/converter';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import BookmarkButton from './BookmarkButton';

export interface QuestionItemProps {
  question: IQuestionItem;
  currentCategory: ICategoryQuery;
  onBookmarkToggle?: (id: number, isBookmarked: boolean) => void;
}

const QuestionItem = forwardRef(
  (
    { question, currentCategory, onBookmarkToggle }: QuestionItemProps,
    ref?: Ref<HTMLLIElement>,
  ) => {
    const handleBookmarkToggle = useCallback(() => {
      onBookmarkToggle && onBookmarkToggle(question.id, question.isBookmarked);
    }, [question.id, question.isBookmarked, onBookmarkToggle]);

    return (
      <StyledItem ref={ref}>
        <BookmarkButton
          isBookmarked={question.isBookmarked ?? false}
          onBookmarkToggle={handleBookmarkToggle}
        />

        <StyledLink
          href={{
            pathname: `/question/${question.id}`,
            query: { ...currentCategory },
          }}
        >
          <CategoryName title={convertSubCategory(question.subCategory)}>
            <span>{convertSubCategory(question.subCategory)}</span>
          </CategoryName>
          <QuestionTitle title={question.title}>{question.title}</QuestionTitle>
          <QuestionInfo>
            <QuestionInfoItem title={String(question.viewCount)}>
              <Icon name="Eye" color="gray600" size="15" />
              <span className="screen-out">조회수</span>
              {formatNumber(question.viewCount)}
            </QuestionInfoItem>
            <QuestionInfoItem title={String(question.commentCount)}>
              <Icon name="Comment" color="gray600" size="15" />
              <span className="screen-out">댓글수</span>
              {formatNumber(question.commentCount)}
            </QuestionInfoItem>
          </QuestionInfo>
        </StyledLink>
      </StyledItem>
    );
  },
);

export default QuestionItem;

const StyledItem = styled.li`
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};

  ${mediaQuery('sm')} {
    justify-content: space-between;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  width: calc(100% - 59px);
  overflow: hidden;
  padding: 17px 0;

  ${mediaQuery('sm')} {
    flex-direction: column;
    align-items: flex-start;
    width: calc(100% - 20px - 24px);
    margin-right: 20px;
    padding: 11px 0;
  }
`;

const CategoryName = styled.div`
  padding: 0 20px 0 23px;
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  ${({ theme }) => theme.fontStyle.body2}
  color: ${({ theme }) => theme.colors.gray500};

  ${mediaQuery('sm')} {
    width: 100px;
    margin-bottom: 2px;
    padding: 0;
    ${({ theme }) => theme.fontStyle.caption}
  }
`;

const QuestionTitle = styled.strong`
  width: 100%;
  font-weight: 400;
  ${({ theme }) => theme.fontStyle.body1}
  color: ${({ theme }) => theme.colors.gray800};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${mediaQuery('sm')} {
    ${({ theme }) => theme.fontStyle.body2}
  }
`;

const QuestionInfo = styled.div`
  flex-grow: 1;
  text-align: right;
  padding: 0 0 0 20px;
  flex-shrink: 0;
  ${({ theme }) => theme.fontStyle.body2}
  color: ${({ theme }) => theme.colors.gray600};

  ${mediaQuery('sm')} {
    display: none;
  }
`;

const QuestionInfoItem = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;

  svg {
    margin-right: 7px;
  }

  ~ span {
    margin-left: 17.5px;
  }
`;
